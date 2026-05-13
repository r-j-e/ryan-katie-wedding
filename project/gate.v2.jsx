// Gate — feels like opening an envelope. Cream, calm, a single moment of darkness in the
// type. Demo password: "calla". localStorage token persists across visits.

const PASSWORD = 'calla';
const TOKEN_KEY = 'rk_gate_token_v2';

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
      minHeight:'100vh', background:'var(--cream)', color:'var(--ink)',
      display:'grid', placeItems:'center', padding:'40px 24px', position:'relative', overflow:'hidden',
    }}>
      {/* Roman 0 — huge, almost invisible, set behind */}
      <div className="serif" style={{
        position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)',
        fontSize:'min(120vh, 80vw)', lineHeight:0.85, color:'rgba(74,26,44,0.04)',
        fontStyle:'italic', fontWeight:300, pointerEvents:'none', userSelect:'none',
        zIndex:0, letterSpacing:'-0.02em',
      }}>R&amp;K</div>

      <div style={{
        position:'relative', zIndex:1, maxWidth:520, width:'100%',
        animation:'fadeUp 1s ease-out',
      }}>
        {/* Top marginalia row */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
          paddingBottom:80, borderBottom:'1px solid var(--rule)',
        }}>
          <span className="mono-eyebrow" style={{ color:'var(--burgundy)' }}>By Invitation Only</span>
          <span className="serif" style={{ fontSize:13, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.6 }}>
            no. 002
          </span>
        </div>

        <div style={{ padding:'60px 0 40px', textAlign:'center' }}>
          <div className="serif" style={{
            fontSize:18, fontStyle:'italic', color:'var(--ink-soft)', fontWeight:300, marginBottom:24,
          }}>
            The wedding of
          </div>

          <h1 className="serif" style={{
            margin:0, fontWeight:300,
            fontSize:'clamp(56px, 9vw, 92px)',
            lineHeight:0.95, color:'var(--ink)', letterSpacing:'-0.02em',
          }}>
            Ryan<br/>
            <em style={{ fontWeight:400, color:'var(--burgundy)', display:'inline-block', paddingLeft:'1.5em' }}>&amp; Katie</em>
          </h1>

          <p className="serif" style={{
            fontSize:17, fontStyle:'italic', color:'var(--ink-soft)', fontWeight:300,
            marginTop:36, marginBottom:0, lineHeight:1.6,
          }}>
            A password from your invitation will open<br/>the doors. The doors of the website.
          </p>
        </div>

        {/* Input row */}
        <form onSubmit={submit} style={{
          borderTop:'1px solid var(--rule)', paddingTop:36,
          animation: shaking ? 'shake 0.45s' : 'none',
        }}>
          <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', textAlign:'center', marginBottom:14 }}>
            Password
          </div>
          <div style={{
            display:'flex', alignItems:'stretch',
            border:`1px solid ${err ? 'var(--magenta)' : 'var(--rule)'}`,
            background:'rgba(255,255,255,0.45)',
            transition:'border-color 0.3s',
          }}>
            <input
              ref={inputRef}
              type="password"
              value={val}
              onChange={(e) => { setVal(e.target.value); setErr(false); }}
              placeholder="·   ·   ·   ·   ·"
              autoComplete="off"
              spellCheck="false"
              style={{
                flex:1, background:'transparent', border:'none',
                color:'var(--ink)', fontFamily:"'Cormorant Garamond', serif",
                fontSize:22, fontStyle:'italic', textAlign:'center',
                padding:'18px 20px', outline:'none', letterSpacing:'0.2em',
              }}
            />
            <button type="submit" style={{
              background:'var(--ink)', color:'var(--cream)', border:'none',
              padding:'0 32px', cursor:'pointer',
              fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500,
              letterSpacing:'0.32em', textTransform:'uppercase',
              transition:'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background='var(--burgundy)'}
            onMouseLeave={(e) => e.currentTarget.style.background='var(--ink)'}
            >Enter</button>
          </div>

          <div style={{
            marginTop:14, minHeight:18, fontSize:13, fontStyle:'italic',
            fontFamily:"'Cormorant Garamond', serif",
            color: err ? 'var(--magenta)' : 'var(--ink-soft)',
            textAlign:'center', opacity: err ? 1 : 0.55,
          }}>
            {err ? 'That doesn\u2019t match — please check your invitation.' : 'Printed on the front of the invitation card.'}
          </div>
        </form>

        {/* Footer marginalia */}
        <div style={{
          marginTop:48, paddingTop:24, borderTop:'1px solid var(--rule)',
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
        }}>
          <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>02 . 07 . 2027</span>
          <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>St Audries Park</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes shake {
          0%,100%{ transform:translateX(0); }
          20%,60%{ transform:translateX(-5px); }
          40%,80%{ transform:translateX(5px); }
        }
      `}</style>
    </div>
  );
};

Object.assign(window, { Gate, PASSWORD, TOKEN_KEY });
