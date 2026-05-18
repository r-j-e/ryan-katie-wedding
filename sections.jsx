// Quiet, imagery-led wedding site. Single column, generous whitespace,
// cream throughout, restrained type. No ornament — no roman numerals,
// page numbers, "fig" captions, running heads, multi-column layouts.

// ============================================================
// NAMES — matches the printed Canva invite:
//   Amoresa script capitals + Cinzel caps body.
//   Default order: Katie & Ryan (her first, as on the invite).
//   stacked=true   → Katie / & / Ryan (the invite's vertical lockup)
//   stacked=false  → Katie & Ryan in one line (used in nav/footer)
// ============================================================
const Names = ({ stacked = false, size = 'inherit', color }) => {
  if (stacked) {
    return (
      <span className="script-name stacked" style={{ fontSize: size, color }}>
        <span className="line"><span className="script">K</span><span className="caps">atie</span></span>
        <span className="line ampline"><span className="script amp">&amp;</span></span>
        <span className="line"><span className="script">R</span><span className="caps">yan</span></span>
      </span>);

  }
  return (
    <span className="script-name" style={{ fontSize: size, color }}>
      <span className="script">K</span><span className="caps">atie</span>
      <span className="script amp">&amp;</span>
      <span className="script">R</span><span className="caps">yan</span>
    </span>);

};

// ============================================================
// NAV — minimal, top-fixed, dot-separated, fades in on scroll
// ============================================================
const Nav = ({ active, guest, onSignOut }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'day',     label: 'The day' },
    { id: 'venue',   label: 'Venue' },
    { id: 'travel',  label: 'Travel' },
    { id: 'party',   label: 'Party' },
    { id: 'details', label: 'Details' },
    { id: 'faqs',    label: 'FAQs' },
    { id: 'rsvp',    label: 'RSVP' },
  ];

  const go = (id) => (e) => {
    e.preventDefault(); setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,237,228,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(1.05)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.05)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition: 'all 0.35s ease', padding: '16px 28px'
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
        position: 'relative'
      }}>
        <ul className="nav-desktop" style={{
          display: 'flex', alignItems: 'center', gap: 0, listStyle: 'none', margin: 0, padding: 0
        }}>
          {links.map((l, i) =>
            <li key={l.id} style={{ display: 'flex', alignItems: 'center' }}>
              <a href={`#${l.id}`} onClick={go(l.id)} style={{
                textDecoration: 'none', padding: '6px 14px',
                color: active === l.id ? 'var(--burgundy)' : 'var(--ink)',
                fontSize: 13, fontWeight: 400, letterSpacing: '0.02em',
                fontFamily: "'Cinzel', Georgia, serif",
                fontStyle: active === l.id ? 'italic' : 'normal',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap'
              }}>{l.label}</a>
              {i < links.length - 1 &&
                <span style={{ width: 3, height: 3, background: 'var(--ink-mute)', opacity: 0.4, borderRadius: '50%' }} />
              }
            </li>
          )}
        </ul>

        {/* Guest greeting — always visible on desktop */}
        {guest && (
          <div className="nav-guest" style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 10, fontWeight: 400,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--ink-mute)', textIndent: '0.32em',
              whiteSpace: 'nowrap',
            }}>{guest.household}</span>
            <button onClick={onSignOut} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 10, fontWeight: 400,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--burgundy)', textIndent: '0.32em',
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '6px',
              opacity: 0.7,
            }}>Sign out</button>
          </div>
        )}

        <button onClick={() => setMobileOpen(true)} className="nav-mobile-toggle" aria-label="Menu" style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          display: 'none', color: 'var(--ink)',
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'
        }}>
          <svg width="20" height="14" viewBox="0 0 20 14"><line x1="0" y1="3" x2="20" y2="3" stroke="currentColor" /><line x1="0" y1="11" x2="20" y2="11" stroke="currentColor" /></svg>
        </button>
      </div>

      {mobileOpen &&
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--cream)', zIndex: 60,
          display: 'flex', flexDirection: 'column', padding: '24px 28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--ink)' }}>
              <Names size={20} />
            </span>
            <button onClick={() => setMobileOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Cinzel', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink)'
            }}>Close</button>
          </div>

          {guest &&
            <div style={{
              marginTop: 24, paddingBottom: 16, borderBottom: '1px solid var(--rule-soft)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 11, fontWeight: 400,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--ink-mute)', textIndent: '0.32em',
              }}>Welcome, {guest.household}</div>
            </div>
          }

          <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map((l) =>
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="serif" style={{
                  textDecoration: 'none', color: 'var(--ink)', fontSize: 30, fontStyle: 'italic', fontWeight: 300
                }}>{l.label}</a>
              </li>
            )}
          </ul>

          {guest &&
            <button onClick={() => { setMobileOpen(false); onSignOut(); }} style={{
              marginTop: 24, alignSelf: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 11, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'var(--burgundy)', textIndent: '0.32em',
              borderBottom: '1px solid var(--burgundy)', padding: '6px 0',
            }}>Sign out</button>
          }
        </div>
      }

      <style>{`
        @media (max-width: 980px){
          .nav-desktop{ display:none !important; }
          .nav-mobile-toggle{ display:block !important; }
          .nav-guest{ display:none !important; }
        }
      `}</style>
    </nav>
  );
};

