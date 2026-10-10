import { ReactNode } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../lib/theme';
import { DISCLOSURE, SITE } from '../lib/site';

export const Stars = ({ rating }: { rating: number }) => (
  <Text accessibilityLabel={`${rating} out of 5 stars`} style={{ color: colors.star, fontSize: 18 }}>
    {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
  </Text>
);

export const Page = ({ children }: { children: ReactNode }) => (
  <View style={s.page}>
    <View role="banner" style={s.header}>
      <Link href="/" style={s.brand}>{SITE.name}</Link>
      <View role="navigation" style={s.nav}>
        <Link href="/methodology" style={s.navLink}>Methodology</Link>
        <Link href="/about" style={s.navLink}>About</Link>
        <Link href="/submit-review" style={s.navLink}>Write a review</Link>
      </View>
    </View>
    <View role="main" style={s.main}>{children}</View>
    <View role="contentinfo" style={s.footer}>
      <Text style={s.disclosure}>{DISCLOSURE}</Text>
      <Text style={s.small}>© {new Date().getFullYear()} {SITE.name}. Reviews reflect individual patient experiences and are not medical advice.</Text>
    </View>
  </View>
);

export const H1 = ({ children }: { children: ReactNode }) => <Text role="heading" aria-level={1} style={s.h1}>{children}</Text>;
export const H2 = ({ children }: { children: ReactNode }) => <Text role="heading" aria-level={2} style={s.h2}>{children}</Text>;
export const P = ({ children }: { children: ReactNode }) => <Text style={s.p}>{children}</Text>;
export const Notice = ({ children }: { children: ReactNode }) => <View style={s.notice}><Text style={s.p}>{children}</Text></View>;

const s = StyleSheet.create({
  page: { backgroundColor: colors.bg, minHeight: '100%' as any },
  header: { backgroundColor: colors.brandDark, padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  brand: { color: '#fff', fontSize: 20, fontWeight: '700' },
  nav: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  navLink: { color: '#D6EDED', fontSize: 15 },
  main: { width: '100%', maxWidth: 880, alignSelf: 'center', padding: 20, gap: 14 },
  footer: { borderTopWidth: 1, borderColor: colors.line, padding: 20, gap: 8, maxWidth: 880, width: '100%', alignSelf: 'center' },
  disclosure: { color: colors.ink, fontSize: 14, lineHeight: 20 },
  small: { color: colors.muted, fontSize: 12 },
  h1: { fontSize: 32, fontWeight: '800', color: colors.ink, lineHeight: 40 },
  h2: { fontSize: 22, fontWeight: '700', color: colors.ink, marginTop: 10 },
  p: { fontSize: 16, lineHeight: 24, color: colors.ink },
  notice: { backgroundColor: colors.notice, padding: 12, borderRadius: 8 },
});
