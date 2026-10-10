import { useState } from 'react';
import { TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Page, H1, P, Notice } from '../components/ui';
import { Seo } from '../components/Seo';
import { companies } from '../lib/companies';
import { colors } from '../lib/theme';

// Set EXPO_PUBLIC_REVIEW_ENDPOINT to a form backend (e.g. Formspree) that stores submissions for moderation.
const ENDPOINT = process.env.EXPO_PUBLIC_REVIEW_ENDPOINT;

export default function Submit() {
  const [company, setCompany] = useState(companies[0]?.slug ?? '');
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  async function send() {
    if (!ENDPOINT || !text.trim()) return setStatus('error');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ company, name, rating, text }) });
      setStatus(r.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  }

  return (
    <Page>
      <Seo title="Write a Review" description="Share your experience with a telehealth company. Honest reviews, positive or negative, are published after spam and privacy checks." path="/submit-review" noindex />
      <H1>Write a review</H1>
      <P>Share your own experience. Do not include health details that identify you. Reviews are moderated for spam and privacy only, not for sentiment.</P>
      <TextInput style={st.input} value={company} onChangeText={setCompany} placeholder="Company (slug)" />
      <TextInput style={st.input} value={name} onChangeText={setName} placeholder="First name and last initial" />
      <TextInput style={st.input} value={rating} onChangeText={setRating} placeholder="Rating 1-5" keyboardType="number-pad" />
      <TextInput style={[st.input, { height: 140 }]} value={text} onChangeText={setText} placeholder="Your experience" multiline />
      <Pressable style={st.btn} onPress={send}><Text style={st.btnText}>Submit review</Text></Pressable>
      {status === 'sent' ? <Notice>Thank you. Your review was received and will be published after moderation.</Notice> : null}
      {status === 'error' ? <Notice>{ENDPOINT ? 'Please add your review text and try again.' : 'Review submissions are not enabled yet.'}</Notice> : null}
    </Page>
  );
}

const st = StyleSheet.create({
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 12, fontSize: 16 },
  btn: { backgroundColor: colors.brand, padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
