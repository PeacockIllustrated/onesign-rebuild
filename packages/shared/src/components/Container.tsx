import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import { cx } from '../lib/cx';
import styles from './Container.module.css';

export type ContainerWidth = 'site' | 'case' | 'narrative';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * 'site' = 1160px (landing), 'case' = 1060px (case studies),
   * 'narrative' = 680px (editorial column). All pad 0 26px.
   */
  width?: ContainerWidth;
  /** Rendered element, defaults to div. */
  as?: ElementType;
  children?: ReactNode;
}

export function Container({
  width = 'site',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cx(styles.base, styles[width], className)} {...rest}>
      {children}
    </Tag>
  );
}
