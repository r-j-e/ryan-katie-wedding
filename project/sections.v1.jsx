// All page sections except RSVP (which has its own file due to form state)

// ============ NAV ============
const Nav = ({ active }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id:'schedule', label:'The Day' },
    { id:'venue', label:'Venue' },
    { id:'stay', label:'Stay' },
    { id:'dress', label:'Dress' },
    { id:'faqs', label:'FAQs' },
    { id:'rsvp', label:'RSVP' },
  ];

  const go = (id) => (e) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth' });
  };

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:50,
      background: scrolled ? 'rgba(244,237,228,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(1.1)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.1)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition:'all 0.4s ease',
      padding:'14px 28px',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:20 }}>
        <a href="#top" onClick={go('top')} style={{ display:'flex', alignItems:'center', textDecoration:'none', color:'var(--ink)' }}>
          <Monogram size={38} />
        </a>

        <ul style={{
          display:'flex', alignItems:'center', gap:30, listStyle:'none', margin:0, padding:0,
        }} className="nav-desktop">
          {links.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={go(l.id)} style={{
                textDecoration:'none',
                color: active === l.id ? 'var(--burgundy)' : 'var(--ink)',
                fontSize:11, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase',
                paddingBottom:4,
                borderBottom: active === l.id ? '1px solid var(--burgundy)' : '1px solid transparent',
                transition:'all 0.2s',
              }}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-toggle" style={{
          background:'none', border:'none', cursor:'pointer', padding:8, display:'none',
        }} aria-label="Menu">
          <svg width="22" height="14" viewBox="0 0 22 14"><line x1="0" y1="2" x2="22" y2="2" stroke="currentColor" strokeWidth="1"/><line x1="0" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1"/></svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position:'fixed', top:0, left:0, right:0, bottom:0, background:'var(--cream)', zIndex:60,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:30,
        }}>
          <button onClick={() => setMobileOpen(false)} style={{
            position:'absolute', top:18, right:24, background:'none', border:'none', cursor:'pointer',
            fontFamily:'Inter', fontSize:11, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--ink)',
          }}>Close</button>
          <Monogram size={48} />
          <ul style={{ listStyle:'none', padding:0, margin:'40px 0 0', display:'flex', flexDirection:'column', gap:22, alignItems:'center' }}>
            {links.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="serif" style={{
                  textDecoration:'none', color:'var(--ink)', fontSize:32, fontStyle:'italic', fontWeight:400,
                }}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 860px){
          .nav-desktop{ display:none !important; }
          .nav-mobile-toggle{ display:block !important; }
        }
      `}</style>
    </nav>
  );
};

// ============ COUNTDOWN ============
const useCountdown = (targetIso) => {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const target = new Date(targetIso);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  return { days, hours };
};

// ============ HERO ============
const Hero = ({ showCountdown = true }) => {
  const { days } = useCountdown('2027-07-02T13:00:00');

  return (
    <section id="top" style={{
      minHeight:'100vh',
      background:'var(--cream)',
      position:'relative',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'120px 24px 60px',
      overflow:'hidden',
    }}>
      {/* Decorative side rules */}
      <div style={{ position:'absolute', top:120, bottom:60, left:40, width:1, background:'var(--rule-soft)' }} className="hero-rule"/>
      <div style={{ position:'absolute', top:120, bottom:60, right:40, width:1, background:'var(--rule-soft)' }} className="hero-rule"/>

      <div style={{ maxWidth:1100, width:'100%', textAlign:'center', position:'relative', zIndex:1 }}>
        <div className="mono-eyebrow" style={{ color:'var(--burgundy)', marginBottom:24 }}>
          Two&nbsp;·&nbsp;July&nbsp;·&nbsp;Two&nbsp;Thousand&nbsp;Twenty&nbsp;Seven
        </div>

        <h1 className="serif" style={{
          margin:0,
          fontSize:'clamp(64px, 12vw, 168px)',
          lineHeight:0.95,
          fontWeight:300,
          letterSpacing:'-0.015em',
          color:'var(--ink)',
        }}>
          Ryan <em style={{ fontWeight:400, color:'var(--burgundy)' }}>&amp;</em> Katie
        </h1>

        <div style={{ display:'flex', justifyContent:'center', margin:'32px 0' }}>
          <FloralMark size={26} />
        </div>

        <p className="serif" style={{
          fontSize:'clamp(20px, 2.2vw, 26px)',
          fontStyle:'italic',
          fontWeight:300,
          margin:'0 auto',
          maxWidth:640,
          lineHeight:1.5,
          color:'var(--ink-soft)',
        }}>
          are getting married at St&nbsp;Audries&nbsp;Park,<br/>
          Somerset, on a Friday afternoon in July.
        </p>

        {/* Countdown + venue line */}
        <div style={{
          marginTop:60,
          display:'grid',
          gridTemplateColumns:'1fr auto 1fr',
          alignItems:'center',
          gap:36,
          maxWidth:760,
          margin:'60px auto 0',
        }} className="hero-meta">
          <div style={{ textAlign:'right' }}>
            <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.7 }}>The Date</div>
            <div className="serif" style={{ fontSize:30, fontWeight:400, marginTop:6, color:'var(--ink)' }}>02.07.2027</div>
            <div className="serif" style={{ fontSize:14, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.7 }}>Friday</div>
          </div>

          <div style={{
            width:1, alignSelf:'stretch', background:'var(--rule)',
          }}/>

          <div style={{ textAlign:'left' }}>
            <div className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.7 }}>The Place</div>
            <div className="serif" style={{ fontSize:30, fontWeight:400, marginTop:6, color:'var(--ink)' }}>St Audries Park</div>
            <div className="serif" style={{ fontSize:14, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.7 }}>West Quantoxhead, Somerset</div>
          </div>
        </div>

        {/* Countdown */}
        {showCountdown && (
          <div style={{ marginTop:48 }}>
            <div className="mono-eyebrow" style={{ color:'var(--burgundy)' }}>
              {days > 0 ? `${days} days to go` : 'Today is the day'}
            </div>
          </div>
        )}
      </div>

      {/* Scroll cue */}
      <div style={{
        position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:10,
        color:'var(--ink-soft)', opacity:0.5,
      }}>
        <span className="mono-eyebrow" style={{ fontSize:9 }}>Scroll</span>
        <div style={{ width:1, height:30, background:'currentColor', animation:'scrollPulse 2.4s ease-in-out infinite' }}/>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(0.4); transform-origin: top; opacity:0.3; }
          50% { transform: scaleY(1); transform-origin: top; opacity:0.7; }
        }
        @media (max-width: 700px){
          .hero-rule{ display:none; }
          .hero-meta{ grid-template-columns: 1fr !important; gap:20px !important; }
          .hero-meta > div[style*="text-align: right"]{ text-align:center !important; }
          .hero-meta > div[style*="text-align: left"]{ text-align:center !important; }
          .hero-meta > div[style*="width: 1px"]{ width:60px !important; height:1px !important; margin:0 auto; align-self:auto !important; }
        }
      `}</style>
    </section>
  );
};

