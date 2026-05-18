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
      <div className="gate-card" style={{
        width:'100%', maxWidth:440,
        background:'var(--paper)',
        border:'1px solid var(--rule)',
        padding:'56px 48px',
        textAlign:'center',
        animation: shake ? 'shake 0.45s' : 'fadeUp 0.9s ease-out',
        boxShadow:'0 1px 0 rgba(26,20,22,0.02), 0 30px 60px -30px rgba(26,20,22,0.18)',
      }}>
        {/* Date — stamped at the top, burgundy serif numerals */}
        <div style={{
          fontFamily:"'Cormorant Garamond', Georgia, serif",
          fontSize:'clamp(20px, 2.4vw, 26px)',
          fontWeight:400, fontStyle:'italic',
          color:'var(--burgundy)',
          letterSpacing:'0.08em',
          fontVariantNumeric:'tabular-nums',
        }}>02 &middot; VII &middot; 2027</div>

        {/* Hairline rule */}
        <div aria-hidden="true" style={{
          width:40, height:1, background:'var(--rule)',
          margin:'28px auto',
        }} />

        {/* Single line of body copy */}
        <p style={{
          margin:0,
          fontFamily:"'Cormorant Garamond', Georgia, serif",
          fontSize:'clamp(15px, 1.5vw, 17px)', fontStyle:'italic', fontWeight:300,
          color:'var(--ink-soft)', lineHeight:1.55,
        }}>
          The doors open with the code<br/>on your invitation.
        </p>

        <form onSubmit={submit} style={{ marginTop:40 }}>
          <label htmlFor="gate-code" className="visually-hidden">
            Your invitation code
          </label>
          <input
            id="gate-code"
            ref={inputRef}
            type="text"
            value={val}
            onChange={(e) => { setVal(e.target.value); setErr(false); }}
            placeholder="your code"
            autoComplete="off"
            spellCheck="false"
            aria-label="Your invitation code"
            style={{
              width:'100%',
              background:'transparent', border:'none',
              borderBottom:`1px solid ${err ? 'var(--burgundy)' : 'var(--rule)'}`,
              color:'var(--ink)',
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:20, fontWeight:400, fontStyle:'italic',
              textAlign:'center',
              padding:'10px 0', outline:'none', letterSpacing:'0.06em', textTransform:'lowercase',
              transition:'border-color 0.2s',
            }}
          />

          <button type="submit" className="gate-enter" style={{
            marginTop:28,
            background:'none', border:'none', cursor:'pointer', padding:'4px 0',
            fontFamily:"'Cinzel', Georgia, serif",
            fontSize:11, fontWeight:400,
            letterSpacing:'0.32em', textTransform:'uppercase', textIndent:'0.32em',
            color:'var(--burgundy)',
            display:'inline-flex', alignItems:'center', gap:8,
            transition:'gap 0.2s',
          }}>
            <span>Enter</span>
            <span aria-hidden="true" style={{ letterSpacing:0, textIndent:0 }}>&rarr;</span>
          </button>

          <div role="status" aria-live="polite" style={{
            minHeight:18, marginTop:18,
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize:13, fontStyle:'italic',
            color:'var(--burgundy)',
            opacity: err ? 1 : 0,
            transition:'opacity 0.2s',
          }}>
            {err ? 'We couldn’t find that code.' : ' '}
          </div>
        </form>
      </div>

      {/* Preview hint — outside the card, very faint */}
      <div style={{
        position:'absolute', bottom:24, left:0, right:0, textAlign:'center',
        fontFamily:"'Cormorant Garamond', Georgia, serif",
        fontSize:12, fontStyle:'italic', fontWeight:300,
        color:'var(--ink-mute)', opacity:0.6,
      }}>
        Preview &middot; try <em>katie2027</em> or <em>smith2027</em>
      </div>

      <style>{`
        .visually-hidden{
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
        .gate-enter:hover{ gap:14px !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes shake {
          0%,100%{ transform:translateX(0); }
          20%,60%{ transform:translateX(-4px); }
          40%,80%{ transform:translateX(4px); }
        }
        @media (max-width: 480px){
          .gate-card{ padding:44px 28px !important; }
        }
      `}</style>
    </div>
  );
};

Object.assign(window, { Gate, GUEST_CODES, lookupGuest, TOKEN_KEY });
