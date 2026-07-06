import type { Metadata } from 'next';

import { Button, Container, SectionHead } from '@onegroup/shared';

import { BeamHero } from '../components/BeamHero';
import { CutCards } from '../components/CutCards';
import { FaqSection } from '../components/FaqSection';
import { JsonLd } from '../components/JsonLd';
import { MaterialsGrid } from '../components/MaterialsGrid';
import { ProcessGrid } from '../components/ProcessGrid';
import { SiteFooter } from '../components/SiteFooter';
import { SiteNav } from '../components/SiteNav';
import { SpecsStrip } from '../components/SpecsStrip';
import { UploadBand } from '../components/UploadBand';
import { caseStudies } from '../content/case-studies';
import { openGraph, servicesJsonLd } from '../lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Precision laser cutting Gateshead | OneLaser' },
  description:
    '3kW fibre laser cutting in stainless, aluminium and mild steel from Gateshead. Upload a DXF, get a price the same working day, take delivery of parts that fit first time.',
  alternates: { canonical: '/' },
  openGraph: openGraph('/og/home.png'),
};

/* Recent cuts cards: the two seeded case studies plus the third
   reference card (JOB 1158). TODO: the OEM bracket batch case study
   content has not been supplied; its card links to the index until
   the job sheet arrives. */
const cutItems = [
  ...caseStudies.map((cs) => ({ ...cs.card, href: `/recent-cuts/${cs.slug}` })),
  {
    title: 'OEM bracket batch',
    meta: 'JOB 1158 / 250 parts',
    tag: 'mild steel / 10 mm',
    href: '/recent-cuts',
  },
];

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <header className={styles.hero}>
          <BeamHero />
          <div className="hero-scrim" aria-hidden="true" />
          <Container className={styles.inner}>
            <div className={styles.eyebrow}>precision laser cutting / gateshead</div>
            <h1 className={styles.h1}>
              cut clean,
              <br />
              <span className={styles.accent}>every pass.</span>
            </h1>
            <p className={styles.lede}>
              3kW fibre laser cutting in stainless, aluminium and mild steel. Upload a DXF,
              get a price, and take delivery of parts that fit first time. From the team
              behind Onesign &amp; Digital.
            </p>
            <div className={styles.btns}>
              <Button href="/upload">upload a DXF</Button>
              <Button href="#cap" variant="ghost">
                see capabilities
              </Button>
            </div>
            <div className={styles.readout}>
              <div>
                source
                <br />
                <b>3kW fibre</b>
              </div>
              <div>
                kerf from
                <br />
                <b>0.15 mm</b>
              </div>
              <div>
                tolerance
                <br />
                <b>±0.1 mm</b>
              </div>
              <div>
                turnaround
                <br />
                <b>from 48 hrs</b>
              </div>
            </div>
          </Container>
        </header>

        <SpecsStrip id="cap" />

        <SectionHead
          label="process"
          title="drawing to delivery, four steps."
          text="No middlemen and no mystery. Your file goes from quote to cut on the same floor, checked at every stage by the people running the machine."
        />
        <ProcessGrid />

        <SectionHead label="materials" title="what we profile every day." id="mat" />
        <MaterialsGrid />

        <UploadBand id="quote" />

        <SectionHead label="recent cuts" title="off the bed this month." id="work" />
        <CutCards items={cutItems} />

        <FaqSection id="faq" />
      </main>
      <SiteFooter />
      {servicesJsonLd.map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}
    </>
  );
}
