'use client';

/*
 * Scroll-adaptive brand takeover driver (docs/v2-interactions.md,
 * OneDesign). Rendered at the narrative start of a case study that
 * carries a brand block; it observes its own zero-height sentinel with
 * an IntersectionObserver and, once the narrative start rises into the
 * upper part of the viewport, stamps data-case-takeover="on" onto
 * <body> together with the takeover custom properties. Scrolling back
 * above the threshold reverts to OneDesign chrome.
 *
 * The actual restyle lives in CSS (app/globals.css): the body attribute
 * swaps --teal/--teal-bright/--teal-deep and --case-display, and the
 * registered @property transitions carry the colour change over ~600ms
 * (instant under prefers-reduced-motion). Only colour and display type
 * change; layout and spacing are untouched, and body text stays Gilroy.
 *
 * Static-first: without JS the page simply keeps OneDesign chrome.
 * The accent passed here has already been contrast-checked on the
 * server (lib/takeover.ts); when the check failed this component is
 * given no accent and leaves the colour variables alone (OneDesign
 * teal), applying only the display font.
 */

import { useEffect, useRef } from 'react';

export interface BrandTakeoverProps {
  /** Contrast-validated accent hex; omit to keep OneDesign teal. */
  accent?: string;
  /** Resolved display font-family list; omit to keep Gilroy headings. */
  displayFontFamily?: string;
}

export function BrandTakeover({ accent, displayFontFamily }: BrandTakeoverProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sentinel = ref.current;
    if (!sentinel) return;
    if (!accent && !displayFontFamily) return;

    const body = document.body;
    if (accent) body.style.setProperty('--takeover-accent', accent);
    if (displayFontFamily) body.style.setProperty('--takeover-display', displayFontFamily);

    /* On when the narrative start has risen into the top ~45% of the
       viewport (or is already above it); off again when the reader
       scrolls back above that threshold. */
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        const on = entry.isIntersecting || entry.boundingClientRect.top < 0;
        if (on) body.setAttribute('data-case-takeover', 'on');
        else body.removeAttribute('data-case-takeover');
      },
      { rootMargin: '0px 0px -55% 0px' },
    );
    io.observe(sentinel);

    return () => {
      io.disconnect();
      body.removeAttribute('data-case-takeover');
      body.style.removeProperty('--takeover-accent');
      body.style.removeProperty('--takeover-display');
    };
  }, [accent, displayFontFamily]);

  /* zero-size sentinel marking the narrative start; purely mechanical */
  return <span ref={ref} aria-hidden="true" />;
}
