(() => {
  const measurementId = document.currentScript?.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;
  const banner = document.querySelector('#cookie-notice');
  const storageKey = 'diane-analytics-consent-v1';
  const ttl = 180 * 24 * 60 * 60 * 1000;
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  const basePath = new URL(document.currentScript.src).pathname.replace(/analytics\.js$/, '');
  let loaded = false;
  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey));
      return value && Date.now() - value.time < ttl ? value.choice : null;
    } catch { return null; }
  };
  const load = () => {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      page_location: canonical || location.origin + location.pathname,
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_prefix: 'diane', cookie_path: basePath, cookie_expires: ttl / 1000
    });
    window.gtag('event', 'page_view', { page_title: document.title, page_location: canonical || location.origin + location.pathname, page_referrer: '' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.append(script);
  };
  const clearCookies = () => {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('diane_')) continue;
      const expiry = `${name}=; Max-Age=0; path=${basePath}; SameSite=Lax`;
      document.cookie = expiry;
      document.cookie = expiry + '; domain=' + location.hostname;
      document.cookie = expiry + '; domain=.' + location.hostname;
    }
  };
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
    const choice = button.dataset.consent;
    try { localStorage.setItem(storageKey, JSON.stringify({choice, time:Date.now()})); } catch { /* Consent applies only on this page if storage is unavailable. */ }
    banner.hidden = true;
    if (choice === 'granted') load();
    else {
      window['ga-disable-' + measurementId] = true;
      clearCookies();
      if (loaded) location.reload();
    }
  }));
  document.querySelectorAll('.cookie-settings').forEach(button => button.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button').focus();
  }));
  const choice = read();
  if (choice === 'granted') load();
  else if (choice !== 'denied') banner.hidden = false;
})();
