// RSVP — opened as a popup from anywhere on the site. The guest enters their
// invitation code, we verify it (POST /api/lookup), then the multi-step wizard
// pre-fills with their party and captures the reply (POST /api/rsvp). The code
// is remembered in localStorage so a returning guest skips straight to the form.

const TOKEN_KEY = 'rk_guest_v1';
const REPLIED_KEY = 'rk_replied_v1';   // { at: iso, attending: bool } once they've submitted

const getReplied = () => {
  try { return JSON.parse(localStorage.getItem(REPLIED_KEY) || 'null'); } catch (e) { return null; }
};

// Async lookup against the server. Returns a guest object on success or null.
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

const MEAL_OPTIONS = {
  starter: [
    { id:'s1', name:'Chargrilled chicken salad', note:'cos lettuce, croutons, caesar dressing, parmesan shavings' },
    { id:'s2', name:'Feta & watermelon salad', note:'toasted walnuts, mint dressing' },
  ],
  main: [
    { id:'m1', name:'Roast sirloin of British beef', note:'herb Yorkshire pudding, buttery mash, rich roast gravy' },
    { id:'m2', name:'Pan-fried potato gnocchi',      note:'roasted squash, lemon & cracked pepper, wilted rocket' },
  ],
  pudding: [
    { id:'p1', name:'Chocolate caramel brownie',          note:'vanilla ice cream, dark chocolate sauce' },
    { id:'p2', name:'Cinnamon spiced apple crumble tart', note:'vegan custard' },
  ],
};

// The wizard tracks picks by option id; the submitted reply carries the dish
// name so the admin table and the caterer's CSV read "Roast sirloin…", not "m1".
const mealName = (course, id) => MEAL_OPTIONS[course].find(o => o.id === id)?.name || '';

const blankGuest = (name = '') => ({ name, attending:'yes', starter:'', main:'', pudding:'', dietary:'' });

// Seed the guest rows from the invitation code's named list.
const seedGuests = (guest) =>
  (guest?.guests?.length ? guest.guests : ['']).map(name => blankGuest(name));

// ============================================================
// RSVP SECTION — a call-to-action block. The form itself lives in the popup.
// ============================================================
const RSVP = ({ onRsvp }) => {
  const replied = getReplied();
  return (
  <Section id="rsvp" narrow padTop={140} padBottom={160}>
    <Heading eyebrow={replied ? 'Reply received' : 'Please reply by 1st April 2027'}>
      {replied ? <>All <em>set.</em></> : <><em>Kindly</em> reply.</>}
    </Heading>
    <p className="serif" style={{
      margin:'0 auto 40px', textAlign:'center', maxWidth:480,
      fontSize:'clamp(16px, 1.8vw, 19px)', fontStyle:'italic', fontWeight:400,
      color:'var(--ink-mute)', lineHeight:1.6,
    }}>
      {replied
        ? (replied.attending
            ? 'We’ve got you down — see you in July. Plans change? You can update your reply any time before 1st April 2027.'
            : 'Thank you for letting us know. If plans change, you can update your reply any time before 1st April 2027.')
        : 'Pop in the code from your invitation and let us know whether you can join us.'}
    </p>
    <div style={{ textAlign:'center' }}>
      <button type="button" onClick={onRsvp} style={{
        background:'var(--burgundy)', color:'var(--cream)', border:'none', cursor:'pointer',
        padding:'18px 44px',
        fontFamily:"'Cinzel', Georgia, serif", fontSize:11, fontWeight:500,
        letterSpacing:'0.36em', textTransform:'uppercase', textIndent:'0.36em',
        transition:'background 0.3s ease, letter-spacing 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.letterSpacing = '0.46em'; e.currentTarget.style.textIndent = '0.46em'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--burgundy)'; e.currentTarget.style.letterSpacing = '0.36em'; e.currentTarget.style.textIndent = '0.36em'; }}
      >{replied ? 'Change your reply' : 'Reply to your invitation'}</button>
    </div>
  </Section>
  );
};

