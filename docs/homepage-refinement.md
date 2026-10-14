# Homepage and booking refinement — 14 October 2026

- Brought the approved indigo guardian illustration onto the homepage as the main visual, paired with high-contrast typography and light lavender/blue service choices.
- Retained explicit reading and Reiki destinations, added a short booking sequence, and made direct WhatsApp/email contact prominent above the enquiry form.
- Added a PayPal link beside the Reiki prices. Exact destination decoded from the supplied QR: `https://www.paypal.com/qrcodes/p2pqrc/LHNF7HBDQENPG`. The account appears in the supplied screenshot as Diane Lumley. The website explains this is her former married name and asks clients to agree the appointment and amount first. No transaction was made.
- Kept the main illustration as a discoverable HTML image with high fetch priority and fixed dimensions; below-fold landscapes load lazily.
- Added short native cross-document transitions, progressively enhanced and disabled for reduced-motion preferences.
- No fabricated testimonials, scarcity claims, guarantees, or new advertising trackers.

Primary implementation references:

- [web.dev: Fetch Priority](https://web.dev/articles/fetch-priority)
- [Google Chrome: cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- [W3C: form labels](https://www.w3.org/WAI/tutorials/forms/labels/)

The source and generated-page checks pass. Browser inspection was interrupted by the browser connection/policy, so do not treat source validation as a visual mobile QA pass.
