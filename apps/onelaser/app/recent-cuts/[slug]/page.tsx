import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '../../../components/JsonLd';
import { CaseFooterWrap, LaserCaseStudy } from '../../../components/LaserCaseStudy';
import { SlimFooter } from '../../../components/SiteFooter';
import { SiteNav } from '../../../components/SiteNav';
import { caseStudies, getCaseStudy } from '../../../content/case-studies';
import { SITE_URL } from '../../../lib/site';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `Case study: ${cs.card.title}`,
    description: cs.metaDescription,
    alternates: { canonical: `/recent-cuts/${cs.slug}` },
  };
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.card.title,
    description: cs.metaDescription,
    datePublished: cs.datePublished,
    url: `${SITE_URL}/recent-cuts/${cs.slug}`,
    author: { '@type': 'Organization', name: 'OneLaser', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'OneLaser', url: SITE_URL },
    about: cs.materials.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'OneLaser', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Recent cuts', item: `${SITE_URL}/recent-cuts` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cs.card.title,
        item: `${SITE_URL}/recent-cuts/${cs.slug}`,
      },
    ],
  };

  return (
    <>
      <SiteNav back={{ label: 'all recent cuts', href: '/recent-cuts' }} />
      <LaserCaseStudy cs={cs} />
      <CaseFooterWrap>
        <SlimFooter />
      </CaseFooterWrap>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
