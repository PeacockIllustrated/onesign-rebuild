import type { ReactNode } from 'react';

import { Container } from '@onegroup/shared';

import styles from './PageHead.module.css';

/*
 * Page-level head for subpages: identical visual to the shared
 * SectionHead but renders an h1, because every page needs exactly one
 * h1 (docs/seo-aeo.md) and the shared SectionHead is fixed at h2 for
 * in-page sections. Styles mirror SectionHead.module.css from
 * packages/shared; keep them in sync if the shared component changes.
 */

export interface PageHeadProps {
  /** Eyebrow label, e.g. 'capabilities'. */
  label: string;
  /** Lowercase sentence-case page heading. */
  title: ReactNode;
  /** Optional standfirst paragraph under the heading. */
  text?: ReactNode;
  /** Anchor id for in-page nav links. */
  id?: string;
}

export function PageHead({ label, title, text, id }: PageHeadProps) {
  return (
    <Container as="section" id={id} className={styles.shead}>
      <div>
        <div className={styles.lab}>{label}</div>
        <h1 className={styles.title}>{title}</h1>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </Container>
  );
}
