(() => {
  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Close nav on link click (mobile)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.nav a');
    if (a && nav && nav.classList.contains('open')) nav.classList.remove('open');
  });

  // Cookie consent (localStorage)
  const STORAGE_KEY = "cookie_consent_v1";
  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");
  const analytics = document.getElementById("cookie-analytics");
  const marketing = document.getElementById("cookie-marketing");

  if (!banner || !modal) return;

  const readConsent = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
    catch { return null; }
  };

  const writeConsent = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      necessary: true,
      analytics: !!data.analytics,
      marketing: !!data.marketing,
      timestamp: Date.now()
    }));
  };

  const showBanner = () => { banner.hidden = false; };
  const hideBanner = () => { banner.hidden = true; };

  const openModal = () => { modal.hidden = false; };
  const closeModal = () => { modal.hidden = true; };

  const init = () => {
    const c = readConsent();
    if (!c) showBanner();
    else hideBanner();
  };

  const handleAction = (action) => {
    if (action === "accept") {
      writeConsent({ analytics: true, marketing: true });
      hideBanner(); closeModal(); return;
    }
    if (action === "reject") {
      writeConsent({ analytics: false, marketing: false });
      hideBanner(); closeModal(); return;
    }
    if (action === "customize") {
      const c = readConsent();
      if (analytics) analytics.checked = c ? !!c.analytics : false;
      if (marketing) marketing.checked = c ? !!c.marketing : false;
      openModal(); return;
    }
    if (action === "save") {
      writeConsent({
        analytics: analytics ? analytics.checked : false,
        marketing: marketing ? marketing.checked : false
      });
      hideBanner(); closeModal(); return;
    }
    if (action === "close") { closeModal(); return; }
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cookie]");
    if (btn) handleAction(btn.getAttribute("data-cookie"));

    // Close modal clicking backdrop
    if (e.target.classList.contains('cookie-modal__backdrop')) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  init();
})();