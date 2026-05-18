// Per-guest login. Each invitation card carries a unique code (e.g. 'smith2027').
// The code maps to a household — we use that to personalise the welcome and to
// pre-fill the RSVP form. Token persists in localStorage so guests don't have to
// re-enter on return visits.
//
// In production these should live on the server (and ideally each code should
// be one-shot or rate-limited) — but for a wedding website, a static map is fine.
// The point is keeping the URL out of search engines and casual visitors, not
// defending against motivated attackers.

const TOKEN_KEY = 'rk_guest_v1';

const GUEST_CODES = {
  // — Family —
  'smith2027':     { household: 'The Smith Family',    party: 4 },
  'jones2027':     { household: 'The Jones Family',    party: 2 },
  'williams2027':  { household: 'The Williams',        party: 2 },
  'brown2027':     { household: 'The Browns',          party: 3 },
  'taylor2027':    { household: 'The Taylor Family',   party: 4 },
  'davies2027':    { household: 'The Davies',          party: 2 },
  'wilson2027':    { household: 'The Wilson Family',   party: 3 },
  'evans2027':     { household: 'The Evans',           party: 2 },
  'thomas2027':    { household: 'The Thomas Family',   party: 4 },
  'roberts2027':   { household: 'The Roberts',         party: 2 },
  // — Friends —
  'johnson2027':   { household: 'The Johnsons',        party: 3 },
  'walker2027':    { household: 'The Walker Family',   party: 4 },
  'white2027':     { household: 'The Whites',          party: 2 },
  'green2027':     { household: 'The Green Family',    party: 2 },
  'hall2027':      { household: 'The Halls',           party: 3 },
  'wood2027':      { household: 'The Wood Family',     party: 4 },
  'harris2027':    { household: 'The Harris',          party: 2 },
  'clarke2027':    { household: 'The Clarkes',         party: 2 },
  'lewis2027':     { household: 'The Lewis Family',    party: 3 },
  'young2027':     { household: 'The Youngs',          party: 2 },
  'king2027':      { household: 'The King Family',     party: 4 },
  'wright2027':    { household: 'The Wrights',         party: 2 },
  'scott2027':     { household: 'The Scott Family',    party: 3 },
  'cooper2027':    { household: 'The Coopers',         party: 2 },
  'ward2027':      { household: 'The Ward Family',     party: 4 },
  'hughes2027':    { household: 'The Hughes',          party: 2 },
  'morris2027':    { household: 'The Morris Family',   party: 3 },
  'cook2027':      { household: 'The Cooks',           party: 2 },
  'morgan2027':    { household: 'The Morgan Family',   party: 4 },
  'bell2027':      { household: 'The Bells',           party: 2 },
  // — Demo / preview codes for testing —
  'katie2027':     { household: 'Preview',             party: 2 },
  'ryan2027':      { household: 'Preview',             party: 2 },
};

const lookupGuest = (raw) => {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  const found = GUEST_CODES[key];
  return found ? { code: key, ...found } : null;
};

