// Wedding booklet. Each section is a different printed-document model.
// Unified by one typographic system; varied in composition per page.

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
    { id:'welcome',  label:'A note' },
    { id:'schedule', label:'Programme' },
    { id:'venue',    label:'Venue' },
    { id:'stay',     label:'Lodgings' },
    { id:'dress',    label:'Attire' },
    { id:'faqs',     label:'Inquiries' },
    { id:'rsvp',     label:'Reply' },
  ];

  const go = (id) => (e) => {
    e.preventDefault(); setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior:'smooth' });
  };

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:50,
      background: scrolled ? 'rgba(244,237,228,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(1.1)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.1)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition:'all 0.35s ease', padding:'12px 28px',
    }}>
      <div style={{
        maxWidth:1400, margin:'0 auto',
        display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap:24,
      }}>
        <span className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity: scrolled ? 0.6 : 0, transition:'opacity 0.3s', fontSize:9.5 }}>
          02 . 07 . 2027
        </span>

        <ul className="nav-desktop" style={{
          display:'flex', alignItems:'center', gap:28, listStyle:'none', margin:0, padding:0,
        }}>
          {links.map((l, i) => (
            <li key={l.id} style={{ display:'flex', alignItems:'center', gap:28 }}>
              <a href={`#${l.id}`} onClick={go(l.id)} className="serif" style={{
                textDecoration:'none',
                color: active === l.id ? 'var(--burgundy)' : 'var(--ink)',
                fontSize:14, fontStyle: active === l.id ? 'italic' : 'normal', fontWeight:400,
                transition:'color 0.2s', letterSpacing:'0.02em',
              }}>{l.label}</a>
              {i < links.length - 1 && <span style={{ width:2, height:2, background:'var(--ink-soft)', opacity:0.4, borderRadius:'50%' }}/>}
            </li>
          ))}
        </ul>

        <span className="mono-eyebrow" style={{
          color:'var(--ink-soft)', opacity: scrolled ? 0.6 : 0,
          transition:'opacity 0.3s', justifySelf:'end', fontSize:9.5,
        }}>
          St Audries Park
        </span>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-toggle" aria-label="Menu" style={{
          background:'none', border:'none', cursor:'pointer', padding:8,
          display:'none', justifySelf:'end', color:'var(--ink)',
        }}>
          <svg width="20" height="14" viewBox="0 0 20 14"><line x1="0" y1="3" x2="20" y2="3" stroke="currentColor"/><line x1="0" y1="11" x2="20" y2="11" stroke="currentColor"/></svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position:'fixed', inset:0, background:'var(--cream)', zIndex:60,
          display:'flex', flexDirection:'column', padding:'30px 32px',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span className="serif" style={{ fontSize:15, fontStyle:'italic' }}>Ryan <em style={{ color:'var(--burgundy)' }}>&amp;</em> Katie</span>
            <button onClick={() => setMobileOpen(false)} style={{
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'Inter', fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--ink)',
            }}>Close ×</button>
          </div>
          <ul style={{ listStyle:'none', padding:0, margin:'auto 0', display:'flex', flexDirection:'column', gap:8 }}>
            {links.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="serif" style={{
                  textDecoration:'none', color:'var(--ink)', fontSize:38, fontStyle:'italic', fontWeight:300, lineHeight:1.1,
                }}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px){
          .nav-desktop{ display:none !important; }
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
  return Math.max(0, Math.floor((new Date(iso) - now) / 86400000));
};

// Folio (page number) — appears at bottom of each section.
const Folio = ({ n, total = 9 }) => (
  <div style={{
    position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
    display:'flex', alignItems:'center', gap:10, color:'var(--ink-soft)', opacity:0.45,
  }}>
    <span className="serif" style={{ fontSize:13, fontStyle:'italic' }}>{n}</span>
    <span style={{ width:24, height:1, background:'currentColor' }}/>
    <span className="serif" style={{ fontSize:13, fontStyle:'italic' }}>of {total}</span>
  </div>
);

// Running head — book chapter header
const RunningHead = ({ left, right }) => (
  <div style={{
    display:'flex', justifyContent:'space-between', alignItems:'baseline',
    paddingBottom:18, borderBottom:'1px solid var(--rule)',
    color:'var(--ink-soft)',
  }}>
    <span className="mono-eyebrow" style={{ opacity:0.7 }}>{left}</span>
    <span className="serif" style={{ fontSize:13, fontStyle:'italic', opacity:0.7, letterSpacing:'0.02em' }}>{right}</span>
  </div>
);

