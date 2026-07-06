/*
 * FAQ content and FAQPage JSON-LD (docs/seo-aeo.md, phase 1.5).
 * Answers reuse figures already approved elsewhere on the site
 * (specs strip, materials grid, upload page, case studies).
 */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What file formats do you accept?',
    a: 'DXF or DWG, drawn 1:1 in millimetres. If all you have is a PDF or a sketch, send it anyway; simple profiles can be redrawn, and any redraw time is agreed before it is added to the price.',
  },
  {
    q: 'What tolerance can you hold on 3 mm stainless?',
    a: 'Plus or minus 0.1 mm as standard. On a recent batch of 96 fins in 3 mm 316 the measured variance across the whole run was 0.06 mm. If a feature needs tighter, flag it on the drawing and we confirm before cutting.',
  },
  {
    q: 'What materials and thicknesses do you cut?',
    a: 'Stainless steel from 0.9 to 12 mm, aluminium from 0.9 to 10 mm and mild steel from 0.9 to 20 mm, on sheet up to 3 x 1.5 m.',
  },
  {
    q: 'Is there a minimum order?',
    a: 'No. One part is a job. Small batches are nested onto the next appropriate sheet, so you are not paying for material you do not use.',
  },
  {
    q: 'How fast is turnaround?',
    a: 'Prices go back the same working day and cutting starts from 48 hours for stocked material. The lead time on your quote is the date we hold.',
  },
  {
    q: 'Do you supply the material?',
    a: 'Yes. Common grades (304, 316, 5083, 5754, CR4, S275) are held or ordered against your job. Free-issue sheet is fine if it is flat, clean and within bed size.', // TODO: confirm free-issue sheet policy before launch (unverified).
  },
];

export const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};
