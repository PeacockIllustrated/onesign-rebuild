import type { Metadata } from 'next';

import { Button, Container } from '@onegroup/shared';

import { SiteFooter, SiteNav } from '../../components/SiteChrome';
import { WorkGrid } from '../../components/WorkGrid';
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
        <WorkGrid
          entries={[
            ...caseStudies.map((cs) => ({
              title: cs.title,
              description: cs.disciplines,
              href: `/work/${cs.slug}`,
            })),
            {
              title: 'the tanning co',
              description: 'retail branding, interior signage / case study coming soon',
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
