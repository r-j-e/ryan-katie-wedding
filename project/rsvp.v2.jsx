// RSVP — written like a reply card. Cream paper, fill-in-the-blanks, editorial.
// Wired for Netlify Forms (hidden form-name field); easy to swap for Formspree.

const MEAL_OPTIONS = {
  starter: [
    { id:'s1', name:'Beetroot &amp; goat cheese', note:'candied walnut, toasted rye' },
    { id:'s2', name:'Smoked trout', note:'cucumber, dill, crème fraîche' },
  ],
  main: [
    { id:'m1', name:'Slow-cooked beef cheek', note:'roasted roots, red wine jus' },
    { id:'m2', name:'Wild mushroom risotto', note:'shaved parmesan (v)' },
  ],
  pudding: [
    { id:'p1', name:'Dark chocolate délice', note:'raspberry sorbet' },
    { id:'p2', name:'Lemon posset', note:'shortbread, macerated berries' },
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

  const update = (i, key, val) => setGuests(g => g.map((x, idx) => idx === i ? { ...x, [key]:val } : x));
  const addGuest = () => setGuests(g => [...g, blankGuest()]);
  const removeGuest = (i) => setGuests(g => g.filter((_, idx) => idx !== i));

  const anyAttending = guests.some(g => g.attending === 'yes');

  const submit = (e) => {
    if (e) e.preventDefault();
    const payload = { 'form-name':'rsvp', email, songs, message, guests:JSON.stringify(guests) };
    try {
      const existing = JSON.parse(localStorage.getItem('rk_rsvps') || '[]');
      existing.push({ ts:new Date().toISOString(), ...payload });
      localStorage.setItem('rk_rsvps', JSON.stringify(existing));
    } catch(e){}
    setSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById('rsvp');
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior:'smooth' });
    }, 50);
  };

  if (submitted) return <RSVPThanks attending={anyAttending} onReset={() => {
    setSubmitted(false); setStep(0); setGuests([blankGuest()]);
    setEmail(''); setSongs(''); setMessage('');
  }} />;

  const stepLabels = ['Your party', anyAttending ? 'The menu' : 'A note', 'Confirm & send'];

  return (
    <section id="rsvp" style={{
      padding:'160px 32px 140px', background:'var(--cream-deep)',
      position:'relative', overflow:'hidden',
      borderTop:'1px solid var(--rule-soft)',
    }}>
      <RomanMark numeral="VII" position="right" />

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative' }}>
        <div style={{
          display:'grid', gridTemplateColumns:'0.6fr 1fr', gap:80, alignItems:'start',
        }} className="rsvp-grid">

          {/* LEFT — header & meta */}
          <div className="rsvp-left" style={{ position:'sticky', top:120 }}>
            <div style={{ marginBottom:24 }}>
              <SectionEyebrow numeral="VII" label="Please reply" />
            </div>
            <SectionTitle italic style={{ fontSize:'clamp(56px, 8vw, 110px)' }}>
              Kindly<br/>reply.
            </SectionTitle>
            <p className="serif" style={{
              marginTop:30, fontSize:19, lineHeight:1.65, color:'var(--ink-soft)',
              fontWeight:300, fontStyle:'italic', maxWidth:340,
            }}>
              By <strong style={{ fontWeight:500, color:'var(--burgundy)', fontStyle:'normal' }}>1st April 2027</strong>, please &mdash; a line either way would mean a great deal.
            </p>

            {/* Stepper */}
            <ol style={{ listStyle:'none', padding:0, margin:'48px 0 0' }}>
              {stepLabels.map((s, i) => (
                <li key={i} style={{
                  display:'flex', alignItems:'baseline', gap:14,
                  padding:'12px 0', borderTop:'1px solid var(--rule)',
                  borderBottom: i === stepLabels.length - 1 ? '1px solid var(--rule)' : 'none',
                  opacity: i > step ? 0.4 : 1,
                  cursor: i < step ? 'pointer' : 'default',
                  color: i === step ? 'var(--burgundy)' : 'var(--ink)',
                  transition:'color 0.2s',
                }} onClick={() => i < step && setStep(i)}>
                  <span className="serif" style={{
                    fontSize:18, fontStyle:'italic', minWidth:28, fontWeight:400,
                  }}>0{i + 1}</span>
                  <span className="serif" style={{
                    fontSize:18, fontWeight: i === step ? 500 : 300, fontStyle: i === step ? 'italic' : 'normal',
                  }}>{s}</span>
                  {i < step && (
                    <span style={{ marginLeft:'auto', color:'var(--burgundy)', fontSize:11 }}>✓</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* RIGHT — reply card */}
          <div>
            <Card>
              <form onSubmit={submit} name="rsvp" data-netlify="true">
                <input type="hidden" name="form-name" value="rsvp" />

                {step === 0 && (
                  <StepGuests
                    guests={guests} update={update} addGuest={addGuest} removeGuest={removeGuest}
                    email={email} setEmail={setEmail}
                    onNext={() => setStep(1)}
                  />
                )}

                {step === 1 && anyAttending && (
                  <StepMeals
                    guests={guests} update={update}
                    onBack={() => setStep(0)} onNext={() => setStep(2)}
                  />
                )}

                {step === 1 && !anyAttending && (
                  <StepRegrets
                    message={message} setMessage={setMessage}
                    onBack={() => setStep(0)} onNext={() => setStep(2)}
                  />
                )}

                {step === 2 && (
                  <StepConfirm
                    guests={guests} anyAttending={anyAttending}
                    songs={songs} setSongs={setSongs}
                    message={message} setMessage={setMessage}
                    onBack={() => setStep(1)}
                  />
                )}
              </form>
            </Card>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px){
            .rsvp-grid{ grid-template-columns:1fr !important; gap:48px !important; }
            .rsvp-left{ position:static !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

// ============ CARD ============
const Card = ({ children }) => (
  <div style={{
    background:'var(--cream)',
    border:'1px solid var(--rule)',
    padding:'48px 48px',
    position:'relative',
    boxShadow:'0 1px 0 var(--rule), 0 14px 40px -22px rgba(74,26,44,0.18)',
  }} className="rsvp-card">
    {/* Top tab */}
    <div style={{
      position:'absolute', top:-1, left:48, transform:'translateY(-100%)',
      background:'var(--burgundy)', color:'var(--cream)',
      padding:'6px 14px',
      fontFamily:'Inter', fontSize:9.5, fontWeight:500, letterSpacing:'0.34em', textTransform:'uppercase',
    }}>Reply Card · No. 1</div>
    {children}
    <style>{`
      @media (max-width: 560px){
        .rsvp-card{ padding:36px 24px !important; }
      }
    `}</style>
  </div>
);

// ============ STEP 1: GUESTS ============
const StepGuests = ({ guests, update, addGuest, removeGuest, email, setEmail, onNext }) => {
  const canNext = guests.every(g => g.name.trim()) && email.trim().includes('@');

  return (
    <div>
      <StepHeading numeral="One" title="Your party" />

      <p className="serif" style={{
        fontSize:18, fontStyle:'italic', color:'var(--ink-soft)', lineHeight:1.6,
        fontWeight:300, marginBottom:32,
      }}>
        Please tell us who is replying, and whether you will be joining us in Somerset.
      </p>

      {guests.map((g, i) => (
        <div key={i} style={{
          padding:'24px 0', borderTop:'1px solid var(--rule)',
          borderBottom: i === guests.length - 1 ? '1px solid var(--rule)' : 'none',
        }}>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12,
          }}>
            <span className="serif" style={{
              fontSize:15, fontStyle:'italic', color:'var(--burgundy)',
            }}>Guest {String.fromCharCode(65 + i)}</span>
            {guests.length > 1 && (
              <button type="button" onClick={() => removeGuest(i)} style={{
                background:'none', border:'none', cursor:'pointer',
                fontFamily:'Inter', fontSize:9.5, fontWeight:500, letterSpacing:'0.3em',
                textTransform:'uppercase', color:'var(--ink-soft)', opacity:0.6,
              }}>Remove</button>
            )}
          </div>

          {/* Fill-in-the-blank line */}
          <div style={{
            display:'flex', alignItems:'baseline', gap:14, flexWrap:'wrap',
          }}>
            <span className="serif" style={{ fontSize:22, fontStyle:'italic', color:'var(--ink)', fontWeight:300 }}>
              Name on the place card,
            </span>
            <BlankInput
              value={g.name}
              onChange={(v) => update(i, 'name', v)}
              placeholder="full name"
              flex
            />
          </div>

          {/* Attendance line */}
          <div style={{
            marginTop:24, display:'flex', alignItems:'baseline', gap:14, flexWrap:'wrap',
          }}>
            <span className="serif" style={{ fontSize:22, fontStyle:'italic', color:'var(--ink)', fontWeight:300 }}>
              who
            </span>
            <Chip selected={g.attending === 'yes'} onClick={() => update(i, 'attending', 'yes')}>
              joyfully accepts
            </Chip>
            <span className="serif" style={{ fontSize:18, color:'var(--ink-soft)', opacity:0.5 }}>or</span>
            <Chip selected={g.attending === 'no'} onClick={() => update(i, 'attending', 'no')}>
              regretfully declines
            </Chip>
          </div>
        </div>
      ))}

      <button type="button" onClick={addGuest} style={{
        marginTop:18, width:'100%',
        background:'none', border:'1px dashed var(--rule)', cursor:'pointer',
        padding:'14px 18px',
        fontFamily:"'Cormorant Garamond', serif", fontSize:16, fontStyle:'italic',
        color:'var(--ink-soft)',
      }}>+ &nbsp;Add another guest</button>

      <div style={{ marginTop:32, paddingTop:28, borderTop:'1px solid var(--rule)' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:14, flexWrap:'wrap' }}>
          <span className="serif" style={{ fontSize:22, fontStyle:'italic', color:'var(--ink)', fontWeight:300 }}>
            Reach us at
          </span>
          <BlankInput
            value={email}
            onChange={setEmail}
            placeholder="email address"
            flex
            type="email"
          />
          <span className="serif" style={{ fontSize:18, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.6 }}>
            in case we need to follow up.
          </span>
        </div>
      </div>

      <StepNav onNext={onNext} canNext={canNext} />
    </div>
  );
};

// ============ STEP 2: MEALS ============
const StepMeals = ({ guests, update, onBack, onNext }) => (
  <div>
    <StepHeading numeral="Two" title="The menu" />

    <p className="serif" style={{
      fontSize:18, fontStyle:'italic', color:'var(--ink-soft)', lineHeight:1.6,
      fontWeight:300, marginBottom:8,
    }}>
      Three courses, two choices per course. Pick one of each for everyone in your party.
    </p>

    {guests.filter(g => g.attending === 'yes').map((g) => {
      const i = guests.indexOf(g);
      return (
        <div key={i} style={{
          marginTop:36, paddingTop:24, borderTop:'1px solid var(--rule)',
        }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:22 }}>
            <h4 className="serif" style={{
              margin:0, fontSize:30, fontWeight:400, fontStyle:'italic', color:'var(--burgundy)', letterSpacing:'-0.01em',
            }}>For {g.name || `Guest ${String.fromCharCode(65 + i)}`}</h4>
          </div>

          {['starter','main','pudding'].map(course => (
            <div key={course} style={{ marginBottom:24 }}>
              <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:10 }}>
                {course === 'main' ? 'Main course' : course}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="meal-grid">
                {MEAL_OPTIONS[course].map(opt => {
                  const on = g[course] === opt.id;
                  return (
                    <button key={opt.id} type="button" onClick={() => update(i, course, opt.id)} style={{
                      textAlign:'left', position:'relative',
                      background: on ? 'var(--ink)' : 'var(--cream)',
                      color: on ? 'var(--cream)' : 'var(--ink)',
                      border:`1px solid ${on ? 'var(--ink)' : 'var(--rule)'}`,
                      padding:'18px 18px', cursor:'pointer', transition:'all 0.2s',
                    }}>
                      <div className="serif" style={{ fontSize:19, fontWeight:400, lineHeight:1.2 }}
                        dangerouslySetInnerHTML={{ __html: opt.name }} />
                      <div className="serif" style={{
                        fontSize:14, fontStyle:'italic',
                        opacity: on ? 0.65 : 0.7, marginTop:4, lineHeight:1.4, fontWeight:300,
                      }} dangerouslySetInnerHTML={{ __html: opt.note }} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginTop:20 }}>
            <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:10 }}>Dietary notes or allergies</div>
            <BlankInput
              value={g.dietary}
              onChange={(v) => update(i, 'dietary', v)}
              placeholder="anything we should know — please be specific"
            />
          </div>
        </div>
      );
    })}

    <StepNav onBack={onBack} onNext={onNext} canNext />
  </div>
);

// ============ STEP 2b: REGRETS ============
const StepRegrets = ({ message, setMessage, onBack, onNext }) => (
  <div>
    <StepHeading numeral="Two" title="A note" />

    <p className="serif" style={{
      fontSize:22, fontStyle:'italic', color:'var(--ink-soft)', lineHeight:1.65,
      fontWeight:300, marginBottom:32,
    }}>
      We're sorry you can't make it &mdash; we'll miss you on the day. If you'd like to leave a note, we'd love to read it.
    </p>

    <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:10 }}>Your message</div>
    <BlankTextarea value={message} onChange={setMessage} placeholder="As long or short as you like" />

    <StepNav onBack={onBack} onNext={onNext} canNext />
  </div>
);

// ============ STEP 3: CONFIRM ============
const StepConfirm = ({ guests, anyAttending, songs, setSongs, message, setMessage, onBack }) => (
  <div>
    <StepHeading numeral="Three" title="Last things" />

    {anyAttending && (
      <>
        <div style={{ marginBottom:28 }}>
          <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:10 }}>
            A song to get you on the dance floor
          </div>
          <BlankInput
            value={songs} onChange={setSongs}
            placeholder="Artist — Song title (or two)"
          />
        </div>

        <div>
          <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', marginBottom:10 }}>
            A message for the two of us
          </div>
          <BlankTextarea
            value={message} onChange={setMessage}
            placeholder="Entirely optional — anything you'd like to say"
          />
        </div>
      </>
    )}

    <div style={{
      marginTop:40, padding:'24px 28px',
      background:'rgba(74,26,44,0.04)',
      border:'1px solid var(--rule)',
    }}>
      <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:14 }}>Replying for</div>
      <ul style={{ listStyle:'none', padding:0, margin:0 }}>
        {guests.map((g, i) => (
          <li key={i} style={{
            display:'flex', justifyContent:'space-between', alignItems:'baseline',
            padding:'10px 0', gap:14,
            borderBottom: i < guests.length - 1 ? '1px solid var(--rule-soft)' : 'none',
          }}>
            <span className="serif" style={{ fontSize:19, color:'var(--ink)' }}>
              {g.name || <em style={{ opacity:0.5, fontStyle:'italic' }}>(unnamed guest)</em>}
            </span>
            <span className="serif" style={{
              fontSize:15, fontStyle:'italic',
              color: g.attending === 'yes' ? 'var(--burgundy)' : 'var(--ink-soft)',
              opacity: g.attending === 'yes' ? 1 : 0.65,
            }}>
              {g.attending === 'yes' ? 'attending' : 'sending regrets'}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <StepNav onBack={onBack} submit canNext />
  </div>
);

// ============ ATOMS ============
const StepHeading = ({ numeral, title }) => (
  <div style={{ marginBottom:28 }}>
    <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:8 }}>Part {numeral}</div>
    <h3 className="serif" style={{
      margin:0, fontSize:38, fontWeight:300, color:'var(--ink)',
      fontStyle:'italic', letterSpacing:'-0.015em', lineHeight:1,
    }}>{title}</h3>
  </div>
);

