/* Site-wide constants and JSON-LD builders (docs/seo-aeo.md). */

export const SITE_URL = 'https://onelasercutting.com';
export const SITE_NAME = 'OneLaser';

export const ADDRESS_LINES = [
  'D86 Princesway North',
  'Team Valley, Gateshead NE11 0TU',
  '0191 487 6767',
] as const;

export const GROUP_LINKS = {
  onesign: 'https://onesignanddigital.com',
  onedesign: 'https://onedesignstudios.com',
} as const;

// TODO: confirm the quoting inbox address before launch (invented, unverified).
export const QUOTE_EMAIL = 'quotes@onelasercutting.com';

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'D86 Princesway North, Team Valley',
  addressLocality: 'Gateshead',
  postalCode: 'NE11 0TU',
  addressCountry: 'GB',
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  telephone: '0191 487 6767',
  address: postalAddress,
  parentOrganization: {
    '@type': 'Organization',
    name: 'One Group / Onesign & Digital',
    url: GROUP_LINKS.onesign,
  },
  sameAs: [GROUP_LINKS.onesign, GROUP_LINKS.onedesign],
};

/** OneLaser services per docs/seo-aeo.md. */
export const SERVICE_NAMES = [
  'Laser cutting',
  'Stainless steel cutting',
  'Aluminium cutting',
  'Sheet metal profiling',
] as const;

export const servicesJsonLd = SERVICE_NAMES.map((name) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType: name,
  areaServed: 'North East England',
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
}));
