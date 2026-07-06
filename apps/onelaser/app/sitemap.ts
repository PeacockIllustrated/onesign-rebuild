import type { MetadataRoute } from 'next';

import { caseStudies } from '../content/case-studies';
import { SITE_URL } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/capabilities', '/materials', '/recent-cuts', '/upload', '/contact'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
    }),
  );

  const caseRoutes = caseStudies.map((cs) => ({
    url: `${SITE_URL}/recent-cuts/${cs.slug}`,
    lastModified: cs.datePublished,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes];
}
