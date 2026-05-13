// Main app — gate, sections, tweaks, scroll-spy

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "burgundy",
  "headerFont": "Cormorant Garamond",
  "bypassGate": false,
  "showCountdown": true,
  "dressBackground": "burgundy"
}/*EDITMODE-END*/;

const PALETTES = {
  burgundy: { burgundy:'#4A1A2C', magenta:'#A8326B', blush:'#D4A5A5', plum:'#5B2A4A', cream:'#F4EDE4', creamDeep:'#EDE3D4', ink:'#1A1416' },
  emerald:  { burgundy:'#1F3A2E', magenta:'#2A6F4F', blush:'#A8C4B0', plum:'#13241D', cream:'#F4EDE4', creamDeep:'#EDE3D4', ink:'#101814' },
  ink:      { burgundy:'#1F2742', magenta:'#5A6FA8', blush:'#A0AECF', plum:'#0F1428', cream:'#EFEAE0', creamDeep:'#E5DFD0', ink:'#0D0F1A' },
};

const HEADER_FONTS = {
  'Cormorant Garamond': "'Cormorant Garamond', Georgia, serif",
  'Playfair Display':   "'Playfair Display', Georgia, serif",
  'Bodoni Moda':        "'Bodoni Moda', Georgia, serif",
};

const App = () => {
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return localStorage.getItem(TOKEN_KEY) === '1'; } catch(e) { return false; }
  });
  const [active, setActive] = React.useState('top');
  const [t, setTweak] = (typeof useTweaks === 'function') ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply palette as CSS vars
  React.useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.burgundy;
    const r = document.documentElement.style;
    r.setProperty('--burgundy', p.burgundy);
    r.setProperty('--magenta', p.magenta);
    r.setProperty('--blush', p.blush);
    r.setProperty('--plum', p.plum);
    r.setProperty('--cream', p.cream);
    r.setProperty('--cream-deep', p.creamDeep);
    r.setProperty('--ink', p.ink);
  }, [t.palette]);

  // Header font swap — load fonts on demand
  React.useEffect(() => {
    const f = t.headerFont;
    if (f === 'Playfair Display') {
      if (!document.getElementById('font-playfair')){
        const link = document.createElement('link');
        link.id = 'font-playfair';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap';
        document.head.appendChild(link);
      }
    } else if (f === 'Bodoni Moda') {
      if (!document.getElementById('font-bodoni')){
        const link = document.createElement('link');
        link.id = 'font-bodoni';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400&display=swap';
        document.head.appendChild(link);
      }
    }
    // Override .serif class
    const css = document.getElementById('serif-override') || (() => {
      const s = document.createElement('style'); s.id = 'serif-override'; document.head.appendChild(s); return s;
    })();
    css.textContent = `.serif { font-family: ${HEADER_FONTS[f] || HEADER_FONTS['Cormorant Garamond']} !important; }`;
  }, [t.headerFont]);

  // Scroll spy
  React.useEffect(() => {
    if (!unlocked) return;
    const ids = ['top','schedule','venue','stay','dress','faqs','rsvp'];
    const onScroll = () => {
      const y = window.scrollY + 100;
      let current = 'top';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [unlocked]);

  if (!unlocked && !t.bypassGate) {
    return <Gate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <Nav active={active} />
      <main>
        <Hero showCountdown={t.showCountdown} />
        <Schedule />
        <Venue />
        <Stay />
        <Dress />
        <FAQ />
        <RSVP />
        <Footer />
      </main>

      <Tweaks t={t} setTweak={setTweak} onClearGate={() => {
        try { localStorage.removeItem(TOKEN_KEY); } catch(e){}
        setUnlocked(false);
      }} />
    </>
  );
};

// ============ TWEAKS PANEL ============
const PALETTE_OPTIONS = [
  ['#4A1A2C', '#A8326B', '#D4A5A5', '#F4EDE4'],
  ['#1F3A2E', '#2A6F4F', '#A8C4B0', '#F4EDE4'],
  ['#1F2742', '#5A6FA8', '#A0AECF', '#EFEAE0'],
];
const PALETTE_KEYS = ['burgundy', 'emerald', 'ink'];

const Tweaks = ({ t, setTweak, onClearGate }) => {
  if (typeof TweaksPanel === 'undefined') return null;
  const currentPalette = PALETTE_OPTIONS[PALETTE_KEYS.indexOf(t.palette)] || PALETTE_OPTIONS[0];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <TweakColor
          label="Mood"
          value={currentPalette}
          onChange={(v) => {
            // v is the chosen option array — map back to key
            const idx = PALETTE_OPTIONS.findIndex(p => p[0].toLowerCase() === v[0].toLowerCase());
            setTweak('palette', PALETTE_KEYS[idx] || 'burgundy');
          }}
          options={PALETTE_OPTIONS}
        />
      </TweakSection>

      <TweakSection label="Headline type">
        <TweakSelect
          label="Display face"
          value={t.headerFont}
          onChange={(v) => setTweak('headerFont', v)}
          options={['Cormorant Garamond', 'Playfair Display', 'Bodoni Moda']}
        />
      </TweakSection>

      <TweakSection label="Hero">
        <TweakToggle
          label="Countdown line"
          value={t.showCountdown}
          onChange={(v) => setTweak('showCountdown', v)}
        />
      </TweakSection>

      <TweakSection label="Preview helpers">
        <TweakToggle
          label="Skip password gate"
          value={t.bypassGate}
          onChange={(v) => setTweak('bypassGate', v)}
        />
        <TweakButton label="Lock site again" onClick={onClearGate} />
      </TweakSection>
    </TweaksPanel>
  );
};

// Boot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
const loadingEl = document.getElementById('__loading');
if (loadingEl) loadingEl.remove();
