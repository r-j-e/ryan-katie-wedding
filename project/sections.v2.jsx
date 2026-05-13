// Editorial wedding sections. Cream-dominant, asymmetric, type-driven.
// Each section is a composed spread, not a centered block.

// ============ NAV ============
const Nav = ({ active }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id:'schedule', n:'II', label:'The Day' },
    { id:'venue',    n:'III', label:'Venue' },
    { id:'stay',     n:'IV', label:'Stay' },
    { id:'dress',    n:'V', label:'Dress' },
    { id:'faqs',     n:'VI', label:'Questions' },
    { id:'rsvp',     n:'VII', label:'Reply' },
  ];

  const go = (id) => (e) => {
    e.preventDefault(); setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior:'smooth' });
  };

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:50,
      background: scrolled ? 'rgba(244,237,228,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(1.1)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.1)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition:'all 0.4s ease', padding:'18px 32px',
    }}>
      <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap:24 }}>
        <a href="#top" onClick={go('top')} className="serif" style={{
          textDecoration:'none', color:'var(--ink)', fontSize:13, fontStyle:'italic',
          fontWeight:400, letterSpacing:'0.04em', justifySelf:'start',
        }}>
          Ryan <em style={{ color:'var(--burgundy)' }}>&amp;</em> Katie
        </a>

        <ul className="nav-desktop" style={{
          display:'flex', alignItems:'center', gap:34, listStyle:'none', margin:0, padding:0,
        }}>
          {links.map(l => (
            <li key={l.id} style={{ position:'relative' }}>
              <a href={`#${l.id}`} onClick={go(l.id)} style={{
                textDecoration:'none',
                color: active === l.id ? 'var(--burgundy)' : 'var(--ink)',
                fontSize:10.5, fontWeight:500, letterSpacing:'0.32em', textTransform:'uppercase',
                display:'inline-flex', gap:8, alignItems:'baseline',
                transition:'color 0.2s',
              }}>
                <span className="serif" style={{
                  fontSize:11, letterSpacing:'0.04em', textTransform:'none', fontStyle:'italic',
                  opacity: active === l.id ? 1 : 0.55, color: active === l.id ? 'var(--burgundy)' : 'var(--ink-soft)',
                }}>{l.n}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ justifySelf:'end' }} className="nav-rsvp-cta">
          <a href="#rsvp" onClick={go('rsvp')} style={{
            textDecoration:'none', color:'var(--cream)', background:'var(--ink)',
            padding:'10px 20px',
            fontSize:10, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase',
            transition:'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--burgundy)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ink)'}
          >Reply →</a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-toggle" aria-label="Menu" style={{
          background:'none', border:'none', cursor:'pointer', padding:8, display:'none', justifySelf:'end', color:'var(--ink)',
        }}>
          <svg width="22" height="14" viewBox="0 0 22 14"><line x1="0" y1="3" x2="22" y2="3" stroke="currentColor"/><line x1="0" y1="11" x2="22" y2="11" stroke="currentColor"/></svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position:'fixed', inset:0, background:'var(--cream)', zIndex:60,
          display:'flex', flexDirection:'column', padding:'30px 32px',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span className="serif" style={{ fontStyle:'italic', fontSize:15 }}>Ryan <em style={{ color:'var(--burgundy)' }}>&amp;</em> Katie</span>
            <button onClick={() => setMobileOpen(false)} style={{
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'Inter', fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--ink)',
            }}>Close ×</button>
          </div>
          <ul style={{ listStyle:'none', padding:0, margin:'auto 0', display:'flex', flexDirection:'column', gap:6 }}>
            {links.map(l => (
              <li key={l.id} style={{ display:'flex', alignItems:'baseline', gap:18 }}>
                <span className="serif" style={{ fontSize:14, fontStyle:'italic', color:'var(--burgundy)', minWidth:30 }}>{l.n}</span>
                <a href={`#${l.id}`} onClick={go(l.id)} className="serif" style={{
                  textDecoration:'none', color:'var(--ink)', fontSize:40, fontStyle:'italic', fontWeight:400,
                }}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 980px){
          .nav-desktop, .nav-rsvp-cta{ display:none !important; }
          .nav-mobile-toggle{ display:block !important; }
        }
      `}</style>
    </nav>
  );
};

// ============ COMMON ============
const useCountdown = (iso) => {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(iso) - now);
  return Math.floor(diff / 86400000);
};

const RomanMark = ({ numeral, position = 'right', dark = false }) => (
  <div className="serif" style={{
    position:'absolute', top:'-0.18em',
    [position]:'-0.06em',
    fontSize:'min(46vw, 580px)',
    lineHeight:0.85, fontStyle:'italic', fontWeight:300,
    color: dark ? 'rgba(244,237,228,0.06)' : 'rgba(74,26,44,0.06)',
    pointerEvents:'none', userSelect:'none', zIndex:0,
    letterSpacing:'-0.04em',
  }}>{numeral}</div>
);

const SectionEyebrow = ({ numeral, label, dark = false }) => (
  <div style={{
    display:'flex', alignItems:'baseline', gap:18,
    color: dark ? 'rgba(244,237,228,0.7)' : 'var(--burgundy)',
  }}>
    <span className="serif" style={{ fontSize:24, fontStyle:'italic', fontWeight:400, letterSpacing:'0.04em' }}>{numeral}</span>
    <span style={{ flex:'0 0 36px', height:1, background: dark ? 'rgba(244,237,228,0.4)' : 'var(--burgundy)' }}/>
    <span style={{ fontFamily:'Inter', fontSize:10.5, fontWeight:500, letterSpacing:'0.34em', textTransform:'uppercase' }}>{label}</span>
  </div>
);

const SectionTitle = ({ children, italic = true, dark = false, style = {} }) => (
  <h2 className="serif" style={{
    margin:0,
    fontSize:'clamp(56px, 9vw, 132px)',
    fontWeight:300, fontStyle: italic ? 'italic' : 'normal',
    lineHeight:0.92, color: dark ? 'var(--cream)' : 'var(--ink)',
    letterSpacing:'-0.02em',
    ...style,
  }}>{children}</h2>
);

// ============ HERO ============
const Hero = ({ showCountdown = true }) => {
  const days = useCountdown('2027-07-02T13:00:00');

  return (
    <section id="top" style={{
      minHeight:'100vh', background:'var(--cream)', position:'relative',
      padding:'120px 32px 60px', overflow:'hidden',
    }}>
      {/* Vertical date label on left edge */}
      <div className="hero-vertical-label" style={{
        position:'absolute', left:32, top:'50%', transform:'translateY(-50%) rotate(-90deg)',
        transformOrigin:'left center', whiteSpace:'nowrap', color:'var(--ink-soft)', opacity:0.55,
      }}>
        <span className="mono-eyebrow">Friday · 02 · 07 · 2027 · St Audries Park · Somerset</span>
      </div>
      {/* Vertical credit on right edge */}
      <div className="hero-vertical-label" style={{
        position:'absolute', right:32, top:'50%', transform:'translateY(-50%) rotate(90deg)',
        transformOrigin:'right center', whiteSpace:'nowrap', color:'var(--ink-soft)', opacity:0.55,
      }}>
        <span className="mono-eyebrow">By invitation · Volume I · The Wedding</span>
      </div>

      <div style={{
        maxWidth:1280, margin:'0 auto', minHeight:'calc(100vh - 180px)',
        display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:60,
        alignItems:'center', position:'relative',
      }} className="hero-grid">

        {/* TYPE COLUMN */}
        <div style={{ position:'relative' }}>
          {/* Eyebrow */}
          <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:32 }}>
            <span className="serif" style={{ fontSize:18, fontStyle:'italic', color:'var(--burgundy)' }}>I.</span>
            <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>The Wedding</span>
          </div>

          {/* Names */}
          <h1 className="serif" style={{
            margin:0, fontSize:'clamp(72px, 13vw, 200px)',
            lineHeight:0.84, fontWeight:300, letterSpacing:'-0.03em', color:'var(--ink)',
          }}>
            Ryan
          </h1>

          <div style={{
            display:'flex', alignItems:'center', gap:24, margin:'12px 0',
          }}>
            <span className="serif" style={{
              fontSize:'clamp(60px, 11vw, 168px)', lineHeight:1, color:'var(--burgundy)',
              fontStyle:'italic', fontWeight:300,
            }}>&amp;</span>
            <span className="serif" style={{
              fontSize:'clamp(14px, 1.4vw, 17px)', fontStyle:'italic', color:'var(--ink-soft)',
              opacity:0.78, maxWidth:280, lineHeight:1.55, fontWeight:300,
            }}>
              are to be married on a Friday afternoon in early July, with a long evening to follow.
            </span>
          </div>

          <h1 className="serif" style={{
            margin:0, fontSize:'clamp(72px, 13vw, 200px)',
            lineHeight:0.84, fontWeight:300, letterSpacing:'-0.03em',
            color:'var(--ink)', fontStyle:'italic',
            paddingLeft:'0.18em',
          }}>
            Katie
          </h1>

          {/* Data row */}
          <div style={{
            marginTop:60, display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
            gap:1, background:'var(--rule)',
            border:'1px solid var(--rule)',
          }} className="hero-data">
            <DataCell label="Date">02 . 07 . 2027</DataCell>
            <DataCell label="Place">St Audries Park</DataCell>
            <DataCell label={showCountdown ? 'Counting' : 'Time'}>
              {showCountdown ? (days > 0 ? `${days} days` : 'Today') : '1:00 pm'}
            </DataCell>
          </div>
        </div>

        {/* IMAGE COLUMN */}
        <div style={{ position:'relative' }} className="hero-image-col">
          <div style={{ position:'absolute', top:-32, right:0, zIndex:2 }}>
            <span className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.55 }}>Fig. i — the couple</span>
          </div>
          <image-slot id="hero-portrait" shape="rect" placeholder="engagement portrait · 4 : 5"
            style={{ width:'100%', aspectRatio:'4 / 5', display:'block' }}></image-slot>

          {/* Small caption slot */}
          <div style={{
            position:'absolute', bottom:-14, left:0, right:0,
            display:'flex', justifyContent:'space-between', alignItems:'baseline',
            paddingTop:14, borderTop:'1px solid var(--rule)',
            marginTop:14,
          }}>
            <span className="serif" style={{ fontSize:13, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.7 }}>
              <em>Somerset, August 2025</em>
            </span>
            <span className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.55 }}>—</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px){
          .hero-grid{ grid-template-columns: 1fr !important; gap:48px !important; min-height:auto !important; padding-top:30px; }
          .hero-vertical-label{ display:none; }
          .hero-image-col{ order: 2; }
          .hero-data{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const DataCell = ({ label, children }) => (
  <div style={{ background:'var(--cream)', padding:'18px 22px' }}>
    <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.7, marginBottom:8 }}>{label}</div>
    <div className="serif" style={{ fontSize:22, fontWeight:400, color:'var(--ink)', letterSpacing:'-0.005em' }}>
      {children}
    </div>
  </div>
);

// ============ SCHEDULE ============
const SCHEDULE = [
  { time:'1:00', meridian:'pm', title:'Guests arrive', note:'Drinks on the terrace. Please be seated by 1:30.' },
  { time:'1:45', meridian:'pm', title:'Ceremony', note:'The Music Room. About thirty minutes.' },
  { time:'2:30', meridian:'pm', title:'Champagne &amp; canapés', note:'Lawn and conservatory; photographs.' },
  { time:'4:30', meridian:'pm', title:'Wedding breakfast', note:'The Dining Room. Three courses and speeches.' },
  { time:'7:30', meridian:'pm', title:'Cutting of the cake', note:'Followed by the first dance.' },
  { time:'8:00', meridian:'pm', title:'Evening reception', note:'Live band &amp; DJ. Late buffet at 10.' },
  { time:'12:00', meridian:'am', title:'Carriages', note:'Last orders called at 11:30.' },
];

const Schedule = () => (
  <section id="schedule" style={{
    padding:'160px 32px 140px', background:'var(--cream)',
    borderTop:'1px solid var(--rule-soft)', position:'relative', overflow:'hidden',
  }}>
    <RomanMark numeral="II" position="right" />

    <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }}>
      <div style={{ marginBottom:60 }}>
        <SectionEyebrow numeral="II" label="Order of the Day" />
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80, alignItems:'start',
      }} className="schedule-grid">
        {/* Left column — title + pullquote */}
        <div style={{ position:'sticky', top:120 }} className="schedule-left">
          <SectionTitle>The<br/>Programme.</SectionTitle>
          <p className="serif" style={{
            marginTop:30, fontSize:21, lineHeight:1.55, color:'var(--ink-soft)',
            fontWeight:300, fontStyle:'italic', maxWidth:420,
          }}>
            A rough shape of the day — held lightly. Times will firm up nearer the date.
          </p>
        </div>

        {/* Right column — schedule */}
        <ol style={{ listStyle:'none', padding:0, margin:0 }}>
          {SCHEDULE.map((item, i) => (
            <li key={i} style={{
              display:'grid', gridTemplateColumns:'auto 1fr',
              gap:36, padding:'28px 0',
              borderTop:'1px solid var(--rule)',
              borderBottom: i === SCHEDULE.length - 1 ? '1px solid var(--rule)' : 'none',
              alignItems:'baseline',
            }} className="sched-item">
              <div style={{ display:'flex', alignItems:'baseline', gap:4, minWidth:110 }}>
                <span className="serif" style={{
                  fontSize:44, fontWeight:300, color:'var(--burgundy)', letterSpacing:'-0.02em', lineHeight:0.9,
                }}>{item.time}</span>
                <span className="serif" style={{
                  fontSize:14, fontStyle:'italic', color:'var(--burgundy)', opacity:0.7,
                }}>{item.meridian}</span>
              </div>
              <div>
                <div className="serif" style={{
                  fontSize:24, fontWeight:400, lineHeight:1.15, color:'var(--ink)',
                }} dangerouslySetInnerHTML={{ __html: item.title }} />
                <div className="serif" style={{
                  marginTop:6, fontSize:16, fontStyle:'italic', color:'var(--ink-soft)',
                  opacity:0.72, fontWeight:300, lineHeight:1.5,
                }} dangerouslySetInnerHTML={{ __html: item.note }} />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        @media (max-width: 900px){
          .schedule-grid{ grid-template-columns: 1fr !important; gap:40px !important; }
          .schedule-left{ position:static !important; }
        }
        @media (max-width: 560px){
          .sched-item{ grid-template-columns: 1fr !important; gap:10px !important; }
        }
      `}</style>
    </div>
  </section>
);

