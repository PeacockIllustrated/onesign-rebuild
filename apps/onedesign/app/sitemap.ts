import type { MetadataRoute } from 'next';

import { caseStudies } from '../content/case-studies';

const SITE_URL = 'https://onedesignstudios.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/work`, priority: 0.9 },
    ...caseStudies.map((cs) => ({
      url: `${SITE_URL}/work/${cs.slug}`,
      priority: 0.8,
      ...(cs.datePublished ? { lastModified: cs.datePublished } : {}),
    })),
    { url: `${SITE_URL}/services`, priority: 0.8 },
    { url: `${SITE_URL}/studio`, priority: 0.7 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
  ];
}
