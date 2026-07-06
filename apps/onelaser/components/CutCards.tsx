import Link from 'next/link';

import { Container } from '@onegroup/shared';

import styles from './CutCards.module.css';

export interface CutCardItem {
  title: string;
  meta: string;
  tag: string;
  href: string;
}

/** Recent cuts card grid; items come from typed case study content. */
export function CutCards({ items }: { items: CutCardItem[] }) {
  return (
    <Container as="section">
      <div className={styles.cuts}>
        {items.map((c) => (
          <Link className={styles.cut} href={c.href} key={c.title}>
            <div className={styles.ph}>
              <span>{c.tag}</span>
            </div>
            <div className={styles.bd}>
              <div>
                <h3>{c.title}</h3>
                <div className={styles.m}>{c.meta}</div>
              </div>
              <span className={styles.go} aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
