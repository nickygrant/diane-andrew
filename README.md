# Diane Andrew — Psychic Medium & Reiki Master

Website: **https://nickygrant.github.io/diane-andrew/**

A published website for Diane Andrew in East Yorkshire, with psychic medium readings and Reiki, enquiry options, qualifications, original journal articles and accessible mobile layouts.

## Contact and social links
- Email: **Dianelumley9@gmail.com**
- WhatsApp: **+44 7756 731671**
- Instagram: https://www.instagram.com/diane.andrewlumley/
- Facebook: https://www.facebook.com/profile.php?id=100069583692969
- Contact form: https://nickygrant.github.io/diane-andrew/contact/

The contact form uses FormSubmit.co to forward enquiries. **Diane must activate its delivery address by clicking the confirmation link sent to her inbox after the first test submission.** Until activation and a successful test, delivery is not independently verified. Visitors may use the direct email and WhatsApp links as alternatives.

## Website content
- Psychic medium readings and spiritual guidance, online and within roughly 20 miles of DN14
- Reiki sessions: 30 minutes £30; 60 minutes £60; 90 minutes with chakra balancing £75; add-on/top-up £35 (details to confirm with Diane)
- About Diane and certificate gallery
- Original articles on Reiki's Japanese history, what happens during and after sessions, choosing a reading or Reiki, and introductory guides
- Enhanced portrait, lavender angel and feather artwork, original landscape artwork, and locally hosted fonts

The gallery shows two full-resolution training certificates with full-size links. Original-name copies are retained and linked; the gallery explains that the Diane Andrew images are display copies reflecting her return to her maiden name.

Two special journal pages use deep indigo and blue artwork: angels and feathers, and quiet moments. A new online-readings guide covers preparation and practical arrangements. The main service pages keep the lighter design.

## Search indexing and AI search
The GitHub Pages workflow publishes with `DRAFT=false`, `SITE_URL=https://nickygrant.github.io/diane-andrew` and the contact email configured. It generates canonical tags, `sitemap.xml`, `robots.txt`, `llms.txt`, descriptive titles and metadata, plus JSON-LD person, article, breadcrumb and service descriptions.

`llms.txt` is provided as an optional machine-readable guide, **not an SEO ranking factor**. Google Search does not use it for rankings. Because this site runs under a GitHub Pages project path, the project's `robots.txt` is not at the hostname root; submit `sitemap.xml` directly in Google Search Console and Bing Webmaster Tools. A dedicated domain would give more control over robots policy and branding. Search inclusion is not guaranteed.

## Development

The website is static and requires Node.js 20 or later.

```sh
npm run build
npm run check
npm run dev
```

Without `SITE_URL`, local builds use a non-indexed preview mode. The GitHub Actions workflow sets production variables and publishes the site. The HTML pages are built by `scripts/build.mjs`, layout is in `src/site.css`, and minimal scripts in `src/site.js`.

Review changes using the deployment workflow at https://github.com/nickygrant/diane-andrew/actions. Do not invent qualifications, testimonials, appointments, a street address or health benefits. Reiki is a complementary wellbeing practice, not a replacement for medical treatment.

Search dashboard setup, account prerequisites and the consent-gated Analytics integration are documented in [docs/search-setup.md](docs/search-setup.md). Artwork prompts and outputs are recorded in [docs/indigo-artwork.md](docs/indigo-artwork.md).
