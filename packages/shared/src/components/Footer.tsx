import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from './Container';
import styles from './Footer.module.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  /** Uppercased column heading, e.g. 'site', 'our group', 'contact'. */
  heading: string;
  /** Linked entries. */
  links?: FooterLink[];
  /** Plain-text lines (address, phone). */
  lines?: string[];
}

interface FooterFullProps {
  variant?: 'full';
  /** Lowercase wordmark, e.g. 'onelaser'. */
  logoText: string;
  logoMark?: ReactNode;
  /** Short brand paragraph under the logo. */
  description?: string;
  /** Brand domain line, e.g. 'onelasercutting.com'. */
  url?: string;
  columns?: FooterColumn[];
  /** Left side of the bottom note row; cross-link copy is passed in by the app. */
  note?: ReactNode;
  /** Right side of the bottom note row (privacy, terms). */
  noteLinks?: FooterLink[];
}

interface FooterSlimProps {
  /** Case-study cut: one row, left and right content passed in whole. */
  variant: 'slim';
  /** e.g. '© 2026 One Group / onelasercutting.com' */
  left: ReactNode;
  /** e.g. the cross-link sentence with its anchor */
  right?: ReactNode;
}

export type FooterProps = FooterFullProps | FooterSlimProps;

export function Footer(props: FooterProps) {
  if (props.variant === 'slim') {
    return (
      <footer className={styles.slim}>
        <span>{props.left}</span>
        {props.right !== undefined && <span>{props.right}</span>}
      </footer>
    );
  }

  const { logoText, logoMark = '1', description, url, columns, note, noteLinks } = props;
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.fgrid}>
          <div className={styles.col}>
            <div className={styles.logo}>
              <span className={styles.mark} aria-hidden="true">
                {logoMark}
              </span>
              {logoText}
            </div>
            {description && <p className={styles.desc}>{description}</p>}
            {url && <div className={styles.url}>{url}</div>}
          </div>
          {columns?.map((col) => (
            <div className={styles.col} key={col.heading}>
              <h5>{col.heading}</h5>
              {col.links?.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
              {col.lines?.map((line) => <p key={line}>{line}</p>)}
            </div>
          ))}
        </div>
        {(note !== undefined || (noteLinks && noteLinks.length > 0)) && (
          <div className={styles.fnote}>
            <span>{note}</span>
            {noteLinks && noteLinks.length > 0 && (
              <span className={styles.fnoteLinks}>
                {noteLinks.map((l) => (
                  <Link key={l.href + l.label} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </span>
            )}
          </div>
        )}
      </Container>
    </footer>
  );
}