// ===================================================================
// I — THE ANNOUNCEMENT (HERO)
// Symmetric, monumental, double-ruled. Like a printed wedding card.
// ===================================================================
const Hero = ({ showCountdown = true }) => {
  const days = useCountdown('2027-07-02T13:00:00');

  return (
    <section id="top" style={{
      minHeight:'100vh', background:'var(--cream)', position:'relative',
      padding:'80px 24px 60px',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <div style={{
        width:'100%', maxWidth:880, minHeight:'calc(100vh - 160px)',
        border:'1px solid var(--ink)',
        position:'relative',
        padding:'72px 64px',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        textAlign:'center',
        boxShadow:'inset 0 0 0 6px var(--cream), inset 0 0 0 7px var(--ink)',
      }} className="hero-card">

        {/* small caps header */}
        <div className="hero-eyebrow" style={{
          color:'var(--ink-soft)', fontFamily:'Inter', fontSize:10.5, fontWeight:500,
          letterSpacing:'0.42em', textTransform:'uppercase',
        }}>
          You are warmly invited to the marriage of
        </div>

        <div style={{ marginTop:48, position:'relative' }}>
          <h1 className="serif" style={{
            margin:0, fontSize:'clamp(72px, 11vw, 144px)', lineHeight:0.9,
            fontWeight:300, color:'var(--ink)', letterSpacing:'-0.02em',
          }}>
            Ryan
          </h1>
          <div className="serif" style={{
            margin:'2px 0', fontSize:'clamp(48px, 7vw, 88px)', lineHeight:1,
            color:'var(--burgundy)', fontStyle:'italic', fontWeight:300,
          }}>&amp;</div>
          <h1 className="serif" style={{
            margin:0, fontSize:'clamp(72px, 11vw, 144px)', lineHeight:0.9,
            fontWeight:300, color:'var(--ink)', letterSpacing:'-0.02em', fontStyle:'italic',
          }}>
            Katie
          </h1>
        </div>

        <RuleOrnament style={{ margin:'48px auto 36px' }} />

        <div className="serif" style={{
          fontSize:'clamp(22px, 2.6vw, 30px)', lineHeight:1.5, fontWeight:300, color:'var(--ink)',
          fontStyle:'italic', maxWidth:560,
        }}>
          on Friday, the second day of July<br/>
          two thousand twenty-seven
        </div>

        <div style={{
          marginTop:32, fontFamily:'Inter', fontSize:11, fontWeight:500,
          letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--ink-soft)', lineHeight:1.8,
        }}>
          St Audries Park<br/>
          <span style={{ fontWeight:400, opacity:0.7 }}>West Quantoxhead · Somerset</span>
        </div>

        {/* corner counters */}
        <div style={{
          position:'absolute', top:24, left:28, color:'var(--ink-soft)', opacity:0.55,
        }}>
          <span className="mono-eyebrow" style={{ fontSize:9.5 }}>No. 001</span>
        </div>
        <div style={{
          position:'absolute', top:24, right:28, color:'var(--ink-soft)', opacity:0.55,
        }}>
          <span className="mono-eyebrow" style={{ fontSize:9.5 }}>Black Tie</span>
        </div>

        {showCountdown && (
          <div style={{
            position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
            color:'var(--burgundy)', whiteSpace:'nowrap',
          }}>
            <span className="serif" style={{ fontSize:13, fontStyle:'italic' }}>
              {days > 0 ? `${days} days hence` : 'today'}
            </span>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px){
          .hero-card{ padding:48px 24px !important; }
          .hero-eyebrow{ font-size:9px !important; letter-spacing:0.32em !important; }
        }
      `}</style>
    </section>
  );
};

// ===================================================================
// II — WELCOME / A NOTE
// Italic prose as if written inside the cover. Wide-set, asymmetric.
// ===================================================================
const Welcome = () => (
  <section id="welcome" style={{
    padding:'140px 32px 140px', background:'var(--cream)', position:'relative',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <div style={{ maxWidth:1080, margin:'0 auto' }}>
      <RunningHead left="A Note from the Couple" right="ii" />

      <div style={{
        marginTop:80, display:'grid', gridTemplateColumns:'auto 1fr', gap:60, alignItems:'start',
      }} className="welcome-grid">

        {/* Hanging initial */}
        <div className="serif" style={{
          fontSize:'clamp(160px, 22vw, 280px)',
          lineHeight:0.78, fontWeight:300, fontStyle:'italic',
          color:'var(--burgundy)', letterSpacing:'-0.04em',
          alignSelf:'start', marginTop:'-0.15em',
        }} aria-hidden="true">W</div>

        <div>
          <p className="serif" style={{
            margin:0, fontSize:'clamp(24px, 2.6vw, 32px)', lineHeight:1.4, fontWeight:300,
            color:'var(--ink)', letterSpacing:'-0.005em',
          }}>
            <span style={{ display:'inline' }}>e</span>'re so glad you're here. After eight years, two cities, three cats and one quiet question on a Cornish beach, we're getting married — and we'd very much like you to be there.
          </p>

          <p className="serif" style={{
            margin:'32px 0 0', fontSize:'clamp(19px, 1.9vw, 22px)', lineHeight:1.6,
            color:'var(--ink-soft)', fontStyle:'italic', fontWeight:300, maxWidth:640,
          }}>
            On the pages that follow you'll find everything you need to know — the order of the day, how to find us, where to sleep, what to wear, and the small business of replying. If anything is missing, write to <a href="mailto:hello@ryanandkatie.co" style={{ color:'var(--burgundy)' }}>hello@ryanandkatie.co</a>.
          </p>

          <div style={{ marginTop:48, display:'flex', alignItems:'baseline', gap:20 }}>
            <span style={{ width:48, height:1, background:'var(--ink)' }}/>
            <span className="serif" style={{ fontSize:18, fontStyle:'italic', color:'var(--ink)' }}>
              Ryan <em style={{ color:'var(--burgundy)' }}>&amp;</em> Katie
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px){
          .welcome-grid{ grid-template-columns: 1fr !important; gap:24px !important; }
        }
      `}</style>
    </div>
  </section>
);

// ===================================================================
// III — THE PROGRAMME (opera/concert-style)
// Centred, classical, ruled rows.
// ===================================================================
const PROGRAMME = [
  { act:'I',   time:'1:00',  meridian:'pm', name:'The Arrival',     note:'Drinks on the terrace.\nKindly be seated by half past.' },
  { act:'II',  time:'1:45',  meridian:'pm', name:'The Ceremony',    note:'The Music Room.\nApproximately thirty minutes.' },
  { act:'III', time:'2:30',  meridian:'pm', name:'Champagne &amp; Canapés', note:'Lawn and conservatory.\nPhotographs.' },
  { act:'IV',  time:'4:30',  meridian:'pm', name:'The Wedding Breakfast', note:'The Dining Room.\nThree courses and speeches.' },
  { act:'V',   time:'7:30',  meridian:'pm', name:'Cake &amp; First Dance', note:'Followed by the band.' },
  { act:'VI',  time:'8:00',  meridian:'pm', name:'Reception',       note:'Live band &amp; DJ.\nLate buffet at ten.' },
  { act:'\u2014',time:'12:00',meridian:'am', name:'Carriages',       note:'Last orders at half past eleven.' },
];

const Schedule = () => (
  <section id="schedule" style={{
    padding:'140px 32px 160px', background:'var(--cream-deep)', position:'relative',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <div style={{ maxWidth:760, margin:'0 auto' }}>
      <RunningHead left="The Programme" right="iii" />

      <div style={{ textAlign:'center', marginTop:60 }}>
        <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:18 }}>
          Order of the Day
        </div>
        <h2 className="serif" style={{
          margin:0, fontSize:'clamp(56px, 8vw, 92px)', fontWeight:300, lineHeight:1,
          color:'var(--ink)', fontStyle:'italic', letterSpacing:'-0.01em',
        }}>
          A Wedding<br/>in Seven Acts.
        </h2>
        <p className="serif" style={{
          margin:'28px auto 0', maxWidth:440,
          fontSize:17, lineHeight:1.65, fontStyle:'italic', color:'var(--ink-soft)', fontWeight:300,
        }}>
          A rough shape of the afternoon and evening, held lightly &mdash; times will firm up nearer the date.
        </p>
      </div>

      <RuleOrnament style={{ margin:'60px auto 40px' }} />

      <table style={{
        width:'100%', borderCollapse:'collapse', margin:'0 auto',
      }} className="programme-table">
        <tbody>
          {PROGRAMME.map((item, i) => (
            <tr key={i} style={{ borderTop: i === 0 ? '1px solid var(--rule)' : 'none', borderBottom:'1px solid var(--rule)' }} className="programme-row">
              <td style={{ padding:'24px 20px', textAlign:'center', verticalAlign:'top', width:80 }} className="prog-act">
                <span className="serif" style={{
                  fontSize:22, fontStyle:'italic', color:'var(--burgundy)', fontWeight:400,
                }}>{item.act}</span>
              </td>
              <td style={{ padding:'24px 20px', textAlign:'center', verticalAlign:'top', width:140 }} className="prog-time">
                <span className="serif" style={{
                  fontSize:30, fontWeight:300, color:'var(--ink)', letterSpacing:'-0.01em',
                }}>{item.time}</span>
                <span className="serif" style={{
                  fontSize:14, fontStyle:'italic', color:'var(--ink-soft)', marginLeft:4,
                }}>{item.meridian}</span>
              </td>
              <td style={{ padding:'24px 20px', textAlign:'left', verticalAlign:'top' }} className="prog-event">
                <div className="serif" style={{
                  fontSize:22, fontWeight:400, color:'var(--ink)', lineHeight:1.2, letterSpacing:'-0.005em',
                }} dangerouslySetInnerHTML={{ __html: item.name }} />
                <div className="serif" style={{
                  marginTop:6, fontSize:15, fontStyle:'italic', color:'var(--ink-soft)',
                  opacity:0.78, lineHeight:1.55, fontWeight:300, whiteSpace:'pre-line',
                }} dangerouslySetInnerHTML={{ __html: item.note }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign:'center', marginTop:32 }}>
        <span className="serif" style={{ fontSize:15, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.55 }}>
          &mdash; fin. &mdash;
        </span>
      </div>

      <style>{`
        @media (max-width: 640px){
          .prog-act{ width:50px !important; padding:18px 8px !important; }
          .prog-time{ width:90px !important; padding:18px 8px !important; }
          .prog-event{ padding:18px 8px !important; }
        }
      `}</style>
    </div>
  </section>
);

// ===================================================================
// IV — THE VENUE (travel guide plate)
// Image-left full-bleed, prose-right, then a typeset travel notes block.
// ===================================================================
const Venue = () => (
  <section id="venue" style={{
    padding:'140px 0 160px', background:'var(--cream)', position:'relative',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
      <RunningHead left="The Venue" right="iv" />
    </div>

    {/* Image + intro spread */}
    <div style={{
      marginTop:60, display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:0, alignItems:'stretch',
      maxWidth:1400, marginLeft:'auto', marginRight:'auto',
    }} className="venue-spread">
      <div style={{ position:'relative' }}>
        <image-slot id="venue-plate" shape="rect" placeholder="St Audries Park · landscape"
          style={{ width:'100%', aspectRatio:'4 / 3', display:'block' }}></image-slot>
        <div style={{
          position:'absolute', bottom:20, left:20, padding:'6px 12px',
          background:'var(--cream)', border:'1px solid var(--ink)',
        }}>
          <span className="mono-eyebrow" style={{ fontSize:9.5, color:'var(--ink-soft)' }}>The Avenue, looking south</span>
        </div>
      </div>
      <div style={{ padding:'48px 60px', background:'var(--cream-deep)', display:'flex', flexDirection:'column', justifyContent:'center' }} className="venue-prose">
        <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:18 }}>
          A Grade II Country House
        </div>
        <h2 className="serif" style={{
          margin:0, fontSize:'clamp(48px, 6vw, 80px)', fontWeight:300, lineHeight:0.95,
          color:'var(--ink)', fontStyle:'italic', letterSpacing:'-0.015em',
        }}>
          St Audries<br/>Park.
        </h2>
        <p className="serif" style={{
          margin:'24px 0 0', fontSize:19, lineHeight:1.6, color:'var(--ink)', fontWeight:300,
        }}>
          On the edge of Exmoor, with a long avenue of trees, parkland views to the Bristol Channel, and a peacock or two. We chose it for the candlelit dining room and the slow way the light moves across the lawn in late afternoon.
        </p>
      </div>
    </div>

    {/* Travel notes — typeset like a Baedeker entry */}
    <div style={{ maxWidth:1080, margin:'80px auto 0', padding:'0 32px' }}>
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <span className="mono-eyebrow" style={{ color:'var(--ink-soft)' }}>
          To get there
        </span>
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'120px 1fr', gap:0,
        borderTop:'1px solid var(--ink)', borderBottom:'1px solid var(--ink)',
      }} className="travel-block">
        <TravelRow head="Address">
          St Audries Park, West Quantoxhead, Somerset <strong>TA4 4DS</strong>
        </TravelRow>
        <TravelRow head="By rail">
          <strong>Taunton</strong> (25 min taxi) · <strong>Bridgwater</strong> (30 min taxi). Both well served from London Paddington and Bristol Temple Meads.
        </TravelRow>
        <TravelRow head="By car">
          M5 to junction 23 or 24, then west along the A39. Free parking on site &mdash; cars may be left overnight and collected the following morning.
        </TravelRow>
        <TravelRow head="By taxi">
          <em>A1 Williton</em> — 01984 000 000 &nbsp;&middot;&nbsp; <em>Taunton Cars</em> — 01823 000 000. Book in advance: rural coverage.
        </TravelRow>
        <TravelRow head="Coaches" last>
          We are arranging an afternoon coach from Taunton and a return coach at midnight. Sign up details to follow with the printed invitation.
        </TravelRow>
      </div>

      {/* Map block */}
      <div style={{ marginTop:48 }}>
        <div style={{
          aspectRatio:'16 / 6',
          background:`
            radial-gradient(circle at 50% 60%, rgba(74,26,44,0.18) 0, transparent 35%),
            repeating-linear-gradient(0deg,  rgba(74,26,44,0.05) 0 1px, transparent 1px 32px),
            repeating-linear-gradient(90deg, rgba(74,26,44,0.05) 0 1px, transparent 1px 32px),
            var(--cream-deep)
          `,
          border:'1px solid var(--ink)',
          position:'relative', overflow:'hidden',
        }} className="map-block">
          <div style={{
            position:'absolute', left:'50%', top:'62%', transform:'translate(-50%, -100%)',
            display:'flex', flexDirection:'column', alignItems:'center', gap:8,
          }}>
            <span className="serif" style={{
              fontSize:14, fontStyle:'italic', background:'var(--ink)', color:'var(--cream)',
              padding:'5px 12px', letterSpacing:'0.02em', whiteSpace:'nowrap',
            }}>St Audries Park</span>
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
              <path d="M8 0 C 3.5 0, 0 3.5, 0 8 C 0 14, 8 22, 8 22 C 8 22, 16 14, 16 8 C 16 3.5, 12.5 0, 8 0 Z" fill="var(--burgundy)"/>
              <circle cx="8" cy="8" r="2.4" fill="var(--cream)"/>
            </svg>
          </div>
          {/* compass */}
          <div style={{ position:'absolute', top:18, right:24, color:'var(--ink-soft)', opacity:0.7 }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <line x1="18" y1="4" x2="18" y2="14" stroke="currentColor"/>
              <line x1="18" y1="22" x2="18" y2="32" stroke="currentColor"/>
              <line x1="4" y1="18" x2="14" y2="18" stroke="currentColor"/>
              <line x1="22" y1="18" x2="32" y2="18" stroke="currentColor"/>
              <text x="18" y="3" fontFamily="serif" fontSize="8" fontStyle="italic" textAnchor="middle" fill="currentColor">N</text>
            </svg>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, alignItems:'baseline' }}>
          <span className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.7, fontSize:9.5 }}>
            51° 10' 30" N  ·  3° 16' 38" W
          </span>
          <a href="https://www.google.com/maps?q=St+Audries+Park" target="_blank" rel="noopener" style={{
            color:'var(--burgundy)', textDecoration:'none',
            fontSize:10.5, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase',
            borderBottom:'1px solid var(--burgundy)', paddingBottom:2,
          }}>Open in Maps →</a>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px){
        .venue-spread{ grid-template-columns: 1fr !important; }
        .venue-prose{ padding:36px 28px !important; }
        .travel-block{ grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

const TravelRow = ({ head, children, last = false }) => (
  <>
    <div style={{
      padding:'20px 24px', borderRight:'1px solid var(--rule)',
      borderTop: '1px solid var(--rule)',
      borderTopColor: 'var(--rule-soft)',
      borderBottom: last ? 'none' : 'none',
      background:'transparent',
    }} className="travel-head">
      <span className="mono-eyebrow" style={{ color:'var(--burgundy)', fontSize:10 }}>{head}</span>
    </div>
    <div style={{
      padding:'20px 24px',
      borderTop:'1px solid var(--rule-soft)',
    }} className="travel-cell">
      <span className="serif" style={{ fontSize:18, lineHeight:1.55, fontWeight:300, color:'var(--ink)' }}>
        {children}
      </span>
    </div>
    <style>{`
      @media (max-width: 900px){
        .travel-head{ border-right:none !important; padding-bottom:4px !important; }
        .travel-cell{ border-top:none !important; padding-top:4px !important; }
      }
    `}</style>
  </>
);

// ===================================================================
// V — LODGINGS (classified ads / property listings)
// Three columns of compact listings, newspaper feel.
// ===================================================================
const STAYS = [
  { name:'St Audries Park', tier:'On site', distance:'On the premises', price:'£££', rooms:'8 rooms in the house', note:'First come, first served. Mention the wedding when booking.' },
  { name:'The Plough Inn', tier:'Walkable', distance:'1.4 miles', price:'££', rooms:'7 rooms', note:'A small coaching inn — quiet, well-run. Walkable in daylight; cab home after dark.' },
  { name:'Combe House Hotel', tier:'Short drive', distance:'4 miles', price:'£££', rooms:'15 rooms held', note:'A country house in Holford. Rooms held under "Ryan & Katie" until 1 April 2027.' },
  { name:'Williton B&amp;Bs', tier:'Short drive', distance:'3 miles', price:'£–££', rooms:'Various', note:'The nearest village — several family-run guesthouses. A shortlist to follow.' },
  { name:'Castle of Comfort', tier:'Short drive', distance:'7 miles', price:'££', rooms:'9 rooms', note:'A 16th-century coaching inn near Nether Stowey. Old beams, good breakfast.' },
  { name:'Premier Inn Taunton', tier:'Further afield', distance:'18 miles', price:'£', rooms:'Plentiful', note:'Predictable and inexpensive. Best for a single night — share a taxi.' },
];

const Stay = () => (
  <section id="stay" style={{
    padding:'140px 32px 160px', background:'var(--cream)', position:'relative',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <div style={{ maxWidth:1180, margin:'0 auto' }}>
      <RunningHead left="Where to Sleep" right="v" />

      <div style={{ textAlign:'center', marginTop:54, marginBottom:60 }}>
        <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:14 }}>
          Lodgings, in order of proximity
        </div>
        <h2 className="serif" style={{
          margin:0, fontSize:'clamp(54px, 8vw, 92px)', fontWeight:300, fontStyle:'italic',
          lineHeight:1, color:'var(--ink)', letterSpacing:'-0.015em',
        }}>
          A bed for<br/>the night.
        </h2>
        <p className="serif" style={{
          margin:'24px auto 0', maxWidth:520,
          fontSize:17, fontStyle:'italic', color:'var(--ink-soft)', fontWeight:300, lineHeight:1.65,
        }}>
          It is a long way to Somerset and a longer way home at midnight &mdash; please plan to stay.
        </p>
      </div>

      <div style={{
        columnCount:3, columnGap:48, columnRule:'1px solid var(--rule)',
        borderTop:'2px solid var(--ink)', borderBottom:'2px solid var(--ink)',
        padding:'28px 0',
      }} className="classifieds">
        {STAYS.map((s, i) => (
          <article key={i} style={{
            breakInside:'avoid', pageBreakInside:'avoid', marginBottom:32, paddingBottom:24,
            borderBottom: '1px solid var(--rule-soft)',
          }}>
            <div className="mono-eyebrow" style={{ color:'var(--burgundy)', fontSize:9, marginBottom:6 }}>{s.tier} · {s.distance}</div>
            <h3 className="serif" style={{
              margin:0, fontSize:22, fontWeight:500, lineHeight:1.15, color:'var(--ink)', letterSpacing:'-0.005em',
            }} dangerouslySetInnerHTML={{ __html: s.name }}/>
            <div className="serif" style={{
              margin:'4px 0 10px', fontSize:14, fontStyle:'italic', color:'var(--ink-soft)', fontWeight:300,
            }}>
              {s.rooms} &nbsp;&middot;&nbsp; <span style={{ color:'var(--burgundy)', letterSpacing:'0.04em' }}>{s.price}</span>
            </div>
            <p className="serif" style={{
              margin:0, fontSize:15.5, lineHeight:1.55, color:'var(--ink)', fontWeight:300,
            }} dangerouslySetInnerHTML={{ __html: s.note }}/>
          </article>
        ))}
      </div>

      <p className="serif" style={{
        marginTop:36, fontStyle:'italic', fontSize:15, color:'var(--ink-soft)', opacity:0.65,
        textAlign:'center', maxWidth:600, marginLeft:'auto', marginRight:'auto', fontWeight:300,
      }}>
        Contacts and booking links will follow by the end of 2026 — please RSVP before reserving in case anything moves.
      </p>

      <style>{`
        @media (max-width: 900px){
          .classifieds{ column-count:2 !important; column-gap:32px !important; }
        }
        @media (max-width: 600px){
          .classifieds{ column-count:1 !important; }
        }
      `}</style>
    </div>
  </section>
);

// ===================================================================
// VI — ATTIRE (poster page)
// Dark bleed. Single dramatic statement. Three plates.
// ===================================================================
const Dress = () => (
  <section id="dress" style={{
    padding:'140px 32px 160px', background:'var(--burgundy)', color:'var(--cream)',
    position:'relative', overflow:'hidden',
  }}>
    {/* candlelight */}
    <div style={{
      position:'absolute', inset:0, pointerEvents:'none',
      background:'radial-gradient(ellipse 60% 40% at 50% 25%, rgba(168,50,107,0.32), transparent 60%)',
    }}/>
    {/* grain */}
    <div style={{
      position:'absolute', inset:0, opacity:0.16, mixBlendMode:'overlay', pointerEvents:'none',
      backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
    }}/>

    <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
        paddingBottom:18, borderBottom:'1px solid rgba(244,237,228,0.3)' }}>
        <span className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.65)' }}>Attire</span>
        <span className="serif" style={{ fontSize:13, fontStyle:'italic', color:'rgba(244,237,228,0.65)' }}>vi</span>
      </div>

      <div style={{ textAlign:'center', marginTop:80 }}>
        <h2 className="serif" style={{
          margin:0, fontSize:'clamp(80px, 17vw, 260px)', fontWeight:300,
          lineHeight:0.88, letterSpacing:'-0.035em', color:'var(--cream)',
        }}>
          Black <em style={{ color:'var(--blush)' }}>Tie</em>.
        </h2>
        <p className="serif" style={{
          margin:'22px auto 0', maxWidth:660, fontSize:'clamp(20px, 2.4vw, 28px)',
          fontStyle:'italic', fontWeight:300, lineHeight:1.5, color:'rgba(244,237,228,0.8)',
        }}>
          The kind of evening that calls for it &mdash; candlelight, jewel tones, and a slow walk through a country garden.
        </p>
      </div>

      <div style={{
        marginTop:96, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:36,
        maxWidth:1080, marginLeft:'auto', marginRight:'auto',
      }} className="attire-grid">
        <AttirePlate id="dress-1" caption="A black dinner jacket" />
        <AttirePlate id="dress-2" caption="A long jewel-toned gown" shift={48} />
        <AttirePlate id="dress-3" caption="A velvet bow, midnight blue" />
      </div>

      <div style={{
        marginTop:110, display:'grid', gridTemplateColumns:'1fr 1px 1fr', gap:60,
        maxWidth:920, marginLeft:'auto', marginRight:'auto', alignItems:'start',
      }} className="attire-notes">
        <div>
          <div className="mono-eyebrow" style={{ color:'var(--blush)', marginBottom:16 }}>For gentlemen</div>
          <p className="serif" style={{
            margin:0, fontSize:19, lineHeight:1.7, color:'rgba(244,237,228,0.92)', fontWeight:300,
          }}>
            A black dinner jacket and bow tie. Midnight blue or deep velvet is welcome. White shirt; black shoes. Patterned cummerbunds encouraged, within reason.
          </p>
        </div>
        <div style={{ background:'rgba(244,237,228,0.2)', alignSelf:'stretch' }} className="attire-rule"/>
        <div>
          <div className="mono-eyebrow" style={{ color:'var(--blush)', marginBottom:16 }}>For ladies</div>
          <p className="serif" style={{
            margin:0, fontSize:19, lineHeight:1.7, color:'rgba(244,237,228,0.92)', fontWeight:300,
          }}>
            A long gown, or a formal cocktail dress. Jewel tones &mdash; burgundy, plum, emerald, ink &mdash; sit beautifully against the palette of the day.
          </p>
        </div>
      </div>

      <p className="serif" style={{
        marginTop:60, fontStyle:'italic', fontSize:17, color:'rgba(244,237,228,0.6)',
        textAlign:'center', maxWidth:520, marginLeft:'auto', marginRight:'auto', fontWeight:300, lineHeight:1.6,
      }}>
        If black tie isn't your usual register, please don't worry &mdash; wear something that makes you feel handsome or beautiful, and you'll be exactly right.
      </p>

      <style>{`
        @media (max-width: 760px){
          .attire-grid{ grid-template-columns:1fr 1fr !important; }
          .attire-grid > *:last-child{ display:none; }
          .attire-notes{ grid-template-columns:1fr !important; gap:32px !important; }
          .attire-rule{ display:none; }
        }
      `}</style>
    </div>
  </section>
);

