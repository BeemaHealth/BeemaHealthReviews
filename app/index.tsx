import { View, Text, Linking, StyleSheet } from 'react-native';
import { Page, H1, H2, P, Stars } from '../components/ui';
import { Seo } from '../components/Seo';
import { getCompany, aggregate } from '../lib/companies';
import { SITE } from '../lib/site';
import { colors } from '../lib/theme';

export default function Home() {
  const c = getCompany('beema-health');
  if (!c) return <Page><H1>Company not found</H1></Page>;
  const agg = aggregate(c);
  const org = {
    '@type': 'Organization', name: c.name, url: c.website,
    ...(agg && c.reviews.length ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: agg.rating, reviewCount: agg.count, bestRating: 5, worstRating: 1 } } : {}),
    ...(c.reviews.length ? {
      review: c.reviews.map((r) => ({
        '@type': 'Review', author: { '@type': 'Person', name: r.author }, datePublished: r.date,
        reviewBody: r.text, reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      })),
    } : {}),
  };
  return (
    <Page>
      <Seo
        title={`${c.name} Reviews`}
        description={`Patient reviews of ${c.name}${agg ? `: ${agg.rating}/5 from ${agg.count} reviews` : ''}. ${c.tagline}`}
        path="/"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url, description: SITE.description },
          { '@context': 'https://schema.org', ...org },
        ]}
      />
      <H1>{`${c.name} Reviews`}</H1>
      {agg ? <Text><Stars rating={agg.rating} /> {agg.rating} out of 5 · {agg.count} reviews</Text> : null}
      <P>{c.summary}</P>
      <H2>About {c.name}</H2>
      <P>{c.about}</P>
      <Text role="link" style={st.link} onPress={() => Linking.openURL(c.website)}>Visit {c.name}</Text>

      {c.googleReviews.url.startsWith('http') ? (
        <>
          <H2>Google reviews</H2>
          <P>
            {c.googleReviews.rating && c.googleReviews.count
              ? `${c.googleReviews.rating}/5 across ${c.googleReviews.count} Google reviews${c.googleReviews.asOf ? ` (as of ${c.googleReviews.asOf})` : ''}.`
              : 'Read the full set of Google reviews at the source.'}
          </P>
          <Text role="link" style={st.link} onPress={() => Linking.openURL(c.googleReviews.url)}>See all reviews on Google</Text>
        </>
      ) : null}

      <H2>Patient reviews</H2>
      {c.reviews.length === 0 ? <P>No reviews have been published for this company yet.</P> : null}
      {c.reviews.map((r, i) => (
        <View key={i} style={st.review}>
          <Stars rating={r.rating} />
          <P>{r.text}</P>
          <Text style={st.meta}>
            {r.author} · {r.date} · via {r.source}{r.verified ? ' · verified patient' : ''}
          </Text>
          {r.sourceUrl ? <Text role="link" style={st.link} onPress={() => Linking.openURL(r.sourceUrl!)}>View original</Text> : null}
        </View>
      ))}
    </Page>
  );
}

const st = StyleSheet.create({
  link: { color: colors.brand, textDecorationLine: 'underline', fontSize: 16 },
  review: { backgroundColor: colors.card, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: colors.line, gap: 6 },
  meta: { color: colors.muted, fontSize: 13 },
});
