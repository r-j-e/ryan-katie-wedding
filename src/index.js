// Worker entry. Routes:
//   POST  /api/lookup          → public; verify an invitation code
//   POST  /api/rsvp            → public; capture an RSVP
//   GET   /admin               → Basic-Auth gated dashboard (HTML)
//   GET   /api/admin/codes     → list codes (with reply status)
//   POST  /api/admin/codes     → create code
//   PUT   /api/admin/codes/:c  → update code
//   DEL   /api/admin/codes/:c  → delete code
//   GET   /api/admin/rsvps     → list RSVPs (with their guest rows)
//   PUT   /api/admin/rsvps/:id → update RSVP + its guest rows
//   DEL   /api/admin/rsvps/:id → delete RSVP (cascades to guest rows)
//   GET   /api/admin/export.csv → CSV of attending guests, for the caterer
// Everything else falls through to env.ASSETS for the static site.

const ADMIN_REALM = 'Ryan & Katie RSVP Admin';

// Initial seed for guest_codes. Used once, on first read against an empty
// table. After that the DB is the source of truth and the admin manages it.
const SEED_CODES = [
  { code: 'nile2027',    household: 'Leigh & Philip',  guests: ['Leigh Nile', 'Philip Nile'] },
  { code: 'elliott2027', household: 'Preview',         guests: ['Katie Elliott', 'Ryan Elliott'] },
  { code: 'katie2027',   household: 'Preview',         guests: ['Katie Elliott', 'Ryan Elliott'] },
  { code: 'ryan2027',    household: 'Preview',         guests: ['Katie Elliott', 'Ryan Elliott'] },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      // ─── Public API ───────────────────────────────────────────────
      if (path === '/api/lookup' && method === 'POST') return handleLookup(request, env);
      if (path === '/api/rsvp'   && method === 'POST') return handleRsvpPost(request, env);

      // ─── Admin (HTML) ─────────────────────────────────────────────
      if (path === '/admin' || path === '/admin/') {
        if (!checkAuth(request, env)) return authChallenge();
        return handleAdminHtml(request, env);
      }

      // ─── Admin API ────────────────────────────────────────────────
      if (path.startsWith('/api/admin/')) {
        if (!checkAuth(request, env)) return authChallenge();

        if (path === '/api/admin/codes') {
          if (method === 'GET')  return handleCodesList(env);
          if (method === 'POST') return handleCodeCreate(request, env);
        }
        const codeMatch = path.match(/^\/api\/admin\/codes\/([^\/]+)$/);
        if (codeMatch) {
          if (method === 'PUT')    return handleCodeUpdate(codeMatch[1], request, env);
          if (method === 'DELETE') return handleCodeDelete(codeMatch[1], env);
        }

        if (path === '/api/admin/rsvps' && method === 'GET') return handleRsvpsList(env);
        const rsvpMatch = path.match(/^\/api\/admin\/rsvps\/(\d+)$/);
        if (rsvpMatch) {
          const id = Number(rsvpMatch[1]);
          if (method === 'PUT')    return handleRsvpUpdate(id, request, env);
          if (method === 'DELETE') return handleRsvpDelete(id, env);
        }

        if (path === '/api/admin/export.csv' && method === 'GET') return handleCsvExport(env);

        return json({ ok: false, error: 'not_found' }, 404);
      }

      // ─── Static site ──────────────────────────────────────────────
      // Serve the static asset, but force the HTML document and the JS
      // bundles to revalidate on every request. They have fixed filenames
      // (index.html, dist/*.js), so without this a phone can keep showing a
      // stale index.html for hours after a deploy — which is why edits like
      // viewport-fit / theme-color appeared to "do nothing". `no-cache` still
      // allows the cache, but requires a conditional request first, so an
      // unchanged file is a cheap 304 and a changed one is fetched fresh.
      const assetRes = await env.ASSETS.fetch(request);
      const ct = assetRes.headers.get('content-type') || '';
      if (ct.includes('text/html') || ct.includes('javascript')) {
        const headers = new Headers(assetRes.headers);
        headers.set('Cache-Control', 'no-cache, must-revalidate');
        return new Response(assetRes.body, {
          status: assetRes.status,
          statusText: assetRes.statusText,
          headers,
        });
      }
      return assetRes;
    } catch (err) {
      return json({ ok: false, error: 'unhandled', detail: err.message }, 500);
    }
  },
};

// ──────────────────────────────────────────────────────────────────────────
// Schema + seed (idempotent)
// ──────────────────────────────────────────────────────────────────────────
async function ensureSchema(env) {
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS rsvps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submitted_at TEXT NOT NULL,
      code TEXT NOT NULL,
      household TEXT,
      email TEXT,
      songs TEXT,
      message TEXT
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS rsvp_guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rsvp_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      attending TEXT NOT NULL,
      starter TEXT,
      "main" TEXT,
      pudding TEXT,
      dietary TEXT,
      FOREIGN KEY (rsvp_id) REFERENCES rsvps(id)
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS guest_codes (
      code TEXT PRIMARY KEY,
      household TEXT NOT NULL,
      guests TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
  ]);
}

