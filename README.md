# Diane Andrew

Website review draft for Diane Andrew, Psychic Medium and Level 3 Reiki Master.

Two connected service areas: psychic medium readings and spiritual guidance in lavender/purple, and Reiki healing in soft blue. East Yorkshire, with travel within 20 miles of DN14, and online sessions. No prices are displayed.

## Run locally

Node.js 20 or later. No npm installation or third-party JavaScript dependencies are required.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173. The preview server listens only on this computer.

## Editing

- `scripts/build.mjs`: page content, metadata, shared layouts and structured data.
- `src/site.css`: typography, responsive layouts and the two colour schemes.
- `src/site.js`: mobile menu and enquiry composer.
- `src/assets/`: local fonts, open-font licences, original SVG motifs and landscape artwork.
- `docs/review-notes.md`: research, editorial choices and details to confirm before launch.
- `docs/artwork.md`: image-generation provenance and the exact final prompt.

`npm run build` creates a portable static site in `dist/`, suitable for a conventional static host. The source repository is private while this is reviewed.

## Draft and launch modes

The default build has a visible review ribbon, `noindex` metadata, a crawler block, and an enquiry form that does not send or save data. No analytics, cookies, remote fonts or third-party scripts are included.

For an approved public build, set `DRAFT=false`, `SITE_URL` to the confirmed HTTPS site URL and `CONTACT_EMAIL` to Diane's confirmed business email, then build. The build fails if those contact/URL values are missing. Public mode creates canonical URLs and a sitemap and removes the draft crawler restrictions. Hosting providers can add their own crawler/access settings; check those at launch.

The enquiry composer prepares a mailto message in production. The visitor must review and send it in their own email app. A server-backed booking or enquiry service is not implemented.

Confirm all service copy and the final privacy policy before using public mode. Do not invent a street address, teaching qualification, client testimonial or professional membership.

## Verification

`npm run check` checks internal links and assets, unique titles, one H1 per page, parseable structured data, font files and absence of displayed prices. Browser review covers desktop and mobile layouts, service links, FAQ expansion, service preselection and the non-sending enquiry preview.
