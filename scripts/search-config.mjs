export function searchConfig({ draft, esc, href }) {
  const measurementId = (process.env.GA4_MEASUREMENT_ID || '').trim();
  const indexNowKey = (process.env.INDEXNOW_KEY || '').trim();
  if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) throw new Error('Invalid GA4 measurement ID');
  if (indexNowKey && !/^[a-zA-Z0-9-]{8,128}$/.test(indexNowKey)) throw new Error('Invalid IndexNow key');
  const enabled = !draft && Boolean(measurementId);
  return {
    enabled, indexNowKey,
    head(p) {
      const tokens = [['google-site-verification', process.env.GOOGLE_SITE_VERIFICATION], ['msvalidate.01', process.env.BING_SITE_VERIFICATION]];
      return tokens.filter(([,value])=>value && !draft).map(([name,value])=>`<meta name="${name}" content="${esc(value.trim())}">`).join('') + (enabled ? `<script src="${href(p,'analytics.js')}" data-measurement-id="${measurementId}" defer></script>` : '');
    },
    banner(p) {
      return enabled ? `<aside class="cookie-notice" id="cookie-notice" aria-labelledby="cookie-title" hidden><div><strong id="cookie-title">A choice about cookies</strong><p>May we use Google Analytics to understand which pages are useful? It only loads if you agree. <a href="${href(p,'privacy/index.html')}">Privacy information</a></p></div><div class="cookie-actions"><button type="button" data-consent="denied">Decline analytics</button><button type="button" data-consent="granted">Allow analytics</button></div></aside>` : '';
    },
    settings: enabled ? '<button class="cookie-settings" type="button">Cookie preferences</button>' : '',
    privacy: enabled ? 'With your permission, this website uses Google Analytics to understand page visits. The Google tag and analytics cookies load only after you choose Allow analytics. You can decline, or change your choice at any time using Cookie preferences in the footer. Your preference is remembered on this device for six months. Page addresses sent to Analytics exclude search parameters and fragments; the site does not send enquiry text, names or email addresses to Analytics. Google processes technical connection and device information when the tag loads. Analytics is not used for personalised advertising. See <a href="https://policies.google.com/privacy">Google’s privacy information</a>.' : 'This website does not currently load analytics or advertising trackers.'
  };
}
