import type { Metadata } from 'next';

import { Container, SectionHead } from '@onegroup/shared';

import { SiteFooter } from '../../components/SiteFooter';
import { SiteNav } from '../../components/SiteNav';
import { UploadForm } from '../../components/UploadForm';
import { QUOTE_EMAIL } from '../../lib/site';
import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Upload a DXF for a laser cutting price',
  description:
    'Upload a DXF or DWG and get a laser cutting price back the same working day from OneLaser in Gateshead. No minimum order, no drawn-out quoting chain.',
  alternates: { canonical: '/upload' },
};

export default function UploadPage() {
  return (
    <>
      <SiteNav />
      <main>
        <SectionHead
          label="upload"
          title="got a drawing ready?"
          text="Drop a DXF and get a price back the same working day. No minimum order, no drawn-out quoting chain. The price comes from the true cut length, pierces and material, not a guess."
        />

        <Container as="section" className={styles.section}>
          <UploadForm />
        </Container>

        <Container as="section" className={styles.section}>
          <div className={styles.prose}>
            <p>
              <b>What happens next.</b> Your file goes straight to the floor. We check the
              geometry, confirm material and thickness, and reply with a price and lead
              time. Approve it and the job is nested for the next appropriate sheet.
            </p>
            <p>
              Rather send it directly? Email your drawing to{' '}
              <a href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</a> with material, thickness
              and quantity, and we will price it from there.
            </p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
