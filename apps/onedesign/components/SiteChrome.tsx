/*
 * OneDesign nav and footer cuts, wrapping the shared primitives with
 * this site's approved content (reference/design-landing.html and
 * reference/design-case.html; cross-link copy per docs/seo-aeo.md).
 */

import { Footer, Nav } from '@onegroup/shared';

export const NAV_LINKS = [
  { label: 'work', href: '/work' },
  { label: 'services', href: '/services' },
  { label: 'studio', href: '/studio' },
  { label: 'contact', href: '/contact' },
];

export function SiteNav() {
  return (
    <Nav
      logoText="onedesign"
      tone="light"
      links={NAV_LINKS}
      cta={{ label: 'start a project', href: '/contact' }}
    />
  );
}

export function CaseNav() {
  return <Nav logoText="onedesign" tone="light" back={{ label: 'all work', href: '/work' }} />;
}

export function SiteFooter() {
  return (
    <Footer
      logoText="onedesign"
      description="The creative studio of One Group. Concept-first branding, built to become real."
      url="onedesignstudios.com"
      columns={[
        { heading: 'site', links: NAV_LINKS },
        {
          heading: 'our group',
          links: [
            { label: 'onesignanddigital.com', href: 'https://www.onesignanddigital.com' },
            { label: 'onelasercutting.com', href: 'https://www.onelasercutting.com' },
          ],
        },
        {
          heading: 'contact',
          lines: ['D86 Princesway North', 'Team Valley, Gateshead NE11 0TU', '0191 487 6767'],
        },
      ]}
      note={
        <>
          Need fabrication or signage manufacturing? Our sister companies can help. &copy; 2026 One
          Group. OneDesign Studios is a trading brand of One Group.
        </>
      }
      noteLinks={[
        { label: 'OneLaser', href: 'https://www.onelasercutting.com' },
        { label: 'OneSign', href: 'https://www.onesignanddigital.com' },
      ]}
    />
  );
}

export function CaseFooter() {
  return (
    <Footer
      variant="slim"
      left={<>&copy; 2026 One Group / onedesignstudios.com</>}
      right={
        <>
          Need fabrication or signage? <a href="https://www.onelasercutting.com">OneLaser</a>{' '}
          &middot; <a href="https://www.onesignanddigital.com">OneSign</a>
        </>
      }
    />
  );
}