// ============================================================
// COMMON
// ============================================================
const useCountdown = (iso) => {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(iso) - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff % 86400000 / 3600000),
    minutes: Math.floor(diff % 3600000 / 60000),
    seconds: Math.floor(diff % 60000 / 1000),
    total: diff
  };
};

// Build a downloadable .ics calendar invite.
const WEDDING_ICS = [
'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ryan and Katie//Wedding//EN',
'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
'BEGIN:VEVENT',
'UID:rk-wedding-02jul2027@ryanandkatie.co',
'DTSTAMP:20260514T000000Z',
'DTSTART:20270702T120000Z', 'DTEND:20270702T230000Z',
'SUMMARY:Ryan & Katie\u2019s Wedding',
'LOCATION:St Audries Park\\, West Quantoxhead\\, Somerset TA4 4DS',
'DESCRIPTION:The wedding of Ryan & Katie. Black tie. Full details at ryanandkatie.co',
'STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT', 'END:VCALENDAR'].
join('\r\n');

const downloadIcs = () => {
  try {
    const blob = new Blob([WEDDING_ICS], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;a.download = 'ryan-and-katie-02-jul-2027.ics';
    document.body.appendChild(a);a.click();
    setTimeout(() => {document.body.removeChild(a);URL.revokeObjectURL(url);}, 100);
  } catch (e) {console.warn('ics download failed', e);}
};

// Section container — single column, generous padding, centered.
const Section = ({ id, tint = false, narrow = false, children, padTop = 160, padBottom = 160, style = {} }) =>
<section id={id} style={{
  padding: `${padTop}px 24px ${padBottom}px`,
  background: tint ? 'var(--cream-deep)' : 'var(--cream)',
  position: 'relative',
  textAlign: 'center',
  ...style
}}>
    <div style={{ maxWidth: narrow ? 660 : 1000, margin: '0 auto' }}>
      {children}
    </div>
  </section>;


// Section heading — one line, restrained, always centered.
const Heading = ({ children, eyebrow }) =>
<header style={{ marginBottom: 56, textAlign: 'center' }}>
    {eyebrow && <div className="label" style={{ marginBottom: 18 }}>{eyebrow}</div>}
    <h2 className="serif" style={{
    margin: 0,
    fontSize: 'clamp(40px, 5.5vw, 64px)',
    fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)', letterSpacing: '-0.015em'
  }}>{children}</h2>
  </header>;


