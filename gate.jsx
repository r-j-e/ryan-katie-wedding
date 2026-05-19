// Per-guest login. Each invitation card carries a unique code (e.g. 'nile2027').
// The code maps to a household — used for the nav greeting — and to a fixed
// list of named guests, which pre-fill the RSVP form. Token persists in
// localStorage so guests don't have to re-enter on return visits.
//
// The code → household/guests mapping lives in Cloudflare D1 and is managed
// from /admin (Codes tab). The gate verifies via POST /api/lookup, so the
// guest list isn't exposed in the public bundle.

const TOKEN_KEY = 'rk_guest_v1';

// Async lookup against the server. Returns a guest object on success
// (mirroring the old shape) or null on miss/error.
const lookupGuest = async (raw) => {
  if (!raw) return null;
  const code = raw.trim().toLowerCase();
  if (!code) return null;
  try {
    const res = await fetch('/api/lookup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.ok ? body.guest : null;
  } catch {
    return null;
  }
};

const Gate = ({ onUnlock }) => {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 500);
  }, []);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (busy) return;
    setBusy(true);
    const guest = await lookupGuest(val);
    setBusy(false);
    if (guest) {
      try { localStorage.setItem(TOKEN_KEY, JSON.stringify(guest)); } catch(e){}
      onUnlock(guest);
    } else {
      setErr(true); setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div className="gate-page">
      {/* Subtle paper grain overlay — fixed, behind everything but the card */}
      <div aria-hidden="true" className="gate-grain" />

      <div className={`gate-card ${shake ? 'gate-shake' : ''}`}>
        {/* Inner hairline border — gives the card a printed-stationery feel */}
        <div aria-hidden="true" className="gate-card-inner" />

        <div className="gate-stack">
          <p className="gate-eyebrow">You are cordially invited</p>

          {/* Names lockup — Amoresa script + Cinzel caps, sized to the card */}
          <div className="gate-names">
            <Names />
          </div>

          {/* Flourish divider — hairlines flanking a small botanical motif */}
          <div className="gate-flourish" aria-hidden="true">
            <span className="gate-flourish-line" />
            <svg width="44" height="14" viewBox="0 0 44 14" fill="none" strokeWidth="0.7">
              <defs>
                <linearGradient id="gateFlourishGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--burgundy)" />
                  <stop offset="100%" stopColor="var(--magenta)" />
                </linearGradient>
              </defs>
              <path d="M 22 7 Q 15 1 8 7 Q 15 13 22 7 Q 29 1 36 7 Q 29 13 22 7" strokeLinecap="round" stroke="url(#gateFlourishGrad)" />
              <circle cx="22" cy="7" r="1.3" fill="url(#gateFlourishGrad)" />
            </svg>
            <span className="gate-flourish-line" />
          </div>

          {/* Date written out, then venue in tracked caps */}
          <p className="gate-date accent-gradient">2nd July 2027</p>
          <p className="gate-venue">St Audries Park &middot; Somerset</p>

          <form onSubmit={submit} className="gate-form">
            <div className="gate-field">
              <label htmlFor="gate-code" className="gate-label">Invitation code</label>
              <input
                id="gate-code"
                ref={inputRef}
                type="text"
                value={val}
                onChange={(e) => { setVal(e.target.value); setErr(false); }}
                placeholder="e.g. elliott2027"
                autoComplete="off"
                spellCheck="false"
                aria-describedby="gate-error"
                className={`gate-input ${err ? 'is-error' : ''}`}
              />
            </div>

            <div id="gate-error" role="status" aria-live="polite" className={`gate-error ${err ? 'is-shown' : ''}`}>
              {err ? 'That code doesn’t look quite right. Please try again.' : ' '}
            </div>

            <button type="submit" className="gate-btn" disabled={busy}>{busy ? 'Verifying…' : 'Enter'}</button>
          </form>

          <p className="gate-help">
            Lost your invitation? Reach out to Katie or Ryan.
          </p>
        </div>
      </div>

      <style>{`
        .gate-page{
          min-height:100vh;
          background:var(--cream);
          background-image:
            radial-gradient(ellipse at top left, rgba(74,26,44,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(26,20,22,0.05) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(74,26,44,0.03) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(26,20,22,0.03) 0%, transparent 40%);
          background-attachment:fixed;
          color:var(--ink);
          display:grid; place-items:center;
          padding:48px 24px;
          position:relative;
        }
        .gate-grain{
          position:fixed; inset:0; pointer-events:none;
          opacity:0.28; z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.13 0 0 0 0 0.14 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .gate-card{
          position:relative; z-index:2;
          width:100%; max-width:460px;
          background:linear-gradient(180deg, var(--paper) 0%, var(--cream-deep) 100%);
          border:1px solid var(--rule);
          padding:56px 48px 44px;
          text-align:center;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.5) inset,
            0 30px 60px -20px rgba(26,20,22,0.18),
            0 10px 30px -10px rgba(26,20,22,0.12);
          animation: gate-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .gate-card-inner{
          position:absolute; inset:12px;
          border:1px solid var(--rule);
          pointer-events:none; opacity:0.55;
        }
        .gate-shake{ animation: gate-shake 0.45s !important; }

        .gate-stack > *{
          opacity:0;
          animation: gate-fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .gate-stack > *:nth-child(1){ animation-delay:0.25s; }
        .gate-stack > *:nth-child(2){ animation-delay:0.40s; }
        .gate-stack > *:nth-child(3){ animation-delay:0.55s; }
        .gate-stack > *:nth-child(4){ animation-delay:0.65s; }
        .gate-stack > *:nth-child(5){ animation-delay:0.75s; }
        .gate-stack > *:nth-child(6){ animation-delay:0.90s; }
        .gate-stack > *:nth-child(7){ animation-delay:1.05s; }

        .gate-eyebrow{
          margin:0 0 44px;
          font-family:'Cinzel', Georgia, serif;
          font-size:11px; font-weight:400;
          letter-spacing:0.42em; text-transform:uppercase;
          color:var(--burgundy);
          text-indent:0.42em;
        }

        .gate-names{
          font-size:clamp(22px, 2.4vw, 26px);
          line-height:1; color:var(--ink);
        }

        .gate-flourish{
          display:flex; align-items:center; justify-content:center;
          gap:12px; margin:28px 0 22px;
          color:var(--burgundy); opacity:0.75;
        }
        .gate-flourish-line{
          height:1px; width:60px;
          background:linear-gradient(90deg, transparent, var(--rule), transparent);
        }

        .gate-date{
          margin:0 0 8px;
          font-family:'Cormorant Garamond', Georgia, serif;
          font-size:clamp(14px, 1.5vw, 16px);
          font-style:italic; font-weight:400;
          color:var(--ink-soft);
          letterSpacing:0.02em;
        }
        .gate-venue{
          margin:0;
          font-family:'Cinzel', Georgia, serif;
          font-size:10px; font-weight:400;
          letter-spacing:0.34em; text-transform:uppercase;
          color:var(--burgundy);
          text-indent:0.34em;
        }

        .gate-form{ margin-top:36px; }
        .gate-field{ display:block; }
        .gate-label{
          display:block; margin-bottom:10px;
          font-family:'Cinzel', Georgia, serif;
          font-size:10px; font-weight:400;
          letter-spacing:0.34em; text-transform:uppercase;
          color:var(--burgundy);
          text-indent:0.34em;
        }
        .gate-input{
          width:100%;
          background:transparent; border:none;
          border-bottom:1px solid var(--rule);
          color:var(--ink);
          font-family:'Cormorant Garamond', Georgia, serif;
          font-size:20px; font-weight:400; font-style:italic;
          text-align:center; letter-spacing:0.06em;
          padding:10px 0; outline:none;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .gate-input:focus{
          border-bottom-color:var(--burgundy);
          background:rgba(255,255,255,0.3);
        }
        .gate-input.is-error{ border-bottom-color:var(--burgundy); }
        .gate-input::placeholder{ color:var(--rule); font-style:italic; }

        .gate-error{
          min-height:18px; margin-top:12px;
          font-family:'Cormorant Garamond', Georgia, serif;
          font-size:13px; font-style:italic;
          color:var(--burgundy);
          opacity:0; transition:opacity 0.2s;
        }
        .gate-error.is-shown{ opacity:1; }

        .gate-btn{
          margin-top:20px;
          width:100%;
          padding:16px 24px;
          background:var(--ink); color:var(--cream);
          background-image: linear-gradient(135deg, var(--ink), var(--ink));
          border:none; cursor:pointer;
          font-family:'Cinzel', Georgia, serif;
          font-size:11px; font-weight:500;
          letter-spacing:0.4em; text-transform:uppercase;
          text-indent:0.4em;
          transition: background-image 0.4s ease, letter-spacing 0.3s ease;
        }
        .gate-btn:hover{
          background-image: var(--accent-gradient);
          letter-spacing:0.5em;
          text-indent:0.5em;
        }
        .gate-btn:active{ transform:translateY(1px); }

        .gate-help{
          margin:28px 0 0;
          font-family:'Cormorant Garamond', Georgia, serif;
          font-size:14px; font-style:italic;
          color:var(--ink-mute);
        }
        .gate-help a{
          color:var(--burgundy); text-decoration:none;
          border-bottom:1px solid var(--rule);
          padding-bottom:1px;
          transition: border-color 0.3s ease;
        }
        .gate-help a:hover{ border-color:var(--burgundy); }

        @keyframes gate-rise {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes gate-fade-in {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes gate-shake {
          0%,100%{ transform:translateX(0); }
          20%,60%{ transform:translateX(-4px); }
          40%,80%{ transform:translateX(4px); }
        }

        @media (max-width: 480px){
          .gate-card{ padding:44px 28px 36px; }
          .gate-eyebrow{ letter-spacing:0.32em; text-indent:0.32em; }
          .gate-flourish-line{ width:40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gate-card, .gate-stack > *{ animation:none !important; opacity:1 !important; }
        }
      `}</style>
    </div>
  );
};

Object.assign(window, { Gate, GUEST_CODES, lookupGuest, TOKEN_KEY });
