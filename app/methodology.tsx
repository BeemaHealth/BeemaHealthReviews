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
      <P>Reviews submitted here are emailed to us first. We publish a review when it is appropriate to post, and we quote it as submitted. We do not post spam, personal health information, abuse, or reviews that are not about the company. Google reviews are quoted verbatim with a link back to the source.</P>
    </Page>
  );
}