const AttirePlate = ({ id, caption, shift = 0 }) => (
  <div style={{ marginTop:shift }}>
    <image-slot id={id} shape="rect" data-on-dark="" placeholder="3 : 4"
      style={{ width:'100%', aspectRatio:'3 / 4', display:'block' }}></image-slot>
    <div style={{ marginTop:14, textAlign:'center' }}>
      <span className="serif" style={{
        fontSize:14, fontStyle:'italic', color:'rgba(244,237,228,0.72)', fontWeight:300,
      }}>{caption}</span>
    </div>
  </div>
);

// ===================================================================
// VII — INQUIRIES (newspaper Q&A column)
// Two columns of dense newsprint, with a drop cap on the first answer.
// ===================================================================
const FAQS = [
  { q:'Can we bring our children?', a:'We adore your children but have chosen to keep the day adults-only (eighteen and up). We hope this gives plenty of notice to arrange care. Babes in arms under one are most welcome.' },
  { q:'I have a dietary requirement — what should I do?', a:'There is a dedicated space on the reply card. Vegetarian, vegan, gluten-free, allergies, anything — please tell us in your own words and we will make sure every plate works.' },
  { q:'Are gifts expected?', a:'Your company is more than gift enough. If you would like to mark the day, we will share a small honeymoon fund nearer the wedding — you are under no obligation whatsoever.' },
  { q:'Indoors or outdoors?', a:'The ceremony is indoors, in the Music Room, which seats everyone comfortably. Drinks and photographs will move outside if the weather is kind.' },
  { q:'How long does the day run?', a:'Roughly one in the afternoon through to midnight. The Programme is the current shape; times will firm up in the new year.' },
  { q:'Photographers?', a:'Yes — Sam from Field & Folk will be with us. We ask, gently, that phones stay away during the ceremony. After that, please snap to your heart\u2019s content.' },
  { q:'I\u2019m not driving — how do I get there?', a:'Trains to Taunton or Bridgwater, then a 25–30 minute taxi. We are looking into an afternoon coach from Taunton and a return coach at midnight — details to follow.' },
  { q:'Plus-ones?', a:'Your invitation will say. If your guest is named, please bring them. If not, we have kept the numbers tight — please don\u2019t take it personally.' },
];