// ============================================================
// MODAL SHELL — backdrop + dialog. Holds the code step or the wizard.
// ============================================================
const RsvpModal = ({ onClose }) => {
  const [guest, setGuest] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null'); } catch (e) { return null; }
  });

  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;   // restore focus here on close
    if (dialog) dialog.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      // Keep Tab cycling inside the dialog while it's open.
      if (e.key !== 'Tab' || !dialog) return;
      const focusables = dialog.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || current === dialog)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && current === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      if (opener && opener.focus) opener.focus();
    };
  }, [onClose]);

  const onUnlock = (g) => {
    try { localStorage.setItem(TOKEN_KEY, JSON.stringify(g)); } catch (e) {}
    setGuest(g);
  };
  const changeCode = () => {
    try { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(REPLIED_KEY); } catch (e) {}
    setGuest(null);
  };

  return (
    <div className="rsvp-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} tabIndex={-1} className="rsvp-dialog" role="dialog" aria-modal="true" aria-label="Reply to your invitation" style={{ outline:'none' }}>
        <button className="rsvp-dialog-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="rsvp-dialog-body">
          {guest
            ? <RsvpWizard guest={guest} onChangeCode={changeCode} onDone={onClose} />
            : <RsvpCodeStep onUnlock={onUnlock} />}
        </div>
      </div>

      <style>{`
        .rsvp-overlay{
          position:fixed; inset:0; z-index:1000;
          background:rgba(26,20,22,0.55);
          -webkit-backdrop-filter:blur(3px); backdrop-filter:blur(3px);
          /* flex-start + auto margins on the dialog centres it when it fits
             and lets the overlay scroll (without clipping the top) when it
             doesn't — the classic flex-centring-in-a-scroll-container fix. */
          display:flex; align-items:flex-start; justify-content:center;
          padding:24px 16px; overflow-y:auto;
          animation: rsvp-fade 0.25s ease-out;
        }
        .rsvp-dialog{
          position:relative; width:100%; max-width:600px;
          margin-top:auto; margin-bottom:auto;
          background:linear-gradient(180deg, var(--paper) 0%, var(--cream) 100%);
          border:1px solid var(--rule);
          box-shadow:0 30px 80px -20px rgba(26,20,22,0.4);
          animation: rsvp-rise 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .rsvp-dialog-close{
          position:absolute; top:12px; right:14px; z-index:2;
          background:none; border:none; cursor:pointer;
          font-size:26px; line-height:1; color:var(--ink-mute);
          width:36px; height:36px; border-radius:50%;
          transition:background 0.2s, color 0.2s;
        }
        .rsvp-dialog-close:hover{ background:var(--cream-deep); color:var(--burgundy); }
        .rsvp-dialog-body{ padding:44px 40px 36px; }
        @media (max-width:560px){ .rsvp-dialog-body{ padding:44px 22px 28px; } }
        @keyframes rsvp-fade{ from{ opacity:0; } to{ opacity:1; } }
        @keyframes rsvp-rise{ from{ opacity:0; transform:translateY(16px); } to{ opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce){
          .rsvp-overlay, .rsvp-dialog{ animation:none !important; }
        }
      `}</style>
    </div>
  );
};

// ============ CODE STEP ============
const RsvpCodeStep = ({ onUnlock }) => {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (busy) return;
    setBusy(true);
    const g = await lookupGuest(val);
    setBusy(false);
    if (g) onUnlock(g);
    else setErr(true);
  };

  return (
    <div style={{ textAlign:'center' }}>
      <div className="label" style={{ color:'var(--burgundy)', marginBottom:18 }}>Your invitation</div>
      <h2 className="serif accent-gradient" style={{
        margin:0, display:'inline-block',
        fontSize:'clamp(34px, 6vw, 48px)', fontWeight:300, fontStyle:'italic',
        lineHeight:1.05, letterSpacing:'-0.01em',
      }}>Reply</h2>
      <p className="serif" style={{
        margin:'20px auto 0', maxWidth:380,
        fontSize:'clamp(15px, 1.7vw, 17px)', fontStyle:'italic', fontWeight:400,
        color:'var(--ink-mute)', lineHeight:1.6,
      }}>
        Enter the code from your invitation to find your party.
      </p>

      <form onSubmit={submit} style={{ marginTop:32 }}>
        <input
          ref={inputRef}
          type="text"
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(false); }}
          placeholder="e.g. nile2027"
          autoComplete="off"
          spellCheck="false"
          aria-label="Invitation code"
          style={{
            width:'100%', maxWidth:320,
            background:'transparent', border:'none',
            borderBottom:`1px solid ${err ? 'var(--burgundy)' : 'var(--rule)'}`,
            color:'var(--ink)',
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize:22, fontStyle:'italic', textAlign:'center',
            padding:'10px 0', outline:'none', letterSpacing:'0.04em',
            transition:'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
          onBlur={(e) => e.target.style.borderBottomColor = err ? 'var(--burgundy)' : 'var(--rule)'}
        />
        <div role="status" aria-live="polite" style={{
          minHeight:18, marginTop:12,
          fontFamily:"'Cormorant Garamond', Georgia, serif",
          fontSize:14, fontStyle:'italic', color:'var(--burgundy)',
          opacity: err ? 1 : 0, transition:'opacity 0.2s',
        }}>
          {err ? 'We couldn’t find that code. Please check your invitation.' : ' '}
        </div>
        <button type="submit" disabled={busy} style={{
          marginTop:20, background:'var(--ink)', color:'var(--cream)', border:'none',
          padding:'16px 40px', cursor: busy ? 'wait' : 'pointer',
          fontFamily:"'Cinzel', Georgia, serif", fontSize:11, fontWeight:500,
          letterSpacing:'0.36em', textTransform:'uppercase', textIndent:'0.36em',
          opacity: busy ? 0.6 : 1, transition:'background 0.2s',
        }}>{busy ? 'Checking…' : 'Continue'}</button>
      </form>
    </div>
  );
};