// ============================================================
// HERO — single big image, names below, date/venue beneath.
// Subtle ken-burns on image, staggered fade-in on the type.
// ============================================================
const Hero = ({ showCountdown = true }) => {
  const { days, hours, minutes, seconds, total } = useCountdown('2027-07-02T13:00:00');

  return (
    <section id="top" style={{
      background: 'var(--cream)', padding: '120px 24px 80px',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: 880, margin: '0 auto', width: '100%', textAlign: 'center'
      }}>
        {/* Tiny eyebrow — copy lifted from the invite */}
        <div className="label hero-anim-1" style={{ marginBottom: 96 }}>
          Please join us in celebrating the marriage of
        </div>

        {/* Names — Katie & Ryan on one line */}
        <h1 className="hero-anim-3" style={{
          margin: 0,
          fontSize: 'clamp(28px, 4.4vw, 60px)',
          fontWeight: 300, lineHeight: 1.4, color: 'var(--ink)', letterSpacing: '-0.005em',
          padding: '0 16px'
        }}>
          <Names />
        </h1>

        {/* Date band — Friday · JUL 02 2027 · 1 o'clock — like the invite */}
        <DateBand className="hero-anim-4" />

        {/* Venue line, caps */}
        <div className="hero-anim-4" style={{
          marginTop: 23,
          fontFamily: 'Cinzel, Georgia, serif',
          fontSize: 'clamp(11px, 1.4vw, 13px)',
          fontWeight: 400, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--ink-soft)', lineHeight: 1.7,
          /* Half the letter-spacing as text-indent compensates for the
             trailing tracking — centres tracked-out caps on the same
             axis as untracked content (the 02 above). */
          textIndent: '0.12em'
        }}>
          St Audries Park, West Quantoxhead<br />
          Taunton, Somerset &nbsp;·&nbsp; TA4 4DS
        </div>

        {/* Countdown */}
        {showCountdown && total > 0 &&
        <div className="hero-anim-5" style={{
          marginTop: 62,
          display: 'inline-flex', alignItems: 'baseline', gap: 18,
          color: 'var(--ink)'
        }}>
            <CdCell n={days} label="days" />
            <CdSep />
            <CdCell n={hours} label="hours" />
            <CdSep />
            <CdCell n={minutes} label="minutes" />
            <CdSep />
            <CdCell n={seconds} label="seconds" />
          </div>
        }
        {showCountdown && total === 0 &&
        <div className="serif hero-anim-5" style={{
          marginTop: 62, fontSize: 18, fontStyle: 'italic', color: 'var(--burgundy)'
        }}>today is the day</div>
        }

        {/* Scroll cue — a subtle indicator nudging guests onward */}
        <div className="hero-anim-6" style={{ marginTop: 56, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('day');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
            }}
            className="scroll-cue"
            aria-label="Scroll for more"
            style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: 'var(--ink-mute)'
            }}>
            <span style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 10, fontWeight: 400,
              letterSpacing: '0.36em', textTransform: 'uppercase',
              color: 'var(--ink-mute)', opacity: 0.7
            }}>Scroll</span>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true" style={{ opacity: 0.55 }}>
              <line x1="7" y1="0" x2="7" y2="16" stroke="currentColor" strokeWidth="1" />
              <polyline points="1,12 7,18 13,12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1) translate(0, 0); }
          50%  { transform: scale(1.06) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes rise {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes driftIn {
          from { opacity:0; letter-spacing: 0.18em; }
          to   { opacity:0.7; letter-spacing: 0.01em; }
        }
        .hero-kenburns{ animation: kenBurns 22s ease-in-out infinite; }
        .hero-anim-1{ animation: rise 1s ease-out 0.10s both; }
        .hero-anim-2{ animation: rise 1.2s ease-out 0.25s both; }
        .hero-anim-3{ animation: rise 1.0s ease-out 0.55s both; }
        .hero-anim-4{ animation: driftIn 1.4s ease-out 0.85s both; }
        .hero-anim-5{ animation: rise 0.9s ease-out 1.10s both; }
        .hero-anim-6{ animation: rise 0.9s ease-out 1.35s both; }
        @keyframes scrollNudge {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50%      { transform: translateY(5px); opacity: 1; }
        }
        .scroll-cue svg{ animation: scrollNudge 2.4s ease-in-out infinite; }
        .scroll-cue:hover svg{ opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hero-kenburns,
          .hero-anim-1, .hero-anim-2, .hero-anim-3,
          .hero-anim-4, .hero-anim-5, .hero-anim-6,
          .scroll-cue svg { animation: none !important; }
        }
      `}</style>
    </section>);

};

const CdCell = ({ n, label }) =>
<span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <span className="serif" style={{
    fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1, color: 'var(--ink)',
    fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em'
  }}>{String(n).padStart(2, '0')}</span>
    <span style={{
    fontFamily: 'Cinzel', fontSize: 9.5, fontWeight: 400,
    letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)',
    textIndent: '0.12em'
  }}>{label}</span>
  </span>;


const CdSep = () =>
<span style={{
  width: 1, alignSelf: 'stretch', background: 'var(--ink-mute)', opacity: 0.3
}} />;


// Date band — Friday · JUL 02 2027 · 1 o'clock, with hairline rules
// flanking the date. Pulled straight from the invite's date treatment.
// Uses a 3-column grid (1fr auto 1fr) so the JUL/02/2027 column is locked
// to true page-centre regardless of the widths of FRIDAY and 1 O'CLOCK.
const DateBand = ({ className }) =>
<div className={className} style={{
  marginTop: 44,
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  columnGap: 25,
  maxWidth: 720, margin: '44px auto 0',
  color: 'var(--ink)'
}}>
    {/* LEFT cell — Friday, right-aligned toward the date column */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: "0px 3px 0px 0px" }}>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(11px, 1.4vw, 13px)',
      fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      textIndent: '0.32em'
    }}>Friday</span>
    </div>

    {/* CENTRE cell — JUL / 02 / 2027 stacked. This column auto-sizes to
    its content and the surrounding 1fr columns guarantee it sits on
    true page-centre. */}
    <span style={{
    display: 'inline-flex', flexDirection: 'column', alignItems: 'center', rowGap: 14
  }}>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(11px, 1.4vw, 13px)',
      fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      textIndent: '0.32em',
      lineHeight: 0.72
    }}>Jul</span>
      <span className="serif accent-gradient" style={{
      fontWeight: 400,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 0.72, fontSize: "46.5px"
    }}>02</span>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(10px, 1.2vw, 12px)',
      fontWeight: 400, letterSpacing: '0.32em',
      color: 'var(--ink-soft)',
      textIndent: '0.32em',
      lineHeight: 0.72
    }}>2027</span>
    </span>

    {/* RIGHT cell — 1 o'clock, left-aligned toward the date column */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(11px, 1.4vw, 13px)',
      fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      whiteSpace: 'nowrap',
      textIndent: '0.32em'
    }}>1 o&rsquo;clock</span>
    </div>
  </div>;


// ============================================================
// THE DAY — schedule with descriptions and a quiet timeline dot
// ============================================================
const SCHEDULE = [
  { time: '1:00 pm',  name: 'Arrival drinks',         desc: 'Guests arrive at St Audries Park. Champagne and elderflower cordial on the terrace.' },
  { time: '1:45 pm',  name: 'Ceremony',               desc: 'The Music Room. Please be seated by 1:30. The service runs about thirty minutes.' },
  { time: '2:30 pm',  name: 'Canapés & photographs', desc: 'Drinks, canapés, and group photographs on the lawn and in the walled garden.' },
  { time: '4:30 pm',  name: 'Wedding breakfast',      desc: 'A formal three-course dinner in the Dining Room, with speeches to follow.' },
  { time: '7:30 pm',  name: 'Cake & first dance',     desc: 'Cutting of the cake, then the first dance. Evening guests warmly welcomed.' },
  { time: '8:00 pm',  name: 'Reception',              desc: 'Live band and DJ. A late buffet at ten — for those still standing.' },
  { time: '12:00 am', name: 'Carriages',              desc: 'Last orders at half past eleven. Taxis pre-booked from the venue.' },
];

const Schedule = () => (
  <Section id="day" tint padTop={140} padBottom={140}>
    <PageHeading eyebrow="The order of the day" title="The Day" intro="A rough shape — times will firm up nearer July." />

    <ol style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: 740, position: 'relative' }} className="schedule-list">
      <div aria-hidden="true" style={{
        position: 'absolute', top: 40, bottom: 40, left: 140, width: 1,
        background: 'var(--rule-soft)',
      }} className="schedule-axis" />
      {SCHEDULE.map((item, i) => (
        <li key={i} style={{
          display: 'grid', gridTemplateColumns: '120px 40px 1fr',
          alignItems: 'flex-start', columnGap: 24,
          padding: '28px 0',
          borderBottom: i < SCHEDULE.length - 1 ? '1px solid var(--rule)' : 'none',
          position: 'relative',
        }} className="schedule-row">
          <div className="accent-gradient" style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 'clamp(15px, 1.7vw, 18px)', fontWeight: 500,
            letterSpacing: '0.04em', textAlign: 'right', paddingTop: 8,
            fontVariantNumeric: 'tabular-nums',
          }}>{item.time}</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40, marginTop: 2,
            border: '1px solid var(--rule)', borderRadius: '50%',
            background: 'var(--cream)', position: 'relative', zIndex: 1,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundImage: 'var(--accent-gradient)' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{
              margin: 0,
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(14px, 1.6vw, 17px)', fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--ink)', textIndent: '0.16em',
            }}>{item.name}</h3>
            <p style={{
              margin: '10px 0 0',
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(14px, 1.5vw, 16px)', fontStyle: 'italic',
              fontWeight: 300, lineHeight: 1.65, color: 'var(--ink-mute)',
            }}>{item.desc}</p>
          </div>
        </li>
      ))}
    </ol>
    <style>{`
      @media (max-width: 640px) {
        .schedule-axis{ display: none; }
        .schedule-row{ grid-template-columns: 88px 32px 1fr !important; column-gap: 14px !important; }
        .schedule-row > div:first-child{ font-size: 14px !important; padding-top: 4px !important; }
      }
    `}</style>
  </Section>
);


// ============================================================
// VENUE — image left, info right with definition list, two CTAs
// ============================================================
const Venue = () => (
  <Section id="venue" padTop={140} padBottom={140}>
    <PageHeading eyebrow="The setting" title="St Audries Park" />

    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72,
      alignItems: 'center', maxWidth: 1120, margin: '0 auto',
      textAlign: 'left',
    }} className="venue-grid">
      <image-slot id="venue-photo" shape="rect" placeholder="venue photograph"
        style={{ display: 'block', width: '100%', aspectRatio: '4 / 5' }}></image-slot>

      <div>
        <p style={{
          margin: '0 0 32px',
          fontFamily: 'Cinzel, Georgia, serif',
          fontSize: 'clamp(18px, 2vw, 22px)', fontStyle: 'italic', fontWeight: 300,
          lineHeight: 1.6, color: 'var(--ink)',
        }}>
          A Grade II* listed country house set within 100 acres of private parkland in the Quantock Hills, with sweeping views across the Bristol Channel to Wales.
        </p>

        <dl style={{
          margin: '0 0 36px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px',
        }} className="venue-dl">
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Address</dt>
            <dd style={{ margin: 0, fontFamily: 'Cinzel, Georgia, serif', fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.55, color: 'var(--ink)' }}>St Audries Park<br/>West Quantoxhead<br/>Taunton, Somerset TA4 4DS</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Ceremony</dt>
            <dd style={{ margin: 0, fontFamily: 'Cinzel, Georgia, serif', fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.55, color: 'var(--ink)' }}>The Music Room</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Reception</dt>
            <dd style={{ margin: 0, fontFamily: 'Cinzel, Georgia, serif', fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.55, color: 'var(--ink)' }}>The Dining Room &amp; Terrace</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Parking</dt>
            <dd style={{ margin: 0, fontFamily: 'Cinzel, Georgia, serif', fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.55, color: 'var(--ink)' }}>Ample, on-site</dd>
          </div>
        </dl>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ActionBtn href="https://www.google.com/maps?q=St+Audries+Park,+Somerset">Open in Maps</ActionBtn>
          <ActionBtn href="https://www.staudriespark.co.uk" ghost>Venue website</ActionBtn>
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 1120, margin: '80px auto 0' }}>
      <div style={{
        position: 'relative', aspectRatio: '21 / 9',
        border: '1px solid var(--rule)', overflow: 'hidden', background: 'var(--cream-deep)',
      }}>
        <iframe
          title="St Audries Park on Google Maps"
          src="https://www.google.com/maps?q=St+Audries+Park,+West+Quantoxhead,+Somerset+TA4+4DS&z=14&output=embed"
          style={{ border: 0, width: '100%', height: '100%', display: 'block', filter: 'saturate(0.75) contrast(0.96)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .venue-grid{ grid-template-columns: 1fr !important; gap: 48px !important; }
        .venue-dl{ grid-template-columns: 1fr !important; }
      }
    `}</style>
  </Section>
);


