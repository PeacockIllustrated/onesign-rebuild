import { Nav } from '@onegroup/shared';

const LINKS = [
  { label: 'capabilities', href: '/capabilities' },
  { label: 'materials', href: '/materials' },
  { label: 'recent cuts', href: '/recent-cuts' },
  { label: 'upload', href: '/upload' },
];

/** OneLaser site nav: dark chrome, route links, small solid CTA. */
export function SiteNav({ back }: { back?: { label: string; href: string } }) {
  if (back) {
    return <Nav logoText="onelaser" tone="dark" back={back} />;
  }
  return (
    <Nav
      logoText="onelaser"
      tone="dark"
      links={LINKS}
      cta={{ label: 'get a price', href: '/upload' }}
    />
  );
}