// ============ SCHEDULE ============
const SCHEDULE = [
  { time:'1:00 pm', title:'Guests arrive', note:'Drinks on the terrace. Please be seated by 1:30.' },
  { time:'1:45 pm', title:'Ceremony', note:'The Music Room — about thirty minutes.' },
  { time:'2:30 pm', title:'Champagne &amp; canapés', note:'Lawn and conservatory. Photographs.' },
  { time:'4:30 pm', title:'Wedding breakfast', note:'The Dining Room. Three courses and speeches.' },
  { time:'7:30 pm', title:'Cutting of the cake', note:'Followed by the first dance.' },
  { time:'8:00 pm', title:'Evening reception', note:'Live band &amp; DJ. Late buffet at 10.' },
  { time:'12:00 am', title:'Carriages', note:'Last orders called at 11:30 pm.' },
];

const Schedule = () => (
  <section id="schedule" style={{ padding:'120px 24px 100px', background:'var(--cream)' }}>
    <div style={{ maxWidth:880, margin:'0 auto' }}>
      <SectionHeader eyebrow="Two — Order of the Day" title="The Day" />
      <p className="serif" style={{ textAlign:'center', fontStyle:'italic', fontSize:19, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:520, margin:'0 auto 64px', fontWeight:300 }}>
        A rough shape of the day. Times will be tightened up closer to July.
      </p>

      <ol style={{ listStyle:'none', padding:0, margin:0 }}>
        {SCHEDULE.map((item, i) => (
          <li key={i} style={{
            display:'grid', gridTemplateColumns:'180px 1fr', gap:40,
            padding:'28px 0',
            borderTop: i === 0 ? '1px solid var(--rule)' : 'none',
            borderBottom:'1px solid var(--rule)',
            alignItems:'baseline',
          }} className="sched-row">
            <div style={{ textAlign:'right' }} className="sched-time-col">
              <div className="serif" style={{ fontSize:30, fontWeight:400, color:'var(--burgundy)', letterSpacing:'-0.01em' }}>
                {item.time}
              </div>
            </div>
            <div>
              <div className="serif" style={{ fontSize:24, fontWeight:400, color:'var(--ink)', marginBottom:6, letterSpacing:'-0.005em' }}
                dangerouslySetInnerHTML={{ __html: item.title }} />
              <div className="serif" style={{ fontSize:16, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.75, fontWeight:300 }}
                dangerouslySetInnerHTML={{ __html: item.note }} />
            </div>
          </li>
        ))}
      </ol>

      <style>{`
        @media (max-width: 640px){
          .sched-row{ grid-template-columns: 1fr !important; gap:6px !important; }
          .sched-time-col{ text-align:left !important; }
        }
      `}</style>
    </div>
  </section>
);

