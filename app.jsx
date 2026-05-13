// Main app — gate, sections, scroll-spy.
// Production build: no Tweaks panel (design-iteration tool only).

const App = () => {
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return localStorage.getItem(TOKEN_KEY) === '1'; } catch(e) { return false; }
  });
  const [active, setActive] = React.useState('top');

  // Scroll spy
  React.useEffect(() => {
    if (!unlocked) return;
    const ids = ['top','welcome','schedule','venue','stay','dress','faqs','rsvp'];
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

  if (!unlocked) {
    return <Gate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <Nav active={active} />
      <main>
        <Hero showCountdown={true} />
        <Welcome />
        <Schedule />
        <Venue />
        <Stay />
        <Dress />
        <FAQ />
        <RSVP />
        <Footer />
      </main>
    </>
  );
};

// Boot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
const loadingEl = document.getElementById('__loading');
if (loadingEl) loadingEl.remove();