// ============ VENUE ============
const Venue = () => (
  <section id="venue" style={{
    padding:'160px 32px 140px', background:'var(--cream-deep)',
    position:'relative', overflow:'hidden',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <RomanMark numeral="III" position="left" />

    <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
      <div style={{ marginBottom:48 }}>
        <SectionEyebrow numeral="III" label="The Venue" />
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start', marginBottom:80,
      }} className="venue-grid">
        {/* Left — title + prose */}
        <div>
          <SectionTitle italic style={{ fontSize:'clamp(56px, 8vw, 116px)' }}>
            St&nbsp;Audries<br/>Park.
          </SectionTitle>

          <p className="serif" style={{
            marginTop:36, fontSize:23, lineHeight:1.55, fontWeight:300, color:'var(--ink)',
          }}>
            A Grade&nbsp;II listed country house on the edge of Exmoor, with a long avenue of trees, parkland views to the Bristol Channel, and a peacock or two.
          </p>

          <p className="serif" style={{
            marginTop:20, fontSize:18, fontStyle:'italic', lineHeight:1.6, fontWeight:300,
            color:'var(--ink-soft)', maxWidth:480,
          }}>
            We chose it for the candlelit dining room and the way the light moves across the lawn in the late afternoon.
          </p>
        </div>

        {/* Right — image */}
        <div style={{ position:'relative' }}>
          <image-slot id="venue-hero" shape="rect" placeholder="venue · 4 : 5"
            style={{ width:'100%', aspectRatio:'4 / 5', display:'block' }}></image-slot>
          <div style={{
            position:'absolute', top:14, left:14,
            background:'var(--cream)', padding:'6px 12px',
            border:'1px solid var(--rule)',
          }}>
            <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>Fig. ii</span>
          </div>
        </div>
      </div>

      {/* Detail grid */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:40,
        padding:'48px 0', borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)',
      }} className="venue-details">
        <VenueDetail label="Address">
          <strong style={{ fontWeight:500 }}>St Audries Park</strong><br/>
          West Quantoxhead<br/>
          Somerset · TA4 4DS
        </VenueDetail>
        <VenueDetail label="By rail">
          <strong style={{ fontWeight:500 }}>Taunton</strong> · 25 min taxi<br/>
          <strong style={{ fontWeight:500 }}>Bridgwater</strong> · 30 min taxi
        </VenueDetail>
        <VenueDetail label="By car">
          M5 to J23 or J24, then west along the A39. Free parking on site; cars may be left overnight.
        </VenueDetail>
        <VenueDetail label="Taxis">
          <em>A1 Williton</em> &nbsp;01984 000 000<br/>
          <em>Taunton Cars</em> &nbsp;01823 000 000<br/>
          Book in advance — rural coverage.
        </VenueDetail>
      </div>

      {/* Map */}
      <div style={{ marginTop:48, position:'relative' }}>
        <div style={{
          aspectRatio:'21 / 7',
          background:`
            radial-gradient(circle at 50% 50%, var(--cream) 1px, transparent 1.5px) 0 0/24px 24px,
            radial-gradient(circle at 50% 50%, var(--cream) 0.5px, transparent 1px) 12px 12px/24px 24px,
            #E8DECF
          `,
          border:'1px solid var(--rule)',
          position:'relative', overflow:'hidden',
        }} className="map-block">
          {/* Pin */}
          <div style={{
            position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -100%)',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          }}>
            <span className="serif" style={{
              fontSize:13, fontStyle:'italic', background:'var(--ink)', color:'var(--cream)',
              padding:'4px 10px', whiteSpace:'nowrap',
            }}>St Audries Park</span>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
              <path d="M7 0 C 3 0, 0 3, 0 7 C 0 12, 7 20, 7 20 C 7 20, 14 12, 14 7 C 14 3, 11 0, 7 0 Z" fill="var(--burgundy)"/>
              <circle cx="7" cy="7" r="2.2" fill="var(--cream)"/>
            </svg>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:14 }}>
          <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>51.1751° N · 3.2774° W</span>
          <a href="https://www.google.com/maps?q=St+Audries+Park" target="_blank" rel="noopener" style={{
            color:'var(--burgundy)', textDecoration:'none',
            fontSize:10, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase',
            borderBottom:'1px solid var(--burgundy)', paddingBottom:2,
          }}>Open in Maps →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px){
          .venue-grid{ grid-template-columns: 1fr !important; gap:40px !important; }
          .venue-details{ grid-template-columns: 1fr 1fr !important; gap:28px !important; }
        }
        @media (max-width: 560px){
          .venue-details{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  </section>
);

const VenueDetail = ({ label, children }) => (
  <div>
    <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:12 }}>{label}</div>
    <div className="serif" style={{ fontSize:17, lineHeight:1.6, fontWeight:300, color:'var(--ink)' }}>
      {children}
    </div>
  </div>
);