// ============================================================
// TRAVEL — three transport cards + accommodation cards
// ============================================================
const TRANSPORT = [
  { title: 'By Car',   body: 'From the M5, take Junction 23 or 24 and follow signs to the A39 toward Minehead. The venue is around 15 miles from the motorway. Free parking on site — cars may be left overnight.', detail: { label: 'Parking', value: 'Complimentary, on-site' } },
  { title: 'By Train', body: 'Taunton (25 min taxi) or Bridgwater (30 min). Both well served from London Paddington and Bristol Temple Meads.', detail: { label: 'Taxis', value: 'A1 Williton · 01984 000 000' } },
  { title: 'By Air',   body: 'Bristol Airport is the nearest major airport, about 50 miles away. Exeter and Cardiff are within a 90-minute drive.', detail: { label: 'Transfers', value: 'We can suggest car hire' } },
];

const STAYS = [
  { name: 'St Audries Park',       tagline: 'On site',        body: 'The house has rooms reserved for wedding guests at a preferential rate. Allocated first-come, first-served.', detail: 'From £180 / night', primary: true },
  { name: 'The Plough Inn',        tagline: '1.4 mi away',    body: 'A small coaching inn with seven rooms — quiet and well-run. Walkable in daylight, cab home after dark.', detail: 'From £120 / night' },
  { name: 'Combe House',           tagline: '4 mi away',      body: 'A country house hotel in Holford. Rooms held under Ryan & Katie until 1 April 2027.', detail: 'From £150 / night' },
  { name: 'The Castle Hotel',      tagline: '18 mi · Taunton',body: 'A historic four-star hotel in central Taunton — good for guests arriving by train.', detail: 'From £180 / night' },
];