// One-time seed: if guest_codes is empty after schema creation, populate
// from SEED_CODES so existing invitations keep working. After this runs
// once, the table is the source of truth and the admin manages it.
async function ensureSeeded(env) {
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM guest_codes').first();
  if (row && row.n > 0) return;
  const now = new Date().toISOString();
  await env.DB.batch(SEED_CODES.map((s) =>
    env.DB.prepare(
      'INSERT INTO guest_codes (code, household, guests, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(s.code, s.household, JSON.stringify(s.guests), now, now)
  ));
}

async function ready(env) {
  await ensureSchema(env);
  await ensureSeeded(env);
}

// ──────────────────────────────────────────────────────────────────────────
// Public: lookup + rsvp
// ──────────────────────────────────────────────────────────────────────────
async function handleLookup(request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }
  const code = String(body.code || '').trim().toLowerCase();
  if (!code) return json({ ok: false, error: 'missing_code' }, 400);

  await ready(env);
  const row = await env.DB.prepare(
    'SELECT code, household, guests FROM guest_codes WHERE code = ?'
  ).bind(code).first();
  if (!row) return json({ ok: false, error: 'not_found' }, 404);

  let guests = [];
  try { guests = JSON.parse(row.guests); } catch {}
  return json({
    ok: true,
    guest: { code: row.code, household: row.household, guests, party: guests.length },
  });
}

async function handleRsvpPost(request, env) {
  let data;
  try { data = await request.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }
  const { code, household, email, songs, message, guests } = data;
  if (!code || !Array.isArray(guests) || guests.length === 0) {
    return json({ ok: false, error: 'missing_fields' }, 400);
  }

  await ready(env);
  const codeKey = String(code);

  // One reply per code — if this code has already replied, throw away the
  // previous submission (and its guest rows) before inserting the new one.
  // D1 doesn't have ON DELETE CASCADE, hence the explicit two-step.
  const prior = await env.DB.prepare('SELECT id FROM rsvps WHERE code = ?').bind(codeKey).all();
  const priorIds = prior.results.map((r) => r.id);
  if (priorIds.length) {
    const placeholders = priorIds.map(() => '?').join(',');
    await env.DB.batch([
      env.DB.prepare(`DELETE FROM rsvp_guests WHERE rsvp_id IN (${placeholders})`).bind(...priorIds),
      env.DB.prepare('DELETE FROM rsvps WHERE code = ?').bind(codeKey),
    ]);
  }

  const submittedAt = new Date().toISOString();
  const ins = await env.DB.prepare(
    'INSERT INTO rsvps (submitted_at, code, household, email, songs, message) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(
    submittedAt, codeKey, s(household), s(email), s(songs), s(message)
  ).run();
  const rsvpId = ins.meta.last_row_id;

  const stmts = guests.map((g) =>
    env.DB.prepare(
      'INSERT INTO rsvp_guests (rsvp_id, name, attending, starter, "main", pudding, dietary) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(rsvpId, s(g.name), s(g.attending) || 'no', s(g.starter), s(g.main), s(g.pudding), s(g.dietary))
  );
  if (stmts.length) await env.DB.batch(stmts);

  return json({ ok: true, id: rsvpId, replaced: priorIds.length > 0 });
}

// ──────────────────────────────────────────────────────────────────────────
// Admin API: codes
// ──────────────────────────────────────────────────────────────────────────
async function handleCodesList(env) {
  await ready(env);
  // Codes + whether each has a submitted RSVP yet.
  const codes = await env.DB.prepare(`
    SELECT c.code, c.household, c.guests, c.created_at, c.updated_at,
           r.id AS rsvp_id, r.submitted_at
    FROM guest_codes c
    LEFT JOIN rsvps r ON r.code = c.code
    ORDER BY c.code
  `).all();
  return json({
    ok: true,
    codes: codes.results.map((r) => ({
      code: r.code,
      household: r.household,
      guests: safeParseArray(r.guests),
      created_at: r.created_at,
      updated_at: r.updated_at,
      replied: !!r.rsvp_id,
      replied_at: r.submitted_at || null,
      rsvp_id: r.rsvp_id || null,
    })),
  });
}

async function handleCodeCreate(request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }
  const code = String(body.code || '').trim().toLowerCase();
  const household = String(body.household || '').trim();
  const guests = Array.isArray(body.guests) ? body.guests.map((g) => String(g).trim()).filter(Boolean) : [];
  if (!code || !household || guests.length === 0) {
    return json({ ok: false, error: 'missing_fields' }, 400);
  }
  await ready(env);
  const now = new Date().toISOString();
  try {
    await env.DB.prepare(
      'INSERT INTO guest_codes (code, household, guests, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(code, household, JSON.stringify(guests), now, now).run();
    return json({ ok: true });
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) return json({ ok: false, error: 'code_exists' }, 409);
    throw err;
  }
}

async function handleCodeUpdate(code, request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }
  const household = body.household != null ? String(body.household).trim() : null;
  const guests = Array.isArray(body.guests) ? body.guests.map((g) => String(g).trim()).filter(Boolean) : null;
  if (household == null && guests == null) return json({ ok: false, error: 'nothing_to_update' }, 400);

  await ready(env);
  const now = new Date().toISOString();
  const fields = [];
  const binds = [];
  if (household != null) { fields.push('household = ?'); binds.push(household); }
  if (guests != null)    { fields.push('guests = ?'); binds.push(JSON.stringify(guests)); }
  fields.push('updated_at = ?'); binds.push(now);
  binds.push(code.toLowerCase());

  const res = await env.DB.prepare(`UPDATE guest_codes SET ${fields.join(', ')} WHERE code = ?`).bind(...binds).run();
  if (res.meta.changes === 0) return json({ ok: false, error: 'not_found' }, 404);
  return json({ ok: true });
}

