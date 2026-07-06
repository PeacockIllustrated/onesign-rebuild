import { defineCaseStudy } from '@onegroup/shared';

/*
 * Job 1147, architectural fin set. Derived from the worked example in
 * reference/laser-case.html; all copy and data reused verbatim.
 */
export const architecturalFinSet = defineCaseStudy({
  kind: 'laser',
  slug: 'architectural-fin-set',
  jobNumber: '1147',
  title: '96 architectural fins,\none sheet at a time.',
  client: 'for a commercial facade contractor, Newcastle upon Tyne',
  // TODO: confirm the real publication date before launch (Article JSON-LD needs it).
  datePublished: '2026-06-02',
  metaDescription:
    '96 stainless architectural fins cut on a 3kW fibre laser: 0.06 mm measured variance across the batch, every part fitted without rework, DXF to delivery in 6 days.',
  specPlate: [
    { label: 'material', value: '316 stainless' },
    { label: 'thickness', value: '3 mm' },
    { label: 'quantity', value: '96 parts' },
    { label: 'tolerance', value: '±0.1 mm' },
    { label: 'finish', value: 'brushed, PPC' },
    { label: 'lead time', value: '6 days' },
  ],
  heroCaption: '96 fins / brushed 316 / swap for site photography',
  sections: [
    {
      label: 'the brief',
      title: 'identical, or the facade fails.',
      paragraphs: [
        'Ninety-six vertical fins for a commercial facade, every one visible against its neighbour. Any variation in width or hole position would telegraph straight down the run, so <b>repeatability mattered more than speed</b>. The contractor supplied a single DXF and a hard site date.',
        'We quoted from the true cut path the same morning: 96 parts, three sheets of 3 mm 316, fixings pre-cut so nothing needed drilling on site.',
      ],
    },
    {
      label: 'the cut',
      title: 'nested for grain, cut for the eye.',
      paragraphs: [
        'Brushed stainless has a direction. All 96 fins were nested with the grain running the same way, so the finished facade reads as one surface rather than a patchwork. Micro-tabs held each part flat through the cut, and lead-ins were placed on the concealed edge.',
      ],
      showParameters: true,
      images: [
        { caption: 'nest layout / sheet 2 of 3' },
        { caption: 'edge detail / as-cut, pre-brush', variant: 'alt' },
      ],
    },
    {
      label: 'the finish',
      title: 'off the bed, onto the wall.',
      paragraphs: [
        'Every part was deburred and re-brushed in house, then polyester powder coated on the reverse face only, leaving the visible face in raw brushed 316. Parts shipped in numbered site order so the fitting team pulled them off the stillage in sequence.',
      ],
    },
  ],
  parameters: [
    { parameter: 'cut length per part', value: '2.84 m' },
    { parameter: 'pierces per part', value: '7' },
    { parameter: 'kerf', value: '0.18 mm' },
    { parameter: 'sheet utilisation', value: '91%' },
    { parameter: 'measured variance across batch', value: '0.06 mm' },
  ],
  verdict: {
    quote:
      'Every fin dropped onto its fixings first time. We did not adjust a single bracket across the whole elevation, which on a job this visible is the difference between a good week and a bad month.',
    attribution: 'site manager, facade contractor',
  },
  proofStats: [
    { value: '96/96', label: 'parts fitted without rework' },
    { value: '0.06 mm', label: 'measured variance across the batch' },
    { value: '6 days', label: 'DXF received to delivery' },
  ],
  materials: ['316 stainless'],
  card: {
    title: 'architectural fin set',
    meta: 'JOB 1147 / 96 parts',
    tag: '316 stainless / 3 mm',
  },
});
