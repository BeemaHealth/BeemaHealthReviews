import { Page, H1, P } from '../components/ui';
import { Seo } from '../components/Seo';

export default function NotFound() {
  return <Page><Seo title="Page not found" description="Page not found." path="/404" noindex /><H1>Page not found</H1><P>That page does not exist.</P></Page>;
}