async function handleCodeDelete(code, env) {
  await ready(env);
  const res = await env.DB.prepare('DELETE FROM guest_codes WHERE code = ?').bind(code.toLowerCase()).run();
  if (res.meta.changes === 0) return json({ ok: false, error: 'not_found' }, 404);
  return json({ ok: true });
}

// ──────────────────────────────────────────────────────────────────────────
// Admin API: rsvps
// ──────────────────────────────────────────────────────────────────────────
async function handleRsvpsList(env) {
  await ready(env);
  const [rsvps, allGuests] = await Promise.all([
    env.DB.prepare('SELECT id, submitted_at, code, household, email, songs, message FROM rsvps ORDER BY submitted_at DESC').all(),
    env.DB.prepare('SELECT id, rsvp_id, name, attending, starter, "main" AS course_main, pudding, dietary FROM rsvp_guests').all(),
  ]);
  const byRsvp = new Map();
  for (const g of allGuests.results) {
    const arr = byRsvp.get(g.rsvp_id) || [];
    arr.push({
      id: g.id, name: g.name, attending: g.attending,
      starter: g.starter, main: g.course_main, pudding: g.pudding, dietary: g.dietary,
    });
    byRsvp.set(g.rsvp_id, arr);
  }
  return json({
    ok: true,
    rsvps: rsvps.results.map((r) => ({ ...r, guests: byRsvp.get(r.id) || [] })),
  });
}

async function handleRsvpUpdate(id, request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }
  await ready(env);

  // Update top-level rsvp fields
  const fields = [];
  const binds = [];
  for (const k of ['household', 'email', 'songs', 'message']) {
    if (body[k] != null) { fields.push(`${k} = ?`); binds.push(String(body[k])); }
  }
  if (fields.length) {
    binds.push(id);
    await env.DB.prepare(`UPDATE rsvps SET ${fields.join(', ')} WHERE id = ?`).bind(...binds).run();
  }

  // Replace guest rows if provided.
  if (Array.isArray(body.guests)) {
    await env.DB.prepare('DELETE FROM rsvp_guests WHERE rsvp_id = ?').bind(id).run();
    const stmts = body.guests.map((g) =>
      env.DB.prepare(
        'INSERT INTO rsvp_guests (rsvp_id, name, attending, starter, "main", pudding, dietary) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(id, s(g.name), s(g.attending) || 'no', s(g.starter), s(g.main), s(g.pudding), s(g.dietary))
    );
    if (stmts.length) await env.DB.batch(stmts);
  }

  return json({ ok: true });
}

async function handleRsvpDelete(id, env) {
  await ready(env);
  await env.DB.prepare('DELETE FROM rsvp_guests WHERE rsvp_id = ?').bind(id).run();
  const res = await env.DB.prepare('DELETE FROM rsvps WHERE id = ?').bind(id).run();
  if (res.meta.changes === 0) return json({ ok: false, error: 'not_found' }, 404);
  return json({ ok: true });
}

// ──────────────────────────────────────────────────────────────────────────
// Admin: CSV export
// ──────────────────────────────────────────────────────────────────────────
async function handleCsvExport(env) {
  await ready(env);
  const rows = await env.DB.prepare(`
    SELECT r.submitted_at, r.code, r.household, r.email,
           g.name, g.attending, g.starter, g."main" AS course_main, g.pudding, g.dietary
    FROM rsvps r
    LEFT JOIN rsvp_guests g ON g.rsvp_id = r.id
    ORDER BY r.submitted_at DESC, g.id
  `).all();
  const header = ['submitted_at','code','household','email','name','attending','starter','main','pudding','dietary'];
  const csv = [header.join(',')]
    .concat(rows.results.map((r) => header.map((h) => {
      const v = h === 'main' ? r.course_main : r[h];
      return csvCell(v);
    }).join(',')))
    .join('\n');
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="rsvps-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  });
}

function csvCell(v) {
  if (v == null) return '';
  const str = String(v);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

// ──────────────────────────────────────────────────────────────────────────
// Auth
// ──────────────────────────────────────────────────────────────────────────
function checkAuth(request, env) {
  const expected = env.ADMIN_PASSWORD;
  if (!expected) return false;
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Basic ')) return false;
  let decoded;
  try { decoded = atob(auth.slice(6)); } catch { return false; }
  const idx = decoded.indexOf(':');
  if (idx < 0) return false;
  return decoded.slice(idx + 1) === expected;
}
function authChallenge() {
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"` },
  });
}

