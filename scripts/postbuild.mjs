import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SITE = (process.env.EXPO_PUBLIC_SITE_URL || 'https://beemahealth.github.io/BeemaHealthReviews').replace(/\/$/, '');
const companies = JSON.parse(readFileSync('data/companies.json', 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const paths = ['/', '/methodology', '/about', ...companies.map((c) => `/company/${c.slug}`)];

writeFileSync('dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  paths.map((p) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>\n`);

writeFileSync('dist/robots.txt', readFileSync('public/robots.txt', 'utf8').replace(/Sitemap:.*/, `Sitemap: ${SITE}/sitemap.xml`));

const llms = `# TeleHealth Review Hub

> Patient reviews and comparisons of telehealth companies, scored on one published methodology. Some listed companies have a disclosed relationship with the site's operators.

## Pages
- [Home](${SITE}/): list of reviewed companies
- [Methodology](${SITE}/methodology): how companies are scored and reviews moderated
- [About](${SITE}/about): operators and disclosures
${companies.map((c) => `- [${c.name} reviews](${SITE}/company/${c.slug}): ${c.tagline}${c.affiliated ? ' (disclosed affiliation)' : ''}`).join('\n')}
`;
writeFileSync('dist/llms.txt', llms);
if (existsSync('dist/index.html')) writeFileSync('dist/404.html', readFileSync('dist/+not-found.html', 'utf8'));
