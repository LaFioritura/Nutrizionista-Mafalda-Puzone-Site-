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


/* =========================
   GDPR / Cookie Consent (localStorage)
========================= */
(() => {
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

  const applyConsent = (c) => {
    // Hook: carica eventuali script opzionali solo se consentito
    // if (c.analytics) loadAnalytics();
  };

  const init = () => {
    const c = readConsent();
    if (!c) {
      showBanner();
      return;
    }
    hideBanner();
    applyConsent(c);
  };

  const handleAction = (action) => {
    if (action === "accept") {
      writeConsent({ analytics: true, marketing: true });
      hideBanner();
      closeModal();
      applyConsent(readConsent());
      return;
    }

    if (action === "reject") {
      writeConsent({ analytics: false, marketing: false });
      hideBanner();
      closeModal();
      applyConsent(readConsent());
      return;
    }

    if (action === "customize") {
      const c = readConsent();
      if (analytics) analytics.checked = c ? !!c.analytics : false;
      if (marketing) marketing.checked = c ? !!c.marketing : false;
      openModal();
      return;
    }

    if (action === "save") {
      writeConsent({
        analytics: analytics ? analytics.checked : false,
        marketing: marketing ? marketing.checked : false
      });
      hideBanner();
      closeModal();
      applyConsent(readConsent());
      return;
    }

    if (action === "close") {
      closeModal();
      return;
    }
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cookie]");
    if (!btn) return;
    const action = btn.getAttribute("data-cookie");
    handleAction(action);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  init();
})();