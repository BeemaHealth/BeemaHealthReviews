import data from '../data/companies.json';

export type Review = {
  author: string; // first name + last initial, as shown by the source
  rating: number; // 1-5
  date: string; // ISO date
  text: string; // verbatim
  source: 'Google' | 'Direct' | string;
  sourceUrl?: string;
  verified?: boolean;
};

export type Company = {
  slug: string;
  name: string;
  website: string;
  category: string;
  tagline: string;
  summary: string;
  about: string;
  googleReviews: { url: string; rating: number | null; count: number | null; asOf: string | null };
  criteria: Record<string, number | null>;
  reviews: Review[];
};

export const companies = data as Company[];
export const getCompany = (slug: string) => companies.find((c) => c.slug === slug);

export function aggregate(c: Company) {
  if (c.reviews.length) {
    const sum = c.reviews.reduce((s, r) => s + r.rating, 0);
    return { rating: Math.round((sum / c.reviews.length) * 10) / 10, count: c.reviews.length };
  }
  const g = c.googleReviews;
  return g.rating && g.count ? { rating: g.rating, count: g.count } : null;
}