const BlankInput = ({ value, onChange, placeholder, type='text', flex = false }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      flex: flex ? 1 : undefined,
      minWidth: flex ? 200 : '100%',
      width: flex ? 'auto' : '100%',
      background:'transparent', border:'none',
      borderBottom:'1px solid var(--ink-soft)',
      padding:'4px 0', outline:'none',
      fontFamily:"'Cormorant Garamond', serif",
      fontSize:22, fontStyle:'italic', fontWeight:300,
      color:'var(--ink)',
      transition:'border-color 0.2s',
    }}
    onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
    onBlur={(e) => e.target.style.borderBottomColor = 'var(--ink-soft)'}
  />
);

const BlankTextarea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={4}
    style={{
      width:'100%',
      background:'rgba(255,255,255,0.45)', border:'1px solid var(--rule)',
      padding:'14px 16px', outline:'none', resize:'vertical',
      fontFamily:"'Cormorant Garamond', serif",
      fontSize:19, fontWeight:300, color:'var(--ink)',
      transition:'border-color 0.2s',
    }}
    onFocus={(e) => e.target.style.borderColor = 'var(--burgundy)'}
    onBlur={(e) => e.target.style.borderColor = 'var(--rule)'}
  />
);

const Chip = ({ selected, onClick, children }) => (
  <button type="button" onClick={onClick} style={{
    background: selected ? 'var(--burgundy)' : 'transparent',
    color: selected ? 'var(--cream)' : 'var(--ink)',
    border:`1px solid ${selected ? 'var(--burgundy)' : 'var(--rule)'}`,
    padding:'8px 18px',
    fontFamily:"'Cormorant Garamond', serif", fontSize:18, fontStyle:'italic', fontWeight:400,
    cursor:'pointer', transition:'all 0.2s',
  }}>{children}</button>
);

