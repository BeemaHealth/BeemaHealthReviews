import { ReactNode, useState } from 'react';
import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../lib/theme';
import { getCompany } from '../lib/companies';

const COMPANY = 'Telehealth Review Hub';

export const Stars = ({ rating }: { rating: number }) => (
  <Text accessibilityLabel={`${rating} out of 5 stars`} style={{ color: colors.star, fontSize: 18 }}>
    {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
  </Text>
);

export const Page = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <View style={s.page}>
      <View role="banner" style={s.header}>
        <Link href="/" style={s.brand} onPress={close}>{COMPANY}</Link>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close menu' : 'Open menu'}
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen((v) => !v)}
          style={s.menuBtn}
        >
          <View style={s.bar} />
          <View style={s.bar} />
          <View style={s.bar} />
        </Pressable>
      </View>
      {open ? (
        <View role="navigation" style={s.menu}>
          <Link href="/methodology" style={s.menuLink} onPress={close}>Methodology</Link>
          <Link href="/about" style={s.menuLink} onPress={close}>About</Link>
          <Link href="/submit-review" style={s.menuLink} onPress={close}>Write a review</Link>
        </View>
      ) : null}
      <ScrollView style={s.scroll} contentContainerStyle={s.main} keyboardShouldPersistTaps="handled">
        <View role="main" style={s.mainInner}>{children}</View>
      </ScrollView>
    </View>
  );
};

export const H1 = ({ children }: { children: ReactNode }) => <Text role="heading" aria-level={1} style={s.h1}>{children}</Text>;
export const H2 = ({ children }: { children: ReactNode }) => <Text role="heading" aria-level={2} style={s.h2}>{children}</Text>;
export const P = ({ children }: { children: ReactNode }) => <Text style={s.p}>{children}</Text>;
export const Notice = ({ children }: { children: ReactNode }) => <View style={s.notice}><Text style={s.p}>{children}</Text></View>;

const s = StyleSheet.create({
  page: { flex: 1, height: '100%' as any, backgroundColor: colors.bg },
  header: { backgroundColor: colors.brandDark, paddingLeft: 16, paddingRight: 8, minHeight: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: colors.card, fontSize: 20, fontWeight: '700' },
  menuBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', gap: 5 },
  bar: { width: 22, height: 2, borderRadius: 1, backgroundColor: colors.card },
  menu: { backgroundColor: colors.card, borderBottomWidth: 1, borderColor: colors.line },
  menuLink: { color: colors.ink, fontSize: 17, paddingVertical: 14, paddingHorizontal: 20 },
  scroll: { flex: 1 },
  main: { flexGrow: 1 },
  mainInner: { width: '100%', maxWidth: 880, alignSelf: 'center', padding: 20, gap: 14 },
  footer: { borderTopWidth: 1, borderColor: colors.line, padding: 20, gap: 8, maxWidth: 880, width: '100%', alignSelf: 'center' },
  disclosure: { color: colors.ink, fontSize: 14, lineHeight: 20 },
  small: { color: colors.muted, fontSize: 12 },
  h1: { fontSize: 32, fontWeight: '800', color: colors.ink, lineHeight: 40 },
  h2: { fontSize: 22, fontWeight: '700', color: colors.ink, marginTop: 10 },
  p: { fontSize: 16, lineHeight: 24, color: colors.ink },
  notice: { backgroundColor: colors.notice, padding: 12, borderRadius: 8 },
});