const Gate = ({ onUnlock }) => {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 500);
  }, []);

  const submit = (e) => {
    if (e) e.preventDefault();
    const guest = lookupGuest(val);
    if (guest) {
      try { localStorage.setItem(TOKEN_KEY, JSON.stringify(guest)); } catch(e){}
      onUnlock(guest);
    } else {
      setErr(true); setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div style={{
      minHeight:'100vh', background:'var(--cream)', color:'var(--ink)',
      display:'grid', placeItems:'center', padding:'48px 24px',
      position:'relative',
    }}>
      <div style={{
        width:'100%', maxWidth:560, textAlign:'center',
        animation:'fadeUp 0.9s ease-out',
        overflow:'hidden',
      }}>
        <div style={{
          fontFamily:'Cinzel, Georgia, serif',
          fontSize:11, fontWeight:400,
          letterSpacing:'0.36em', textTransform:'uppercase',
          color:'var(--ink-mute)', textIndent:'0.36em',
        }}>By invitation only</div>

        <h1 style={{
          margin:'80px 0 0',
          fontSize:'clamp(18px, 2.8vw, 30px)',
          fontWeight:400, lineHeight:1.8, letterSpacing:'-0.005em',
          color:'var(--ink)',
          padding:'0 16px',
        }}>
          <Names />
        </h1>

        <p style={{
          margin:'32px auto 0', maxWidth:380,
          fontFamily:'Cinzel, Georgia, serif',
          fontSize:'clamp(14px, 1.6vw, 16px)', fontStyle:'italic', fontWeight:300,
          color:'var(--ink-mute)', lineHeight:1.7,
        }}>
          The code printed on your invitation will open the doors.
        </p>

        <form onSubmit={submit} style={{
          marginTop:56, animation: shake ? 'shake 0.45s' : 'none',
        }}>
          <label htmlFor="gate-code" style={{
            display:'block', marginBottom:14,
            fontFamily:'Cinzel, Georgia, serif',
            fontSize:10, fontWeight:400,
            letterSpacing:'0.34em', textTransform:'uppercase',
            color:'var(--ink-mute)', textIndent:'0.34em',
          }}>Your code</label>
          <input
            id="gate-code"
            ref={inputRef}
            type="text"
            value={val}
            onChange={(e) => { setVal(e.target.value); setErr(false); }}
            placeholder="—"
            autoComplete="off"
            spellCheck="false"
            aria-label="Your invitation code"
            style={{
              width:'100%',
              background:'transparent', border:'none',
              borderBottom:`1px solid ${err ? 'var(--burgundy)' : 'var(--ink-mute)'}`,
              color:'var(--ink)',
              fontFamily:"'Cinzel', Georgia, serif",
              fontSize:22, fontWeight:400,
              textAlign:'center',
              padding:'12px 0', outline:'none', letterSpacing:'0.16em', textTransform:'lowercase',
              transition:'border-color 0.2s',
            }}
          />
          <button type="submit" style={{
            marginTop:32,
            background:'var(--ink)', color:'var(--cream)', border:'none',
            padding:'14px 40px',
            fontFamily:'Cinzel, Georgia, serif', fontSize:11, fontWeight:500,
            letterSpacing:'0.36em', textTransform:'uppercase', textIndent:'0.36em',
            cursor:'pointer', transition:'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--burgundy)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ink)'}
          >Enter</button>

          <div style={{
            minHeight:20, marginTop:16,
            fontFamily:"'Cinzel', Georgia, serif",
            fontSize:13, fontStyle:'italic',
            color: err ? 'var(--burgundy)' : 'var(--ink-mute)',
            opacity: err ? 1 : 0.55,
          }}>
            {err ? 'We couldn\u2019t find that code — please check your invitation.' : '\u00A0'}
          </div>
        </form>

        <div style={{
          marginTop:48,
          fontFamily:'Cinzel, Georgia, serif',
          fontSize:10, fontWeight:400,
          letterSpacing:'0.36em', textTransform:'uppercase',
          color:'var(--ink-mute)', opacity:0.55, textIndent:'0.36em',
        }}>02 . 07 . 2027 &nbsp;·&nbsp; Somerset</div>

        {/* Preview hint — drop this in production */}
        <div style={{
          marginTop:60, paddingTop:24,
          borderTop:'1px solid var(--rule-soft)',
          fontFamily:'Cinzel, Georgia, serif',
          fontSize:12, fontStyle:'italic', fontWeight:300,
          color:'var(--ink-mute)', opacity:0.7,
        }}>
          Preview · try <code style={{
            fontFamily:'Cinzel, Georgia, serif',
            fontStyle:'normal',
            background:'var(--cream-deep)',
            padding:'2px 8px',
            border:'1px solid var(--rule-soft)',
            margin:'0 2px',
          }}>katie2027</code> or <code style={{
            fontFamily:'Cinzel, Georgia, serif',
            fontStyle:'normal',
            background:'var(--cream-deep)',
            padding:'2px 8px',
            border:'1px solid var(--rule-soft)',
            margin:'0 2px',
          }}>smith2027</code>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes shake {
          0%,100%{ transform:translateX(0); }
          20%,60%{ transform:translateX(-4px); }
          40%,80%{ transform:translateX(4px); }
        }
      `}</style>
    </div>
  );
};

Object.assign(window, { Gate, GUEST_CODES, lookupGuest, TOKEN_KEY });