const Travel = () => (
  <Section id="travel" tint padTop={140} padBottom={140}>
    <PageHeading eyebrow="Getting there" title="Travel & Stay" intro="It is a long way to Somerset, and a longer way home at midnight — please plan to stay." />

    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
      maxWidth: 1120, margin: '0 auto',
    }} className="travel-grid">
      {TRANSPORT.map((t, i) => (
        <Card key={i}>
          <CardTitle>{t.title}</CardTitle>
          <CardBody>{t.body}</CardBody>
          <CardDetail label={t.detail.label}>{t.detail.value}</CardDetail>
        </Card>
      ))}
    </div>

    <div style={{
      margin: '80px auto 48px', maxWidth: 480, textAlign: 'center',
      paddingTop: 36, borderTop: '1px solid var(--rule)',
    }}>
      <div style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 11, fontWeight: 400,
        letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--burgundy)', textIndent: '0.36em',
      }}>Where to stay</div>
      <p style={{
        margin: '20px 0 0',
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic',
        fontWeight: 300, lineHeight: 1.7, color: 'var(--ink-mute)',
      }}>
        A few favourites — in order of proximity. Booking links to follow.
      </p>
    </div>

    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
      maxWidth: 920, margin: '0 auto',
    }} className="stay-grid">
      {STAYS.map((s, i) => (
        <Card key={i} primary={s.primary}>
          <CardEyebrow>{s.primary ? 'Recommended · ' + s.tagline : s.tagline}</CardEyebrow>
          <CardTitle>{s.name}</CardTitle>
          <CardBody>{s.body}</CardBody>
          <CardDetail>{s.detail}</CardDetail>
        </Card>
      ))}
    </div>

    <style>{`
      @media (max-width: 900px) {
        .travel-grid, .stay-grid{ grid-template-columns: 1fr !important; }
      }
    `}</style>
  </Section>
);


