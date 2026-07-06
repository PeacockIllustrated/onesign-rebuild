import { Container } from '@onegroup/shared';

import styles from './MaterialsGrid.module.css';

/* Approved material data from reference/laser-landing.html, verbatim.
   Photography direction: fabrication shot like sculpture; the teal
   gradient placeholders mark the image slots until real photography
   is supplied (docs/brand-briefs.md). */
const MATERIALS = [
  {
    ph: 'brushed 304 / mirror 316',
    name: 'stainless steel',
    rows: [
      ['thickness', '0.9 to 12 mm'],
      ['grades', '304, 316'],
      ['typical use', 'facings, brackets, architectural'],
    ],
  },
  {
    ph: '5083 / 5754 / composite',
    name: 'aluminium',
    rows: [
      ['thickness', '0.9 to 10 mm'],
      ['grades', '5083, 5754'],
      ['typical use', 'trays, panels, lightweight parts'],
    ],
  },
  {
    ph: 'cr4 / s275 / zintec',
    name: 'mild steel',
    rows: [
      ['thickness', '0.9 to 20 mm'],
      ['grades', 'CR4, S275'],
      ['typical use', 'structural, OEM, batch work'],
    ],
  },
] as const;

/** Materials cards with real spec text as DOM data tables. */
export function MaterialsGrid() {
  return (
    <Container as="section">
      <div className={styles.mats}>
        {MATERIALS.map((m) => (
          <div className={styles.mat} key={m.name}>
            <div className={styles.ph}>
              <span>{m.ph}</span>
            </div>
            <div className={styles.bd}>
              <h3>{m.name}</h3>
              <table>
                <tbody>
                  {m.rows.map((r) => (
                    <tr key={r[0]}>
                      <td>{r[0]}</td>
                      <td>{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
