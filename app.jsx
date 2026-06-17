// Main app — public site (no gate) + scroll-spy + RSVP popup.

const App = () => {
  const [active, setActive] = React.useState('top');
  const [rsvpOpen, setRsvpOpen] = React.useState(false);

  const openRsvp = () => setRsvpOpen(true);
  const closeRsvp = () => setRsvpOpen(false);

  // Scroll spy
  React.useEffect(() => {
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
  }, []);

  return (
    <>
      <Nav active={active} />
      <main>
        <Hero onRsvp={openRsvp} />
        <Schedule />
        <Venue />
        <Interstitial>See you in <span className="accent-gradient">Somerset</span>.</Interstitial>
        <Travel />
        <WeddingParty />
        <Interstitial>Wear your <span className="accent-gradient">best</span>.</Interstitial>
        <Details />
        <FAQ />
        <RSVP onRsvp={openRsvp} />
        <Footer />
      </main>
      <FloatingRsvpCta onRsvp={openRsvp} />
      {rsvpOpen && <RsvpModal onClose={closeRsvp} />}
    </>
  );
};

// Boot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
const loadingEl = document.getElementById('__loading');
if (loadingEl) loadingEl.remove();
