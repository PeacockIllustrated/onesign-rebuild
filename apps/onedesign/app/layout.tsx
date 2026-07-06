import '@onegroup/shared/tokens.css';
import './globals.css';

import type { Metadata } from 'next';
import { htmlClassName } from '@onegroup/shared/fonts';

const SITE_URL = 'https://onedesignstudios.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Branding & creative studio, North East | OneDesign Studios',
    template: '%s | OneDesign Studios',
  },
  description:
    'Brand identity, retail and environmental graphics from Gateshead. The thinking behind great signage, offered as a studio in its own right. Part of One Group.',
  openGraph: {
    type: 'website',
    siteName: 'OneDesign Studios',
    url: SITE_URL,
  },
};

/* Organization JSON-LD, per docs/seo-aeo.md. */
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OneDesign Studios',
  url: SITE_URL,
  telephone: '0191 487 6767',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'D86 Princesway North, Team Valley',
    addressLocality: 'Gateshead',
    postalCode: 'NE11 0TU',
    addressCountry: 'GB',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'One Group (Onesign & Digital)',
    url: 'https://www.onesignanddigital.com',
  },
  sameAs: ['https://www.onesignanddigital.com', 'https://www.onelasercutting.com'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={htmlClassName('onedesign')}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
