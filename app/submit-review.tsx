import { useState } from 'react';
import { TextInput, Pressable, Text, StyleSheet, View } from 'react-native';
import { Page, H1, P, Notice } from '../components/ui';
import { Seo } from '../components/Seo';
import { getCompany } from '../lib/companies';
import { colors } from '../lib/theme';

const ENDPOINT = 'https://formspree.io/f/xaeqjpbq';
const COMPANY = getCompany('beema-health')?.name ?? 'Beema Health';

export default function Submit() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function send() {
    if (!name.trim() || !text.trim()) return setStatus('error');
    setStatus('sending');
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          company: COMPANY,
          name: name.trim(),
          stars: `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating} out of 5)`,
          review: text.trim(),
          _subject: `New ${COMPANY} review — ${rating} star${rating === 1 ? '' : 's'}`,
          _gotcha: gotcha,
        }),
      });
      setStatus(r.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Page>
      <Seo title="Write a Review" description={`Share your experience with ${COMPANY}. Reviews are emailed for approval before they are published.`} path="/submit-review" noindex />
      <H1>Write a review</H1>
      <P>This review is for {COMPANY}. It is emailed to us first, and we publish it only if it is appropriate to post. Use a first name and last initial, and leave out health details that could identify you.</P>
      <TextInput style={st.input} value={name} onChangeText={setName} placeholder="First name and last initial" placeholderTextColor={colors.placeholder} autoComplete="name" />
      <View accessibilityRole="radiogroup" accessibilityLabel="Star rating" style={st.ratings}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable
            key={n}
            accessibilityRole="radio"
            accessibilityLabel={`${n} star${n === 1 ? '' : 's'}`}
            accessibilityState={{ selected: rating === n }}
            onPress={() => setRating(n)}
            style={st.starBtn}
          >
            <Text style={[st.star, n <= rating ? st.starOn : st.starOff]}>{n <= rating ? '★' : '☆'}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={st.starLabel}>{rating} out of 5 stars</Text>
      <TextInput style={[st.input, st.review]} value={text} onChangeText={setText} placeholder="Your experience with Beema Health" placeholderTextColor={colors.placeholder} multiline />
      <TextInput style={st.gotcha} value={gotcha} onChangeText={setGotcha} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" tabIndex={-1} />
      <Pressable accessibilityRole="button" style={[st.btn, status === 'sending' && st.btnOff]} onPress={send} disabled={status === 'sending' || status === 'sent'}>
        <Text style={st.btnText}>{status === 'sending' ? 'Sending…' : 'Submit review'}</Text>
      </Pressable>
      {status === 'sent' ? <Notice>Thank you. Your review was emailed to us. We will publish it if it is appropriate to post.</Notice> : null}
      {status === 'error' ? <Notice>Add your name and review, then try again.</Notice> : null}
    </Page>
  );
}

const st = StyleSheet.create({
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 12, fontSize: 16 },
  review: { height: 140, textAlignVertical: 'top' },
  ratings: { flexDirection: 'row', gap: 4 },
  starBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  star: { fontSize: 32, lineHeight: 36 },
  starOn: { color: colors.star },
  starOff: { color: colors.line },
  starLabel: { color: colors.muted, fontSize: 14 },
  gotcha: { position: 'absolute', left: -9999, height: 0, width: 0, opacity: 0 },
  btn: { backgroundColor: colors.brand, padding: 14, borderRadius: 8, alignItems: 'center' },
  btnOff: { opacity: 0.7 },
  btnText: { color: colors.card, fontWeight: '700', fontSize: 16 },
});
