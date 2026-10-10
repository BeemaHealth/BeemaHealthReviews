import { Page, H1, H2, P } from '../components/ui';
import { Seo } from '../components/Seo';
import { SITE, DISCLOSURE } from '../lib/site';

export default function About() {
  return (
    <Page>
      <Seo
        title="About"
        description="About TeleHealth Review Hub: who runs it, how it is funded, and its relationship to listed companies."
        path="/about"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: `About ${SITE.name}`, url: `${SITE.url}/about` }}
      />
      <H1>About {SITE.name}</H1>
      <P>{SITE.name} helps patients compare telehealth companies using real patient reviews and a single published methodology.</P>
      <H2>Transparency</H2>
      <P>{DISCLOSURE}</P>
      <P>TODO: add the operating entity's legal name, contact email, and funding disclosure.</P>
    </Page>
  );
}
