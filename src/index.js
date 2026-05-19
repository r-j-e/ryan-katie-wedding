// Worker entry. Handles /api/rsvp (capture) and /admin (view) ourselves,
// falls through to the static assets binding for everything else (the
// React-on-CDN single-page site).
//
// D1 schema is created on demand — CREATE TABLE IF NOT EXISTS runs before
// any read or write, so there's no separate migration step. For a wedding-
// scale dataset (<200 rows) the per-request cost is negligible.

const ADMIN_REALM = 'Ryan & Katie RSVP Admin';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/rsvp' && request.method === 'POST') {
      return handleRsvpPost(request, env);
    }

    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      return handleAdmin(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

// ─── Schema ────────────────────────────────────────────────────────────────
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
  ]);
}

// ─── Capture: POST /api/rsvp ───────────────────────────────────────────────
async function handleRsvpPost(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const { code, household, email, songs, message, guests } = data;
  if (!code || !Array.isArray(guests) || guests.length === 0) {
    return json({ ok: false, error: 'missing_fields' }, 400);
  }

  try {
    await ensureSchema(env);

    const submittedAt = new Date().toISOString();
    const insertRsvp = await env.DB.prepare(
      'INSERT INTO rsvps (submitted_at, code, household, email, songs, message) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      submittedAt,
      String(code),
      household ? String(household) : '',
      email ? String(email) : '',
      songs ? String(songs) : '',
      message ? String(message) : ''
    ).run();

    const rsvpId = insertRsvp.meta.last_row_id;

    // D1 doesn't speak transactions over HTTP, but batch() is atomic.
    const guestStmts = guests.map((g) =>
      env.DB.prepare(
        'INSERT INTO rsvp_guests (rsvp_id, name, attending, starter, "main", pudding, dietary) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        rsvpId,
        String(g.name || ''),
        String(g.attending || 'no'),
        String(g.starter || ''),
        String(g.main || ''),
        String(g.pudding || ''),
        String(g.dietary || '')
      )
    );
    if (guestStmts.length) await env.DB.batch(guestStmts);

    return json({ ok: true, id: rsvpId });
  } catch (err) {
    return json({ ok: false, error: 'db_error', detail: err.message }, 500);
  }
}