const StepNav = ({ onBack, onNext, submit, canNext }) => (
  <div style={{
    display:'flex', justifyContent:'space-between', alignItems:'center',
    marginTop:40, paddingTop:24, borderTop:'1px solid var(--rule)', gap:12,
  }}>
    {onBack ? (
      <button type="button" onClick={onBack} style={{
        background:'none', border:'none', cursor:'pointer',
        fontFamily:'Inter', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        color:'var(--ink-soft)', padding:'10px 0',
      }}>← Back</button>
    ) : <span/>}

    {submit ? (
      <button type="submit" disabled={!canNext} style={{
        background:'var(--burgundy)', color:'var(--cream)',
        border:'none', padding:'18px 40px',
        fontFamily:'Inter', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed',
        opacity: canNext ? 1 : 0.5, transition:'background 0.2s',
      }}
      onMouseEnter={(e) => canNext && (e.currentTarget.style.background='var(--ink)')}
      onMouseLeave={(e) => canNext && (e.currentTarget.style.background='var(--burgundy)')}
      >Send our reply →</button>
    ) : (
      <button type="button" onClick={onNext} disabled={!canNext} style={{
        background:'var(--ink)', color:'var(--cream)',
        border:'none', padding:'18px 36px',
        fontFamily:'Inter', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed',
        opacity: canNext ? 1 : 0.5, transition:'background 0.2s',
      }}>Continue →</button>
    )}
  </div>
);

