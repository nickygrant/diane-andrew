# Diane Andrew

Website review draft for Diane Andrew, Psychic Medium and Level 3 Reiki Master.

Two connected service areas: psychic medium readings and spiritual guidance in lavender/purple, and Reiki healing in soft blue. East Yorkshire, with travel within 20 miles of DN14, and online sessions. Reiki prices from the supplied notes are displayed (£30 for 30 minutes, £60 for 60 minutes, £75 for 90 minutes with chakra balancing; £35 add-on/top-up subject to clarification). Psychic reading rates remain enquiry-only.

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
- `src/assets/`: local fonts, open-font licences, original SVG motifs, landscape artwork and an optimised contact sheet of the supplied three training certificate photographs.
- `docs/review-notes.md`: research, editorial choices and details to confirm before launch.
- `docs/artwork.md`: image-generation provenance and the exact final prompt.

`npm run build` creates a portable static site in `dist/`, suitable for a conventional static host. The source repository and the GitHub Pages review site are public; the site remains marked as a draft and uses `noindex`, which does not prevent visitors opening it.

## Draft and launch modes

The default build has a visible review ribbon, `noindex` metadata, a crawler block, and an enquiry form that does not send or save data. No analytics, cookies, remote fonts or third-party scripts are included.

For an approved public build, set `DRAFT=false`, `SITE_URL` to the confirmed HTTPS site URL and `CONTACT_EMAIL` to Diane's confirmed business email, then build. The build fails if those contact/URL values are missing. Public mode creates canonical URLs and a sitemap and removes the draft crawler restrictions. Hosting providers can add their own crawler/access settings; check those at launch.

The enquiry composer prepares a mailto message in production. The visitor must review and send it in their own email app. A server-backed booking or enquiry service is not implemented.

Confirm all service copy and the final privacy policy before using public mode. Do not invent a street address, teaching qualification, client testimonial or professional membership.

## Verification

`npm run check` checks internal links and assets, unique titles, one H1 per page, parseable structured data, font files and absence of displayed prices. Browser review covers desktop and mobile layouts, service links, FAQ expansion, service preselection and the non-sending enquiry preview.

## Review website

https://nickygrant.github.io/diane-andrew/

The training gallery on the About page presents the three supplied photographs: Reiki third degree (Bridge of Light Association, name printed Diane Lumley), Crystalotherapy Levels 1 & 2 (Crystal Awareness Institute UK, one printed Diane Andrew, another Diane Lumley). The distinct names must be confirmed before final approval.

The stated Reiki rates come from a handwritten note and should be confirmed, especially the £35 add-on/top-up duration. Do not claim therapeutic or medical effects. The enquiry form does not send or save messages in draft mode.

## Installing full-resolution certificate photos

The About page automatically uses individual full-resolution JPEGs when the following filenames are present in `src/assets/`:

- `reiki-third-degree.jpg` — supplied Bridge of Light Association certificate (name printed: Diane Lumley)
- `crystalotherapy-diane-andrew.jpg` — supplied Crystal Awareness Institute UK certificate (name printed: Diane Andrew)
- `crystalotherapy-diane-lumley.jpg` — supplied Crystal Awareness Institute UK certificate (name printed: Diane Lumley)

If they are absent, the builder falls back to the earlier low-resolution contact sheet. This avoids broken image links while waiting for the original images.

To install, open `https://github.com/nickygrant/diane-andrew/upload/main/src/assets`, upload all three extracted JPEGs with exactly those filenames, and commit directly to main. The Pages workflow rebuilds and publishes automatically. **Do not upload the ZIP file itself; extract the three JPEGs before uploading.** No code edit is needed. This approach displays the true original photographs (1055–1065 pixels wide) and clicking each certificate opens that particular full-size scan.
