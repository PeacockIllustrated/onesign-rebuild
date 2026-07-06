import Link from 'next/link';
import type { ReactNode } from 'react';

import { cx } from '../lib/cx';
import { Button } from './Button';
import styles from './Nav.module.css';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavProps {
  /** Lowercase wordmark, e.g. 'onelaser' or 'onedesign'. */
  logoText: string;
  /** Content of the circular mark; defaults to '1'. */
  logoMark?: ReactNode;
  logoHref?: string;
  /** Landing nav links (hidden under 760px, as in the references). */
  links?: NavLinkItem[];
  /** Small solid CTA on the right (.cta-sm cut). */
  cta?: NavLinkItem;
  /** Case-study back link, e.g. { label: 'all recent cuts', href: '/recent-cuts' }. */
  back?: NavLinkItem;
  /** 'dark' = OneLaser chrome, 'light' = OneDesign chrome. */
  tone?: 'dark' | 'light';
}

export function Nav({
  logoText,
  logoMark = '1',
  logoHref = '/',
  links,
  cta,
  back,
  tone = 'dark',
}: NavProps) {
  return (
    <nav className={cx(styles.nav, tone === 'dark' ? styles.dark : styles.light)}>
      <Link href={logoHref} className={styles.logo}>
        <span className={styles.mark} aria-hidden="true">
          {logoMark}
        </span>
        {logoText}
      </Link>
      {links && links.length > 0 && (
        <div className={styles.links}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
      {back && (
        <Link href={back.href} className={styles.back}>
          &larr; {back.label}
        </Link>
      )}
      {cta && (
        <Button href={cta.href} size="sm">
          {cta.label}
        </Button>
      )}
    </nav>
  );
}
