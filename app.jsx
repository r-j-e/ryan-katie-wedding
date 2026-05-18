// Main app — guest gate, sections, tweaks, scroll-spy.
// Guest is an object { code, household, party } or null.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "deep-forest",
  "bypassGate": false,
  "showCountdown": true
}/*EDITMODE-END*/;

const PALETTES = {
  burgundy:     { burgundy:'#4A1A2C', magenta:'#A8326B', blush:'#D4A5A5', plum:'#5B2A4A', cream:'#F4EDE4', creamDeep:'#EDE3D4', ink:'#1A1416' },
  emerald:      { burgundy:'#1F3A2E', magenta:'#2A6F4F', blush:'#A8C4B0', plum:'#13241D', cream:'#F4EDE4', creamDeep:'#EDE3D4', ink:'#101814' },
  ink:          { burgundy:'#1F2742', magenta:'#5A6FA8', blush:'#A0AECF', plum:'#0F1428', cream:'#EFEAE0', creamDeep:'#E5DFD0', ink:'#0D0F1A' },
  'deep-forest':{ burgundy:'#3F4D35', magenta:'#5A6B4A', blush:'#A8B59A', plum:'#2A3523', cream:'#F4EDE4', creamDeep:'#EDE3D4', ink:'#1A1416' },
};

const App = () => {
  const [guest, setGuest] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null'); } catch(e) { return null; }
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

  // Scroll spy
  React.useEffect(() => {
    if (!guest && !t.bypassGate) return;
    const ids = ['top', 'day', 'venue', 'travel', 'party', 'details', 'faqs', 'rsvp'];
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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [guest, t.bypassGate]);

  const signOut = () => {
    try { localStorage.removeItem(TOKEN_KEY); } catch(e){}
    setGuest(null);
    window.scrollTo(0, 0);
  };

  if (!guest && !t.bypassGate) {
    return <Gate onUnlock={(g) => setGuest(g)} />;
  }

  return (
    <>
      <Nav active={active} guest={guest} onSignOut={signOut} />
      <main>
        <Hero showCountdown={t.showCountdown} guest={guest} />
        <Schedule />
        <Venue />
        <Travel />
        <WeddingParty />
        <Details />
        <FAQ />
        <RSVP guest={guest} />
        <Footer />
      </main>

      <Tweaks t={t} setTweak={setTweak} onClearGate={signOut} />
    </>
  );
};

// ============ TWEAKS PANEL ============
const PALETTE_OPTIONS = [
  ['#4A1A2C', '#A8326B', '#D4A5A5', '#F4EDE4'],
  ['#1F3A2E', '#2A6F4F', '#A8C4B0', '#F4EDE4'],
  ['#1F2742', '#5A6FA8', '#A0AECF', '#EFEAE0'],
  ['#3F4D35', '#5A6B4A', '#A8B59A', '#F4EDE4'],
];
const PALETTE_KEYS = ['burgundy', 'emerald', 'ink', 'deep-forest'];

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
            const idx = PALETTE_OPTIONS.findIndex(p => p[0].toLowerCase() === v[0].toLowerCase());
            setTweak('palette', PALETTE_KEYS[idx] || 'burgundy');
          }}
          options={PALETTE_OPTIONS}
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
        <TweakButton label="Sign out / lock site" onClick={onClearGate} />
      </TweakSection>
    </TweaksPanel>
  );
};

// Boot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
const loadingEl = document.getElementById('__loading');
if (loadingEl) loadingEl.remove();
