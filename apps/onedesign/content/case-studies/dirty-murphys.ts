import { defineCaseStudy } from '@onegroup/shared';

/*
 * Dirty Murphy's. Copy and palette taken verbatim from the approved
 * worked example in reference/design-case.html (the palette is also the
 * --p1/--p2/--p3 example in docs/tokens.md).
 */
export const dirtyMurphys = defineCaseStudy({
  kind: 'design',
  slug: 'dirty-murphys',
  title: "dirty murphy's",
  kicker: 'case study / identity & fascia',
  sub: 'An Irish bar with attitude, given a brand with the patina to match, and a fascia in aged brass to prove it.',
  client: "Dirty Murphy's, Newcastle",
  disciplines: 'identity, signage design',
  madeRealBy: 'OneSign & OneLaser',
  year: '2026',
  datePublished: '2026-03-02', // TODO: confirm real publish date (docs/seo-aeo.md requires real dates)
  metaDescription:
    "Brand identity and aged brass fascia for Dirty Murphy's, Newcastle. A new bar given instant character in real material, designed by OneDesign and made real by OneSign and OneLaser.",
  heroCaption: 'aged brass on bottle green / swap for dusk photography',
  chapters: [
    {
      label: 'the challenge',
      title: 'new bar, old soul.',
      paragraphs: [
        'Newcastle city centre does not need another Irish bar. It needed this one to feel like it had been there for eighty years by opening night. The brief was a brand that arrived <b>pre-weathered</b>: confident, a bit rough round the edges, and impossible to mistake for a chain.',
        'The trap with instant heritage is pastiche. Shamrocks, Celtic knots and distressed textures would have made it a themed bar rather than a local. We went looking for something with more truth in it.',
      ],
    },
    {
      label: 'the idea',
      title: 'let the material do the talking.',
      paragraphs: [
        'The concept came from the fabrication floor, not the sketchbook. Aged brass develops its own patina, unevenly, honestly, over years. So instead of designing fake age into the artwork, we designed a system that would <b>earn its character in real material</b>: a stripped-back letterform with weight and warmth, set in brass that starts rich and only gets better.',
        'The identity holds back everywhere else so the fascia can lead. One typeface, two colours, and a voice that sounds like the landlord, not the marketing team.',
      ],
    },
  ],
  pullQuote: {
    text: '"The kind of finish that brings character from day one and instantly belongs on the busy streets of Newcastle."',
    accent: 'instantly belongs',
    attribution: 'from the installation notes, One Group',
  },
  moments: [
    { caption: 'image placeholder / lettering detail, patina close-up', variant: 'default' },
    { caption: 'placeholder / menu & print collateral', variant: 'default' },
    { caption: 'placeholder / interior wall scheme', variant: 'dark' },
  ],
  palette: {
    p1: { name: 'bottle green', hex: '#0F1B14' },
    p2: { name: 'aged brass', hex: '#B8935A' },
    p3: { name: 'old cream', hex: '#E9E2D2' },
  },
  systemTitle: 'small palette, big character.',
  typeSamples: [
    {
      text: "Murphy's, since always.",
      caption: 'display / heavyweight grotesque, tight and warm',
      style: 'display',
    },
    {
      text: 'Pints poured properly. Doors open late. Manners optional, craic mandatory.',
      caption: 'voice / the landlord speaks, the brand does not',
      style: 'voice',
    },
  ],
  madeReal: {
    title: 'then we walked it downstairs.',
    text: 'The approved concept went straight to our sister companies. OneLaser profiled the brass letterforms, OneSign built and installed the fascia. Nothing was lost in handover, because there was no handover.',
    chips: ['cut by OneLaser', 'installed by OneSign'],
  },
  nextProject: { slug: 'community-shop-sunderland', title: 'community shop, sunderland' },
});