const FAQ = () => (
  <section id="faqs" style={{
    padding:'140px 32px 160px', background:'var(--cream)', position:'relative',
    borderTop:'1px solid var(--rule-soft)',
  }}>
    <div style={{ maxWidth:1180, margin:'0 auto' }}>
      <RunningHead left="Letters &amp; Inquiries" right="vii" />

      <div style={{ textAlign:'center', marginTop:54, marginBottom:60 }}>
        <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:14 }}>
          Answers to questions oft asked
        </div>
        <h2 className="serif" style={{
          margin:0, fontSize:'clamp(54px, 8vw, 92px)', fontWeight:300, fontStyle:'italic',
          lineHeight:1, color:'var(--ink)', letterSpacing:'-0.015em',
        }}>
          Inquiries.
        </h2>
      </div>

      <div style={{
        columnCount:2, columnGap:60, columnRule:'1px solid var(--rule)',
        borderTop:'2px solid var(--ink)', borderBottom:'2px solid var(--ink)',
        padding:'32px 0',
      }} className="qa-columns">
        {FAQS.map((item, i) => (
          <div key={i} style={{
            breakInside:'avoid', pageBreakInside:'avoid', marginBottom:28, paddingBottom:24,
            borderBottom:'1px solid var(--rule-soft)',
          }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
              <span className="serif" style={{ fontSize:22, fontStyle:'italic', color:'var(--burgundy)', fontWeight:400 }}>Q.</span>
              <h3 className="serif" style={{
                margin:0, fontSize:19, fontWeight:500, lineHeight:1.3, color:'var(--ink)', letterSpacing:'-0.005em',
              }} dangerouslySetInnerHTML={{ __html: item.q }}/>
            </div>
            <div style={{ display:'flex', alignItems:'baseline', gap:12, marginTop:10 }}>
              <span className="serif" style={{ fontSize:22, fontStyle:'italic', color:'var(--burgundy)', fontWeight:400, opacity:0.7 }}>A.</span>
              <p className="serif" style={{
                margin:0, fontSize:16, lineHeight:1.6, color:'var(--ink)', fontWeight:300,
              }} dangerouslySetInnerHTML={{ __html: item.a }}/>
            </div>
          </div>
        ))}
      </div>

      <p className="serif" style={{
        marginTop:36, fontStyle:'italic', fontSize:16, color:'var(--ink-soft)', opacity:0.7,
        textAlign:'center', fontWeight:300,
      }}>
        Anything left over — write to us at <a href="mailto:hello@ryanandkatie.co" style={{ color:'var(--burgundy)' }}>hello@ryanandkatie.co</a>.
      </p>

      <style>{`
        @media (max-width: 800px){
          .qa-columns{ column-count:1 !important; }
        }
      `}</style>
    </div>
  </section>
);

