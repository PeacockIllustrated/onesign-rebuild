/*
 * The job-sheet case study template, ported from reference/laser-case.html
 * and fully data-driven from the shared LaserCaseStudy type: six-cell
 * spec plate, dashed kerf rail with nodes, parameter table, verdict,
 * three proof stats. Server component; no JS shipped for this page
 * beyond the framework.
 */
import type { ReactNode } from 'react';

import type { ImageSlot, LaserCaseStudy as LaserCaseStudyData } from '@onegroup/shared';
import { Button, Container } from '@onegroup/shared';

import styles from './LaserCaseStudy.module.css';

/** Render our own content strings that may carry <b> emphasis markers. */
function renderEmphasis(text: string): ReactNode[] {
  return text.split(/<\/?b>/).map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part));
}

/** Titles may carry a manual break as \n (reference h1 uses <br>). */
function renderTitle(title: string): ReactNode[] {
  const lines = title.split('\n');
  return lines.flatMap((line, i) => (i === 0 ? [line] : [<br key={i} />, line]));
}

/*
 * Placeholder hero scene: parts on the bed under the beam, generated to
 * match the reference fin-array artwork (bar positions and opacities
 * follow the same sinusoidal ramp). Swapped out for real photography
 * via heroImage.src (docs/brand-briefs.md photography direction).
 */
function HeroScene() {
  const bars = Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    return {
      x: (6.5 + i * ((93.5 - 6.5) / 23)).toFixed(2),
      body: (0.28 + 0.5 * Math.sin(Math.PI * t)).toFixed(2),
      edge: (0.15 + 0.28 * Math.sin(Math.PI * t)).toFixed(2),
    };
  });
  return (
    <svg viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="cbg" cx=".6" cy=".35" r=".8">
          <stop offset="0" stopColor="#123840" stopOpacity=".7" />
          <stop offset="1" stopColor="#0B1214" stopOpacity="0" />
        </radialGradient>
        <filter id="cbloom" x="-300%" y="-30%" width="700%" height="160%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#cbg)" />
      <line x1="0" y1="14%" x2="100%" y2="14%" stroke="#1C2A2E" strokeWidth="1" />
      <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#1C2A2E" strokeWidth="1" />
      {bars.map((b) => (
        <g key={b.x}>
          <rect x={`${b.x}%`} y="14%" width="0.9%" height="66%" fill="#1E6E7E" opacity={b.body} />
          <rect x={`${b.x}%`} y="14%" width="0.28%" height="66%" fill="#7FB8C2" opacity={b.edge} />
        </g>
      ))}
      <rect x="63.2%" y="14%" width="0.9%" height="66%" fill="#2FD4EE" opacity=".85" filter="url(#cbloom)" />
      <rect x="63.35%" y="14%" width="0.25%" height="66%" fill="#EFFDFF" opacity=".9" />
      <rect x="0" y="80%" width="100%" height="20%" fill="#0B1214" opacity=".55" />
    </svg>
  );
}

function ImagePair({ images }: { images: ImageSlot[] }) {
  return (
    <div className={styles.pair}>
      {images.map((img) => (
        <div
          key={img.caption}
          className={img.variant === 'alt' || img.variant === 'dark' ? `${styles.ph} ${styles.alt}` : styles.ph}
        >
          {img.src && <img src={img.src} alt={img.alt ?? ''} />}
          <span>{img.caption}</span>
        </div>
      ))}
    </div>
  );
}

export function LaserCaseStudy({ cs }: { cs: LaserCaseStudyData }) {
  return (
    <main>
      <header className={styles.jobhead}>
        {/* cooled seam from a previous pass, decoration only */}
        <svg
          className={styles.seam}
          viewBox="0 0 1200 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M-20,210 C240,160 460,250 700,190 S1040,140 1220,180"
            fill="none"
            stroke="#1E6E7E"
            strokeWidth="1.4"
          />
          <path
            d="M760,182 C880,168 990,158 1080,158"
            fill="none"
            stroke="#2FD4EE"
            strokeWidth="2.6"
            opacity=".55"
          />
          <circle cx="1080" cy="158" r="2.2" fill="#EFFDFF" opacity=".8" />
        </svg>
        <Container width="case" className={styles.in}>
          <div className={styles.jobno}>case study / job {cs.jobNumber}</div>
          <h1 className={styles.h1}>{renderTitle(cs.title)}</h1>
          <p className={styles.client}>{cs.client}</p>
          <div className={styles.sheet}>
            {cs.specPlate.map((cell) => (
              <div key={cell.label}>
                <div className={styles.k}>{cell.label}</div>
                <div className={styles.v}>{cell.value}</div>
              </div>
            ))}
          </div>
        </Container>
      </header>

      <div className={styles.heroimg}>
        {cs.heroImage?.src ? (
          <img src={cs.heroImage.src} alt={cs.heroImage.alt ?? ''} />
        ) : (
          <HeroScene />
        )}
        {cs.heroCaption && <div className={styles.cap}>{cs.heroCaption}</div>}
      </div>

      <Container width="case">
        <div className={styles.body}>
          <div className={styles.rail} aria-hidden="true">
            {cs.sections.map((s, i) => (
              <span
                key={s.label}
                className={styles.node}
                style={{ top: i === 0 ? '6px' : `${i * 28}%` }}
              />
            ))}
          </div>
          <div>
            {cs.sections.map((s) => (
              <section className={styles.sec} key={s.label}>
                <div className={styles.lab}>{s.label}</div>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{renderEmphasis(p)}</p>
                ))}
                {s.showParameters && (
                  <table className={styles.spectable}>
                    <thead>
                      <tr>
                        <th>parameter</th>
                        <th />
                        <th>value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cs.parameters.map((row) => (
                        <tr key={row.parameter}>
                          <td>{row.parameter}</td>
                          <td />
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {s.images && s.images.length > 0 && <ImagePair images={s.images} />}
              </section>
            ))}

            <div className={styles.verdict}>
              <div className={styles.lab}>the client&apos;s words</div>
              <p>&quot;{cs.verdict.quote}&quot;</p>
              <div className={styles.sig}>{cs.verdict.attribution}</div>
            </div>

            <div className={styles.stats}>
              {cs.proofStats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <div className={styles.v}>{stat.value}</div>
                  <div className={styles.k}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container width="case">
        <div className={styles.next}>
          <div>
            <div className={styles.lab}>got a similar job?</div>
            <h2>send the drawing, we will price it today.</h2>
          </div>
          <Button href="/upload">upload a DXF</Button>
        </div>
      </Container>
    </main>
  );
}

/** Wrapper that removes the landing footer top margin on case pages. */
export function CaseFooterWrap({ children }: { children: ReactNode }) {
  return <div className={styles.footerWrap}>{children}</div>;
}