// ============ WIZARD ============
const RsvpWizard = ({ guest, onChangeCode, onDone }) => {
  const [step, setStep]   = React.useState(0);
  const [guests, setGuests] = React.useState(() => seedGuests(guest));
  const [message, setMessage] = React.useState('');
  const [songs, setSongs] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const update = (i, k, v) => setGuests(g => g.map((x, idx) => idx === i ? { ...x, [k]:v } : x));

  const anyAttending = guests.some(g => g.attending === 'yes');

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      code: guest?.code, household: guest?.household, message, songs,
      // Meal picks live in state as option ids; send the dish names.
      guests: guests.map(g => ({
        ...g,
        starter: mealName('starter', g.starter),
        main:    mealName('main',    g.main),
        pudding: mealName('pudding', g.pudding),
      })),
    };

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`server returned ${res.status}`);
      const body = await res.json();
      if (!body.ok) throw new Error(body.error || 'unknown');
      try {
        localStorage.setItem(REPLIED_KEY, JSON.stringify({ at: new Date().toISOString(), attending: anyAttending }));
      } catch (err2) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Sorry, we couldn’t send your reply just then. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <RSVPThanks attending={anyAttending} onClose={onDone} />;

  const steps = ['Your party', anyAttending ? 'Menu' : 'A note', 'Confirm'];

  return (
    <div>
      {/* Who we're replying as, with an escape hatch to switch codes */}
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <span className="label" style={{ color:'var(--ink-mute)' }}>Replying as {guest.household}</span>
        <button type="button" onClick={onChangeCode} className="serif" style={{
          marginLeft:12, background:'none', border:'none', cursor:'pointer',
          fontSize:14, fontStyle:'italic', color:'var(--burgundy)',
          textDecoration:'underline', textUnderlineOffset:4,
        }}>Not you?</button>
      </div>

      <h2 className="serif accent-gradient" style={{
        margin:'0 0 32px', textAlign:'center', display:'block',
        fontSize:'clamp(26px, 5vw, 36px)', fontWeight:300, fontStyle:'italic',
        lineHeight:1.05, letterSpacing:'-0.01em',
      }}><em>Kindly</em> reply.</h2>

      {/* Stepper — slim, text-only. Active step burgundy italic; done steps
          clickable to go back; upcoming steps muted. Hairline separators. */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'center',
        gap:14, margin:'0 0 44px', flexWrap:'wrap',
      }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className="serif"
              style={{
                background:'none', border:'none', padding:0,
                cursor: i < step ? 'pointer' : 'default',
                fontSize:15, fontStyle: i === step ? 'italic' : 'normal',
                color: i === step ? 'var(--burgundy)' : (i < step ? 'var(--ink)' : 'var(--ink-mute)'),
                opacity: i > step ? 0.5 : 1,
                letterSpacing:'0.01em', whiteSpace:'nowrap',
              }}
            >{s}</button>
            {i < steps.length - 1 && <span style={{ width:20, height:1, background:'var(--rule)' }} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={submit}>
        {step === 0 && (
          <StepGuests guests={guests} update={update} onNext={() => setStep(1)} />
        )}
        {step === 1 && anyAttending && (
          <StepMeals guests={guests} update={update} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        )}
        {step === 1 && !anyAttending && (
          <StepRegrets message={message} setMessage={setMessage} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <StepConfirm
            guests={guests} anyAttending={anyAttending}
            message={message} setMessage={setMessage}
            songs={songs} setSongs={setSongs}
            onBack={() => setStep(1)}
            submitting={submitting} submitError={submitError}
          />
        )}
      </form>
    </div>
  );
};

