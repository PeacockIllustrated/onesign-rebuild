import { defineCaseStudy } from '@onegroup/shared';

/*
 * Job 1152, illuminated tray panels. Seeded from the recent-cuts card
 * in reference/laser-landing.html (JOB 1152 / 40 parts / 5083
 * aluminium / 5 mm); the narrative and figures below are written for
 * this build and are plausible for the job, not sourced from a real
 * job sheet. Every invented number carries a TODO.
 *
 * Cross-brand note (docs/seo-aeo.md): shared projects get one
 * perspective per site. This page tells the fabrication story only;
 * the finished signage story belongs to OneSign.
 */
export const illuminatedTrayPanels = defineCaseStudy({
  kind: 'laser',
  slug: 'illuminated-tray-panels',
  jobNumber: '1152',
  title: '40 tray panels,\nevery aperture true.',
  client: 'for a retail fit-out contractor, Leeds', // TODO: confirm client description
  // TODO: confirm the real publication date before launch (Article JSON-LD needs it).
  datePublished: '2026-06-18',
  metaDescription:
    '40 illuminated tray panels profiled in 5 mm 5083 aluminium: letter apertures cut to ±0.1 mm so the push-through acrylic seated first time, DXF to delivery in 4 days.',
  specPlate: [
    { label: 'material', value: '5083 aluminium' },
    { label: 'thickness', value: '5 mm' },
    { label: 'quantity', value: '40 parts' },
    { label: 'tolerance', value: '±0.1 mm' },
    // TODO: confirm finish spec with the job sheet
    { label: 'finish', value: 'PPC matt black' },
    // TODO: confirm lead time with the job sheet
    { label: 'lead time', value: '4 days' },
  ],
  heroCaption: '40 trays / 5083 aluminium / swap for workshop photography',
  sections: [
    {
      label: 'the brief',
      title: 'light through metal, no shadows.',
      paragraphs: [
        'Forty illuminated tray panels for a retail rollout, each face cut with letter apertures for push-through acrylic. An aperture a fraction oversize shows a halo of stray light; a fraction undersize and the acrylic will not seat. <b>The letters had to be right before the trays ever saw an LED.</b>',
        'The contractor sent one DXF per fascia size. We checked aperture radii against the acrylic spec, flagged two corners that were too tight to seat cleanly, and had corrected files agreed by the end of the day.',
      ],
    },
    {
      label: 'the cut',
      title: 'forty faces, one setting.',
      paragraphs: [
        'All 40 faces ran as a single programme across five sheets, so every aperture was cut with the same parameters and the same kerf compensation. Lead-ins were placed inside the waste, and micro-tabs kept the thin webs between letters flat through the cut. Fold lines for the returns were etched in the same pass.',
      ],
      showParameters: true,
      images: [
        { caption: 'aperture detail / as-cut, pre-coat', variant: 'alt' },
        { caption: 'folded tray / first article check' },
      ],
    },
    {
      label: 'the finish',
      title: 'folded, coated, ready to light.',
      paragraphs: [
        'Trays were folded and stitch-welded in house, then polyester powder coated matt black inside and out. The finished trays went straight upstairs to Onesign & Digital for acrylic, LEDs and installation; one floor, no couriers, no waiting on a third party.',
      ],
    },
  ],
  parameters: [
    // TODO: parameters below are plausible for 5 mm 5083 on a 3kW fibre
    // laser but are not sourced from a real job sheet; replace with
    // machine data before publishing.
    { parameter: 'cut length per part', value: '6.2 m' },
    { parameter: 'pierces per part', value: '31' },
    { parameter: 'kerf', value: '0.22 mm' },
    { parameter: 'sheet utilisation', value: '84%' },
    { parameter: 'measured variance across batch', value: '0.08 mm' },
  ],
  verdict: {
    // TODO: unverified client quote; replace with a real one before publishing.
    quote:
      'The acrylic seated first time on every tray. Forty panels went from van to wall in two days and we never once reached for a file.',
    attribution: 'project manager, retail fit-out contractor',
  },
  proofStats: [
    // TODO: proof figures are invented pending the real job sheet.
    { value: '40/40', label: 'apertures seated the acrylic first time' },
    { value: '0.08 mm', label: 'measured variance across the batch' },
    { value: '4 days', label: 'DXF received to delivery' },
  ],
  materials: ['5083 aluminium'],
  card: {
    title: 'illuminated tray panels',
    meta: 'JOB 1152 / 40 parts',
    tag: '5083 aluminium / 5 mm',
  },
});