// ──────────────────────────────────────────────────────────────────────────
// Admin HTML — a single page that loads its data from the JSON endpoints.
// Styled to match the wedding site (Cinzel + Cormorant, cream + burgundy).
// ──────────────────────────────────────────────────────────────────────────
async function handleAdminHtml() {
  return new Response(ADMIN_HTML, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

const ADMIN_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Admin · Ryan &amp; Katie</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" rel="stylesheet" />
<style>
  :root {
    --burgundy:#4A1A2C; --magenta:#A8326B;
    --cream:#F4EDE4; --cream-deep:#EDE3D4; --paper:#FAF6EF;
    --ink:#1A1416; --ink-soft:#2A2024; --ink-mute:rgba(26,20,22,0.55);
    --rule:rgba(26,20,22,0.14); --rule-soft:rgba(26,20,22,0.08);
    --accent-gradient: linear-gradient(135deg, var(--burgundy) 0%, var(--magenta) 100%);
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; background:var(--cream); color:var(--ink); font-family:'Cormorant Garamond', Georgia, serif; font-size:16px; }
  body{ padding:48px 32px 96px; }
  a{ color:var(--burgundy); text-decoration:none; border-bottom:1px solid var(--rule); padding-bottom:1px; }
  a:hover{ border-color:var(--burgundy); }
  button{ font-family:inherit; }

  /* Page header */
  .page-head{ max-width:1180px; margin:0 auto 32px; display:flex; align-items:baseline; justify-content:space-between; gap:24px; flex-wrap:wrap; }
  .eyebrow{ font-family:'Cinzel', Georgia, serif; font-size:11px; font-weight:400; letter-spacing:0.36em; text-transform:uppercase; color:var(--burgundy); text-indent:0.36em; margin:0 0 12px; }
  h1.title{ font-family:'Cormorant Garamond', Georgia, serif; font-style:italic; font-weight:300; font-size:clamp(36px, 4vw, 52px); margin:0; letter-spacing:-0.005em; color:var(--ink); }
  .home-link{ font-family:'Cinzel', Georgia, serif; font-size:10px; letter-spacing:0.32em; text-transform:uppercase; text-indent:0.32em; color:var(--ink-mute); border:none; }
  .home-link:hover{ color:var(--burgundy); }

  /* Stat cards */
  .stats{ max-width:1180px; margin:0 auto 32px; display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:16px; }
  .stat{ background:var(--paper); border:1px solid var(--rule); padding:18px 22px; text-align:center; }
  .stat .n{ font-family:'Cormorant Garamond', Georgia, serif; font-style:italic; font-weight:300; font-size:42px; line-height:1; display:block;
            background-image:var(--accent-gradient); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
  .stat .lbl{ display:block; margin-top:8px; font-family:'Cinzel', Georgia, serif; font-size:10px; letter-spacing:0.32em; text-transform:uppercase; color:var(--ink-mute); text-indent:0.32em; }

  /* Tabs */
  .tabs{ max-width:1180px; margin:0 auto 16px; display:flex; gap:0; border-bottom:1px solid var(--rule); }
  .tab{ background:none; border:none; padding:14px 20px; cursor:pointer; color:var(--ink-mute); font-family:'Cinzel', Georgia, serif; font-size:11px; font-weight:400; letter-spacing:0.32em; text-transform:uppercase; text-indent:0.32em; border-bottom:2px solid transparent; margin-bottom:-1px; }
  .tab.is-active{ color:var(--burgundy); border-bottom-color:var(--burgundy); }

  /* Toolbar above each table */
  .toolbar{ max-width:1180px; margin:0 auto 18px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
  .toolbar input, .toolbar select{ background:var(--paper); border:1px solid var(--rule); color:var(--ink); font-family:inherit; font-size:15px; padding:9px 14px; outline:none; }
  .toolbar input:focus, .toolbar select:focus{ border-color:var(--burgundy); }
  .toolbar input[type="search"]{ min-width:260px; }
  .btn{ background:var(--ink); color:var(--cream); border:none; padding:10px 18px; cursor:pointer; font-family:'Cinzel', Georgia, serif; font-size:10px; letter-spacing:0.32em; text-transform:uppercase; text-indent:0.32em; transition: background 0.2s; }
  .btn:hover{ background:var(--burgundy); }
  .btn.ghost{ background:transparent; color:var(--burgundy); border:1px solid var(--rule); }
  .btn.ghost:hover{ border-color:var(--burgundy); background:var(--paper); }
  .btn.danger{ background:none; color:var(--burgundy); border:none; padding:6px 10px; font-size:13px; font-style:italic; letter-spacing:0; text-transform:none; text-indent:0; }
  .btn.danger:hover{ text-decoration:underline; }

  /* Tables */
  .panel{ max-width:1180px; margin:0 auto; background:var(--paper); border:1px solid var(--rule); }
  table.data{ width:100%; border-collapse:collapse; }
  table.data th, table.data td{ text-align:left; padding:12px 16px; border-bottom:1px solid var(--rule-soft); vertical-align:top; }
  table.data th{ background:var(--cream-deep); font-family:'Cinzel', Georgia, serif; font-size:10px; font-weight:500; letter-spacing:0.24em; text-transform:uppercase; color:var(--ink-mute); text-indent:0.24em; user-select:none; cursor:pointer; }
  table.data th.sortable:hover{ color:var(--burgundy); }
  table.data th .arrow{ display:inline-block; margin-left:6px; opacity:0.5; }
  table.data tr:last-child td{ border-bottom:none; }
  table.data td.code{ font-family: ui-monospace, monospace; font-size:13px; color:var(--burgundy); }
  table.data td.muted{ color:var(--ink-mute); font-style:italic; }
  .pill{ display:inline-block; padding:2px 10px; font-family:'Cinzel', Georgia, serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; text-indent:0.2em; border:1px solid var(--rule); border-radius:999px; }
  .pill.yes{ color:var(--burgundy); border-color:var(--burgundy); }
  .pill.no{ color:var(--ink-mute); }
  .pill.pending{ color:#8b6914; border-color:#d4a050; background:#fff5e6; }
  .empty{ padding:48px 24px; text-align:center; color:var(--ink-mute); font-style:italic; }

  /* Modal */
  .modal-bg{ position:fixed; inset:0; background:rgba(26,20,22,0.4); display:flex; align-items:center; justify-content:center; padding:24px; z-index:100; }
  .modal{ background:var(--paper); border:1px solid var(--rule); max-width:680px; width:100%; max-height:90vh; overflow:auto; padding:32px; }
  .modal h2{ font-family:'Cormorant Garamond', Georgia, serif; font-style:italic; font-weight:400; font-size:28px; margin:0 0 24px; color:var(--ink); }
  .modal label{ display:block; margin-bottom:14px; }
  .modal label > span{ display:block; font-family:'Cinzel', Georgia, serif; font-size:10px; letter-spacing:0.24em; text-transform:uppercase; color:var(--ink-mute); text-indent:0.24em; margin-bottom:6px; }
  .modal input, .modal textarea, .modal select{ width:100%; background:var(--cream); border:1px solid var(--rule); color:var(--ink); font-family:inherit; font-size:15px; padding:10px 12px; outline:none; }
  .modal input:focus, .modal textarea:focus, .modal select:focus{ border-color:var(--burgundy); }
  .modal .row{ display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px; }
  .modal-actions{ display:flex; gap:14px; justify-content:flex-end; margin-top:20px; padding-top:20px; border-top:1px solid var(--rule); }
  .guest-edit-block{ padding:18px; border:1px solid var(--rule); margin-bottom:14px; }
  .guest-edit-block h4{ margin:0 0 12px; font-family:'Cormorant Garamond', Georgia, serif; font-style:italic; font-size:18px; color:var(--burgundy); }

  /* Toast */
  .toast{ position:fixed; bottom:24px; right:24px; background:var(--ink); color:var(--cream); padding:14px 22px; font-family:'Cinzel', Georgia, serif; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; text-indent:0.24em; z-index:200; animation: slide-in 0.3s ease-out; }
  .toast.err{ background:var(--burgundy); }
  @keyframes slide-in { from{ transform:translateY(20px); opacity:0; } to{ transform:translateY(0); opacity:1; } }

  /* Sub-table inside an RSVP row (the guest rows) */
  td.guests-cell ul{ list-style:none; padding:0; margin:0; }
  td.guests-cell li{ padding:3px 0; }
  td.guests-cell .guest-name{ font-weight:500; margin-right:8px; }
  td.guests-cell .guest-meal{ color:var(--ink-mute); font-style:italic; font-size:13px; }
</style>
</head>
<body>

<header class="page-head">
  <div>
    <div class="eyebrow">Behind the scenes</div>
    <h1 class="title">Admin</h1>
  </div>
  <a class="home-link" href="/">← Back to site</a>
</header>

<section class="stats" id="stats"></section>

<nav class="tabs">
  <button class="tab is-active" data-tab="rsvps">Replies</button>
  <button class="tab" data-tab="codes">Invitation codes</button>
</nav>

<!-- ─── Replies tab ─── -->
<section id="tab-rsvps">
  <div class="toolbar">
    <input type="search" id="rsvp-search" placeholder="Search name, code, household, email…" />
    <select id="rsvp-filter">
      <option value="all">All replies</option>
      <option value="attending">Attending only</option>
      <option value="declined">Declined only</option>
    </select>
    <span style="flex:1"></span>
    <a class="btn ghost" href="/api/admin/export.csv">Download CSV</a>
  </div>
  <div class="panel">
    <table class="data" id="rsvp-table">
      <thead>
        <tr>
          <th class="sortable" data-sort="submitted_at">Submitted <span class="arrow">↓</span></th>
          <th class="sortable" data-sort="household">Household</th>
          <th class="sortable" data-sort="code">Code</th>
          <th>Guests</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="empty" id="rsvp-empty" style="display:none;">No replies yet.</div>
  </div>
</section>

<!-- ─── Codes tab ─── -->
<section id="tab-codes" style="display:none;">
  <div class="toolbar">
    <input type="search" id="code-search" placeholder="Search code or household…" />
    <select id="code-filter">
      <option value="all">All codes</option>
      <option value="replied">Replied</option>
      <option value="pending">Pending</option>
    </select>
    <span style="flex:1"></span>
    <button class="btn" id="add-code-btn">+ Add code</button>
  </div>
  <div class="panel">
    <table class="data" id="code-table">
      <thead>
        <tr>
          <th class="sortable" data-sort="code">Code <span class="arrow">↓</span></th>
          <th class="sortable" data-sort="household">Household</th>
          <th>Guests</th>
          <th class="sortable" data-sort="replied">Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="empty" id="code-empty" style="display:none;">No codes yet.</div>
  </div>
</section>

<div id="modal-root"></div>
<div id="toast-root"></div>

<script>
// ─── State ─────────────────────────────────────────────────────────────────
let state = {
  rsvps: [], codes: [],
  rsvpSort: { key: 'submitted_at', dir: 'desc' },
  codeSort: { key: 'code', dir: 'asc' },
};

const $ = (sel) => document.querySelector(sel);

// ─── Boot ──────────────────────────────────────────────────────────────────
init();

async function init() {
  await Promise.all([fetchRsvps(), fetchCodes()]);
  bindTabs();
  bindRsvpControls();
  bindCodeControls();
  render();
}

async function fetchRsvps() {
  const res = await fetch('/api/admin/rsvps');
  if (!res.ok) { toast('Failed to load replies', true); return; }
  state.rsvps = (await res.json()).rsvps || [];
}

async function fetchCodes() {
  const res = await fetch('/api/admin/codes');
  if (!res.ok) { toast('Failed to load codes', true); return; }
  state.codes = (await res.json()).codes || [];
}

// ─── Rendering ─────────────────────────────────────────────────────────────
function render() {
  renderStats();
  renderRsvps();
  renderCodes();
}

function renderStats() {
  let attending = 0, declined = 0;
  for (const r of state.rsvps) {
    for (const g of r.guests || []) {
      if (g.attending === 'yes') attending++; else declined++;
    }
  }
  const replied = state.rsvps.length;
  const total = state.codes.length;
  const pending = total - replied;
  $('#stats').innerHTML = [
    statCard(attending, 'Attending'),
    statCard(declined, 'Declined'),
    statCard(replied, 'Replies in'),
    statCard(pending < 0 ? 0 : pending, 'Pending'),
  ].join('');
}
function statCard(n, lbl) {
  return '<div class="stat"><span class="n">' + n + '</span><span class="lbl">' + esc(lbl) + '</span></div>';
}

function renderRsvps() {
  const q = $('#rsvp-search').value.trim().toLowerCase();
  const filter = $('#rsvp-filter').value;
  const { key, dir } = state.rsvpSort;

  let rows = state.rsvps.slice();
  if (filter === 'attending') rows = rows.filter((r) => (r.guests || []).some((g) => g.attending === 'yes'));
  if (filter === 'declined')  rows = rows.filter((r) => (r.guests || []).every((g) => g.attending !== 'yes'));
  if (q) rows = rows.filter((r) => {
    const hay = [r.code, r.household, r.email, r.songs, r.message, ...(r.guests || []).map((g) => g.name + ' ' + g.dietary)].join(' ').toLowerCase();
    return hay.includes(q);
  });
  rows.sort(cmp(key, dir));

  const tbody = $('#rsvp-table tbody');
  tbody.innerHTML = rows.map(rsvpRow).join('');
  $('#rsvp-empty').style.display = rows.length ? 'none' : '';
  $('#rsvp-table').style.display = rows.length ? '' : 'none';
  updateSortArrows('#rsvp-table', key, dir);
}

function rsvpRow(r) {
  const guests = (r.guests || []).map((g) => {
    const meal = g.attending === 'yes' && (g.starter || g.main || g.pudding)
      ? '<div class="guest-meal">' + esc([g.starter, g.main, g.pudding].filter(Boolean).join(' · ')) + (g.dietary ? ' · <i>' + esc(g.dietary) + '</i>' : '') + '</div>'
      : (g.dietary ? '<div class="guest-meal"><i>' + esc(g.dietary) + '</i></div>' : '');
    return '<li>'
      + '<span class="guest-name">' + esc(g.name || '(unnamed)') + '</span>'
      + '<span class="pill ' + (g.attending === 'yes' ? 'yes' : 'no') + '">' + (g.attending === 'yes' ? 'Yes' : 'No') + '</span>'
      + meal
      + '</li>';
  }).join('');
  const notes = [];
  if (r.songs) notes.push('<b>Song:</b> ' + esc(r.songs));
  if (r.message) notes.push('<b>Note:</b> ' + esc(r.message));
  if (r.email) notes.push('<b>Email:</b> ' + esc(r.email));
  return '<tr data-rsvp-id="' + r.id + '">'
    + '<td>' + esc(formatDate(r.submitted_at)) + '</td>'
    + '<td>' + esc(r.household || '') + '</td>'
    + '<td class="code">' + esc(r.code || '') + '</td>'
    + '<td class="guests-cell"><ul>' + guests + '</ul></td>'
    + '<td class="muted">' + (notes.join('<br>') || '—') + '</td>'
    + '<td style="white-space:nowrap;"><button class="btn ghost" data-edit-rsvp="' + r.id + '">Edit</button> <button class="btn danger" data-del-rsvp="' + r.id + '">Delete</button></td>'
    + '</tr>';
}

function renderCodes() {
  const q = $('#code-search').value.trim().toLowerCase();
  const filter = $('#code-filter').value;
  const { key, dir } = state.codeSort;

  let rows = state.codes.slice();
  if (filter === 'replied') rows = rows.filter((c) => c.replied);
  if (filter === 'pending') rows = rows.filter((c) => !c.replied);
  if (q) rows = rows.filter((c) => (c.code + ' ' + c.household + ' ' + (c.guests || []).join(' ')).toLowerCase().includes(q));
  rows.sort(cmp(key, dir));

  const tbody = $('#code-table tbody');
  tbody.innerHTML = rows.map(codeRow).join('');
  $('#code-empty').style.display = rows.length ? 'none' : '';
  $('#code-table').style.display = rows.length ? '' : 'none';
  updateSortArrows('#code-table', key, dir);
}

function codeRow(c) {
  const status = c.replied
    ? '<span class="pill yes">Replied</span>'
    : '<span class="pill pending">Pending</span>';
  return '<tr data-code="' + esc(c.code) + '">'
    + '<td class="code">' + esc(c.code) + '</td>'
    + '<td>' + esc(c.household) + '</td>'
    + '<td>' + esc((c.guests || []).join(', ')) + '</td>'
    + '<td>' + status + '</td>'
    + '<td style="white-space:nowrap;"><button class="btn ghost" data-edit-code="' + esc(c.code) + '">Edit</button> <button class="btn danger" data-del-code="' + esc(c.code) + '">Delete</button></td>'
    + '</tr>';
}

// ─── Tabs ──────────────────────────────────────────────────────────────────
function bindTabs() {
  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      $('#tab-rsvps').style.display = btn.dataset.tab === 'rsvps' ? '' : 'none';
      $('#tab-codes').style.display = btn.dataset.tab === 'codes' ? '' : 'none';
    });
  });
}

// ─── Controls: replies ────────────────────────────────────────────────────
function bindRsvpControls() {
  $('#rsvp-search').addEventListener('input', renderRsvps);
  $('#rsvp-filter').addEventListener('change', renderRsvps);
  document.querySelectorAll('#rsvp-table thead th.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      const cur = state.rsvpSort;
      state.rsvpSort = { key, dir: cur.key === key && cur.dir === 'desc' ? 'asc' : 'desc' };
      renderRsvps();
    });
  });
  document.addEventListener('click', (e) => {
    const editId = e.target.closest('[data-edit-rsvp]')?.dataset.editRsvp;
    const delId  = e.target.closest('[data-del-rsvp]')?.dataset.delRsvp;
    if (editId) openRsvpModal(Number(editId));
    if (delId)  confirmDeleteRsvp(Number(delId));
  });
}

