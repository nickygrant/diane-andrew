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

The first published revision was inspected at 1280 px and 390 px: no horizontal overflow, mobile navigation opens, the angel loads, and the PayPal destination matches the supplied QR. The later optimization adds 512/768 px responsive artwork (68.6/151.8 kB), a shorter mobile hero, a direct prices anchor, and preserved session duration across the form, WhatsApp and email. Source/generated-page checks and a focused booking-context check pass. A further visual check of this optimization remains pending after the browser connection dropped.
