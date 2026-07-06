import type { Metadata } from 'next';

import { Container, SectionHead } from '@onegroup/shared';

import { SiteFooter } from '../../components/SiteFooter';
import { SiteNav } from '../../components/SiteNav';
import { UploadBand } from '../../components/UploadBand';
import { GROUP_LINKS, openGraph, QUOTE_EMAIL } from '../../lib/site';
import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Contact OneLaser, Team Valley, Gateshead',
  description:
    'OneLaser, precision laser cutting at D86 Princesway North, Team Valley, Gateshead NE11 0TU. Call 0191 487 6767 or email a drawing for a same-day price.',
  alternates: { canonical: '/contact' },
  openGraph: openGraph('/og/contact.png'),
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <SectionHead
          label="contact"
          title="talk to the people who run the machine."
          text="OneLaser cuts from the One Group floor on Team Valley, Gateshead. Call, email, or come and watch your job run; the person who quotes it is the person who cuts it."
        />

        <Container as="section">
          <div className={styles.kv}>
            <div className={styles.kvCell}>
              <div className={styles.k}>address</div>
              <div className={styles.v}>D86 Princesway North</div>
              <p>Team Valley, Gateshead NE11 0TU</p>
            </div>
            <div className={styles.kvCell}>
              <div className={styles.k}>phone</div>
              <div className={styles.v}>
                <a href="tel:+441914876767">0191 487 6767</a>
              </div>
              {/* TODO: confirm opening hours with the floor before launch. */}
              <p>Monday to Friday, 8am to 5pm</p>
            </div>
            <div className={styles.kvCell}>
              <div className={styles.k}>drawings</div>
              <div className={styles.v}>
                <a href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</a>
              </div>
              <p>DXF or DWG with material, thickness and quantity</p>
            </div>
          </div>
        </Container>

        <Container as="section" className={styles.section}>
          <div className={styles.prose}>
            <p>
              Need finished signage from your components?{' '}
              <a href={GROUP_LINKS.onesign}>
                <b>Visit OneSign</b>
              </a>
              . Need the brand designed before anything is cut?{' '}
              <a href={GROUP_LINKS.onedesign}>
                <b>OneDesign Studios</b>
              </a>{' '}
              is the studio upstairs.
            </p>
          </div>
        </Container>

        <UploadBand />
      </main>
      <SiteFooter />
    </>
  );
}