function openRsvpModal(id) {
  const r = state.rsvps.find((x) => x.id === id);
  if (!r) return;
  const guestBlocks = (r.guests || []).map((g, i) => guestEditBlock(g, i)).join('');
  showModal(
    'Edit reply · ' + esc(r.household || '') +
    '<form id="rsvp-form">' +
      '<label><span>Household</span><input name="household" value="' + esc(r.household || '') + '"></label>' +
      '<label><span>Email</span><input name="email" value="' + esc(r.email || '') + '"></label>' +
      '<label><span>Song request</span><input name="songs" value="' + esc(r.songs || '') + '"></label>' +
      '<label><span>Message</span><textarea name="message" rows="3">' + esc(r.message || '') + '</textarea></label>' +
      '<h4 style="margin:20px 0 10px;font-family:Cinzel,serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:var(--burgundy);">Guests</h4>' +
      guestBlocks +
      '<div class="modal-actions"><button type="button" class="btn ghost" data-modal-close>Cancel</button><button type="submit" class="btn">Save</button></div>' +
    '</form>'
  );
  $('#rsvp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const guests = (r.guests || []).map((_, i) => ({
      name:      fd.get('guest_' + i + '_name'),
      attending: fd.get('guest_' + i + '_attending'),
      starter:   fd.get('guest_' + i + '_starter'),
      main:      fd.get('guest_' + i + '_main'),
      pudding:   fd.get('guest_' + i + '_pudding'),
      dietary:   fd.get('guest_' + i + '_dietary'),
    }));
    const body = {
      household: fd.get('household'), email: fd.get('email'),
      songs: fd.get('songs'), message: fd.get('message'),
      guests,
    };
    const res = await fetch('/api/admin/rsvps/' + id, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) { closeModal(); toast('Saved'); await fetchRsvps(); render(); }
    else toast('Save failed', true);
  });
}