// ============================================================
// WEDDING PARTY — two groups with avatar circles
// ============================================================
const PARTY_KATIE = [
  { initials: 'CA', role: 'Maid of Honour', name: 'Charlotte Ashworth', bio: 'Katie’s sister, confidante, and principal architect of the hen weekend.' },
  { initials: 'EP', role: 'Bridesmaid',      name: 'Eleanor Pemberton', bio: 'University roommate and Katie’s oldest friend since the age of seven.' },
  { initials: 'SW', role: 'Bridesmaid',      name: 'Sophia Whitmore',   bio: 'Godmother-in-waiting and the reason Katie and Ryan ever met.' },
  { initials: 'BH', role: 'Bridesmaid',      name: 'Beatrice Hartley',  bio: 'Cousin, travel companion, and the family’s unofficial photographer.' },
];
const PARTY_RYAN = [
  { initials: 'TW', role: 'Best Man',   name: 'Thomas Westbrook',    bio: 'Ryan’s brother, lifelong co-conspirator, and keeper of all the good stories.' },
  { initials: 'HC', role: 'Groomsman',  name: 'Henry Callaghan',     bio: 'School friend of twenty years and Ryan’s most loyal fishing companion.' },
  { initials: 'FA', role: 'Groomsman',  name: 'Frederick Ainsworth', bio: 'University housemate and godfather to our dog, Pip.' },
  { initials: 'AM', role: 'Groomsman',  name: 'Arthur Montague',     bio: 'Work colleague turned lifelong friend. Will likely give the second-best speech.' },
];

const WeddingParty = () => (
  <Section id="party" padTop={140} padBottom={140}>
    <PageHeading eyebrow="The people" title="Wedding Party" intro="Endlessly grateful to those standing beside us on the day." />

    <PartyGroup label="On Katie’s side" people={PARTY_KATIE} />
    <div style={{ height: 80 }} />
    <PartyGroup label="On Ryan’s side" people={PARTY_RYAN} />
  </Section>
);

const PartyGroup = ({ label, people }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <span style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 12, fontWeight: 400,
        letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--burgundy)', textIndent: '0.36em',
      }}>{label}</span>
    </div>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28,
      maxWidth: 1120, margin: '0 auto',
    }} className="party-grid">
      {people.map((p, i) => (
        <article key={i} style={{ textAlign: 'center', padding: '8px 12px' }}>
          <div style={{
            width: 124, height: 124, borderRadius: '50%',
            border: '1px solid var(--rule)', background: 'var(--cream-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 22px',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 36, fontWeight: 400, fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}><span className="accent-gradient">{p.initials}</span></div>
          <div style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 10, fontWeight: 400,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--burgundy)', textIndent: '0.32em',
            marginBottom: 8,
          }}>{p.role}</div>
          <div style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--ink)', textIndent: '0.14em',
            marginBottom: 12,
          }}>{p.name}</div>
          <p style={{
            margin: 0,
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 14, fontStyle: 'italic', fontWeight: 300,
            lineHeight: 1.6, color: 'var(--ink-mute)',
          }}>{p.bio}</p>
        </article>
      ))}
    </div>
    <style>{`
      @media (max-width: 900px) { .party-grid{ grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 540px) { .party-grid{ grid-template-columns: 1fr !important; } }
    `}</style>
  </div>
);


// ============================================================
// DETAILS — four cards: Dress, Gifts, Children, Photography
// ============================================================
const DETAILS = [
  { eyebrow: 'Dress Code',  headline: 'Black Tie',          body: 'Dinner jackets for gentlemen, long or cocktail dresses for ladies. The ceremony will be indoors; drinks and photographs move outside if the weather is kind. Comfortable shoes for the lawn.' },
  { eyebrow: 'Gifts',       headline: 'Honeymoon Fund',     body: 'Your company is the only present we ask for. If you’d like to mark the day, we’re saving towards our honeymoon in Japan — contributions of any size are gratefully received.' },
  { eyebrow: 'Children',    headline: 'Adults Only',        body: 'With the exception of immediate family and ring-bearers, we’ve chosen to keep the day adults-only. We hope you’ll see it as an excuse for a rare evening off.' },
  { eyebrow: 'Photography', headline: 'Unplugged Ceremony', body: 'Phones and cameras away during the ceremony, please. Our photographer will capture every moment — we’d love to see your faces rather than your screens.' },
];

