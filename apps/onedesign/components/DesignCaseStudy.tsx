import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';

import type { DesignCaseStudy as DesignCaseStudyData, ImageSlot } from '@onegroup/shared';
import { Button, Container, cx } from '@onegroup/shared';

import { accented, emphasis } from './emphasis';
import styles from './DesignCaseStudy.module.css';

/*
 * Editorial case study template, ported from reference/design-case.html
 * and driven by the shared DesignCaseStudy content type. The per-project
 * palette is applied as --p1/--p2/--p3 on the article root; everything
 * else (nav, footer, accents) stays OneDesign chrome.
 *
 * Fidelity note: the reference full-bleed hero is a bespoke Dirty
 * Murphy's fascia mock (brass gradient lettering plus an "est." line).
 * The template generalises it: the case title set in a --p2 gradient
 * between --p2 rules, over a --p1 ground. Real dusk photography
 * (heroImage.src) replaces the mock entirely once supplied.
 */

/* wrap brand names in the made-real text with cross-brand links */
function linkSisters(text: string): ReactNode {
  const parts = text.split(/(OneLaser|OneSign)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part === 'OneLaser') {
      return (
        <a key={i} href="https://www.onelasercutting.com">
          OneLaser
        </a>
      );
    }
    if (part === 'OneSign') {
      return (
        <a key={i} href="https://www.onesignanddigital.com">
          OneSign
        </a>
      );
    }
    return part;
  });
}

function Moment({ slot }: { slot: ImageSlot }) {
  return (
    <div className={cx(styles.moment, slot.variant === 'warm' && styles.warm)}>
      <div className={styles.momentPh}>
        <span>{slot.caption}</span>
      </div>
    </div>
  );
}

export function DesignCaseStudy({ cs }: { cs: DesignCaseStudyData }) {
  const paletteVars = {
    '--p1': cs.palette.p1.hex,
    '--p2': cs.palette.p2.hex,
    '--p3': cs.palette.p3.hex,
  } as CSSProperties;

  const [firstMoment, ...duoMoments] = cs.moments ?? [];

  return (
    <article className={styles.root} style={paletteVars}>
      <header className={styles.title}>
        <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path
            className={styles.draw}
            style={{ '--len': 2100 } as CSSProperties}
            d="M-30,330 C200,140 420,420 640,260 S980,120 1230,300"
          />
        </svg>
        <Container width="case" className={styles.titleIn}>
          <div className={styles.kind}>{cs.kicker}</div>
          <h1 className={styles.h1}>{cs.title}</h1>
          <p className={styles.sub}>{cs.sub}</p>
          <div className={styles.meta}>
            <div>
              client
              <br />
              <b>{cs.client}</b>
            </div>
            <div>
              disciplines
              <br />
              <b>{cs.disciplines}</b>
            </div>
            <div>
              made real by
              <br />
              <b>{cs.madeRealBy}</b>
            </div>
            <div>
              year
              <br />
              <b>{cs.year}</b>
            </div>
          </div>
        </Container>
      </header>

      <div className={styles.bleed}>
        <div className={styles.glowL} aria-hidden="true" />
        <div className={styles.glowR} aria-hidden="true" />
        {cs.heroImage?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.bleedImg} src={cs.heroImage.src} alt={cs.heroImage.alt ?? ''} />
        ) : (
          <div className={styles.fascia}>
            <div className={styles.fasciaNm}>{cs.title}</div>
          </div>
        )}
        <div className={styles.refl} aria-hidden="true" />
        {cs.heroCaption && <div className={styles.bleedCap}>{cs.heroCaption}</div>}
      </div>

      <Container width="narrative" className={styles.story}>
        {cs.chapters.map((chap) => (
          <section className={styles.chap} key={chap.label + chap.title}>
            <div className={styles.chapLab}>{chap.label}</div>
            <h2>{chap.title}</h2>
            {chap.paragraphs.map((p, i) => (
              <p key={i}>{emphasis(p)}</p>
            ))}
          </section>
        ))}
      </Container>

      <Container width="case">
        <div className={styles.pull}>
          <p>{accented(cs.pullQuote.text, cs.pullQuote.accent, styles.pullAccent ?? '')}</p>
          <div className={styles.who}>{cs.pullQuote.attribution}</div>
        </div>

        {firstMoment && <Moment slot={firstMoment} />}

        <div className={styles.system}>
          <div className={styles.systemLab}>the system</div>
          <h2>{cs.systemTitle ?? 'the system.'}</h2>
          <div className={styles.swatches}>
            {[cs.palette.p1, cs.palette.p2, cs.palette.p3].map((sw) => (
              <div className={styles.sw} key={sw.hex}>
                <div className={styles.swC} style={{ background: sw.hex }} />
                <div className={styles.swI}>
                  <b>{sw.name}</b>
                  <span>{sw.hex}</span>
                </div>
              </div>
            ))}
          </div>
          {cs.typeSamples && cs.typeSamples.length > 0 && (
            <div className={styles.typerow}>
              {cs.typeSamples.map((sample) => (
                <div
                  className={cx(styles.type, sample.style === 'voice' && styles.voice)}
                  key={sample.caption}
                >
                  <div className={styles.typeBig}>{sample.text}</div>
                  <div className={styles.typeD}>{sample.caption}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {duoMoments.length > 0 && (
          <div className={styles.duo}>
            {duoMoments.map((slot) => (
              <div
                className={cx(styles.duoPh, slot.variant === 'dark' && styles.dark)}
                key={slot.caption}
              >
                <span>{slot.caption}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.made}>
          <div>
            <h3>{cs.madeReal.title}</h3>
            <p>{linkSisters(cs.madeReal.text)}</p>
            <div className={styles.chips}>
              {cs.madeReal.chips.map((chip) => (
                <span className={styles.chip} key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <Button href="/contact">start a project like this</Button>
        </div>
      </Container>

      <div className={styles.next}>
        <div className={styles.nextLab}>next project</div>
        <Link href={`/work/${cs.nextProject.slug}`}>
          <h3>{cs.nextProject.title} &rarr;</h3>
        </Link>
      </div>
    </article>
  );
}
