import { Footer } from '@onegroup/shared';

import { ADDRESS_LINES, GROUP_LINKS } from '../lib/site';

/** The exact group cross-link sentence (docs/seo-aeo.md, load-bearing). */
export function CrossLink() {
  return (
    <>
      Need finished signage from your components?{' '}
      <a href={GROUP_LINKS.onesign}>Visit OneSign</a>.
    </>
  );
}

/** Full landing footer, ported from reference/laser-landing.html. */
export function SiteFooter() {
  return (
    <Footer
      logoText="onelaser"
      description="Precision laser cutting from the One Group floor in Gateshead. Sister company to Onesign & Digital and OneDesign Studios."
      url="onelasercutting.com"
      columns={[
        {
          heading: 'site',
          links: [
            { label: 'capabilities', href: '/capabilities' },
            { label: 'materials', href: '/materials' },
            { label: 'recent cuts', href: '/recent-cuts' },
            { label: 'upload a DXF', href: '/upload' },
          ],
        },
        {
          heading: 'our group',
          links: [
            { label: 'onesignanddigital.com', href: GROUP_LINKS.onesign },
            { label: 'onedesignstudios.com', href: GROUP_LINKS.onedesign },
          ],
        },
        {
          heading: 'contact',
          lines: [...ADDRESS_LINES],
        },
      ]}
      note={
        <>
          © 2026 One Group. <CrossLink />
        </>
      }
      /* TODO: privacy and terms pages do not exist yet (reference links to '#'). */
      noteLinks={[
        { label: 'privacy', href: '#' },
        { label: 'terms', href: '#' },
      ]}
    />
  );
}

/** Slim case-study footer, ported from reference/laser-case.html. */
export function SlimFooter() {
  return (
    <Footer
      variant="slim"
      left="© 2026 One Group / onelasercutting.com"
      right={<CrossLink />}
    />
  );
}