const Details = () => (
  <Section id="details" tint padTop={140} padBottom={140}>
    <PageHeading eyebrow="Good to know" title="The Finer Details" />

    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
      maxWidth: 980, margin: '0 auto',
    }} className="details-grid">
      {DETAILS.map((d, i) => (
        <Card key={i}>
          <CardEyebrow>{d.eyebrow}</CardEyebrow>
          <div style={{
            margin: '10px 0 18px',
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 400,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--ink)', textIndent: '0.06em',
            lineHeight: 1.2,
          }}>{d.headline}</div>
          <CardBody>{d.body}</CardBody>
        </Card>
      ))}
    </div>

    <style>{`
      @media (max-width: 720px) { .details-grid{ grid-template-columns: 1fr !important; } }
    `}</style>
  </Section>
);


// ============================================================
// FAQ — accordion
// ============================================================
const FAQS = [
  { q: 'Can we bring our children?',                       a: 'We adore your children but have chosen to keep the day adults-only (eighteen and up), with the exception of immediate family. We hope this gives plenty of notice to arrange care.' },
  { q: 'I have a dietary requirement — what should I do?', a: 'There is a dedicated space on the RSVP form. Vegetarian, vegan, gluten-free, allergies, anything — please tell us in your own words and we will make sure every plate works.' },
  { q: 'Are gifts expected?',                              a: 'Your company is more than gift enough. If you would like to mark the day, we are saving towards our honeymoon — you are under no obligation.' },
  { q: 'Is the ceremony indoors or outdoors?',             a: 'Indoors. The Music Room seats everyone comfortably. Drinks and photographs will move outside if the weather is kind.' },
  { q: 'How long does the day run?',                       a: 'Roughly one in the afternoon through to midnight. The schedule is the current shape — times will firm up in the new year.' },
  { q: 'Will there be photographers?',                     a: 'Yes — Sam from Field & Folk will be with us. We ask, gently, that phones stay away during the ceremony. After that, please snap to your heart’s content.' },
  { q: 'How do I get there if I’m not driving?',      a: 'Trains to Taunton or Bridgwater, then a 25–30 minute taxi. We are also looking into a coach from Taunton in the afternoon and a return coach at midnight — details to follow.' },
  { q: 'Can I bring a plus-one?',                          a: 'Your invitation will say. If your guest is named, please bring them. If not, we have kept the numbers tight — please don’t take it personally.' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <Section id="faqs" padTop={140} padBottom={140}>
      <PageHeading eyebrow="Anything else" title="Questions" />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              borderTop: i === 0 ? '1px solid var(--rule)' : 'none',
              borderBottom: '1px solid var(--rule)',
              textAlign: 'left',
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: '100%', background: 'none', border: 'none',
                padding: '24px 4px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                color: 'var(--ink)', textAlign: 'left',
              }}>
                <span style={{
                  fontFamily: 'Cinzel, Georgia, serif',
                  fontSize: 'clamp(13px, 1.5vw, 15px)', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: isOpen ? 'var(--burgundy)' : 'var(--ink)',
                  textIndent: '0.14em', lineHeight: 1.5,
                  transition: 'color 0.25s',
                }}>{item.q}</span>
                <span aria-hidden="true" style={{
                  flex: '0 0 auto', color: 'var(--burgundy)', opacity: 0.7,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.4s',
                }}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  </svg>
                </span>
              </button>
              <div style={{
                maxHeight: isOpen ? 400 : 0, overflow: 'hidden',
                transition: 'max-height 0.5s ease, opacity 0.4s ease',
                opacity: isOpen ? 1 : 0,
              }}>
                <p style={{
                  margin: '0 0 26px', padding: '0 4px',
                  fontFamily: 'Cinzel, Georgia, serif',
                  fontSize: 'clamp(15px, 1.7vw, 17px)', fontStyle: 'italic',
                  fontWeight: 300, lineHeight: 1.75, color: 'var(--ink-mute)',
                }}>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{
        margin: '48px auto 0', textAlign: 'center',
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 14, fontStyle: 'italic', fontWeight: 300,
        color: 'var(--ink-mute)',
      }}>
        Anything left over — write to us at <a href="mailto:hello@ryanandkatie.co" style={{ color: 'var(--burgundy)' }}>hello@ryanandkatie.co</a>.
      </p>
    </Section>
  );
};


// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer style={{
    padding: '140px 24px 80px', background: 'var(--cream)',
    textAlign: 'center', borderTop: '1px solid var(--rule)',
  }}>
    <div style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 11, fontWeight: 400,
      letterSpacing: '0.36em', textTransform: 'uppercase',
      color: 'var(--ink-mute)', textIndent: '0.36em',
    }}>With love</div>
    <div style={{
      margin: '32px 0 0',
      fontSize: 'clamp(28px, 4vw, 44px)',
      fontWeight: 400, lineHeight: 1, color: 'var(--ink)',
    }}>
      <Names />
    </div>
    <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
      <button onClick={downloadIcs} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        color: 'var(--burgundy)',
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 11, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
        textDecoration: 'underline', textUnderlineOffset: 8, textDecorationThickness: '1px',
        textIndent: '0.32em',
      }}>Add to calendar</button>
      <a href="mailto:hello@ryanandkatie.co" style={{
        color: 'var(--burgundy)',
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 11, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
        textDecoration: 'underline', textUnderlineOffset: 8, textDecorationThickness: '1px',
        textIndent: '0.32em',
      }}>Write to us</a>
    </div>
    <div style={{
      marginTop: 64,
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 10, fontWeight: 400,
      letterSpacing: '0.36em', textTransform: 'uppercase',
      color: 'var(--ink-mute)', textIndent: '0.36em',
    }}>02 · 07 · 2027 &nbsp;·&nbsp; St Audries Park</div>
  </footer>
);


// ============================================================
// SHARED HELPERS — heading, card primitives, action button
// ============================================================

const PageHeading = ({ eyebrow, title, intro }) => (
  <header style={{ textAlign: 'center', marginBottom: 80 }}>
    {eyebrow && (
      <div style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 'clamp(11px, 1.3vw, 13px)',
        fontWeight: 400, letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--ink-mute)', textIndent: '0.36em',
        marginBottom: 28,
      }}>{eyebrow}</div>
    )}
    <h2 style={{
      margin: 0,
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(26px, 3.6vw, 40px)',
      fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)',
      letterSpacing: '0.10em', textTransform: 'uppercase', textIndent: '0.10em',
    }}>{title}</h2>
    {intro && (
      <p style={{
        margin: '32px auto 0', maxWidth: 560,
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic',
        fontWeight: 300, lineHeight: 1.8, color: 'var(--ink-mute)',
      }}>{intro}</p>
    )}
  </header>
);

const Card = ({ children, primary = false }) => (
  <article style={{
    background: primary ? 'var(--cream)' : 'var(--cream)',
    border: '1px solid ' + (primary ? 'var(--burgundy)' : 'var(--rule)'),
    padding: '32px 30px',
    display: 'flex', flexDirection: 'column',
    textAlign: 'left',
    position: 'relative',
  }}>
    {primary && (
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: 'var(--burgundy)',
      }} />
    )}
    {children}
  </article>
);

const CardEyebrow = ({ children }) => (
  <div style={{
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 10, fontWeight: 500,
    letterSpacing: '0.32em', textTransform: 'uppercase',
    color: 'var(--burgundy)', textIndent: '0.32em',
    marginBottom: 8,
  }}>{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 style={{
    margin: '6px 0 14px',
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 'clamp(17px, 1.9vw, 21px)', fontWeight: 500,
    letterSpacing: '0.10em', textTransform: 'uppercase',
    color: 'var(--ink)', textIndent: '0.10em',
    lineHeight: 1.2,
  }}>{children}</h3>
);

const CardBody = ({ children }) => (
  <p style={{
    margin: '0 0 16px',
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 'clamp(14px, 1.5vw, 15px)', fontStyle: 'italic', fontWeight: 300,
    lineHeight: 1.7, color: 'var(--ink-mute)',
    flex: 1,
  }}>{children}</p>
);

const CardDetail = ({ label, children }) => (
  <div style={{
    marginTop: 'auto', paddingTop: 14,
    borderTop: '1px solid var(--rule-soft)',
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 13, fontStyle: 'italic', fontWeight: 300,
    color: 'var(--ink-mute)',
  }}>
    {label && (
      <span style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 10, fontWeight: 500,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'var(--burgundy)', textIndent: '0.32em',
        fontStyle: 'normal',
        marginRight: 10,
      }}>{label}</span>
    )}
    <span>{children}</span>
  </div>
);

const ActionBtn = ({ href, children, ghost = false }) => (
  <a href={href} target="_blank" rel="noopener" style={{
    display: 'inline-block', padding: '14px 24px',
    background: ghost ? 'transparent' : 'var(--ink)',
    color: ghost ? 'var(--ink)' : 'var(--cream)',
    border: '1px solid ' + (ghost ? 'var(--rule)' : 'var(--ink)'),
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase',
    textDecoration: 'none', textIndent: '0.32em',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  }}>{children}</a>
);


Object.assign(window, {
  Nav, Hero, Schedule, Venue, Travel, WeddingParty, Details, FAQ, Footer,
  Section, Heading, PageHeading, Card, CardEyebrow, CardTitle, CardBody, CardDetail, ActionBtn, Names,
});
