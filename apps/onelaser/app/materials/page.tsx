import type { Metadata } from 'next';

import { Container, SectionHead } from '@onegroup/shared';

import { MaterialsGrid } from '../../components/MaterialsGrid';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteNav } from '../../components/SiteNav';
import { UploadBand } from '../../components/UploadBand';
import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Materials: stainless, aluminium, mild steel',
  description:
    'Laser cut stainless steel 0.9 to 12 mm (304, 316), aluminium 0.9 to 10 mm (5083, 5754) and mild steel 0.9 to 20 mm (CR4, S275) in Gateshead. Sheet up to 3 × 1.5 m.',
  alternates: { canonical: '/materials' },
};

export default function MaterialsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <SectionHead
          label="materials"
          title="what we profile every day."
          text="OneLaser cuts stainless steel, aluminium and mild steel sheet up to 3 × 1.5 m in Gateshead. Thickness limits, grades and typical uses below; every figure is held on the machine, not in a brochure."
        />

        <MaterialsGrid />

        <Container as="section" className={styles.section}>
          <div className={styles.prose}>
            <p>
              Grades matter. 316 for exposed architectural work, 304 where the budget is
              tighter and the weather is kinder; 5083 where a tray has to fold without
              cracking; CR4 for parts heading to powder coat. If the grade on your drawing
              is wrong for the job, we will say so before we cut it.
            </p>
            {/*
              TODO: confirm brass, copper and zintec supply and thickness
              limits before publishing firmer claims; the fibre source
              handles reflective materials but the stock position needs
              confirming with the floor.
            */}
            <p>
              Not listed? Ask. The fibre source also profiles brass, copper and zintec,
              and we can usually quote from your drawing the same day.
            </p>
            <p>
              Material certification and traceability available on request for structural
              and OEM work.
            </p>
          </div>
        </Container>

        <UploadBand />
      </main>
      <SiteFooter />
    </>
  );
}
