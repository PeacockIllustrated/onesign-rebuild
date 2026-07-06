/*
 * Per-case-study display fonts for the scroll-adaptive brand takeover
 * (docs/v2-interactions.md). CaseBrandTakeover.displayFont is a key
 * into this registry; the app, not the content file, owns the actual
 * next/font loading (next/font calls must be static, at module scope).
 *
 * Guardrail: these fonts are DISPLAY type only. Body text stays Gilroy;
 * the takeover CSS applies --case-display to headings and the pull
 * quote and nothing else.
 *
 * next/font requirements: called at module scope with literal options.
 * preload is off; a takeover font is below-the-fold enhancement and
 * must never compete with Gilroy for the LCP headline.
 */
import { EB_Garamond } from 'next/font/google';

/*
 * Tanglewood Equestrian brand serif. The documented brand type stack is
 * Inter / EB Garamond / Trajan Pro (docs/v2-interactions.md); EB Garamond
 * is the serif of that set that is openly licensed, so it carries the
 * takeover display voice.
 * TODO: Trajan Pro is a commercial face; if the client licence allows
 * web embedding, swap this to next/font/local woff2 files from the
 * Tanglewood project archive.
 */
const tanglewoodSerif = EB_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal'],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export interface CaseDisplayFont {
  /** Resolved font-family list (next/font internal name + fallbacks). */
  family: string;
}

const registry: Record<string, CaseDisplayFont> = {
  'tanglewood-serif': { family: tanglewoodSerif.style.fontFamily },
};

/** Look up a takeover display font by content key; undefined keeps Gilroy. */
export function getCaseDisplayFont(key: string | undefined): CaseDisplayFont | undefined {
  return key ? registry[key] : undefined;
}
