import '@onegroup/shared/tokens.css';
import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { htmlClassName } from '@onegroup/shared/fonts';

import { JsonLd } from '../components/JsonLd';
import { organizationJsonLd, SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Precision laser cutting Gateshead | OneLaser',
    template: '%s | OneLaser',
  },
  description:
    '3kW fibre laser cutting in stainless, aluminium and mild steel. Upload a DXF, get a price, and take delivery of parts that fit first time. From the team behind Onesign & Digital.',
  openGraph: {
    siteName: 'OneLaser',
    type: 'website',
    locale: 'en_GB',
    // TODO (SEO/AEO phase): generate static OG images from the dark hero
    // frame per docs/seo-aeo.md; do not screenshot the live canvas.
  },
};

export const viewport: Viewport = {
  themeColor: '#0C1315',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={htmlClassName('onelaser')}>
      <body>
        {children}
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
