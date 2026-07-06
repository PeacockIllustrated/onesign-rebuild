import { defineCaseStudy } from '@onegroup/shared';

/*
 * Tanglewood Equestrian, the OneDesign flagship (docs/v2-interactions.md).
 *
 * STRUCTURE ONLY. The documented facts are: all Tanglewood work to date
 * is design (12-page A4 brochure, A5/A3 leaflets, five-sign set, landing
 * page/website), and the brand system is orange #E65B2A, charcoal and
 * cream with Inter, EB Garamond and Trajan Pro. Everything narrative
 * below is clearly-marked placeholder and must be rewritten from the
 * Tanglewood project archive; nothing beyond the documented brand
 * system is asserted as fact.
 *
 * The v2 brand takeover IS wired: `brand` drives the scroll-adaptive
 * accent/display-font swap (accent contrast-checked at render, display
 * serif loaded via next/font, see components/caseDisplayFonts.ts).
 *
 * TODO (Tanglewood project archive, when supplied):
 * - iconSvg: add the Tanglewood mark { path, viewBox } to switch this
 *   study's title band to the ASCII icon hero; test the mark and set
 *   its cell size here in content (default 9, finer marks down to ~6).
 * - heroImage / moments: replace placeholders with archive photography.
 * - chapters, pullQuote, typeSamples: replace placeholder copy.
 * - palette: confirm exact charcoal and cream hex values.
 * - datePublished: set the real publish date (docs/seo-aeo.md).
 * - displayFont: EB Garamond stands in as the brand serif; if the
 *   Trajan Pro licence allows web embedding, swap the registry entry
 *   to local woff2 files from the archive.
 */
export const tanglewoodEquestrian = defineCaseStudy({
  kind: 'design',
  slug: 'tanglewood-equestrian',
  title: 'tanglewood equestrian',
  kicker: 'case study / brand & print', // TODO: confirm discipline framing with the project file
  sub: 'A full brand system carried across brochure, leaflets, a five-sign set and the web. Case study in progress; imagery and story to follow from the project archive.',
  client: 'Tanglewood Equestrian', // TODO: confirm client display name and location
  disciplines: 'brand identity, print, signage design, web',
  madeRealBy: 'OneSign', // TODO: confirm fabrication and install credits for the sign set
  year: '2026', // TODO: confirm project year
  // datePublished deliberately omitted until the real date is known (docs/seo-aeo.md)
  metaDescription:
    'Brand identity for Tanglewood Equestrian by OneDesign Studios: brochure, leaflets, five-sign set and website, all carried by one system of orange, charcoal and cream.',
  heroCaption: 'placeholder / swap for tanglewood archive photography',
  chapters: [
    {
      label: 'the brief',
      title: 'one system, everywhere it rides.',
      paragraphs: [
        // TODO: placeholder narrative; rewrite from the Tanglewood project archive
        'Placeholder copy. Tanglewood Equestrian needed a brand that could carry across everything it prints, hangs and publishes: a <b>12-page A4 brochure, A5 and A3 leaflets, a five-sign set and a landing page</b>, all speaking with one voice.',
        'Placeholder copy. This chapter will tell the story of the brief once the archive copy is in; the palette and type system on this page are the real ones.',
      ],
    },
    {
      label: 'the system',
      title: 'orange, charcoal, cream.',
      paragraphs: [
        // TODO: placeholder narrative; rewrite from the Tanglewood project archive
        'Placeholder copy. The system runs on three colours, <b>orange, charcoal and cream</b>, with a type stack of Inter for working text, EB Garamond for the warmth and Trajan Pro for the moments that need ceremony.',
        'Placeholder copy. How the system flexes from a brochure spread to a gateway sign will be told here, with the archive artwork alongside.',
      ],
    },
  ],
  pullQuote: {
    // TODO: replace with a verified quote from the Tanglewood archive
    text: '"Placeholder pull quote, to be replaced with words from the Tanglewood project archive."',
    accent: 'to be replaced',
    attribution: 'placeholder attribution, pending archive',
  },
  moments: [
    { caption: 'placeholder / 12-page a4 brochure spreads', variant: 'default' },
    { caption: 'placeholder / a5 & a3 leaflets', variant: 'default' },
    { caption: 'placeholder / five-sign set in situ', variant: 'dark' },
  ],
  palette: {
    p1: { name: 'charcoal', hex: '#26262B' }, // TODO: confirm exact charcoal hex from the archive
    p2: { name: 'tanglewood orange', hex: '#E65B2A' },
    p3: { name: 'cream', hex: '#F3EDE2' }, // TODO: confirm exact cream hex from the archive
  },
  systemTitle: 'three colours, one voice.',
  typeSamples: [
    {
      text: 'Tanglewood Equestrian.', // TODO: replace with an approved display sample from the archive
      caption: 'display / brand serif, placeholder sample',
      style: 'display',
    },
    {
      text: 'Placeholder voice sample, to be drawn from the Tanglewood brand guidelines.', // TODO
      caption: 'voice / placeholder, pending archive',
      style: 'voice',
    },
  ],
  madeReal: {
    title: 'then we walked it downstairs.',
    // TODO: confirm fabrication story and credits before publishing
    text: 'The five-sign set was designed to be made, not just approved. Fabrication and installation detail to follow from the project archive, alongside the print production story.',
    chips: ['five-sign set', 'brochure & print suite'],
  },
  nextProject: { slug: 'dirty-murphys', title: "dirty murphy's" },
  /* v2 scroll-adaptive brand takeover: documented brand system only */
  brand: {
    accent: '#E65B2A',
    displayFont: 'tanglewood-serif',
    palette: { p1: '#26262B', p2: '#E65B2A', p3: '#F3EDE2' }, // TODO: confirm charcoal and cream hex
  },
  /* iconSvg intentionally absent: the ASCII icon hero switches on once
     the Tanglewood mark arrives from the archive (see TODO above) */
});