// ============ STEP 1: GUESTS ============
// Names come pre-filled from the invitation code's guest list. The guest can
// still tweak the spelling for the place card; the party size is fixed by the code.
const StepGuests = ({ guests, update, onNext }) => {
  const canNext = guests.every(g => g.name.trim());

  return (
    <div>
      <p className="serif" style={{
        margin:'0 auto 36px', textAlign:'center', maxWidth:440,
        fontSize:17, fontStyle:'italic', fontWeight:400, color:'var(--ink-mute)', lineHeight:1.65,
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
          <Field label="Name" value={g.name} onChange={(v) => update(i, 'name', v)}
            placeholder="as you would like it on the place card" />

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

      <StepNav onNext={onNext} canNext={canNext} />
    </div>
  );
};

// ============ STEP 2: MEALS ============
const StepMeals = ({ guests, update, onBack, onNext }) => (
  <div>
    <p className="serif" style={{
      margin:'0 auto 32px', textAlign:'center', maxWidth:480,
      fontSize:17, fontStyle:'italic', fontWeight:400, color:'var(--ink-mute)', lineHeight:1.65,
    }}>
      Three courses, two choices per course. Pick one of each for everyone in your party.
    </p>

    {guests.filter(g => g.attending === 'yes').map((g) => {
      const i = guests.indexOf(g);
      return (
        <div key={i} style={{ marginTop:36, paddingTop:24, borderTop:'1px solid var(--rule)' }}>
          <h4 className="serif" style={{
            margin:'0 0 22px', fontSize:24, fontWeight:400, fontStyle:'italic', color:'var(--burgundy)',
          }}>For {g.name || `Guest ${String.fromCharCode(65 + i)}`}</h4>

          {['starter','main','pudding'].map(course => (
            <div key={course} style={{ marginBottom:22 }}>
              <div className="label" style={{ marginBottom:10 }}>{course === 'main' ? 'Main' : course}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="meal-grid">
                {MEAL_OPTIONS[course].map(opt => {
                  const on = g[course] === opt.id;
                  return (
                    <button key={opt.id} type="button" onClick={() => update(i, course, opt.id)} style={{
                      textAlign:'center',
                      background: on ? 'rgba(74,26,44,0.06)' : 'transparent',
                      color: on ? 'var(--burgundy)' : 'var(--ink)',
                      border:`1px solid ${on ? 'var(--burgundy)' : 'var(--rule)'}`,
                      padding:'16px 18px', cursor:'pointer', transition:'all 0.2s',
                    }}>
                      <div className="serif" style={{ fontSize:18, fontWeight:400, fontStyle:'italic', lineHeight:1.25 }}>{opt.name}</div>
                      <div className="serif" style={{
                        fontSize:13, fontStyle:'italic', marginTop:4, lineHeight:1.45, fontWeight:400, opacity:0.7,
                      }}>{opt.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginTop:18 }}>
            <Field label="Dietary notes or allergies" value={g.dietary}
              onChange={(v) => update(i, 'dietary', v)}
              placeholder="anything we should know, please be specific" />
          </div>
        </div>
      );
    })}

    <style>{`
      @media (max-width: 540px){ .meal-grid{ grid-template-columns:1fr !important; } }
    `}</style>

    <StepNav onBack={onBack} onNext={onNext} canNext />
  </div>
);

// ============ STEP 2b: REGRETS ============
const StepRegrets = ({ message, setMessage, onBack, onNext }) => (
  <div>
    <p className="serif" style={{
      margin:'0 auto 32px', textAlign:'center', maxWidth:480,
      fontSize:20, fontStyle:'italic', fontWeight:400, color:'var(--ink-mute)', lineHeight:1.65,
    }}>
      We&rsquo;re sorry you can&rsquo;t make it; we&rsquo;ll miss you. If you&rsquo;d like to leave a note, we&rsquo;d love to read it.
    </p>
    <Field label="Your message" value={message} onChange={setMessage}
      placeholder="as long or short as you like" multiline />
    <StepNav onBack={onBack} onNext={onNext} canNext />
  </div>
);

// ============ STEP 3: CONFIRM ============
const StepConfirm = ({ guests, anyAttending, message, setMessage, songs, setSongs, onBack, submitting, submitError }) => (
  <div>
    <p className="serif" style={{
      margin:'0 auto 32px', textAlign:'center', maxWidth:440,
      fontSize:17, fontStyle:'italic', fontWeight:400, color:'var(--ink-mute)', lineHeight:1.65,
    }}>
      {anyAttending ? 'One last thing or two, if you’d like.' : 'Please check the details below before sending.'}
    </p>

    {anyAttending && (
      <>
        <Field label="Song request" value={songs} onChange={setSongs}
          placeholder="the song that will get you on the dancefloor" />
        <div style={{ height:28 }} />
        <Field label="A message for the two of us" value={message} onChange={setMessage}
          placeholder="anything you'd like to say" multiline />
      </>
    )}

    <div style={{ marginTop:36, padding:'22px 24px', background:'rgba(74,26,44,0.04)', border:'1px solid var(--rule)' }}>
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

    {submitError && (
      <div role="alert" style={{
        marginTop:24, padding:'14px 18px',
        background:'rgba(74,26,44,0.08)', border:'1px solid var(--burgundy)',
        fontFamily:"'Cormorant Garamond', Georgia, serif",
        fontSize:15, fontStyle:'italic', color:'var(--burgundy)',
        textAlign:'center', lineHeight:1.55,
      }}>{submitError}</div>
    )}

    <StepNav onBack={onBack} submit canNext={!submitting} submitting={submitting} />
  </div>
);

// ============ ATOMS ============
const Field = ({ label, value, onChange, placeholder, type='text', multiline }) => (
  <label style={{ display:'block', textAlign:'center' }}>
    <div className="label" style={{ marginBottom:8 }}>{label}</div>
    {multiline ? (
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4}
        style={{
          width:'100%', background:'transparent', border:'none', borderBottom:'1px solid var(--ink-mute)',
          padding:'10px 0', resize:'vertical', outline:'none',
          fontFamily:"'Cormorant Garamond', Georgia, serif",
          fontSize:19, fontStyle:'italic', fontWeight:400, color:'var(--ink)',
          transition:'border-color 0.2s', textAlign:'center',
        }}
        onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
        onBlur={(e) => e.target.style.borderBottomColor = 'var(--ink-mute)'}
      />
    ) : (
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width:'100%', background:'transparent', border:'none', borderBottom:'1px solid var(--ink-mute)',
          padding:'10px 0', outline:'none',
          fontFamily:"'Cormorant Garamond', Georgia, serif",
          fontSize:20, fontStyle:'italic', fontWeight:400, color:'var(--ink)',
          transition:'border-color 0.2s', textAlign:'center',
        }}
        onFocus={(e) => e.target.style.borderBottomColor = 'var(--burgundy)'}
        onBlur={(e) => e.target.style.borderBottomColor = 'var(--ink-mute)'}
      />
    )}
  </label>
);

const Chip = ({ selected, onClick, children }) => (
  <button type="button" onClick={onClick} style={{
    background: selected ? 'rgba(74,26,44,0.06)' : 'transparent',
    color: selected ? 'var(--burgundy)' : 'var(--ink)',
    border:`1px solid ${selected ? 'var(--burgundy)' : 'var(--rule)'}`,
    padding:'11px 22px',
    fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:18, fontWeight:400, fontStyle:'italic',
    cursor:'pointer', transition:'all 0.2s',
  }}>{children}</button>
);

const StepNav = ({ onBack, onNext, submit, canNext, submitting }) => (
  <div style={{
    display:'flex', justifyContent:'center', alignItems:'center', marginTop:40, gap:24, flexWrap:'wrap',
  }}>
    {onBack ? (
      <button type="button" onClick={onBack} className="serif" style={{
        background:'none', border:'none', cursor:'pointer',
        fontSize:15, fontStyle:'italic', color:'var(--ink-mute)', padding:'10px 0',
      }}>← Back</button>
    ) : null}

    {submit ? (
      <button type="submit" disabled={!canNext || submitting} style={{
        background:'var(--burgundy)', color:'var(--cream)', border:'none', padding:'16px 36px',
        fontFamily:'Cinzel, Georgia, serif', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        cursor: (canNext && !submitting) ? 'pointer' : 'not-allowed', opacity: (canNext && !submitting) ? 1 : 0.5,
        transition:'background 0.2s',
      }}
      onMouseEnter={(e) => canNext && !submitting && (e.currentTarget.style.background = 'var(--ink)')}
      onMouseLeave={(e) => canNext && !submitting && (e.currentTarget.style.background = 'var(--burgundy)')}
      >{submitting ? 'Sending…' : 'Send our reply'}</button>
    ) : (
      <button type="button" onClick={onNext} disabled={!canNext} style={{
        background:'var(--ink)', color:'var(--cream)', border:'none', padding:'16px 32px',
        fontFamily:'Cinzel, Georgia, serif', fontSize:10.5, fontWeight:500,
        letterSpacing:'0.3em', textTransform:'uppercase',
        cursor: canNext ? 'pointer' : 'not-allowed', opacity: canNext ? 1 : 0.5,
        transition:'all 0.2s',
      }}>Continue</button>
    )}
  </div>
);

// ============ CONFETTI ============
// A brief fall of petals over the whole viewport when a party accepts.
// DOM-only, pointer-transparent, removed after the last petal lands.
const CONFETTI_COLORS = ['#4A1A2C', '#A8326B', '#D4A5A5', '#EDE3D4', '#5B2A4A'];
const ConfettiBurst = () => {
  const pieces = React.useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.7,
    dur: 2.6 + Math.random() * 1.8,
    size: 7 + Math.random() * 8,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    sway: Math.round(Math.random() * 140 - 70),
    spin: Math.round(Math.random() * 540 + 180),
  })), []);
  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:1100, pointerEvents:'none', overflow:'hidden' }}>
      {pieces.map((p, i) => (
        <span key={i} style={{
          position:'absolute', top:-24, left:`${p.left}%`,
          width:p.size, height:p.size * 0.62,
          background:p.color, borderRadius:'80% 20% 60% 40%',
          opacity:0,
          '--sway': `${p.sway}px`, '--spin': `${p.spin}deg`,
          animation:`petal-fall ${p.dur}s ease-in ${p.delay}s forwards`,
        }} />
      ))}
      <style>{`
        @keyframes petal-fall{
          0%{ transform:translate(0, 0) rotate(0); opacity:0; }
          8%{ opacity:0.95; }
          100%{ transform:translate(var(--sway), 105vh) rotate(var(--spin)); opacity:0.65; }
        }
      `}</style>
    </div>
  );
};

