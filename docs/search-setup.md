# Search and analytics setup

Site: https://nickygrant.github.io/diane-andrew/

## Implemented

- Static, readable HTML with unique titles, descriptions, canonical URLs, local service information and linked articles.
- Matching Person, WebSite, WebPage, Article, BreadcrumbList, Service and FAQ data where applicable. No invented reviews or address.
- Article image metadata and accurate modification dates for the three new/revised features.
- Sitemap at https://nickygrant.github.io/diane-andrew/sitemap.xml. The acknowledgement and error page are excluded.
- IndexNow key hosted inside the GitHub Pages project path. The deployment workflow verifies the live key and submits the public sitemap URLs to IndexNow after publication. The workflow log records the actual HTTP result. Receipt is not proof of crawling or indexing.
- Optional Google Analytics integration, inactive until a real GA4 measurement ID is configured. No Google requests before opt-in, equally available decline, remembered choice, expiry and withdrawal. URLs sent by the site exclude enquiry query strings and fragments.

## Account setup still required

Google Search Console verified ownership of Diane's exact URL-prefix property on 14 October 2026 using the published HTML tag. Its sitemap was submitted successfully, but the first report said "Couldn't fetch" and needs checking again; no Google indexing request has been confirmed. Bing's separate entry was started and its HTML verification token is published, but dashboard verification remains incomplete. IndexNow accepted all 15 public URLs with HTTP 200 in deployment run 38576811848. No GA4 property or measurement ID has been confirmed. The signed-in browser connection repeatedly dropped during setup. A later recheck on 14 October still showed the sitemap fetch error; the public sitemap itself returned HTTP 200 with application/xml. The dashboard then stopped loading, preventing further account setup. UniEntry and other existing properties have not been changed.

1. Sign into the intended owner Google account. In Analytics, create/select Diane's property, a web data stream for this site, Europe/London time zone and GBP reporting currency. User must personally accept any new account terms. Disable enhanced measurement (particularly forms, outbound clicks and history page views); the site sends only its own consented page view. Keep Google signals, advertising and user-provided data collection off. Use a short retention setting.
2. Add the real `G-...` ID as the repository Actions variable `GA4_MEASUREMENT_ID`, then deploy. Verify a consented visit in Realtime. Analytics is not connected merely because the code exists.
3. In Search Console add the **URL-prefix** property `https://nickygrant.github.io/diane-andrew/`. Use HTML meta-tag verification; put its token in Actions variable `GOOGLE_SITE_VERIFICATION`, deploy, then press Verify. A DNS/domain property is inappropriate for the shared github.io hostname.
4. Submit `sitemap.xml` in that property. Use URL Inspection for the homepage and new journal URLs, then request indexing. Google determines whether and when they are indexed.
5. Sign into Bing Webmaster Tools, add this exact project URL, and use HTML meta-tag verification. Add the token to `BING_SITE_VERIFICATION`, deploy and verify. Submit the sitemap and review the IndexNow report. Connecting the dashboard is separate from the automated IndexNow submission.

Environment variables are documented in `.env.example`; GitHub Actions reads repository variables. Never put passwords, OAuth tokens or account cookies in the repository. The IndexNow verification key is intentionally public and grants only URL notification for this project path.

The `robots.txt` file in this project subdirectory is not the hostname's root robots policy. It does not control crawlers. Submit the sitemap directly in the dashboards. `llms.txt` is an optional overview, not an AI ranking mechanism.

## Verification

Run `npm run check` after a production build, plus `node scripts/check-consent.mjs`. The consent test uses a mock document without sending network requests. Inspect the two indigo pages on desktop and at 390 px, the journal/home links, contact service selection and live generated metadata.

## Primary references

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: request a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic)
- [Bing: IndexNow setup and response meanings](https://www.bing.com/indexnow/getstarted)
- [IndexNow protocol and key scope](https://www.indexnow.org/documentation)