// ===================================================================
// COLOPHON FOOTER (closing page of a book)
// ===================================================================
const Footer = () => (
  <footer style={{
    padding:'90px 32px 56px', background:'var(--ink)', color:'rgba(244,237,228,0.6)',
    position:'relative', overflow:'hidden',
  }}>
    <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center' }}>
      <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.45)', marginBottom:24 }}>
        Colophon
      </div>
      <p className="serif" style={{
        margin:0, fontSize:18, fontStyle:'italic', lineHeight:1.7, fontWeight:300,
        color:'rgba(244,237,228,0.78)', maxWidth:560, marginLeft:'auto', marginRight:'auto',
      }}>
        This little booklet was made by the two of us, in cream and burgundy, for you. With thanks for reading this far &mdash; we will see you in Somerset.
      </p>
      <div style={{
        margin:'48px auto 0', display:'flex', alignItems:'center', justifyContent:'center', gap:18,
      }}>
        <span style={{ width:60, height:1, background:'rgba(244,237,228,0.4)' }}/>
        <span className="serif" style={{
          fontSize:'clamp(28px, 4vw, 44px)', color:'var(--cream)', fontWeight:300, letterSpacing:'0.02em',
        }}>
          Ryan <em style={{ color:'var(--blush)', fontStyle:'italic' }}>&amp;</em> Katie
        </span>
        <span style={{ width:60, height:1, background:'rgba(244,237,228,0.4)' }}/>
      </div>
      <div style={{
        marginTop:60, paddingTop:20, borderTop:'1px solid rgba(244,237,228,0.18)',
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
      }}>
        <span className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.5)', fontSize:9.5 }}>02 . 07 . 2027</span>
        <span className="serif" style={{ fontSize:14, fontStyle:'italic', color:'rgba(244,237,228,0.5)' }}>— fin —</span>
        <span className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.5)', fontSize:9.5 }}>St Audries Park</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Nav, Hero, Welcome, Schedule, Venue, Stay, Dress, FAQ, Footer,
  RunningHead, Folio, TravelRow, AttirePlate,
});
