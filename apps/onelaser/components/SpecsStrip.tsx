import { Container } from '@onegroup/shared';

import styles from './SpecsStrip.module.css';

/* Approved capability figures from reference/laser-landing.html. Specs
   live in the DOM as text (docs/seo-aeo.md). */
const SPECS = [
  { k: 'stainless up to', v: '12', u: ' mm' },
  { k: 'aluminium up to', v: '10', u: ' mm' },
  { k: 'mild steel up to', v: '20', u: ' mm' },
  { k: 'bed size', v: '3 × 1.5', u: ' m' },
];

/** Capabilities strip: contained to the wrap, first cell flush left. */
export function SpecsStrip({ id }: { id?: string }) {
  return (
    <section className={styles.specsWrap} id={id}>
      <Container>
        <div className={styles.specs}>
          {SPECS.map((s) => (
            <div className={styles.spec} key={s.k}>
              <div className={styles.k}>{s.k}</div>
              <div className={styles.v}>
                {s.v}
                <span className={styles.u}>{s.u}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
