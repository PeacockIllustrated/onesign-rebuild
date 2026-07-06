import type { Metadata } from 'next';

import { Container, SectionHead } from '@onegroup/shared';

import { JsonLd } from '../../components/JsonLd';
import { PageHead } from '../../components/PageHead';
import { ProcessGrid } from '../../components/ProcessGrid';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteNav } from '../../components/SiteNav';
import { SpecsStrip } from '../../components/SpecsStrip';
import { UploadBand } from '../../components/UploadBand';
import { openGraph, servicesJsonLd } from '../../lib/site';
import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Laser cutting capabilities, Gateshead',
  description:
    '3kW fibre laser, 3 × 1.5 m bed, ±0.1 mm tolerance. Stainless to 12 mm, aluminium to 10 mm, mild steel to 20 mm. Kerf from 0.15 mm, turnaround from 48 hours.',
  alternates: { canonical: '/capabilities' },
  openGraph: openGraph('/og/capabilities.png'),
};

/* Machine data as DOM text, not images (docs/seo-aeo.md). Figures are
   the approved landing readout and specs strip values. */
const MACHINE_ROWS = [
  ['source', '3kW fibre'],
  ['bed size', '3 × 1.5 m'],
  ['kerf from', '0.15 mm'],
  ['tolerance', '±0.1 mm'],
  ['files accepted', 'DXF, DWG'],
  ['turnaround', 'from 48 hrs'],
] as const;

export default function CapabilitiesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHead
          label="capabilities"
          title="one machine, run properly."
          text="OneLaser is a precision laser cutting service in Gateshead, cutting stainless, aluminium and mild steel for engineers, fabricators, contractors and OEM buyers across the North East and the rest of the UK."
        />

        <SpecsStrip />

        <Container as="section" className={styles.section}>
          <div className={styles.prose}>
            <p>
              One 3kW fibre laser, one bed, one team. The same people quote your file, nest
              it, cut it and check it, so tolerances are held by habit rather than
              inspection. <b>±0.1 mm across the sheet</b>, burr-free edges, tight internal
              radii.
            </p>
            <p>
              Finishing stays in house: deburr, fold and powder coat on the same floor.
              Parts arrive ready to fit, not ready for more work.
            </p>
          </div>
          <table className={styles.spectable}>
            <thead>
              <tr>
                <th>machine</th>
                <th />
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {MACHINE_ROWS.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td />
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>

        <SectionHead
          label="process"
          title="drawing to delivery, four steps."
          text="No middlemen and no mystery. Your file goes from quote to cut on the same floor, checked at every stage by the people running the machine."
        />
        <ProcessGrid />

        <UploadBand />
      </main>
      <SiteFooter />
      {servicesJsonLd.map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}
    </>
  );
}
