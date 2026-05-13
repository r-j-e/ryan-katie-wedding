// Password gate — first impression. Editorial, not a generic login.
// Demo password: "calla" (case-insensitive). On real deploy, change PASSWORD or
// switch to hashed comparison. localStorage token persists across visits.

const PASSWORD = 'calla';
const TOKEN_KEY = 'rk_gate_token_v1';

const Gate = ({ onUnlock }) => {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [shaking, setShaking] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 400);
  }, []);

  const submit = (e) => {
    if (e) e.preventDefault();
    if (val.trim().toLowerCase() === PASSWORD) {
      try { localStorage.setItem(TOKEN_KEY, '1'); } catch(e){}
      onUnlock();
    } else {
      setErr(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'var(--ink)',
      color:'var(--cream)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'40px 24px',
      position:'relative',
      overflow:'hidden',
    }}>
      {/* candlelit vignette */}
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(168,50,107,0.18) 0%, rgba(74,26,44,0.10) 35%, rgba(26,20,22,0) 70%)',
        pointerEvents:'none',
      }}/>
      {/* film grain */}
      <div style={{
        position:'absolute', inset:0, opacity:0.25, mixBlendMode:'overlay', pointerEvents:'none',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      }}/>

      <div style={{
        position:'relative', zIndex:1,
        maxWidth:480, width:'100%',
        textAlign:'center',
        animation: 'gateIn 1.2s ease-out',
      }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:32 }}>
          <Monogram size={64} dark />
        </div>

        <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginBottom:18 }}>
          By invitation
        </div>

        <h1 className="serif" style={{
          margin:0,
          fontWeight:300,
          fontSize:'clamp(38px, 6vw, 56px)',
          lineHeight:1.1,
          letterSpacing:'-0.01em',
        }}>
          The wedding of<br/>
          <em style={{ fontWeight:400 }}>Ryan &amp; Katie</em>
        </h1>

        <div style={{ margin:'28px auto 36px', maxWidth:340 }}>
          <SectionRule dark />
        </div>

        <p className="serif" style={{
          fontStyle:'italic', fontSize:18, lineHeight:1.6,
          color:'rgba(244,237,228,0.78)', maxWidth:380, margin:'0 auto 36px',
          fontWeight:300,
        }}>
          Please enter the password printed on your invitation to view the details of our day.
        </p>

        <form onSubmit={submit} style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:18,
          animation: shaking ? 'shake 0.5s' : 'none',
        }}>
          <div style={{ position:'relative', width:'100%', maxWidth:320 }}>
            <input
              ref={inputRef}
              type="password"
              value={val}
              onChange={(e) => { setVal(e.target.value); setErr(false); }}
              placeholder="·  ·  ·  ·  ·"
              autoComplete="off"
              spellCheck="false"
              style={{
                width:'100%',
                background:'transparent',
                border:'none',
                borderBottom:`1px solid ${err ? '#A8326B' : 'rgba(244,237,228,0.35)'}`,
                color:'var(--cream)',
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:24, fontStyle:'italic',
                textAlign:'center',
                padding:'12px 0',
                outline:'none',
                letterSpacing:'0.2em',
                transition:'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderBottomColor = '#D4A5A5'}
              onBlur={(e) => e.target.style.borderBottomColor = err ? '#A8326B' : 'rgba(244,237,228,0.35)'}
            />
          </div>

          <button type="submit" style={{
            background:'transparent',
            border:'1px solid rgba(244,237,228,0.4)',
            color:'var(--cream)',
            padding:'14px 44px',
            fontFamily:'Inter, sans-serif',
            fontSize:11, fontWeight:500,
            letterSpacing:'0.32em', textTransform:'uppercase',
            cursor:'pointer',
            transition:'all 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor='var(--cream)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor='rgba(244,237,228,0.4)'; }}
          >
            Enter
          </button>

          <div style={{
            minHeight:18, fontSize:12,
            color: err ? '#D4A5A5' : 'rgba(244,237,228,0.35)',
            fontStyle:'italic', fontFamily:"'Cormorant Garamond', serif",
            transition:'color 0.3s', marginTop:4,
          }}>
            {err ? 'That doesn\u2019t match — please check your invitation.' : <span style={{ opacity:0 }}>—</span>}
          </div>
        </form>

        <div style={{ marginTop:60, fontSize:11, color:'rgba(244,237,228,0.35)', fontStyle:'italic', fontFamily:"'Cormorant Garamond', serif" }}>
          2 July 2027 &nbsp;·&nbsp; St Audries Park
        </div>
      </div>

      <style>{`
        @keyframes gateIn {
          from { opacity:0; transform: translateY(12px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100%{ transform: translateX(0); }
          20%,60%{ transform: translateX(-6px); }
          40%,80%{ transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

Object.assign(window, { Gate, PASSWORD, TOKEN_KEY });
