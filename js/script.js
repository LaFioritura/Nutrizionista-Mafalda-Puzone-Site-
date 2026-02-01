(() => {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (!toggle || !navList) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    navList.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('click', (e) => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (!open) return;
    if (toggle.contains(e.target) || navList.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (!open) return;
    if (e.key === 'Escape') setOpen(false);
  });
})();
