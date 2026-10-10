import { Page, H1, H2, P } from '../components/ui';
import { Seo } from '../components/Seo';

export default function Methodology() {
  return (
    <Page>
      <Seo title="Review Methodology" description="How telehealth companies are reviewed, scored, and how patient reviews are collected and moderated on TeleHealth Review Hub." path="/methodology" />
      <H1>How we review telehealth companies</H1>
      <P>Every company is evaluated against the same criteria. Ratings are never set in advance and are not for sale.</P>
      <H2>Criteria</H2>
      <P>Pricing transparency · Clinician licensing and credentials · Time to first response · Patient support quality · Privacy practices.</P>
      <H2>Patient reviews</H2>
      <P>Reviews are published as submitted or quoted verbatim from the named source with a link back. We remove only spam, personal health information, abuse, and reviews unrelated to the company. Negative reviews stay up.</P>
      <H2>Conflicts of interest</H2>
      <P>Where a listed company has a relationship with this site's operators, that is disclosed on the company's page and in every page footer.</P>
    </Page>
  );
}
