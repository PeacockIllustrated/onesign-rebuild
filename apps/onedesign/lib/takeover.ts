/*
 * Scroll-adaptive brand takeover: accent contrast guardrail
 * (docs/v2-interactions.md, OneDesign). Pure functions, safe on the
 * server; the check runs at render time so the guardrail holds even
 * before any client JS loads.
 *
 * Rule: the takeover accent is used as coloured display text and UI
 * accent on BOTH the light page body and the dark bands (title band,
 * made-real strip). It must reach WCAG 3:1 (the large-text / UI
 * component threshold; every accent use in the template is >=18.5px
 * bold or a non-text accent) against both grounds, or the takeover
 * falls back to OneDesign teal.
 */

/** OneDesign light page ground (--paper, docs/tokens.md). */
const LIGHT_GROUND = '#FDFDFC';
/** OneDesign dark band ground (--hero-bg; --nav #12191A is near-identical). */
const DARK_GROUND = '#10181A';
/** Minimum WCAG contrast ratio for the accent against each ground. */
const MIN_RATIO = 3;

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m || !m[1]) return null;
  let h = m[1];
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** WCAG 2.x relative luminance. */
function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two hex colours; 1 when either is unparseable. */
export function contrastRatio(a: string, b: string): number {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  if (!ra || !rb) return 1;
  const la = luminance(ra);
  const lb = luminance(rb);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Validate a takeover accent against both grounds. Returns the accent
 * when it passes, or null (meaning: fall back to OneDesign teal, i.e.
 * do not override the colour variables at all).
 */
export function resolveTakeoverAccent(accent: string): string | null {
  const passesLight = contrastRatio(accent, LIGHT_GROUND) >= MIN_RATIO;
  const passesDark = contrastRatio(accent, DARK_GROUND) >= MIN_RATIO;
  return passesLight && passesDark ? accent : null;
}
