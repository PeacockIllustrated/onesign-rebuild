import { Container } from '@onegroup/shared';

import styles from './ProcessGrid.module.css';

/* Approved copy from reference/laser-landing.html, verbatim. */
const STEPS = [
  {
    n: '01',
    t: 'quote',
    d: 'Upload a DXF or DWG. Price comes from the true cut length, pierces and material, not a guess.',
  },
  {
    n: '02',
    t: 'nest',
    d: 'Parts nested for yield, lead-ins and micro-tabs set so edges stay clean and parts stay flat.',
  },
  {
    n: '03',
    t: 'cut',
    d: 'Fibre laser holds ±0.1 mm across the sheet. Burr-free edges, tight internal radii, crisp detail.',
  },
  {
    n: '04',
    t: 'finish',
    d: 'Deburr, fold and powder coat in house. Parts arrive ready to fit, not ready for more work.',
  },
];

/** Process 01-04 cards. */
export function ProcessGrid() {
  return (
    <Container as="section">
      <div className={styles.proc}>
        {STEPS.map((s) => (
          <div className={styles.step} key={s.n}>
            <div className={styles.n}>{s.n}</div>
            <div>
              <div className={styles.t}>{s.t}</div>
              <div className={styles.d}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
