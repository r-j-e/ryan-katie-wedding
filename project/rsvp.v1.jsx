// RSVP — multi-step form with state, meal picks, song requests, message.
// Wired for Netlify Forms by default (hidden form-name field). Easy to swap for Formspree.

const MEAL_OPTIONS = {
  starter: [
    { id:'s1', name:'Beetroot &amp; goat cheese', note:'with candied walnut, on toasted rye' },
    { id:'s2', name:'Smoked trout', note:'cucumber, dill, créme fraîche' },
  ],
  main: [
    { id:'m1', name:'Slow-cooked beef cheek', note:'roasted root vegetables, red wine jus' },
    { id:'m2', name:'Wild mushroom &amp; truffle risotto', note:'with shaved parmesan (v)' },
  ],
  pudding: [
    { id:'p1', name:'Dark chocolate délice', note:'with raspberry sorbet' },
    { id:'p2', name:'Lemon posset', note:'with shortbread &amp; macerated berries' },
  ],
};

const blankGuest = () => ({ name:'', attending:'yes', starter:'', main:'', pudding:'', dietary:'' });

const RSVP = () => {
  const [step, setStep] = React.useState(0);
  const [guests, setGuests] = React.useState([ blankGuest() ]);
  const [songs, setSongs] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const update = (i, key, val) => {
    setGuests(g => g.map((x, idx) => idx === i ? { ...x, [key]:val } : x));
  };
  const addGuest = () => setGuests(g => [...g, blankGuest()]);
  const removeGuest = (i) => setGuests(g => g.filter((_, idx) => idx !== i));

  const anyAttending = guests.some(g => g.attending === 'yes');

  const submit = async (e) => {
    if (e) e.preventDefault();
    // Build payload — easily POST-able to Netlify / Formspree
    const payload = {
      'form-name': 'rsvp',
      email,
      songs,
      message,
      guests: JSON.stringify(guests),
    };
    // In a real deploy:
    //   fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(payload).toString() })
    // For now, store locally as proof-of-flow
    try {
      const existing = JSON.parse(localStorage.getItem('rk_rsvps') || '[]');
      existing.push({ ts:new Date().toISOString(), ...payload });
      localStorage.setItem('rk_rsvps', JSON.stringify(existing));
    } catch(e){}
    setSubmitted(true);
    setTimeout(() => window.scrollTo({ top: document.getElementById('rsvp').offsetTop - 60, behavior:'smooth' }), 50);
  };

  if (submitted) return <RSVPThanks onReset={() => { setSubmitted(false); setStep(0); setGuests([blankGuest()]); setEmail(''); setSongs(''); setMessage(''); }} attending={anyAttending} />;

  const steps = ['You', anyAttending ? 'Meals' : 'Note', 'Confirm'];

  return (
    <section id="rsvp" style={{
      padding:'120px 24px',
      background:'var(--cream)',
      borderTop:'1px solid var(--rule)',
    }}>
      <div style={{ maxWidth:780, margin:'0 auto' }}>
        <SectionHeader eyebrow="Seven — Please reply by 1 April 2027" title="RSVP" />

        <p className="serif" style={{ textAlign:'center', fontStyle:'italic', fontSize:19, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, margin:'0 auto 56px', fontWeight:300 }}>
          We hope very much that you can come. A line either way would mean a great deal.
        </p>

        {/* Stepper */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:48,
        }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <button onClick={() => i < step && setStep(i)} disabled={i > step} style={{
                background:'none', border:'none', cursor: i < step ? 'pointer' : 'default',
                padding:0, color: i === step ? 'var(--burgundy)' : 'var(--ink-soft)',
                opacity: i > step ? 0.4 : 1,
                display:'flex', alignItems:'center', gap:10,
              }}>
                <span style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  width:26, height:26, borderRadius:'50%',
                  border:`1px solid ${i <= step ? 'var(--burgundy)' : 'var(--rule)'}`,
                  background: i === step ? 'var(--burgundy)' : 'transparent',
                  color: i === step ? 'var(--cream)' : (i < step ? 'var(--burgundy)' : 'var(--ink-soft)'),
                  fontFamily:"'Cormorant Garamond', serif", fontSize:14, fontStyle:'italic',
                }}>{i + 1}</span>
                <span className="mono-eyebrow" style={{ fontSize:10 }}>{s}</span>
              </button>
              {i < steps.length - 1 && <span style={{ width:30, height:1, background:'var(--rule)' }}/>}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={submit} name="rsvp" data-netlify="true">
          <input type="hidden" name="form-name" value="rsvp" />

          {step === 0 && (
            <StepCard>
              <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:18 }}>Who is replying?</div>

              {guests.map((g, i) => (
                <div key={i} style={{
                  padding:'24px 0',
                  borderTop:'1px solid var(--rule)',
                  borderBottom: i === guests.length - 1 ? '1px solid var(--rule)' : 'none',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
                    <div className="serif" style={{ fontSize:14, fontStyle:'italic', color:'var(--ink-soft)' }}>
                      Guest {i + 1}
                    </div>
                    {guests.length > 1 && (
                      <button type="button" onClick={() => removeGuest(i)} style={{
                        background:'none', border:'none', cursor:'pointer',
                        fontFamily:'Inter', fontSize:10, letterSpacing:'0.24em', textTransform:'uppercase',
                        color:'var(--ink-soft)', opacity:0.6,
                      }}>Remove</button>
                    )}
                  </div>

                  <Field
                    label="Full name"
                    value={g.name}
                    onChange={(v) => update(i, 'name', v)}
                    placeholder="As you would like it on the place card"
                    required
                  />

                  <div style={{ marginTop:20 }}>
                    <div className="mono-eyebrow" style={{ marginBottom:10, color:'var(--ink-soft)' }}>Attending?</div>
                    <div style={{ display:'flex', gap:10 }}>
                      <Choice selected={g.attending === 'yes'} onClick={() => update(i, 'attending', 'yes')}>
                        <em style={{ fontStyle:'italic' }}>Joyfully accepts</em>
                      </Choice>
                      <Choice selected={g.attending === 'no'} onClick={() => update(i, 'attending', 'no')}>
                        Regretfully declines
                      </Choice>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" onClick={addGuest} style={{
                marginTop:22, background:'none', border:'1px dashed var(--rule)',
                padding:'12px 20px', width:'100%',
                fontFamily:'Inter', fontSize:11, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase',
                color:'var(--ink-soft)', cursor:'pointer',
              }}>+ Add another guest</button>

              <FieldSpace>
                <Field label="Email address" type="email" value={email} onChange={setEmail} required placeholder="So we can follow up" />
              </FieldSpace>

              <StepNav onNext={() => setStep(1)} canNext={guests.every(g => g.name.trim()) && email.trim()} />
            </StepCard>
          )}

          {step === 1 && anyAttending && (
            <StepCard>
              <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:18 }}>Choose your meal</div>

              {guests.filter(g => g.attending === 'yes').map((g, idx) => {
                const i = guests.indexOf(g);
                return (
                  <div key={i} style={{
                    padding:'24px 0', borderTop:'1px solid var(--rule)',
                    borderBottom: idx === guests.filter(x => x.attending==='yes').length - 1 ? '1px solid var(--rule)' : 'none',
                  }}>
                    <h3 className="serif" style={{ margin:'0 0 18px', fontSize:24, fontWeight:400, color:'var(--burgundy)', fontStyle:'italic' }}>
                      For {g.name || `Guest ${i + 1}`}
                    </h3>

                    {['starter','main','pudding'].map(course => (
                      <div key={course} style={{ marginBottom:22 }}>
                        <div className="mono-eyebrow" style={{ marginBottom:10, color:'var(--ink-soft)' }}>{course}</div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="meal-grid">
                          {MEAL_OPTIONS[course].map(opt => (
                            <button key={opt.id} type="button" onClick={() => update(i, course, opt.id)} style={{
                              textAlign:'left',
                              background: g[course] === opt.id ? 'var(--ink)' : 'transparent',
                              color: g[course] === opt.id ? 'var(--cream)' : 'var(--ink)',
                              border:`1px solid ${g[course] === opt.id ? 'var(--ink)' : 'var(--rule)'}`,
                              padding:'16px 18px',
                              cursor:'pointer',
                              transition:'all 0.2s',
                            }}>
                              <div className="serif" style={{ fontSize:18, fontWeight:400, lineHeight:1.2 }}
                                dangerouslySetInnerHTML={{ __html: opt.name }} />
                              <div className="serif" style={{ fontSize:13, fontStyle:'italic', opacity:0.7, marginTop:4, lineHeight:1.4, fontWeight:300 }}
                                dangerouslySetInnerHTML={{ __html: opt.note }} />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Field
                      label="Dietary requirements or allergies"
                      value={g.dietary}
                      onChange={(v) => update(i, 'dietary', v)}
                      placeholder="Anything we should know — please be specific"
                    />
                  </div>
                );
              })}

              <StepNav onBack={() => setStep(0)} onNext={() => setStep(2)} canNext />
            </StepCard>
          )}

          {step === 1 && !anyAttending && (
            <StepCard>
              <p className="serif" style={{ fontSize:22, lineHeight:1.6, fontStyle:'italic', color:'var(--ink-soft)', fontWeight:300, margin:'0 0 26px' }}>
                We are sorry you can't make it. We will miss you on the day — if you would like to leave a note, we would love to read it.
              </p>
              <Field
                label="A message for us"
                value={message}
                onChange={setMessage}
                placeholder="As long or short as you like"
                multiline
              />
              <StepNav onBack={() => setStep(0)} onNext={() => setStep(2)} canNext />
            </StepCard>
          )}

          {step === 2 && (
            <StepCard>
              {anyAttending && (
                <>
                  <Field
                    label="A song that will get you on the dance floor"
                    value={songs}
                    onChange={setSongs}
                    placeholder="Artist — Song title (or two)"
                  />
                  <FieldSpace>
                    <Field
                      label="A message for the two of us"
                      value={message}
                      onChange={setMessage}
                      placeholder="Anything you'd like to say — entirely optional"
                      multiline
                    />
                  </FieldSpace>
                </>
              )}

              <div style={{
                marginTop:36, padding:'24px 24px',
                background:'rgba(74,26,44,0.04)',
                border:'1px solid var(--rule)',
              }}>
                <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:12 }}>Replying for</div>
                <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                  {guests.map((g, i) => (
                    <li key={i} className="serif" style={{
                      fontSize:18, padding:'6px 0', display:'flex', justifyContent:'space-between', gap:10,
                      borderBottom: i < guests.length - 1 ? '1px solid var(--rule-soft)' : 'none',
                    }}>
                      <span>{g.name || <em style={{ fontStyle:'italic', opacity:0.5 }}>(unnamed)</em>}</span>
                      <span style={{ fontStyle:'italic', color: g.attending === 'yes' ? 'var(--burgundy)' : 'var(--ink-soft)', opacity: g.attending === 'yes' ? 1 : 0.65 }}>
                        {g.attending === 'yes' ? 'attending' : 'sending regrets'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <StepNav onBack={() => setStep(1)} submit canNext />
            </StepCard>
          )}
        </form>
      </div>
    </section>
  );
};

const StepCard = ({ children }) => (
  <div style={{
    background:'rgba(255,255,255,0.45)',
    border:'1px solid var(--rule)',
    padding:'40px 36px',
  }} className="rsvp-card">
    {children}
    <style>{`
      @media (max-width: 600px){
        .rsvp-card{ padding:28px 22px !important; }
        .meal-grid{ grid-template-columns:1fr !important; }
      }
    `}</style>
  </div>
);

const Field = ({ label, value, onChange, placeholder, type='text', required, multiline }) => (
  <label style={{ display:'block' }}>
    <div className="mono-eyebrow" style={{ marginBottom:8, color:'var(--ink-soft)' }}>{label}{required && <span style={{ color:'var(--magenta)', marginLeft:4 }}>·</span>}</div>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        required={required}
        style={{
          width:'100%', background:'transparent',
          border:'none', borderBottom:'1px solid var(--rule)',
          padding:'10px 0', resize:'vertical',
          fontFamily:"'Cormorant Garamond', serif", fontSize:19, fontWeight:300,
          color:'var(--ink)', outline:'none',
          transition:'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
        onBlur={(e) => e.target.style.borderBottomColor = 'var(--rule)'}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width:'100%', background:'transparent',
          border:'none', borderBottom:'1px solid var(--rule)',
          padding:'10px 0',
          fontFamily:"'Cormorant Garamond', serif", fontSize:19, fontWeight:300,
          color:'var(--ink)', outline:'none',
          transition:'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
        onBlur={(e) => e.target.style.borderBottomColor = 'var(--rule)'}
      />
    )}
  </label>
);

const FieldSpace = ({ children }) => <div style={{ marginTop:24 }}>{children}</div>;

const Choice = ({ selected, onClick, children }) => (
  <button type="button" onClick={onClick} style={{
    flex:1,
    background: selected ? 'var(--ink)' : 'transparent',
    color: selected ? 'var(--cream)' : 'var(--ink)',
    border:`1px solid ${selected ? 'var(--ink)' : 'var(--rule)'}`,
    padding:'14px 18px',
    fontFamily:"'Cormorant Garamond', serif", fontSize:17,
    cursor:'pointer', transition:'all 0.2s',
  }}>
    {children}
  </button>
);

const StepNav = ({ onBack, onNext, canNext, submit }) => (
  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:32, gap:12 }}>
    {onBack ? (
      <button type="button" onClick={onBack} style={{
        background:'none', border:'none', cursor:'pointer',
        fontFamily:'Inter', fontSize:11, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase',
        color:'var(--ink-soft)', padding:'10px 0',
      }}>← Back</button>
    ) : <span/>}

    {submit ? (
      <button type="submit" disabled={!canNext} style={{
        background:'var(--burgundy)', color:'var(--cream)',
        border:'none', padding:'16px 36px',
        fontFamily:'Inter', fontSize:11, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed', opacity: canNext ? 1 : 0.5,
        transition:'all 0.2s',
      }}>Send reply</button>
    ) : (
      <button type="button" onClick={onNext} disabled={!canNext} style={{
        background:'var(--ink)', color:'var(--cream)',
        border:'none', padding:'16px 32px',
        fontFamily:'Inter', fontSize:11, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed', opacity: canNext ? 1 : 0.5,
        transition:'all 0.2s',
      }}>Continue →</button>
    )}
  </div>
);

const RSVPThanks = ({ onReset, attending }) => (
  <section id="rsvp" style={{ padding:'140px 24px', background:'var(--cream)', textAlign:'center' }}>
    <div style={{ maxWidth:600, margin:'0 auto' }}>
      <FloralMark size={32} />
      <h2 className="serif" style={{
        fontSize:'clamp(48px, 7vw, 84px)', fontWeight:300, fontStyle:'italic',
        margin:'24px 0 16px', color:'var(--burgundy)', lineHeight:1,
      }}>
        {attending ? 'See you in July.' : 'We\u2019ll miss you.'}
      </h2>
      <p className="serif" style={{ fontSize:21, fontStyle:'italic', lineHeight:1.6, color:'var(--ink-soft)', fontWeight:300 }}>
        {attending
          ? 'Thank you for replying — we can\u2019t wait. We\u2019ll be in touch in the new year with the finer details.'
          : 'Thank you for letting us know. We hope to see you soon, even if not on the day.'}
      </p>
      <button onClick={onReset} style={{
        marginTop:36, background:'none', border:'1px solid var(--rule)',
        padding:'12px 28px', fontFamily:'Inter', fontSize:11, fontWeight:500,
        letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--ink-soft)',
        cursor:'pointer',
      }}>Reply again</button>
    </div>
  </section>
);

Object.assign(window, { RSVP });
