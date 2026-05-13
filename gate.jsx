// Gate — a small announcement card on cream paper. Demo password: "calla".

const PASSWORD = 'calla';
const TOKEN_KEY = 'rk_gate_token_v3';

const Gate = ({ onUnlock }) => {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [shaking, setShaking] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 500);
  }, []);

  const submit = (e) => {
    if (e) e.preventDefault();
    if (val.trim().toLowerCase() === PASSWORD) {
      try { localStorage.setItem(TOKEN_KEY, '1'); } catch(e){}
      onUnlock();
    } else {
      setErr(true); setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'var(--cream)',
      display:'grid', placeItems:'center', padding:'48px 24px',
      position:'relative',
    }}>
      {/* Page corner marks */}
      <CornerMark style={{ top:24, left:24 }} />
      <CornerMark style={{ top:24, right:24, transform:'rotate(90deg)' }} />
      <CornerMark style={{ bottom:24, right:24, transform:'rotate(180deg)' }} />
      <CornerMark style={{ bottom:24, left:24, transform:'rotate(270deg)' }} />

      <div style={{
        position:'absolute', top:34, left:'50%', transform:'translateX(-50%)',
        color:'var(--ink-soft)', opacity:0.55,
      }}>
        <span className="mono-eyebrow" style={{ fontSize:10 }}>02 · 07 · 2027</span>
      </div>

      <div style={{
        maxWidth:520, width:'100%', textAlign:'center',
        padding:'72px 60px',
        border:'1px solid var(--ink)',
        outline:'1px solid var(--ink)',
        outlineOffset:'6px',
        animation:'cardIn 0.9s ease-out',
        background:'var(--cream)',
      }} className="gate-card">

        <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:36 }}>
          Private
        </div>

        <h1 className="serif" style={{
          margin:0, fontSize:'clamp(40px, 6vw, 60px)', fontWeight:300, lineHeight:1.05,
          color:'var(--ink)', letterSpacing:'0.01em',
        }}>
          The wedding of<br/>
          Ryan <em style={{ color:'var(--burgundy)', fontStyle:'italic', fontWeight:400 }}>&amp;</em> Katie
        </h1>

        <RuleOrnament style={{ margin:'32px auto' }} />

        <p className="serif" style={{
          margin:0, fontSize:17, lineHeight:1.7, fontStyle:'italic', fontWeight:300,
          color:'var(--ink-soft)',
        }}>
          The word printed on your invitation<br/>will open the doors.
        </p>

        <form onSubmit={submit} style={{
          marginTop:40, animation: shaking ? 'shake 0.45s' : 'none',
        }}>
          <input
            ref={inputRef}
            type="password"
            value={val}
            onChange={(e) => { setVal(e.target.value); setErr(false); }}
            placeholder="·   ·   ·   ·   ·"
            autoComplete="off"
            spellCheck="false"
            aria-label="Password"
            style={{
              width:'100%',
              background:'transparent', border:'none',
              borderBottom:`1px solid ${err ? 'var(--magenta)' : 'var(--ink)'}`,
              color:'var(--ink)', fontFamily:"'Cormorant Garamond', serif",
              fontSize:24, fontStyle:'italic', fontWeight:300, textAlign:'center',
              padding:'12px 0', outline:'none',
              letterSpacing:'0.18em',
              transition:'border-color 0.2s',
            }}
          />
          <button type="submit" style={{
            marginTop:24, width:'100%',
            background:'var(--ink)', color:'var(--cream)', border:'none',
            padding:'14px 0',
            fontFamily:'Inter, sans-serif', fontSize:10, fontWeight:500,
            letterSpacing:'0.36em', textTransform:'uppercase', cursor:'pointer',
            transition:'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--burgundy)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ink)'}
          >Open</button>
          <div style={{
            minHeight:18, marginTop:14,
            fontSize:13, fontStyle:'italic',
            fontFamily:"'Cormorant Garamond', serif",
            color: err ? 'var(--magenta)' : 'var(--ink-soft)', opacity: err ? 1 : 0.5,
          }}>
            {err ? 'That isn\u2019t it — try again.' : '\u00A0'}
          </div>
        </form>
      </div>

      <div style={{
        position:'absolute', bottom:34, left:'50%', transform:'translateX(-50%)',
        color:'var(--ink-soft)', opacity:0.55,
      }}>
        <span className="mono-eyebrow" style={{ fontSize:10 }}>St Audries Park · Somerset</span>
      </div>

      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(8px) scale(0.985); } to { opacity:1; transform:none; } }
        @keyframes shake {
          0%,100%{ transform:translateX(0); }
          20%,60%{ transform:translateX(-5px); }
          40%,80%{ transform:translateX(5px); }
        }
        @media (max-width: 540px){
          .gate-card{ padding:48px 28px !important; }
        }
      `}</style>
    </div>
  );
};

// Tiny corner crop-mark like printed proofs use
const CornerMark = ({ style }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position:'absolute', color:'var(--ink-soft)', opacity:0.35, ...style }}>
    <line x1="0" y1="0.5" x2="14" y2="0.5" stroke="currentColor"/>
    <line x1="0.5" y1="0" x2="0.5" y2="14" stroke="currentColor"/>
  </svg>
);

const RuleOrnament = ({ style }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, ...style }}>
    <span style={{ width:80, height:1, background:'var(--ink)', opacity:0.5 }}/>
    <span className="serif" style={{ fontSize:18, color:'var(--burgundy)', fontStyle:'italic' }}>·</span>
    <span style={{ width:80, height:1, background:'var(--ink)', opacity:0.5 }}/>
  </div>
);

Object.assign(window, { Gate, PASSWORD, TOKEN_KEY, CornerMark, RuleOrnament });
