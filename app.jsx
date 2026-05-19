// Main app — guest gate, sections, scroll-spy.

const App = () => {
  const [guest, setGuest] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null'); } catch(e) { return null; }
  });
  const [active, setActive] = React.useState('top');

  // Scroll spy
  React.useEffect(() => {
    if (!guest) return;
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
  }, [guest]);

  const signOut = () => {
    try { localStorage.removeItem(TOKEN_KEY); } catch(e){}
    setGuest(null);
    window.scrollTo(0, 0);
  };

  if (!guest) {
    return <Gate onUnlock={(g) => setGuest(g)} />;
  }

  return (
    <>
      <Nav active={active} guest={guest} onSignOut={signOut} />
      <main>
        <Hero guest={guest} />
        <Schedule />
        <Venue />
        <Travel />
        <WeddingParty />
        <Details />
        <FAQ />
        <RSVP guest={guest} />
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