function guestEditBlock(g, i) {
  return '<div class="guest-edit-block">' +
    '<h4>Guest ' + (i + 1) + '</h4>' +
    '<label><span>Name</span><input name="guest_' + i + '_name" value="' + esc(g.name || '') + '"></label>' +
    '<label><span>Attending</span><select name="guest_' + i + '_attending">' +
      '<option value="yes"' + (g.attending === 'yes' ? ' selected' : '') + '>Yes</option>' +
      '<option value="no"' + (g.attending !== 'yes' ? ' selected' : '') + '>No</option>' +
    '</select></label>' +
    '<div class="row">' +
      '<label><span>Starter</span><input name="guest_' + i + '_starter" value="' + esc(g.starter || '') + '"></label>' +
      '<label><span>Main</span><input name="guest_' + i + '_main" value="' + esc(g.main || '') + '"></label>' +
      '<label><span>Pudding</span><input name="guest_' + i + '_pudding" value="' + esc(g.pudding || '') + '"></label>' +
    '</div>' +
    '<label><span>Dietary notes</span><input name="guest_' + i + '_dietary" value="' + esc(g.dietary || '') + '"></label>' +
  '</div>';
}

async function confirmDeleteRsvp(id) {
  if (!confirm('Delete this reply? This cannot be undone.')) return;
  const res = await fetch('/api/admin/rsvps/' + id, { method: 'DELETE' });
  if (res.ok) { toast('Deleted'); await fetchRsvps(); render(); }
  else toast('Delete failed', true);
}

