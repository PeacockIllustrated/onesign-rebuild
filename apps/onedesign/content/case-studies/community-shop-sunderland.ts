import { defineCaseStudy } from '@onegroup/shared';

/*
 * Community Shop, Sunderland. Named as a real seeded project in
 * docs/brand-briefs.md (landing card: environmental graphics,
 * wayfinding, interior scheme). No reference copy exists for the full
 * case study, so this is written in voice; anything that implies
 * unverified project fact carries a TODO.
 */
export const communityShopSunderland = defineCaseStudy({
  kind: 'design',
  slug: 'community-shop-sunderland',
  title: 'community shop, sunderland',
  kicker: 'case study / environmental graphics',
  sub: 'Environmental graphics, wayfinding and a full interior scheme for a shop that belongs to its neighbourhood, not to a head office.',
  client: 'Community Shop, Sunderland', // TODO: confirm client display name with the project file
  disciplines: 'environmental graphics, wayfinding, interior scheme',
  madeRealBy: 'OneSign',
  year: '2026', // TODO: confirm project year
  datePublished: '2026-05-18', // TODO: confirm real publish date (docs/seo-aeo.md requires real dates)
  metaDescription:
    'Environmental graphics, wayfinding and interior scheme for Community Shop, Sunderland. A retail space designed to feel like a welcome, made real by OneSign.',
  heroCaption: 'interior scheme on spruce green / swap for install photography',
  chapters: [
    {
      label: 'the challenge',
      title: 'a shop that had to feel like a welcome.',
      paragraphs: [
        'A community shop lives or dies on how it makes people feel the moment they walk in. The brief was an interior that worked as hard as a supermarket but read nothing like one: <b>warm, legible and generous</b>, with no whiff of the institutional.',
        'The space itself was honest and big. The graphics had to bring it down to a human scale, guide people through it without a single barked instruction, and hold together across walls, bays, shelving and windows.', // TODO: confirm scope of surfaces covered
      ],
    },
    {
      label: 'the idea',
      title: 'signage that speaks like a neighbour.',
      paragraphs: [
        'We wrote the scheme before we drew it. Every sign in the building says what a helpful neighbour would say, in the order they would say it, and the design serves that voice: <b>big friendly type, warm colour, nothing shouting</b>.',
        'Wayfinding runs on colour and plain words rather than icons and arrows alone, so the store can be read at a glance from the door. The same system scales from the fascia to a shelf-edge label without changing character.',
      ],
    },
  ],
  pullQuote: {
    text: '"The scheme turned a big retail shed into somewhere you would happily spend your morning."',
    accent: 'happily spend your morning',
    attribution: 'from the handover notes, One Group', // TODO: replace with a verified client quote
  },
  moments: [
    { caption: 'image placeholder / entrance graphics & welcome wall', variant: 'default' },
    { caption: 'placeholder / aisle wayfinding & department headers', variant: 'default' },
    { caption: 'placeholder / window scheme at dusk', variant: 'dark' },
  ],
  // TODO: confirm palette names and hex values against the project files
  palette: {
    p1: { name: 'spruce green', hex: '#22403F' },
    p2: { name: 'grain yellow', hex: '#D9A13B' },
    p3: { name: 'flour white', hex: '#F2EEE3' },
  },
  systemTitle: 'warm words, working walls.',
  typeSamples: [
    {
      text: 'Good food, close to home.',
      caption: 'display / generous and open, set big on walls',
      style: 'display',
    },
    {
      text: 'Fresh in this morning. Ask us what is good today, we will tell you straight.',
      caption: 'voice / the neighbour speaks, the signage listens',
      style: 'voice',
    },
  ],
  madeReal: {
    title: 'then we walked it downstairs.',
    text: 'The approved scheme went straight to the factory floor. OneSign printed, fabricated and installed the full graphics package, so the colour on the wall matches the colour in the deck, to the millimetre.',
    chips: ['fabricated by OneSign', 'installed by OneSign'],
  },
  nextProject: { slug: 'dirty-murphys', title: "dirty murphy's" },
});
