(() => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  // Sticky header subtle state
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (toggle && menu) {
    const setExpanded = (value) => {
      toggle.setAttribute('aria-expanded', String(value));
      menu.classList.toggle('is-open', value);
      document.body.classList.toggle('no-scroll', value);
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setExpanded(false));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;
      const target = e.target;
      if (target === toggle || toggle.contains(target) || menu.contains(target)) return;
      setExpanded(false);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;
      if (e.key === 'Escape') setExpanded(false);
    });
  }
})();
