/*
 * Gilroy via next/font/local. Import this module ONLY from a Next.js
 * app (root layout); it requires the Next compiler (transpilePackages
 * must include '@onegroup/shared'). It is deliberately kept out of the
 * package barrel so importing components never drags the font loader
 * into non-Next tooling.
 *
 * Usage in an app root layout:
 *
 *   import { gilroy, htmlClassName } from '@onegroup/shared/fonts';
 *   <html lang="en-GB" className={htmlClassName('onelaser')}>
 *
 * next/font emits real woff2 <link rel="preload"> tags; preload is on
 * for the family, so the bold weight the headline paints in is
 * preloaded (next/font cannot preload a single weight of a multi-src
 * family, so the regular weight is preloaded too; both files are
 * ~44 KB). font-display: swap. No base64 embedding anywhere.
 */
import localFont from 'next/font/local';

import type { Brand } from './types/brand';
import { brandClass } from './types/brand';

export const gilroy = localFont({
  src: [
    { path: '../fonts/Gilroy-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Gilroy-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-gilroy',
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

/**
 * Single class string for the <html> element: binds the --font-gilroy
 * variable, applies Gilroy as the element font, and scopes the brand's
 * token overrides from tokens.css.
 */
export function htmlClassName(brand: Brand): string {
  return `${gilroy.variable} ${gilroy.className} ${brandClass[brand]}`;
}
