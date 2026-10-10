import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Page, H1, H2, P, Stars } from '../components/ui';
import { Seo } from '../components/Seo';
import { companies, aggregate } from '../lib/companies';
import { SITE } from '../lib/site';
import { colors } from '../lib/theme';

export default function Home() {
  return (
    <Page>
      <Seo
        title="Telehealth Reviews & Comparisons"
        description={SITE.description}
        path="/"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url, description: SITE.description },
          {
            '@context': 'https://schema.org', '@type': 'ItemList', name: 'Reviewed telehealth companies',
            itemListElement: companies.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/company/${c.slug}`, name: c.name })),
          },
        ]}
      />
      <H1>Telehealth company reviews from real patients</H1>
      <P>{SITE.description} Every listing is scored on the same published criteria.</P>
      <H2>Reviewed companies</H2>
      {companies.map((c) => {
        const agg = aggregate(c);
        return (
          <Link key={c.slug} href={`/company/${c.slug}` as any} style={st.card}>
            <View style={{ gap: 4 }}>
              <Text style={st.name}>{c.name}</Text>
              <Text style={st.tag}>{c.category} · {c.tagline}</Text>
              {agg ? <Text><Stars rating={agg.rating} /> {agg.rating} ({agg.count} reviews)</Text> : <Text style={st.tag}>Reviews coming soon</Text>}
              {c.affiliated ? <Text style={st.aff}>Affiliated with this site's operators</Text> : null}
            </View>
          </Link>
        );
      })}
    </Page>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: colors.line },
  name: { fontSize: 20, fontWeight: '700', color: colors.ink },
  tag: { color: colors.muted },
  aff: { color: colors.brandDark, fontSize: 12, fontWeight: '600' },
});