// ============ STAY ============
const STAYS = [
  { name:'St Audries Park', tier:'On site', distance:'0 mi', price:'£££', note:'Limited rooms in the house — first come, first served. Mention the wedding when booking.' },
  { name:'The Plough Inn', tier:'Walkable', distance:'1.4 mi', price:'££', note:'A small coaching inn with seven rooms. Quiet and well-run. Walkable in daylight; cab home at night.' },
  { name:'Combe House Hotel', tier:'Short drive', distance:'4 mi', price:'£££', note:'A country house in Holford. A handful of rooms held under "Ryan & Katie" until 1 April 2027.' },
  { name:'Williton · B&amp;Bs', tier:'Short drive', distance:'3 mi', price:'£–££', note:'The nearest village. Several family-run guesthouses; we will publish a shortlist soon.' },
  { name:'Premier Inn Taunton', tier:'Further afield', distance:'18 mi', price:'£', note:'Predictable and inexpensive. Best for one-night stays — share a taxi to and from.' },
];

const Stay = () => (
  <section id="stay" style={{
    padding:'160px 32px 140px', background:'var(--cream)',
    position:'relative', overflow:'hidden',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <RomanMark numeral="IV" position="right" />

    <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'end', marginBottom:72,
      }} className="stay-header">
        <div>
          <div style={{ marginBottom:24 }}>
            <SectionEyebrow numeral="IV" label="Where to Sleep" />
          </div>
          <SectionTitle>Stay<br/>the night.</SectionTitle>
        </div>
        <p className="serif" style={{
          margin:0, fontSize:21, fontStyle:'italic', lineHeight:1.6,
          color:'var(--ink-soft)', fontWeight:300, maxWidth:480, justifySelf:'end',
        }}>
          It is a long way to Somerset and a longer way home at midnight — please plan to stay. A handful of options, in order of proximity.
        </p>
      </div>

      <div>
        {STAYS.map((s, i) => (
          <article key={i} style={{
            display:'grid', gridTemplateColumns:'60px 1fr 200px 90px 60px',
            gap:32, alignItems:'baseline',
            padding:'32px 4px',
            borderTop:'1px solid var(--rule)',
            borderBottom: i === STAYS.length - 1 ? '1px solid var(--rule)' : 'none',
          }} className="stay-row">
            <span className="serif" style={{
              fontSize:28, fontWeight:300, fontStyle:'italic', color:'var(--burgundy)', opacity:0.7,
            }}>{String(i + 1).padStart(2, '0')}</span>

            <div>
              <h3 className="serif" style={{
                margin:0, fontSize:30, fontWeight:400, color:'var(--ink)', letterSpacing:'-0.005em', lineHeight:1.1,
              }} dangerouslySetInnerHTML={{ __html: s.name }} />
              <p className="serif" style={{
                margin:'8px 0 0', fontSize:16, fontStyle:'italic', color:'var(--ink-soft)',
                opacity:0.78, lineHeight:1.55, fontWeight:300, maxWidth:540,
              }} dangerouslySetInnerHTML={{ __html: s.note }} />
            </div>

            <span className="serif" style={{ fontSize:15, fontStyle:'italic', color:'var(--ink-soft)' }}>
              {s.tier}
            </span>

            <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>{s.distance}</span>

            <span className="serif" style={{
              fontSize:24, color:'var(--burgundy)', letterSpacing:'0.06em', textAlign:'right',
            }}>{s.price}</span>
          </article>
        ))}
      </div>

      <p className="serif" style={{
        marginTop:40, fontStyle:'italic', fontSize:16, color:'var(--ink-soft)', opacity:0.65,
        textAlign:'center', maxWidth:540, marginLeft:'auto', marginRight:'auto', fontWeight:300,
      }}>
        Contacts and booking links will follow by the end of 2026 — please RSVP before reserving in case anything moves.
      </p>

      <style>{`
        @media (max-width: 900px){
          .stay-header{ grid-template-columns: 1fr !important; gap:30px !important; }
          .stay-header > p{ justify-self:start !important; }
          .stay-row{ grid-template-columns: 40px 1fr 90px !important; gap:18px !important; }
          .stay-row > *:nth-child(3), .stay-row > *:nth-child(4){ display:none; }
        }
      `}</style>
    </div>
  </section>
);

