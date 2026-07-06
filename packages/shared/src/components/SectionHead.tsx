import Link from 'next/link';
import type { ReactNode } from 'react';

import { cx } from '../lib/cx';
import { Container } from './Container';
import type { ContainerWidth } from './Container';
import styles from './SectionHead.module.css';

export interface SectionHeadProps {
  /** Eyebrow label, e.g. 'process' or 'recent cuts'. */
  label: string;
  /** Lowercase sentence-case heading, e.g. 'drawing to delivery, four steps.' */
  title: ReactNode;
  /** Optional standfirst paragraph under the heading. */
  text?: ReactNode;
  /** Optional right-aligned action link (OneDesign work grid pattern). */
  action?: { label: string; href: string };
  /** Anchor id for in-page nav links. */
  id?: string;
  /** Container width; defaults to the 1160px site container. */
  width?: ContainerWidth;
  className?: string;
}

export function SectionHead({
  label,
  title,
  text,
  action,
  id,
  width = 'site',
  className,
}: SectionHeadProps) {
  return (
    <Container
      as="section"
      width={width}
      id={id}
      className={cx(styles.shead, action && styles.withAction, className)}
    >
      <div>
        <div className={styles.lab}>{label}</div>
        <h2 className={styles.title}>{title}</h2>
        {text && <p className={styles.text}>{text}</p>}
      </div>
      {action && (
        <Link href={action.href} className={styles.action}>
          {action.label}
        </Link>
      )}
    </Container>
  );
}
