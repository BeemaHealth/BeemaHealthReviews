# TeleHealth Review Hub

Expo (React Native Web) static site: telehealth company reviews with a published methodology.

- `npm install && npm run web` to develop, `npm run build` to export to `dist/` (also writes `sitemap.xml`, `robots.txt`, `llms.txt`).
- Add companies and **real** reviews in `data/companies.json` (verbatim text, source, and link to original). Never add placeholder or invented reviews.
- Fill the `TODO` fields (Beema summary, Google profile URL, rating/count/as-of date, operator legal name on About).
- Set `EXPO_PUBLIC_SITE_URL` (and `BASE_URL` in `app.json` experiments) when attaching a custom domain; set `EXPO_PUBLIC_REVIEW_ENDPOINT` to enable review submissions.
- Deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. Enable Pages (Source: GitHub Actions) in repo settings.
- Affiliation disclosure lives in `lib/site.ts` and must stay accurate.
