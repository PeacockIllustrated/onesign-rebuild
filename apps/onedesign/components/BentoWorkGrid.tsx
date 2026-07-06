'use client';

/*
 * Bento work grid with fluid growth (docs/v2-interactions.md,
 * OneDesign). Replaces the asymmetric work grid: the resting layout
 * keeps the reference geometry (tall card left, stacked shorts right,
 * 1.4fr/1fr, 18px gap), and hovering or keyboard-focusing a tile grows
 * it by animating the grid template fractions to reveal project meta,
 * a one-line outcome and tags. Siblings compress but never disappear
 * or drop below a legible minimum; everything returns to rest when the
 * pointer leaves.
 *
 * Implementation notes:
 * - CSS grid with animated grid-template fractions: React state picks
 *   the fraction lists, exposed as --bento-cols/--bento-rows custom
 *   properties; the stylesheet owns the actual grid-template-* rules so
 *   the mobile single-column media query can still win.
 * - Keyboard: tiles are links; focus grows exactly like hover.
 * - Reduced motion: the media query strips every transition, so state
 *   changes are instant swaps (module CSS).
 * - Static-first: server-rendered markup is the resting grid with all
 *   links working; growth is a JS-free-page-safe enhancement. On small
 *   screens the grid stacks and the extra info is always visible.
 */

import { useState } from 'react';
import Link from 'next/link';

import { Container, cx } from '@onegroup/shared';

import styles from './BentoWorkGrid.module.css';

export interface BentoWorkGridEntry {
  title: string;
  /** Project meta line (disciplines), shown at rest as in the reference. */
  description: string;
  /** One-line outcome revealed on grow. */
  outcome?: string;
  /** Tag chips revealed on grow. */
  tags?: string[];
  /** Case study route; entries without one render as a plain card. */
  href?: string;
}

export interface BentoWorkGridProps {
  /** First entry takes the tall left slot; the rest stack right. */
  entries: BentoWorkGridEntry[];
}

/* resting and grown grid fractions; compressed tracks never drop below
   a legible minimum (no tile disappears) */
const COLS_REST = '1.4fr 1fr';
const COLS_TALL = '1.9fr 0.9fr';
const COLS_SHORT = '1.05fr 1.45fr';
const ROW_REST = '1fr';
const ROW_GROWN = '1.55fr';
const ROW_SQUEEZED = '0.8fr';

export function BentoWorkGrid({ entries }: BentoWorkGridProps) {
  const [active, setActive] = useState<number | null>(null);

  const shorts = entries.slice(1);
  if (entries.length === 0) return null;

  const cols = active === null ? COLS_REST : active === 0 ? COLS_TALL : COLS_SHORT;
  const rows = shorts
    .map((_, j) => {
      if (active === null || active === 0) return ROW_REST;
      return active === j + 1 ? ROW_GROWN : ROW_SQUEEZED;
    })
    .join(' ');
  /* reference resting heights: tall 380px, shorts 181px + 18px gap */
  const height = Math.max(380, shorts.length * 181 + (shorts.length - 1) * 18);

  const vars = {
    '--bento-cols': cols,
    '--bento-rows': rows || ROW_REST,
    '--bento-h': `${height}px`,
  } as React.CSSProperties;

  return (
    <Container as="section" className={styles.wrap}>
      <div className={styles.grid} style={vars} onPointerLeave={() => setActive(null)}>
        {entries.map((entry, i) => (
          <Tile
            key={entry.title}
            entry={entry}
            variant={i === 0 ? 'tall' : 'short'}
            grown={active === i}
            onActivate={() => setActive(i)}
            onDeactivate={() => setActive(null)}
          />
        ))}
      </div>
    </Container>
  );
}

function Tile({
  entry,
  variant,
  grown,
  onActivate,
  onDeactivate,
}: {
  entry: BentoWorkGridEntry;
  variant: 'tall' | 'short';
  grown: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const className = cx(styles.tile, variant === 'tall' ? styles.tall : styles.short);
  const body = (
    <div className={styles.cap}>
      <div className={styles.capT}>{entry.title}</div>
      <div className={styles.capD}>{entry.description}</div>
      {(entry.outcome || (entry.tags && entry.tags.length > 0)) && (
        <div className={styles.more}>
          <div className={styles.moreIn}>
            {entry.outcome && <p className={styles.outcome}>{entry.outcome}</p>}
            {entry.tags && entry.tags.length > 0 && (
              <div className={styles.tags}>
                {entry.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const shared = {
    className,
    'data-grown': grown ? 'true' : undefined,
    onPointerEnter: onActivate,
    onFocus: onActivate,
    onBlur: onDeactivate,
  };

  if (entry.href) {
    return (
      <Link {...shared} href={entry.href}>
        {body}
      </Link>
    );
  }
  /* plain card (no route yet); still focusable so keyboard users can
     read the revealed info */
  return (
    <div {...shared} tabIndex={0}>
      {body}
    </div>
  );
}
