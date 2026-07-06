import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cx } from '../lib/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

interface ButtonCommonProps {
  /** 'primary' solid, 'ghost' secondary (outline on OneLaser, soft wash on OneDesign). */
  variant?: ButtonVariant;
  /** 'sm' is the nav CTA cut (.cta-sm in the references). */
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export type ButtonLinkProps = ButtonCommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
  };

export type ButtonButtonProps = ButtonCommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

export type ButtonProps = ButtonLinkProps | ButtonButtonProps;

export function Button(props: ButtonProps) {
  const cls = cx(
    styles.btn,
    props.variant === 'ghost' && styles.ghost,
    props.size === 'sm' && styles.sm,
    props.className,
  );

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children, href, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