// ============ THANKS ============
const RSVPThanks = ({ onReset, attending }) => (
  <section id="rsvp" style={{
    padding:'180px 32px 160px', background:'var(--cream)', position:'relative', overflow:'hidden',
  }}>
    <RomanMark numeral="VII" position="right" />
    <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative' }}>
      <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:24 }}>
        {attending ? 'Reply received · with thanks' : 'Reply received'}
      </div>
      <h2 className="serif" style={{
        margin:0, fontSize:'clamp(60px, 10vw, 130px)', fontWeight:300, fontStyle:'italic',
        lineHeight:0.92, color:'var(--burgundy)', letterSpacing:'-0.02em',
      }}>
        {attending ? 'See you in July.' : 'We\u2019ll miss you.'}
      </h2>
      <p className="serif" style={{
        marginTop:32, fontSize:22, fontStyle:'italic', lineHeight:1.6,
        color:'var(--ink-soft)', fontWeight:300, maxWidth:560, marginLeft:'auto', marginRight:'auto',
      }}>
        {attending
          ? 'Thank you for replying — we cannot wait. We will be in touch in the new year with the finer details.'
          : 'Thank you for letting us know. We hope to see you soon, even if not on the day.'}
      </p>
      <button onClick={onReset} style={{
        marginTop:42, background:'none', border:'1px solid var(--rule)',
        padding:'14px 30px',
        fontFamily:'Inter', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        color:'var(--ink-soft)', cursor:'pointer',
      }}>Reply again</button>
    </div>
  </section>
);

Object.assign(window, { RSVP });
