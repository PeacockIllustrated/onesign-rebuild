import Link from 'next/link';

import { Container } from '@onegroup/shared';

import styles from './WorkGrid.module.css';

export interface WorkGridEntry {
  title: string;
  description: string;
  /** Case study route; entries without one render as a plain card. */
  href?: string;
}

export interface WorkGridProps {
  /** First entry takes the tall left slot; the rest stack right. */
  entries: WorkGridEntry[];
}

/* Asymmetric work grid from the reference landing: tall card left,
   stacked short cards right. Teal gradient placeholders stand in for
   project photography (docs/brand-briefs.md, shared photography
   direction). */
export function WorkGrid({ entries }: WorkGridProps) {
  const [tall, ...shorts] = entries;
  if (!tall) return null;
  return (
    <Container as="section" className={styles.work}>
      <Card entry={tall} variant="tall" />
      <div className={styles.stack}>
        {shorts.map((entry) => (
          <Card key={entry.title} entry={entry} variant="short" />
        ))}
      </div>
    </Container>
  );
}

function Card({ entry, variant }: { entry: WorkGridEntry; variant: 'tall' | 'short' }) {
  const className = variant === 'short' ? `${styles.proj} ${styles.short}` : styles.proj;
  const body = (
    <>
      <div className={styles.ph} aria-hidden="true" />
      <div className={styles.cap}>
        <div className={styles.capT}>{entry.title}</div>
        <div className={styles.capD}>{entry.description}</div>
      </div>
    </>
  );
  if (entry.href) {
    return (
      <Link className={className} href={entry.href}>
        {body}
      </Link>
    );
  }
  return <div className={className}>{body}</div>;
}
