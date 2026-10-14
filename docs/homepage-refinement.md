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

The first published revision was inspected at 1280 px and 390 px: no horizontal overflow, mobile navigation opens, the angel loads, and the PayPal destination matches the supplied QR. The later optimization adds 512/768 px responsive artwork (68.6/151.8 kB), a shorter mobile hero, a direct prices anchor, and preserved session duration across the form, WhatsApp and email. Source/generated-page checks and a focused booking-context check pass. The optimization was published in commit 204ae9b (deployment 38624300370). Live checks at 390 px confirmed the smaller artwork loaded with no horizontal overflow. Selecting 60 minutes preserved the choice in the enquiry form, WhatsApp and email. Public HTML, both responsive image files and the sitemap returned HTTP 200. A desktop preview is saved locally in artifacts/homepage-optimized-live.png.


## Further visual refinement

- Replaced the compact service strip with two distinct editorial panels, clearer session details and direct service links.
- Added a personal homepage introduction with Diane’s existing photograph and a link to her training.
- Removed repeated welcome sections and introduced a moonlit reflection, a concise first-visit FAQ and an editorial journal section.
- Kept the approved guardian artwork, responsive image loading, prices, payment destination and existing booking flow.
- Used native links and disclosure controls with matching FAQ structured data; no extra client-side dependency or tracking was added.
- Production build and all 17 page checks pass. The local browser preview could not reach the development server; final visual validation is performed on the published page.