// ============ SECTION HEADER ============
const SectionHeader = ({ eyebrow, title, dark = false, align = 'center' }) => (
  <div style={{ textAlign: align, marginBottom: 56 }}>
    <div className="mono-eyebrow" style={{ color: dark ? 'rgba(244,237,228,0.55)' : 'var(--burgundy)', marginBottom:18 }}>
      {eyebrow}
    </div>
    <h2 className="serif" style={{
      margin:0,
      fontSize:'clamp(44px, 6vw, 76px)',
      fontWeight:300,
      lineHeight:1,
      color: dark ? 'var(--cream)' : 'var(--ink)',
      letterSpacing:'-0.01em',
    }}>{title}</h2>
  </div>
);

// ============ VENUE & TRAVEL ============
const Venue = () => (
  <section id="venue" style={{
    padding:'120px 24px',
    background:'var(--ink)',
    color:'var(--cream)',
    position:'relative',
    overflow:'hidden',
  }}>
    <div style={{
      position:'absolute', top:0, left:0, right:0, height:'40%',
      background:'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(168,50,107,0.10), transparent)',
      pointerEvents:'none',
    }}/>
    <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }}>
      <SectionHeader eyebrow="Three — Venue &amp; Travel" title="St Audries Park" dark />

      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start',
      }} className="venue-grid">
        {/* Image */}
        <div>
          <image-slot id="venue-hero" shape="rect" data-on-dark="" placeholder="venue photo · landscape" style={{ width:'100%', aspectRatio:'4 / 5', display:'block' }}></image-slot>
          <div className="serif" style={{ marginTop:12, fontStyle:'italic', fontSize:14, color:'rgba(244,237,228,0.55)' }}>
            A Grade II listed country house on the edge of Exmoor, with parkland views to the Bristol Channel.
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="serif" style={{ fontSize:22, fontWeight:300, lineHeight:1.55, color:'rgba(244,237,228,0.88)', marginTop:0 }}>
            We chose St Audries for the long avenue of trees, the candlelit dining room, and a peacock or two. The day will move slowly between the gardens, the Music Room and the terrace.
          </p>

          <div style={{ marginTop:36 }}>
            <DetailRow label="Address" dark>
              St Audries Park,<br/>
              West Quantoxhead,<br/>
              Somerset TA4 4DS
            </DetailRow>
            <DetailRow label="Nearest stations" dark>
              <strong style={{ fontWeight:500 }}>Taunton</strong> &nbsp;·&nbsp; 25 min by car<br/>
              <strong style={{ fontWeight:500 }}>Bridgwater</strong> &nbsp;·&nbsp; 30 min by car
            </DetailRow>
            <DetailRow label="By car" dark>
              M5 to J23 or J24, then west along the A39.<br/>
              Free parking on site — cars may be left overnight.
            </DetailRow>
            <DetailRow label="Taxis" dark>
              <em style={{ fontStyle:'italic' }}>A1 Taxis Williton</em> — 01984&nbsp;000&nbsp;000<br/>
              <em style={{ fontStyle:'italic' }}>Taunton Cars</em> — 01823&nbsp;000&nbsp;000<br/>
              Book in advance; coverage is rural.
            </DetailRow>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ marginTop:72 }}>
        <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginBottom:14, textAlign:'center' }}>
          On the map
        </div>
        <div style={{
          position:'relative',
          aspectRatio:'16 / 6',
          background:`
            radial-gradient(ellipse 30% 60% at 50% 50%, rgba(168,50,107,0.20), transparent 60%),
            repeating-linear-gradient(45deg, rgba(244,237,228,0.04) 0 2px, transparent 2px 28px),
            repeating-linear-gradient(-45deg, rgba(244,237,228,0.04) 0 2px, transparent 2px 28px),
            #1A1416
          `,
          border:'1px solid rgba(244,237,228,0.18)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }} className="map-placeholder">
          <div style={{ textAlign:'center' }}>
            <FloralMark size={22} dark />
            <div className="serif" style={{ marginTop:10, fontSize:24, fontWeight:300 }}>St Audries Park</div>
            <div className="serif" style={{ fontStyle:'italic', fontSize:13, opacity:0.6 }}>51.1751° N, 3.2774° W</div>
            <a href="https://www.google.com/maps?q=St+Audries+Park" target="_blank" rel="noopener" style={{
              display:'inline-block', marginTop:16,
              color:'var(--cream)', textDecoration:'none',
              fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase',
              borderBottom:'1px solid rgba(244,237,228,0.4)', paddingBottom:3,
            }}>Open in Google Maps</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px){
          .venue-grid{ grid-template-columns: 1fr !important; gap:40px !important; }
        }
      `}</style>
    </div>
  </section>
);

const DetailRow = ({ label, children, dark = false }) => (
  <div style={{
    display:'grid', gridTemplateColumns:'140px 1fr', gap:24,
    padding:'18px 0',
    borderTop: `1px solid ${dark ? 'rgba(244,237,228,0.18)' : 'var(--rule)'}`,
  }} className="detail-row">
    <div className="mono-eyebrow" style={{ color: dark ? 'rgba(244,237,228,0.55)' : 'var(--ink-soft)', paddingTop:4 }}>
      {label}
    </div>
    <div className="serif" style={{
      fontSize:17, lineHeight:1.6, fontWeight:300,
      color: dark ? 'rgba(244,237,228,0.85)' : 'var(--ink)',
    }}>
      {children}
    </div>
    <style>{`
      @media (max-width: 540px){
        .detail-row{ grid-template-columns: 1fr !important; gap:4px !important; padding:14px 0 !important; }
      }
    `}</style>
  </div>
);

// ============ ACCOMMODATION ============
const STAYS = [
  { name:'St Audries Park', tier:'On site', distance:'0 mi', price:'£££', note:'Limited rooms in the house — first come, first served. Mention the wedding when booking.' },
  { name:'The Plough Inn', tier:'Walkable', distance:'1.4 mi', price:'££', note:'A coaching inn with seven rooms. Quiet and well-run. Walkable in daylight, cab home at night.' },
  { name:'Combe House Hotel', tier:'Short drive', distance:'4 mi', price:'£££', note:'Country house hotel in Holford. A handful of rooms held under "Ryan & Katie" until 1 April 2027.' },
  { name:'Various B&amp;Bs · Williton', tier:'Short drive', distance:'3 mi', price:'£–££', note:'The nearest village. Several family-run guesthouses; the tourist office can help.' },
  { name:'Premier Inn Taunton', tier:'Further afield', distance:'18 mi', price:'£', note:'Predictable and inexpensive. Best for one-night stays — taxi share to and from is recommended.' },
];

const Stay = () => (
  <section id="stay" style={{ padding:'120px 24px', background:'var(--cream)' }}>
    <div style={{ maxWidth:1000, margin:'0 auto' }}>
      <SectionHeader eyebrow="Four — Where to Sleep" title="Accommodation" />
      <p className="serif" style={{ textAlign:'center', fontStyle:'italic', fontSize:19, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:600, margin:'0 auto 64px', fontWeight:300 }}>
        It is a long way to Somerset and a longer way home at midnight. Please plan to stay.
      </p>

      <div style={{ display:'flex', flexDirection:'column' }}>
        {STAYS.map((s, i) => (
          <article key={i} style={{
            display:'grid',
            gridTemplateColumns:'1fr auto auto auto',
            gap:32, alignItems:'baseline',
            padding:'32px 4px',
            borderTop:'1px solid var(--rule)',
            borderBottom: i === STAYS.length - 1 ? '1px solid var(--rule)' : 'none',
          }} className="stay-row">
            <div>
              <h3 className="serif" style={{ margin:0, fontSize:28, fontWeight:400, color:'var(--ink)', letterSpacing:'-0.005em' }}
                dangerouslySetInnerHTML={{ __html: s.name }} />
              <p className="serif" style={{ margin:'8px 0 0', fontSize:16, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.78, lineHeight:1.55, fontWeight:300 }}
                dangerouslySetInnerHTML={{ __html: s.note }} />
            </div>
            <Pill>{s.tier}</Pill>
            <span className="mono-eyebrow" style={{ color:'var(--ink-soft)', opacity:0.7 }}>{s.distance}</span>
            <span className="serif" style={{ fontSize:20, color:'var(--burgundy)', letterSpacing:'0.06em' }}>{s.price}</span>
          </article>
        ))}
      </div>

      <p className="serif" style={{
        textAlign:'center', fontStyle:'italic', fontSize:15, color:'var(--ink-soft)', opacity:0.65,
        marginTop:40, fontWeight:300, maxWidth:560, marginLeft:'auto', marginRight:'auto',
      }}>
        We will release contacts and booking links by the end of 2026. Please RSVP before reserving rooms in case anything moves.
      </p>

      <style>{`
        @media (max-width: 720px){
          .stay-row{ grid-template-columns: 1fr !important; gap:10px !important; padding:24px 4px !important; }
        }
      `}</style>
    </div>
  </section>
);

const Pill = ({ children }) => (
  <span style={{
    display:'inline-block',
    border:'1px solid var(--rule)',
    padding:'4px 12px',
    fontSize:10, fontWeight:500, letterSpacing:'0.24em', textTransform:'uppercase',
    color:'var(--ink-soft)',
    borderRadius:0,
    whiteSpace:'nowrap',
  }}>{children}</span>
);

// ============ DRESS CODE ============
const Dress = () => (
  <section id="dress" style={{
    padding:'140px 24px',
    background:'var(--burgundy)',
    color:'var(--cream)',
    position:'relative',
    overflow:'hidden',
  }}>
    <div style={{
      position:'absolute', inset:0,
      backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")",
      opacity:0.18, mixBlendMode:'overlay', pointerEvents:'none',
    }}/>
    <div style={{ maxWidth:1100, margin:'0 auto', position:'relative' }}>
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.65)', marginBottom:18 }}>
          Five — A Note on Attire
        </div>
        <h2 className="serif" style={{
          margin:0,
          fontSize:'clamp(56px, 9vw, 120px)',
          fontWeight:300,
          fontStyle:'italic',
          letterSpacing:'-0.02em',
          lineHeight:0.95,
        }}>Black tie</h2>
        <div style={{ marginTop:24 }}>
          <SectionRule dark />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24, marginTop:40 }} className="mood-grid">
        <image-slot id="dress-1" shape="rect" data-on-dark="" placeholder="black tie · 4:5" style={{ width:'100%', aspectRatio:'4 / 5' }}></image-slot>
        <image-slot id="dress-2" shape="rect" data-on-dark="" placeholder="jewel-toned gown · 4:5" style={{ width:'100%', aspectRatio:'4 / 5', marginTop:36 }}></image-slot>
        <image-slot id="dress-3" shape="rect" data-on-dark="" placeholder="velvet detail · 4:5" style={{ width:'100%', aspectRatio:'4 / 5' }}></image-slot>
      </div>

      <div style={{
        marginTop:80,
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, maxWidth:840, margin:'80px auto 0',
      }} className="dress-cols">
        <div>
          <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginBottom:14 }}>Gentlemen</div>
          <p className="serif" style={{ fontSize:19, lineHeight:1.7, color:'rgba(244,237,228,0.92)', fontWeight:300, margin:0 }}>
            A black dinner jacket and bow tie. Midnight blue or deep velvet is welcome. White shirt, black shoes. Patterned cummerbunds encouraged in moderation.
          </p>
        </div>
        <div>
          <div className="mono-eyebrow" style={{ color:'rgba(244,237,228,0.55)', marginBottom:14 }}>Ladies</div>
          <p className="serif" style={{ fontSize:19, lineHeight:1.7, color:'rgba(244,237,228,0.92)', fontWeight:300, margin:0 }}>
            A long gown, or a formal cocktail dress. Jewel tones — burgundy, plum, emerald, ink — sit beautifully against the palette of the day.
          </p>
        </div>
      </div>

      <p className="serif" style={{
        marginTop:60, textAlign:'center', fontStyle:'italic', fontSize:17,
        color:'rgba(244,237,228,0.65)', maxWidth:540, marginLeft:'auto', marginRight:'auto', fontWeight:300,
      }}>
        If black tie isn't your usual register, please don't worry — wear something that makes you feel handsome or beautiful and you'll be exactly right.
      </p>

      <style>{`
        @media (max-width: 720px){
          .mood-grid{ grid-template-columns: 1fr 1fr !important; gap:14px !important; }
          .mood-grid > *:last-child{ display:none; }
          .dress-cols{ grid-template-columns: 1fr !important; gap:36px !important; }
        }
      `}</style>
    </div>
  </section>
);

// ============ FAQS ============
const FAQS = [
  { q:'Can we bring our children?', a:'We adore your children but have chosen to keep the day adults-only (over 18). We hope this gives plenty of notice to arrange care. Babes in arms under one are welcome.' },
  { q:'I have a dietary requirement — what should I do?', a:'There is a dedicated space on the RSVP form. We will make sure every plate works for you: vegetarian, vegan, gluten-free, allergies, anything — please just tell us.' },
  { q:'Are gifts expected?', a:'Your company is more than gift enough. If you would like to mark the day, we will be sharing a small honeymoon fund closer to July — you are under no obligation.' },
  { q:'Is the ceremony indoors or outdoors?', a:'Indoors. The Music Room seats everyone comfortably. Drinks and photographs will move outside if the weather is kind.' },
  { q:'How long will the day run?', a:'Roughly 1pm through to midnight. The schedule above is the current shape — we will firm up times in the new year.' },
  { q:'Will there be photographers?', a:'Yes — Sam from Field & Folk will be with us. We ask, gently, that phones stay away during the ceremony. After that, please snap to your heart\u2019s content.' },
  { q:'How do I get there if I\u2019m not driving?', a:'Trains to Taunton or Bridgwater, then a 25–30 minute taxi. We are working on a coach from Taunton for the afternoon and a return coach at midnight — details to follow.' },
  { q:'Can I bring a plus-one?', a:'Your invitation will say. If your guest is named, please bring them. If not, we have kept the numbers tight — please don\u2019t take it personally.' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faqs" style={{ padding:'120px 24px', background:'var(--cream-deep)' }}>
      <div style={{ maxWidth:820, margin:'0 auto' }}>
        <SectionHeader eyebrow="Six — Anything else?" title="Questions" />

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
                  padding:'24px 4px', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'space-between', gap:20,
                  color:'var(--ink)',
                }}>
                  <span className="serif" style={{ fontSize:22, fontWeight:400, lineHeight:1.3, letterSpacing:'-0.005em' }}>
                    {item.q}
                  </span>
                  <span style={{
                    flex:'0 0 auto',
                    width:28, height:28,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'var(--burgundy)',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ transition:'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                      <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1"/>
                      <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 300 : 0,
                  overflow:'hidden',
                  transition: 'max-height 0.45s ease, opacity 0.4s ease',
                  opacity: isOpen ? 1 : 0,
                }}>
                  <p className="serif" style={{
                    margin:0, padding:'0 4px 28px',
                    fontSize:18, lineHeight:1.65, fontStyle:'italic',
                    color:'var(--ink-soft)', maxWidth:640, fontWeight:300,
                  }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="serif" style={{
          textAlign:'center', fontSize:17, fontStyle:'italic', color:'var(--ink-soft)', opacity:0.7,
          marginTop:48, fontWeight:300,
        }}>
          Anything else — write to us at <a href="mailto:hello@ryanandkatie.co" style={{ color:'var(--burgundy)', textDecorationThickness:'1px', textUnderlineOffset:4 }}>hello@ryanandkatie.co</a>.
        </p>
      </div>
    </section>
  );
};

// ============ FOOTER ============
const Footer = () => (
  <footer style={{ padding:'80px 24px 50px', background:'var(--ink)', color:'rgba(244,237,228,0.55)', textAlign:'center' }}>
    <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
      <Monogram size={48} dark />
    </div>
    <div className="serif" style={{ fontSize:18, fontStyle:'italic', color:'rgba(244,237,228,0.78)', fontWeight:300 }}>
      with love, Ryan &amp; Katie
    </div>
    <div className="mono-eyebrow" style={{ marginTop:14, fontSize:10 }}>
      2 · 7 · 27
    </div>
  </footer>
);

Object.assign(window, { Nav, Hero, Schedule, Venue, Stay, Dress, FAQ, Footer, SectionHeader, DetailRow, Pill });
