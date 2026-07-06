import type { Metadata } from 'next';

import { Button, Container } from '@onegroup/shared';

import { BentoWorkGrid } from '../../components/BentoWorkGrid';
import { SiteFooter, SiteNav } from '../../components/SiteChrome';
import { caseStudies } from '../../content/case-studies';

import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected branding, retail and environmental graphics projects by OneDesign Studios, Gateshead. Identity and environment work designed to survive the real world.',
  openGraph: {
    type: 'website',
    siteName: 'OneDesign Studios',
    url: 'https://onedesignstudios.com/work',
    images: [{ url: '/og/work.png', width: 1200, height: 630 }],
  },
};

/* One-line outcomes and tags revealed by the bento grid's fluid growth
   (docs/v2-interactions.md). Outcomes are drawn from each study's own
   approved copy; tags echo its disciplines and cross-brand credits. */
const workOutcomes: Record<string, { outcome: string; tags: string[] }> = {
  'tanglewood-equestrian': {
    outcome: 'One brand system carried across brochure, leaflets, a five-sign set and the web.',
    tags: ['brand identity', 'print', 'five-sign set', 'web'],
  },
  'community-shop-sunderland': {
    outcome: 'A big retail shed turned into somewhere you would happily spend your morning.',
    tags: ['wayfinding', 'interior scheme', 'made real by OneSign'],
  },
  'dirty-murphys': {
    outcome: 'A new bar with an eighty-year-old soul, in aged brass that only gets better.',
    tags: ['identity', 'aged brass fascia', 'cut by OneLaser'],
  },
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Container as="header" className={styles.head}>
          <div className={styles.eyebrow}>selected work</div>
          <h1 className={styles.h1}>recent shapes.</h1>
          <p className={styles.lede}>
            Branding, retail and environmental graphics from our Gateshead studio, each one made
            real by our sister companies. The concept you read about here is the thing standing on
            the street.
          </p>
        </Container>
        <BentoWorkGrid
          entries={[
            ...caseStudies.map((cs) => ({
              title: cs.title,
              description: cs.disciplines,
              outcome: workOutcomes[cs.slug]?.outcome,
              tags: workOutcomes[cs.slug]?.tags,
              href: `/work/${cs.slug}`,
            })),
            {
              title: 'the tanning co',
              description: 'retail branding, interior signage / case study coming soon',
              outcome: 'Retail branding with warmth built in; the full story is coming soon.',
              tags: ['retail branding', 'interior signage'],
            },
          ]}
        />
        <Container as="section" className={styles.endcta}>
          <h2>
            got something
            <br />
            <span className={styles.ctaAccent}>to shape?</span>
          </h2>
          <Button href="/contact" className={styles.cta}>
            start a project
          </Button>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
