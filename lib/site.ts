export const SITE = {
  name: 'TeleHealth Review Hub',
  // Set EXPO_PUBLIC_SITE_URL at build time once a custom domain is attached.
  url: (process.env.EXPO_PUBLIC_SITE_URL || 'https://beemahealth.github.io/BeemaHealthReviews').replace(/\/$/, ''),
  description:
    'Patient reviews and side-by-side comparisons of telehealth companies, scored on one published methodology.',
};
