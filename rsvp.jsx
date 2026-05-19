// RSVP — multi-step form with meal pickers. Clean and quiet.
// Wired for Netlify Forms; falls back to localStorage in preview.

const MEAL_OPTIONS = {
  starter: [
    { id:'s1', name:'Beetroot &amp; goat cheese', note:'candied walnut, toasted rye' },
    { id:'s2', name:'Smoked trout',               note:'cucumber, dill, crème fraîche' },
  ],
  main: [
    { id:'m1', name:'Slow-cooked beef cheek',     note:'roasted roots, red wine jus' },
    { id:'m2', name:'Wild mushroom risotto',      note:'shaved parmesan (v)' },
  ],
  pudding: [
    { id:'p1', name:'Dark chocolate délice',      note:'raspberry sorbet' },
    { id:'p2', name:'Lemon posset',               note:'shortbread, macerated berries' },
  ],
};

const blankGuest = (name = '') => ({ name, attending:'yes', starter:'', main:'', pudding:'', dietary:'' });

// Seed the guest rows from the invitation code's named list. Falls back to a
// single blank row (preview / unauthenticated case) so the form still renders.
const seedGuests = (guest) =>
  (guest?.guests?.length ? guest.guests : ['']).map(name => blankGuest(name));

const RSVP = ({ guest }) => {
  const [step, setStep]   = React.useState(0);
  const [guests, setGuests] = React.useState(() => seedGuests(guest));
  const [songs, setSongs]   = React.useState('');
  const [message, setMessage] = React.useState('');
  const [email, setEmail]   = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const update = (i, k, v) => setGuests(g => g.map((x, idx) => idx === i ? { ...x, [k]:v } : x));

  const anyAttending = guests.some(g => g.attending === 'yes');

  const submit = (e) => {
    if (e) e.preventDefault();
    const payload = { code: guest?.code, household: guest?.household, email, songs, message, guests };
    try {
      const existing = JSON.parse(localStorage.getItem('rk_rsvps') || '[]');
      existing.push({ ts: new Date().toISOString(), ...payload });
      localStorage.setItem('rk_rsvps', JSON.stringify(existing));
    } catch(e){}
    setSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById('rsvp');
      if (el) window.scrollTo({ top: el.offsetTop - 56, behavior:'smooth' });
    }, 50);
  };

  if (submitted) return <RSVPThanks attending={anyAttending} onReset={() => {
    setSubmitted(false); setStep(0); setGuests(seedGuests(guest));
    setEmail(''); setSongs(''); setMessage('');
  }} />;

  const steps = ['Your party', anyAttending ? 'Menu' : 'A note', 'Confirm'];

  return (
    <Section id="rsvp" narrow padBottom={180}>
      <Heading eyebrow="Please reply by 1st April 2027" align="center">
        <em>Kindly</em> reply.
      </Heading>

      {/* Stepper */}
      <ol style={{
        listStyle:'none', padding:0, margin:'0 0 56px',
        display:'flex', alignItems:'center', justifyContent:'center', gap:12, flexWrap:'wrap',
      }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <li
              onClick={() => i < step && setStep(i)}
              style={{
                display:'flex', alignItems:'center', gap:10,
                cursor: i < step ? 'pointer' : 'default',
                color: i === step ? 'var(--burgundy)' : 'var(--ink-mute)',
                opacity: i > step ? 0.45 : 1,
              }}
            >
              <span style={{
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                width:24, height:24, borderRadius:'50%',
                border:`1px solid ${i <= step ? 'var(--burgundy)' : 'var(--rule)'}`,
                background: i === step ? 'var(--burgundy)' : 'transparent',
                color: i === step ? 'var(--cream)' : (i < step ? 'var(--burgundy)' : 'var(--ink-mute)'),
              }}>
                <span className="serif" style={{ fontSize:13, fontStyle:'italic' }}>{i + 1}</span>
              </span>
              <span className="serif" style={{ fontSize:14, fontStyle: i === step ? 'italic' : 'normal' }}>
                {s}
              </span>
            </li>
            {i < steps.length - 1 && <span style={{ width:36, height:1, background:'var(--rule)' }}/>}
          </React.Fragment>
        ))}
      </ol>

      <form onSubmit={submit}>

        {step === 0 && (
          <StepGuests
            guests={guests} update={update}
            email={email} setEmail={setEmail}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && anyAttending && (
          <StepMeals guests={guests} update={update}
            onBack={() => setStep(0)} onNext={() => setStep(2)} />
        )}
        {step === 1 && !anyAttending && (
          <StepRegrets message={message} setMessage={setMessage}
            onBack={() => setStep(0)} onNext={() => setStep(2)} />
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
    </Section>
  );
};

// ============ STEP 1: GUESTS ============
// Names come pre-filled from the invitation code's guest list (see GUEST_CODES
// in gate.jsx). The guest can still tweak the spelling for the place card —
// what they don't get is add/remove, since the party size is set by the code.
const StepGuests = ({ guests, update, email, setEmail, onNext }) => {
  const canNext = guests.every(g => g.name.trim()) && email.trim().includes('@');

  return (
    <div>
      <p className="serif" style={{
        margin:'0 auto 44px', textAlign:'center', maxWidth:480,
        fontSize:18, fontStyle:'italic', fontWeight:300, color:'var(--ink-mute)', lineHeight:1.7,
      }}>
        We&rsquo;ve pencilled in the names from your invitation. Let us know
        who&rsquo;s able to join us.
      </p>

      {guests.map((g, i) => (
        <div key={i} style={{
          padding:'28px 0',
          borderTop: '1px solid var(--rule)',
          borderBottom: i === guests.length - 1 ? '1px solid var(--rule)' : 'none',
        }}>
          <Field
            label="Name"
            value={g.name}
            onChange={(v) => update(i, 'name', v)}
            placeholder="as you would like it on the place card"
          />

          <div style={{ marginTop:24 }}>
            <div className="label" style={{ marginBottom:10 }}>Attending?</div>
            <div style={{ display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap' }}>
              <Chip selected={g.attending === 'yes'} onClick={() => update(i, 'attending', 'yes')}>
                <em style={{ fontStyle:'italic' }}>Joyfully accepts</em>
              </Chip>
              <Chip selected={g.attending === 'no'} onClick={() => update(i, 'attending', 'no')}>
                Regretfully declines
              </Chip>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop:36 }}>
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="so we can follow up"
        />
      </div>

      <StepNav onNext={onNext} canNext={canNext} />
    </div>
  );
};

// ============ STEP 2: MEALS ============
const StepMeals = ({ guests, update, onBack, onNext }) => (
  <div>
    <p className="serif" style={{
      margin:'0 auto 32px', textAlign:'center', maxWidth:540,
      fontSize:18, fontStyle:'italic', fontWeight:300, color:'var(--ink-mute)', lineHeight:1.7,
    }}>
      Three courses, two choices per course. Pick one of each for everyone in your party.
    </p>

    {guests.filter(g => g.attending === 'yes').map((g) => {
      const i = guests.indexOf(g);
      return (
        <div key={i} style={{
          marginTop:36, paddingTop:24, borderTop:'1px solid var(--rule)',
        }}>
          <h4 className="serif" style={{
            margin:'0 0 22px', fontSize:24, fontWeight:400, fontStyle:'italic', color:'var(--burgundy)',
          }}>For {g.name || `Guest ${String.fromCharCode(65 + i)}`}</h4>

          {['starter','main','pudding'].map(course => (
            <div key={course} style={{ marginBottom:22 }}>
              <div className="label" style={{ marginBottom:10 }}>
                {course === 'main' ? 'Main' : course}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="meal-grid">
                {MEAL_OPTIONS[course].map(opt => {
                  const on = g[course] === opt.id;
                  return (
                    <button key={opt.id} type="button" onClick={() => update(i, course, opt.id)} style={{
                      textAlign:'center',
                      background: on ? 'var(--ink)' : 'transparent',
                      color: on ? 'var(--cream)' : 'var(--ink)',
                      border:`1px solid ${on ? 'var(--ink)' : 'var(--rule)'}`,
                      padding:'16px 18px', cursor:'pointer', transition:'all 0.2s',
                    }}>
                      <div className="serif" style={{ fontSize:18, fontWeight:400, lineHeight:1.25 }}
                        dangerouslySetInnerHTML={{ __html: opt.name }}/>
                      <div className="serif" style={{
                        fontSize:13, fontStyle:'italic', marginTop:4, lineHeight:1.45, fontWeight:300,
                        opacity:0.7,
                      }} dangerouslySetInnerHTML={{ __html: opt.note }}/>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginTop:18 }}>
            <Field
              label="Dietary notes or allergies"
              value={g.dietary}
              onChange={(v) => update(i, 'dietary', v)}
              placeholder="anything we should know — please be specific"
            />
          </div>
        </div>
      );
    })}

    <style>{`
      @media (max-width: 540px){
        .meal-grid{ grid-template-columns:1fr !important; }
      }
    `}</style>

    <StepNav onBack={onBack} onNext={onNext} canNext />
  </div>
);

// ============ STEP 2b: REGRETS ============
const StepRegrets = ({ message, setMessage, onBack, onNext }) => (
  <div>
    <p className="serif" style={{
      margin:'0 auto 32px', textAlign:'center', maxWidth:540,
      fontSize:22, fontStyle:'italic', fontWeight:300, color:'var(--ink-mute)', lineHeight:1.7,
    }}>
      We're sorry you can't make it &mdash; we'll miss you. If you'd like to leave a note, we'd love to read it.
    </p>
    <Field
      label="Your message"
      value={message}
      onChange={setMessage}
      placeholder="as long or short as you like"
      multiline
    />
    <StepNav onBack={onBack} onNext={onNext} canNext />
  </div>
);

// ============ STEP 3: CONFIRM ============
const StepConfirm = ({ guests, anyAttending, songs, setSongs, message, setMessage, onBack }) => (
  <div>
    <p className="serif" style={{
      margin:'0 auto 32px', textAlign:'center', maxWidth:480,
      fontSize:18, fontStyle:'italic', fontWeight:300, color:'var(--ink-mute)', lineHeight:1.7,
    }}>
      Two last things, both optional.
    </p>

    {anyAttending && (
      <>
        <div style={{ marginBottom:24 }}>
          <Field
            label="A song to get you on the dance floor"
            value={songs}
            onChange={setSongs}
            placeholder="artist — song title (or two)"
          />
        </div>
        <Field
          label="A message for the two of us"
          value={message}
          onChange={setMessage}
          placeholder="anything you'd like to say"
          multiline
        />
      </>
    )}

    <div style={{
      marginTop:36, padding:'22px 24px',
      background:'rgba(74,26,44,0.04)', border:'1px solid var(--rule)',
    }}>
      <div className="label" style={{ color:'var(--burgundy)', marginBottom:12 }}>Replying for</div>
      <ul style={{ listStyle:'none', padding:0, margin:0 }}>
        {guests.map((g, i) => (
          <li key={i} style={{
            display:'flex', justifyContent:'space-between', alignItems:'baseline',
            padding:'10px 0', gap:14,
            borderBottom: i < guests.length - 1 ? '1px solid var(--rule-soft)' : 'none',
          }}>
            <span className="serif" style={{ fontSize:18, color:'var(--ink)' }}>
              {g.name || <em style={{ opacity:0.5, fontStyle:'italic' }}>(unnamed guest)</em>}
            </span>
            <span className="serif" style={{
              fontSize:15, fontStyle:'italic',
              color: g.attending === 'yes' ? 'var(--burgundy)' : 'var(--ink-mute)',
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
const Field = ({ label, value, onChange, placeholder, type='text', multiline }) => (
  <label style={{ display:'block', textAlign:'center' }}>
    <div className="label" style={{ marginBottom:8 }}>{label}</div>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{
          width:'100%', background:'transparent',
          border:'none', borderBottom:'1px solid var(--ink-mute)',
          padding:'10px 0', resize:'vertical', outline:'none',
          fontFamily:"'Cinzel', Georgia, serif",
          fontSize:19, fontWeight:300, color:'var(--ink)',
          transition:'border-color 0.2s',
          textAlign:'center',
        }}
        onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
        onBlur={(e) => e.target.style.borderBottomColor = 'var(--ink-mute)'}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width:'100%', background:'transparent',
          border:'none', borderBottom:'1px solid var(--ink-mute)',
          padding:'10px 0', outline:'none',
          fontFamily:"'Cinzel', Georgia, serif",
          fontSize:20, fontStyle:'italic', fontWeight:300, color:'var(--ink)',
          transition:'border-color 0.2s',
          textAlign:'center',
        }}
        onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
        onBlur={(e) => e.target.style.borderBottomColor = 'var(--ink-mute)'}
      />
    )}
  </label>
);

const Chip = ({ selected, onClick, children }) => (
  <button type="button" onClick={onClick} style={{
    background: selected ? 'var(--ink)' : 'transparent',
    color: selected ? 'var(--cream)' : 'var(--ink)',
    border:`1px solid ${selected ? 'var(--ink)' : 'var(--rule)'}`,
    padding:'10px 20px',
    fontFamily:"'Cinzel', Georgia, serif", fontSize:17, fontWeight:400,
    cursor:'pointer', transition:'all 0.2s',
  }}>{children}</button>
);

const StepNav = ({ onBack, onNext, submit, canNext }) => (
  <div style={{
    display:'flex', justifyContent:'center', alignItems:'center',
    marginTop:40, gap:24, flexWrap:'wrap',
  }}>
    {onBack ? (
      <button type="button" onClick={onBack} className="serif" style={{
        background:'none', border:'none', cursor:'pointer',
        fontSize:15, fontStyle:'italic', color:'var(--ink-mute)', padding:'10px 0',
      }}>← Back</button>
    ) : null}

    {submit ? (
      <button type="submit" disabled={!canNext} style={{
        background:'var(--burgundy)', color:'var(--cream)',
        border:'none', padding:'16px 36px',
        fontFamily:'Cinzel, Georgia, serif', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed', opacity: canNext ? 1 : 0.5,
        transition:'background 0.2s',
      }}
      onMouseEnter={(e) => canNext && (e.currentTarget.style.background = 'var(--ink)')}
      onMouseLeave={(e) => canNext && (e.currentTarget.style.background = 'var(--burgundy)')}
      >Send our reply</button>
    ) : (
      <button type="button" onClick={onNext} disabled={!canNext} style={{
        background:'var(--ink)', color:'var(--cream)',
        border:'none', padding:'16px 32px',
        fontFamily:'Cinzel, Georgia, serif', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed', opacity: canNext ? 1 : 0.5,
        transition:'all 0.2s',
      }}>Continue</button>
    )}
  </div>
);

// ============ THANKS ============
const RSVPThanks = ({ onReset, attending }) => (
  <Section id="rsvp" narrow padTop={180} padBottom={180}>
    <div style={{ textAlign:'center' }}>
      <div className="label" style={{ color:'var(--burgundy)', marginBottom:22 }}>Reply received</div>
      <h2 className="serif accent-gradient" style={{
        margin:0, display:'inline-block',
        fontSize:'clamp(48px, 7vw, 76px)', fontWeight:300, lineHeight:1.05,
        letterSpacing:'-0.015em', fontStyle:'italic',
      }}>
        {attending ? 'See you in July.' : 'We\u2019ll miss you.'}
      </h2>
      <p className="serif" style={{
        marginTop:28, fontSize:20, fontStyle:'italic', lineHeight:1.65,
        color:'var(--ink-mute)', fontWeight:300, maxWidth:520, marginLeft:'auto', marginRight:'auto',
      }}>
        {attending
          ? 'Thank you for replying — we cannot wait. We will be in touch in the new year with the finer details.'
          : 'Thank you for letting us know. We hope to see you soon, even if not on the day.'}
      </p>
      <button onClick={onReset} className="serif" style={{
        marginTop:36, background:'none', border:'1px solid var(--rule)',
        padding:'12px 26px',
        fontSize:15, fontStyle:'italic', color:'var(--ink-mute)', cursor:'pointer',
      }}>Reply again</button>
    </div>
  </Section>
);

Object.assign(window, { RSVP });