// ============ DRESS ============
const Dress = () => (
  <section id="dress" style={{
    padding:'180px 32px 160px', background:'var(--burgundy)', color:'var(--cream)',
    position:'relative', overflow:'hidden',
  }}>
    {/* Faint roman */}
    <RomanMark numeral="V" position="left" dark />

    {/* Grain */}
    <div style={{
      position:'absolute', inset:0, opacity:0.16, mixBlendMode:'overlay', pointerEvents:'none',
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
    }}/>
    {/* Candlelight glow */}
    <div style={{
      position:'absolute', inset:0, pointerEvents:'none',
      background:'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(168,50,107,0.30), transparent 70%)',
    }}/>

    <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
      <div style={{ marginBottom:36 }}>
        <SectionEyebrow numeral="V" label="A Note on Attire" dark />
      </div>

      {/* Massive title */}
      <h2 className="serif" style={{
        margin:0, fontSize:'clamp(80px, 16vw, 240px)',
        lineHeight:0.88, fontWeight:300, color:'var(--cream)',
        letterSpacing:'-0.03em',
      }}>
        Black <em style={{ color:'var(--blush)' }}>tie</em>,
      </h2>
      <p className="serif" style={{
        margin:'12px 0 0', fontSize:'clamp(22px, 2.6vw, 32px)',
        fontStyle:'italic', fontWeight:300, lineHeight:1.4,
        color:'rgba(244,237,228,0.78)', maxWidth:740,
      }}>
        please &mdash; the kind of evening that calls for it.
      </p>

      {/* Lookbook */}
      <div style={{
        marginTop:90, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24,
      }} className="lookbook">
        <div style={{ marginTop:60 }}>
          <image-slot id="dress-1" shape="rect" data-on-dark="" placeholder="tuxedo · 3 : 4"
            style={{ width:'100%', aspectRatio:'3 / 4', display:'block' }}></image-slot>
          <span className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginTop:10, display:'block' }}>Fig. iii</span>
        </div>
        <div>
          <image-slot id="dress-2" shape="rect" data-on-dark="" placeholder="gown · 3 : 4"
            style={{ width:'100%', aspectRatio:'3 / 4', display:'block' }}></image-slot>
          <span className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginTop:10, display:'block' }}>Fig. iv</span>
        </div>
        <div style={{ marginTop:120 }} className="lookbook-third">
          <image-slot id="dress-3" shape="rect" data-on-dark="" placeholder="velvet · 3 : 4"
            style={{ width:'100%', aspectRatio:'3 / 4', display:'block' }}></image-slot>
          <span className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginTop:10, display:'block' }}>Fig. v</span>
        </div>
      </div>

      {/* Notes */}
      <div style={{
        marginTop:100, display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, maxWidth:1000,
      }} className="dress-notes">
        <div>
          <div className="mono-eyebrow" style={{ color:'var(--blush)', marginBottom:16 }}>For gentlemen</div>
          <p className="serif" style={{
            margin:0, fontSize:21, lineHeight:1.65, color:'rgba(244,237,228,0.92)', fontWeight:300,
          }}>
            A black dinner jacket and bow tie. Midnight blue or deep velvet is welcome. White shirt; black shoes. Patterned cummerbunds encouraged, within reason.
          </p>
        </div>
        <div>
          <div className="mono-eyebrow" style={{ color:'var(--blush)', marginBottom:16 }}>For ladies</div>
          <p className="serif" style={{
            margin:0, fontSize:21, lineHeight:1.65, color:'rgba(244,237,228,0.92)', fontWeight:300,
          }}>
            A long gown, or a formal cocktail dress. Jewel tones — burgundy, plum, emerald, ink — sit beautifully against the palette of the day.
          </p>
        </div>
      </div>

      <p className="serif" style={{
        marginTop:64, fontStyle:'italic', fontSize:18, color:'rgba(244,237,228,0.62)', fontWeight:300,
        maxWidth:560, lineHeight:1.6,
      }}>
        If black tie isn't your usual register, please don't worry &mdash; wear something that makes you feel handsome or beautiful, and you'll be exactly right.
      </p>

      <style>{`
        @media (max-width: 800px){
          .lookbook{ grid-template-columns:1fr 1fr !important; gap:14px !important; }
          .lookbook-third{ display:none; }
          .dress-notes{ grid-template-columns:1fr !important; gap:36px !important; }
        }
      `}</style>
    </div>
  </section>
);

