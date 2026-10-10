import Head from 'expo-router/head';
import { SITE } from '../lib/site';

type Props = { title: string; description: string; path: string; jsonLd?: object | object[]; noindex?: boolean };

export function Seo({ title, description, path, jsonLd, noindex }: Props) {
  const url = `${SITE.url}${path}`;
  const full = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Head>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Head>
  );
}