// ─── Controls: codes ──────────────────────────────────────────────────────
function bindCodeControls() {
  $('#code-search').addEventListener('input', renderCodes);
  $('#code-filter').addEventListener('change', renderCodes);
  document.querySelectorAll('#code-table thead th.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      const cur = state.codeSort;
      state.codeSort = { key, dir: cur.key === key && cur.dir === 'asc' ? 'desc' : 'asc' };
      renderCodes();
    });
  });
  $('#add-code-btn').addEventListener('click', () => openCodeModal(null));
  document.addEventListener('click', (e) => {
    const editCode = e.target.closest('[data-edit-code]')?.dataset.editCode;
    const delCode  = e.target.closest('[data-del-code]')?.dataset.delCode;
    if (editCode) openCodeModal(editCode);
    if (delCode)  confirmDeleteCode(delCode);
  });
}

function openCodeModal(code) {
  const c = code ? state.codes.find((x) => x.code === code) : null;
  const title = c ? 'Edit code · ' + esc(c.code) : 'Add invitation code';
  showModal(title +
    '<form id="code-form">' +
      (c ? '' :
        '<label><span>Code</span><input name="code" required placeholder="e.g. smith2027" /></label>') +
      '<label><span>Household</span><input name="household" required value="' + esc(c?.household || '') + '" placeholder="e.g. The Smiths" /></label>' +
      '<label><span>Guest names <em style="font-style:italic;text-transform:none;letter-spacing:0;color:var(--ink-mute);">(one per line)</em></span><textarea name="guests" rows="4" required>' + esc((c?.guests || []).join('\\n')) + '</textarea></label>' +
      '<div class="modal-actions"><button type="button" class="btn ghost" data-modal-close>Cancel</button><button type="submit" class="btn">Save</button></div>' +
    '</form>'
  );
  $('#code-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {
      household: fd.get('household'),
      guests: String(fd.get('guests') || '').split(/\\r?\\n/).map((s) => s.trim()).filter(Boolean),
    };
    let res;
    if (c) {
      res = await fetch('/api/admin/codes/' + encodeURIComponent(c.code), { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    } else {
      body.code = String(fd.get('code') || '').trim().toLowerCase();
      res = await fetch('/api/admin/codes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    }
    if (res.ok) { closeModal(); toast('Saved'); await fetchCodes(); render(); }
    else {
      const j = await res.json().catch(() => ({}));
      toast(j.error === 'code_exists' ? 'That code already exists' : 'Save failed', true);
    }
  });
}

async function confirmDeleteCode(code) {
  if (!confirm('Delete code ' + code + '? Any reply submitted against it stays in the replies table.')) return;
  const res = await fetch('/api/admin/codes/' + encodeURIComponent(code), { method: 'DELETE' });
  if (res.ok) { toast('Deleted'); await fetchCodes(); render(); }
  else toast('Delete failed', true);
}

// ─── Modal + toast ────────────────────────────────────────────────────────
function showModal(html) {
  const root = $('#modal-root');
  root.innerHTML = '<div class="modal-bg" data-modal-bg><div class="modal"><h2>' + html + '</div></div></div>';
  root.querySelector('[data-modal-bg]').addEventListener('click', (e) => { if (e.target.dataset.modalBg !== undefined) closeModal(); });
  root.querySelectorAll('[data-modal-close]').forEach((b) => b.addEventListener('click', closeModal));
}
function closeModal() { $('#modal-root').innerHTML = ''; }

let toastTimer;
function toast(msg, err) {
  const root = $('#toast-root');
  root.innerHTML = '<div class="toast' + (err ? ' err' : '') + '">' + esc(msg) + '</div>';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { root.innerHTML = ''; }, 2400);
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function cmp(key, dir) {
  const sign = dir === 'asc' ? 1 : -1;
  return (a, b) => {
    const av = a[key] ?? '', bv = b[key] ?? '';
    if (av < bv) return -1 * sign;
    if (av > bv) return  1 * sign;
    return 0;
  };
}
function updateSortArrows(tableSel, key, dir) {
  document.querySelectorAll(tableSel + ' thead th.sortable').forEach((th) => {
    const arrow = th.querySelector('.arrow');
    if (!arrow) return;
    if (th.dataset.sort === key) {
      arrow.textContent = dir === 'asc' ? '↑' : '↓';
      arrow.style.opacity = '1';
    } else {
      arrow.textContent = '';
    }
  });
}
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
}
</script>

</body>
</html>`;

// ──────────────────────────────────────────────────────────────────────────
// Tiny helpers
// ──────────────────────────────────────────────────────────────────────────
function safeParseArray(s) { try { const v = JSON.parse(s); return Array.isArray(v) ? v : []; } catch { return []; } }
function s(v) { return v == null ? '' : String(v); }
function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}