// ============ FAQ ============
const FAQS = [
  { q:'Can we bring our children?', a:'We adore your children but have chosen to keep the day adults-only (18+). We hope this gives plenty of notice to arrange care. Babes in arms under one are welcome.' },
  { q:'I have a dietary requirement \u2014 what should I do?', a:'There is a dedicated space on the RSVP form. Vegetarian, vegan, gluten-free, allergies, anything &mdash; please tell us in your own words and we will make sure every plate works.' },
  { q:'Are gifts expected?', a:'Your company is more than gift enough. If you would like to mark the day, we will share a small honeymoon fund nearer the wedding &mdash; you are under no obligation.' },
  { q:'Is the ceremony indoors or outdoors?', a:'Indoors. The Music Room seats everyone comfortably. Drinks and photographs will move outside if the weather is kind.' },
  { q:'How long will the day run?', a:'Roughly 1pm through to midnight. The Programme is the current shape &mdash; times will firm up in the new year.' },
  { q:'Will there be photographers?', a:'Yes &mdash; Sam from Field & Folk will be with us. We ask, gently, that phones stay away during the ceremony. After that, please snap to your heart\u2019s content.' },
  { q:'How do I get there if I\u2019m not driving?', a:'Trains to Taunton or Bridgwater, then a 25\u201330 minute taxi. We are looking into an afternoon coach from Taunton and a return coach at midnight &mdash; details to follow.' },
  { q:'Can I bring a plus-one?', a:'Your invitation will say. If your guest is named, please bring them. If not, we have kept the numbers tight &mdash; please don\u2019t take it personally.' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faqs" style={{
      padding:'160px 32px 140px', background:'var(--cream)',
      position:'relative', overflow:'hidden',
      borderTop:'1px solid var(--rule-soft)',
    }}>
      <RomanMark numeral="VI" position="left" />

      <div style={{ maxWidth:1180, margin:'0 auto', position:'relative' }}>
        <div style={{
          display:'grid', gridTemplateColumns:'0.7fr 1fr', gap:80, alignItems:'start',
        }} className="faq-grid">
          {/* LEFT — sticky header */}
          <div style={{ position:'sticky', top:120 }} className="faq-left">
            <div style={{ marginBottom:24 }}>
              <SectionEyebrow numeral="VI" label="Anything else" />
            </div>
            <SectionTitle>Questions,<br/>answered.</SectionTitle>
            <p className="serif" style={{
              marginTop:30, fontSize:18, fontStyle:'italic', lineHeight:1.6,
              color:'var(--ink-soft)', fontWeight:300, maxWidth:380,
            }}>
              And if there's anything left over, write to us — <a href="mailto:hello@ryanandkatie.co" style={{ color:'var(--burgundy)' }}>hello@ryanandkatie.co</a>.
            </p>
          </div>

          {/* RIGHT — accordion */}
          <div>
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{
                  borderTop: i === 0 ? '1px solid var(--rule)' : 'none',
                  borderBottom:'1px solid var(--rule)',
                }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width:'100%', background:'none', border:'none', textAlign:'left',
                    padding:'26px 4px', cursor:'pointer',
                    display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:22,
                    color:'var(--ink)',
                  }}>
                    <span style={{ display:'flex', alignItems:'baseline', gap:18, flex:1 }}>
                      <span className="serif" style={{
                        fontSize:14, fontStyle:'italic', color:'var(--burgundy)', opacity:0.7,
                        minWidth:24,
                      }}>0{i + 1}</span>
                      <span className="serif" style={{
                        fontSize:23, fontWeight:400, lineHeight:1.3, letterSpacing:'-0.005em',
                        fontStyle: isOpen ? 'italic' : 'normal',
                        color: isOpen ? 'var(--burgundy)' : 'var(--ink)',
                        transition:'all 0.25s',
                      }}>{item.q}</span>
                    </span>
                    <span style={{
                      flex:'0 0 auto', color:'var(--burgundy)', opacity:0.7,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition:'transform 0.4s',
                    }}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      </svg>
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 360 : 0, overflow:'hidden',
                    transition:'max-height 0.45s ease, opacity 0.4s ease',
                    opacity: isOpen ? 1 : 0,
                  }}>
                    <p className="serif" style={{
                      margin:'0 0 28px', padding:'0 4px 0 42px',
                      fontSize:18, lineHeight:1.65, fontStyle:'italic',
                      color:'var(--ink-soft)', fontWeight:300, maxWidth:620,
                    }} dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px){
            .faq-grid{ grid-template-columns:1fr !important; gap:48px !important; }
            .faq-left{ position:static !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

// ============ FOOTER ============
const Footer = () => (
  <footer style={{
    padding:'90px 32px 56px', background:'var(--ink)', color:'rgba(244,237,228,0.55)',
    position:'relative', overflow:'hidden',
  }}>
    <div style={{ maxWidth:1280, margin:'0 auto' }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:40, flexWrap:'wrap',
      }}>
        <div>
          <div className="serif" style={{
            fontSize:'clamp(40px, 6vw, 72px)', lineHeight:0.9, color:'var(--cream)', fontWeight:300,
          }}>
            Ryan <em style={{ color:'var(--blush)', fontStyle:'italic' }}>&amp;</em> Katie
          </div>
          <div className="serif" style={{
            marginTop:14, fontSize:16, fontStyle:'italic', color:'rgba(244,237,228,0.65)', fontWeight:300,
          }}>
            with love &mdash; and thanks for reading this far.
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)' }}>02 . 07 . 2027</div>
          <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginTop:8 }}>St Audries Park</div>
        </div>
      </div>

      <div style={{
        marginTop:72, paddingTop:24, borderTop:'1px solid rgba(244,237,228,0.18)',
        display:'flex', justifyContent:'space-between', fontSize:11, opacity:0.55,
      }}>
        <span className="serif" style={{ fontStyle:'italic' }}>fin.</span>
        <span className="mono-eyebrow">Volume I · The Wedding</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Nav, Hero, Schedule, Venue, Stay, Dress, FAQ, Footer,
  SectionEyebrow, SectionTitle, RomanMark, DataCell, VenueDetail,
});