// ============ THANKS ============
const RSVPThanks = ({ onClose, attending }) => {
  const [confetti, setConfetti] = React.useState(false);
  React.useEffect(() => {
    if (!attending) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setConfetti(true);
    const t = setTimeout(() => setConfetti(false), 5500);
    return () => clearTimeout(t);
  }, [attending]);

  return (
  <div style={{ textAlign:'center', padding:'12px 0' }}>
    {confetti && <ConfettiBurst />}
    <div className="label" style={{ color:'var(--burgundy)', marginBottom:22 }}>Reply received</div>
    <h2 className="serif accent-gradient" style={{
      margin:0, display:'inline-block',
      fontSize:'clamp(40px, 8vw, 64px)', fontWeight:300, lineHeight:1.05,
      letterSpacing:'-0.015em', fontStyle:'italic',
    }}>
      {attending ? 'See you in July.' : 'We’ll miss you.'}
    </h2>
    <p className="serif" style={{
      marginTop:24, fontSize:19, fontStyle:'italic', lineHeight:1.6,
      color:'var(--ink-mute)', fontWeight:400, maxWidth:460, marginLeft:'auto', marginRight:'auto',
    }}>
      {attending
        ? 'Thank you for replying. We cannot wait. We will be in touch in the new year with the finer details.'
        : 'Thank you for letting us know. We hope to see you soon, even if not on the day.'}
    </p>
    <button onClick={onClose} className="serif" style={{
      marginTop:36, background:'none', border:'1px solid var(--rule)', padding:'12px 26px',
      fontSize:15, fontStyle:'italic', color:'var(--ink-mute)', cursor:'pointer',
    }}>Close</button>
  </div>
  );
};

Object.assign(window, { RSVP, RsvpModal });