// ─── Admin: GET /admin (HTML, Basic-Auth gated) ───────────────────────────
async function handleAdmin(request, env) {
  if (!checkAuth(request, env)) return authChallenge();

  await ensureSchema(env);

  const [rsvps, allGuests] = await Promise.all([
    env.DB.prepare(
      'SELECT id, submitted_at, code, household, email, songs, message FROM rsvps ORDER BY submitted_at DESC'
    ).all(),
    env.DB.prepare(
      'SELECT rsvp_id, name, attending, starter, "main" AS course_main, pudding, dietary FROM rsvp_guests'
    ).all(),
  ]);

  const byRsvp = new Map();
  for (const g of allGuests.results) {
    const arr = byRsvp.get(g.rsvp_id) || [];
    arr.push(g);
    byRsvp.set(g.rsvp_id, arr);
  }

  return new Response(renderAdminHtml(rsvps.results, byRsvp), {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

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

// ─── Admin HTML render ────────────────────────────────────────────────────
function renderAdminHtml(rsvps, guestsByRsvp) {
  const totalRsvps = rsvps.length;
  let attending = 0, declined = 0;
  const mealCounts = { starter: {}, main: {}, pudding: {} };
  const dietaryNotes = [];

  for (const [, guests] of guestsByRsvp) {
    for (const g of guests) {
      if (g.attending === 'yes') {
        attending++;
        for (const course of ['starter', 'pudding']) {
          const v = g[course] || '—';
          mealCounts[course][v] = (mealCounts[course][v] || 0) + 1;
        }
        const m = g.course_main || '—';
        mealCounts.main[m] = (mealCounts.main[m] || 0) + 1;
        if (g.dietary && g.dietary.trim()) {
          dietaryNotes.push({ name: g.name, note: g.dietary });
        }
      } else {
        declined++;
      }
    }
  }

  const rows = rsvps.map((r) => {
    const guests = guestsByRsvp.get(r.id) || [];
    const guestRows = guests.map((g) => `
      <tr class="guest-row ${g.attending === 'yes' ? 'yes' : 'no'}">
        <td>${esc(g.name)}</td>
        <td>${g.attending === 'yes' ? '✓' : '✗'}</td>
        <td>${esc(g.starter)}</td>
        <td>${esc(g.course_main)}</td>
        <td>${esc(g.pudding)}</td>
        <td>${esc(g.dietary)}</td>
      </tr>
    `).join('');
    return `
      <article class="rsvp">
        <header>
          <div>
            <span class="code">${esc(r.code)}</span>
            <span class="household">${esc(r.household)}</span>
          </div>
          <time>${esc(r.submitted_at)}</time>
        </header>
        <table>
          <thead><tr><th>Name</th><th>Yes</th><th>Starter</th><th>Main</th><th>Pudding</th><th>Dietary</th></tr></thead>
          <tbody>${guestRows}</tbody>
        </table>
        ${r.songs ? `<p class="extra"><b>Songs:</b> ${esc(r.songs)}</p>` : ''}
        ${r.message ? `<p class="extra"><b>Message:</b> ${esc(r.message)}</p>` : ''}
        ${r.email ? `<p class="extra"><b>Email:</b> ${esc(r.email)}</p>` : ''}
      </article>
    `;
  }).join('');

  const mealCountHtml = (label, counts) => {
    const items = Object.entries(counts).map(([k, v]) => `<li>${esc(k)} <b>${v}</b></li>`).join('');
    return items ? `<div><h4>${label}</h4><ul>${items}</ul></div>` : '';
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>RSVPs · Ryan &amp; Katie</title>
<style>
  body { margin:0; font:14px/1.5 ui-sans-serif, system-ui, sans-serif; color:#1a1416; background:#f4ede4; padding:32px; }
  h1 { font-family: Georgia, serif; font-weight:400; font-size:28px; margin:0 0 8px; }
  .meta { color:#6b6062; margin-bottom:24px; }
  .summary { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-bottom:32px; }
  .summary > div { background:#faf6ef; border:1px solid rgba(0,0,0,0.08); padding:14px 16px; }
  .summary h4 { margin:0 0 6px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#6b6062; font-weight:500; }
  .summary ul { list-style:none; padding:0; margin:0; }
  .summary li { display:flex; justify-content:space-between; padding:3px 0; border-top:1px solid rgba(0,0,0,0.06); }
  .summary li:first-child { border-top:none; }
  .summary li b { font-variant-numeric: tabular-nums; }
  .stat-row { display:flex; gap:24px; margin-bottom:24px; }
  .stat-row > div { background:#faf6ef; border:1px solid rgba(0,0,0,0.08); padding:14px 18px; flex:1; }
  .stat-row .n { font-family: Georgia, serif; font-size:28px; color:#4A1A2C; display:block; }
  .stat-row .lbl { color:#6b6062; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; }
  .rsvp { background:#faf6ef; border:1px solid rgba(0,0,0,0.08); padding:18px 20px; margin-bottom:14px; }
  .rsvp header { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px; gap:12px; flex-wrap:wrap; }
  .rsvp .code { font-family: ui-monospace, monospace; background:#ede3d4; padding:2px 8px; border-radius:3px; margin-right:8px; }
  .rsvp .household { font-weight:500; }
  .rsvp time { color:#6b6062; font-size:12px; font-variant-numeric: tabular-nums; }
  table { border-collapse:collapse; width:100%; font-size:13px; }
  th, td { text-align:left; padding:6px 8px; border-bottom:1px solid rgba(0,0,0,0.06); }
  th { font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:#6b6062; font-weight:500; }
  .guest-row.no td:nth-child(2) { color:#4A1A2C; }
  .guest-row.yes td:nth-child(2) { color:#2c6f4f; }
  .extra { font-size:13px; margin:8px 0 0; color:#3a3034; }
  .extra b { color:#1a1416; }
  .dietary-block { background:#fff5e6; border:1px solid #d4a050; padding:12px 16px; margin-bottom:24px; }
  .dietary-block h4 { margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.1em; }
  .dietary-block ul { padding-left:20px; margin:0; }
</style>
</head>
<body>
  <h1>RSVPs</h1>
  <div class="meta">${totalRsvps} ${totalRsvps === 1 ? 'submission' : 'submissions'} · ${new Date().toLocaleString('en-GB')}</div>

  <div class="stat-row">
    <div><span class="n">${attending}</span><span class="lbl">Attending</span></div>
    <div><span class="n">${declined}</span><span class="lbl">Declined</span></div>
    <div><span class="n">${totalRsvps}</span><span class="lbl">Replies</span></div>
  </div>

  ${dietaryNotes.length ? `
    <div class="dietary-block">
      <h4>Dietary notes</h4>
      <ul>${dietaryNotes.map(d => `<li><b>${esc(d.name)}:</b> ${esc(d.note)}</li>`).join('')}</ul>
    </div>
  ` : ''}

  <div class="summary">
    ${mealCountHtml('Starter', mealCounts.starter)}
    ${mealCountHtml('Main', mealCounts.main)}
    ${mealCountHtml('Pudding', mealCounts.pudding)}
  </div>

  <h2 style="font-family:Georgia,serif;font-weight:400;font-size:20px;margin:32px 0 16px;">Replies</h2>
  ${rows || '<p style="color:#6b6062;font-style:italic;">No replies yet.</p>'}
</body>
</html>`;
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
