import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseFooter, CaseNav } from '../../../components/SiteChrome';
import { DesignCaseStudy } from '../../../components/DesignCaseStudy';
import { caseStudies, getCaseStudy } from '../../../content/case-studies';

const SITE_URL = 'https://onedesignstudios.com';

interface Params {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | work`,
    description: cs.metaDescription ?? cs.sub,
  };
}

export default function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  /* Article + BreadcrumbList JSON-LD per docs/seo-aeo.md */
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.metaDescription ?? cs.sub,
    ...(cs.datePublished ? { datePublished: cs.datePublished } : {}),
    author: { '@type': 'Organization', name: 'OneDesign Studios', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'OneDesign Studios', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/work/${cs.slug}`,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'work', item: `${SITE_URL}/work` },
      { '@type': 'ListItem', position: 2, name: cs.title, item: `${SITE_URL}/work/${cs.slug}` },
    ],
  };

  return (
    <>
      <CaseNav />
      <main>
        <DesignCaseStudy cs={cs} />
      </main>
      <CaseFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
