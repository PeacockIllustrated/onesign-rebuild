import type { Metadata } from 'next';

import { SectionHead } from '@onegroup/shared';

import { CutCards } from '../../components/CutCards';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteNav } from '../../components/SiteNav';
import { UploadBand } from '../../components/UploadBand';
import { caseStudies } from '../../content/case-studies';

export const metadata: Metadata = {
  title: 'Recent cuts: laser cutting case studies',
  description:
    'Laser cutting case studies from the OneLaser bed in Gateshead: material, tolerance held, measured variance and lead time, written up job by job.',
  alternates: { canonical: '/recent-cuts' },
};

export default function RecentCutsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <SectionHead
          label="recent cuts"
          title="every job leaves with its numbers."
          text="Case studies from the bed: what was cut, the tolerance held, the measured variance across the batch and how long it took. Evidence, not a gallery."
        />
        <CutCards
          items={caseStudies.map((cs) => ({
            ...cs.card,
            href: `/recent-cuts/${cs.slug}`,
          }))}
        />
        <UploadBand />
      </main>
      <SiteFooter />
    </>
  );
}
