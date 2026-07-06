import { defineCaseStudy } from '@onegroup/shared';

/*
 * Flagship: Specialty Services (docs/v2-interactions.md).
 *
 * STRUCTURE ONLY. The journey to the final piece in situ:
 *   1. the finished piece in place (the cut-and-build hero + 'in situ')
 *   2. the technical drawing stage
 *   3. manufacture thinking and process
 *   4. cut stats in the spec plate and parameter table
 *
 * Content and imagery from the Specialty Services job are still to be
 * supplied. Every user-facing placeholder below is deliberately
 * conspicuous ('TBC', bracketed notes) and carries a TODO; no
 * client-specific measured data has been invented. This page must not
 * go live until the placeholders are replaced.
 */
export const specialtyServices = defineCaseStudy({
  kind: 'laser',
  slug: 'specialty-services',
  // TODO: real job number from the Specialty Services job sheet.
  jobNumber: 'TBC',
  title: 'the specialty services piece,\ndrawing to in situ.',
  // TODO: confirm client description and location wording.
  client: 'for Specialty Services',
  // datePublished deliberately omitted until the write-up is real.
  // TODO: set the real publication date (Article JSON-LD needs it, docs/seo-aeo.md).
  metaDescription:
    'Flagship OneLaser case study: the Specialty Services piece followed backwards from the finished piece in place to the technical drawing, the manufacture thinking and the cut. Full write-up to follow.',
  specPlate: [
    // TODO: all six cells from the Specialty Services job sheet.
    { label: 'material', value: 'TBC' },
    { label: 'thickness', value: 'TBC' },
    { label: 'quantity', value: 'TBC' },
    { label: 'tolerance', value: 'TBC' },
    { label: 'finish', value: 'TBC' },
    { label: 'lead time', value: 'TBC' },
  ],
  heroCaption: 'placeholder profile / swap for the supplied project profile and photography',
  /*
   * v2 automated cut-and-build hero. The beam traces this profile,
   * cuts it, then the part lifts and folds up in 3D.
   * TODO: replace with the real Specialty Services profile (derived
   * from the job DXF, outer contour plus fixings), and choose the
   * assembly mode that matches the finished form. 'fold' preferred
   * for weight; set 'extrude' only if the piece needs true 3D.
   */
  profileSvg: {
    path: 'M14 8 H226 L232 14 V106 L226 112 H14 L8 106 V14 Z M52 52 a8 8 0 1 0 -16 0 a8 8 0 1 0 16 0 M204 52 a8 8 0 1 0 -16 0 a8 8 0 1 0 16 0 M96 48 h48 v8 h-48 Z',
    viewBox: '0 0 240 120',
    assembly: 'fold',
  },
  sections: [
    {
      label: 'in situ',
      title: 'the piece in place.',
      paragraphs: [
        'The journey runs backwards on purpose. This is the finished piece where it lives, doing the job it was cut for; everything below is how it got there.',
        // TODO: replace with the real story of the finished piece from
        // the Specialty Services job: what it is, where it sits, what
        // it had to survive.
        '[Placeholder: what the piece is, where it sits and what it does, from the Specialty Services brief.]',
      ],
      images: [
        // TODO: supplied photography of the piece in situ.
        { caption: 'in situ / awaiting supplied photography' },
        { caption: 'detail in place / awaiting supplied photography', variant: 'alt' },
      ],
    },
    {
      label: 'the drawing',
      title: 'it starts as a technical drawing.',
      paragraphs: [
        // TODO: replace with the real drawing stage: what was supplied,
        // what we corrected, how the cut path was derived.
        '[Placeholder: the technical drawing stage. What arrived, what was checked, and how the drawing became a cut path.]',
      ],
      images: [
        // TODO: supplied drawing and derived cut path artwork.
        { caption: 'technical drawing / awaiting supplied artwork', variant: 'alt' },
        { caption: 'cut path / derived from the drawing', variant: 'dark' },
      ],
    },
    {
      label: 'the thinking',
      title: 'manufacture decided before the machine ran.',
      paragraphs: [
        // TODO: replace with the real manufacture thinking: nesting,
        // grain, lead-ins, tabs, folding order, finish sequence.
        '[Placeholder: the manufacture thinking. Why the material, why the nest, where the lead-ins went and what order the piece was folded and finished in.]',
      ],
    },
    {
      label: 'the cut',
      title: 'the numbers the job left with.',
      paragraphs: [
        'Material, speed and accuracy, measured on the bed rather than estimated. The figures below are placeholders until the job sheet is transcribed.',
      ],
      showParameters: true,
    },
  ],
  parameters: [
    // TODO: cut stats from the machine and the job sheet; do not invent.
    { parameter: 'material range', value: 'TBC' },
    { parameter: 'cutting speed', value: 'TBC' },
    { parameter: 'cut length per part', value: 'TBC' },
    { parameter: 'kerf', value: 'TBC' },
    { parameter: 'measured variance across batch', value: 'TBC' },
  ],
  verdict: {
    // TODO: the client's words from the Specialty Services job.
    quote: 'Placeholder for the client verdict, to be supplied with the Specialty Services write-up.',
    attribution: 'attribution TBC, Specialty Services',
  },
  proofStats: [
    // TODO: the three headline figures from the job sheet.
    { value: 'TBC', label: 'parts fitted without rework' },
    { value: 'TBC', label: 'measured variance across the batch' },
    { value: 'TBC', label: 'drawing received to delivery' },
  ],
  // TODO: materials cut on this job (feeds listings and Article JSON-LD).
  materials: [],
  card: {
    title: 'specialty services',
    meta: 'JOB TBC / flagship case study',
    tag: 'material TBC',
  },
});
