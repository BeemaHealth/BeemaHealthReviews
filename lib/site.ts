export const SITE = {
  name: 'TeleHealth Review Hub',
  // Set EXPO_PUBLIC_SITE_URL at build time once a custom domain is attached.
  url: (process.env.EXPO_PUBLIC_SITE_URL || 'https://beemahealth.github.io/BeemaHealthReviews').replace(/\/$/, ''),
  description:
    'Patient reviews and side-by-side comparisons of telehealth companies, scored on one published methodology.',
};

export const DISCLOSURE =
  'Disclosure: Beema Health is listed on this site and has a business relationship with its operators. Beema Health is scored using the same methodology as every other company, and reviews are published as submitted, positive or negative.';
