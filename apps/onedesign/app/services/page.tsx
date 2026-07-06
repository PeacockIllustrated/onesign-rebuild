import type { Metadata } from 'next';

import { Button, Container } from '@onegroup/shared';

import { SiteFooter, SiteNav } from '../../components/SiteChrome';

import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Services: brand identity, retail branding, environmental graphics',
  description:
    'Brand identity, retail branding, environmental graphics and signage design from OneDesign Studios, Gateshead. Concept-first creative work, built to become real.',
};

const SITE_URL = 'https://onedesignstudios.com';

/* Service JSON-LD per docs/seo-aeo.md (OneDesign services list). */
const services = [
  {
    id: 'brand-identity',
    name: 'brand identity',
    /* card copy verbatim from the approved landing */
    intro:
      'Names, marks and full systems with room to grow. Built to work everywhere, from a favicon to a fascia.',
    body: [
      'An identity from us is never just a logo file. You get the mark, the palette, the type, the voice and the guidelines that hold them together, drawn so they still work when the brand grows into places you have not planned for yet.',
      'Because we sit above a fabrication floor, every identity is stress-tested in the real world before you sign it off: how it cuts from steel, how it reads back-lit, how it weathers.',
    ],
  },
  {
    id: 'retail-branding',
    name: 'retail branding',
    intro:
      'Store environments that pull people in and hold them. Interiors, window schemes, menus and displays.',
    body: [
      'Retail is a brand at its most physical. We design the whole environment as one piece: the fascia that stops people, the window that draws them in, and the interior scheme that makes them stay.',
      'Menus, displays and point of sale carry the same system, so the store feels considered from the pavement to the counter.',
    ],
  },
  {
    id: 'environmental-graphics',
    name: 'environmental graphics',
    intro:
      'Wayfinding, interpretation and large-format graphics that turn a space into an experience.',
    body: [
      'Wayfinding that works is invisible; you simply never feel lost. We plan routes and write the words first, then design graphics that carry them at architectural scale.',
      'Interpretation and large-format work turn walls into storytelling, sized and specified for the people who will actually build and install it.',
    ],
  },
  {
    id: 'signage-design',
    name: 'signage design',
    intro:
      'Signage schemes drawn by people who manufacture signs. Fascias, illuminated lettering and the drawings that make them buildable.',
    body: [
      'This is where the studio and the factory meet. We design signage with the fabrication drawings in mind, so what you approve is exactly what OneSign builds and installs.',
      'From a single fascia to a full multi-site scheme, the design carries its own production logic: materials, fixings, illumination and tolerances considered from the first sketch.',
    ],
  },
];

const servicesLd = services.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: s.name,
  description: s.intro,
  url: `${SITE_URL}/services#${s.id}`,
  provider: { '@type': 'Organization', name: 'OneDesign Studios', url: SITE_URL },
  areaServed: 'North East England',
}));

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Container as="header" className={styles.head}>
          <div className={styles.eyebrow}>services</div>
          <h1 className={styles.h1}>what we do.</h1>
          <p className={styles.lede}>
            Brand identity, retail and environmental graphics. The thinking behind great signage,
            offered as a studio in its own right.
          </p>
        </Container>
        {services.map((s) => (
          <Container as="section" className={styles.block} id={s.id} key={s.id}>
            <div className={styles.blockLab}>service</div>
            <h2>{s.name}</h2>
            <p>
              <b>{s.intro}</b>
            </p>
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Container>
        ))}
        <Container as="section" className={styles.endcta}>
          <h2>
            got something
            <br />
            <span className={styles.ctaAccent}>to shape?</span>
          </h2>
          <Button href="/contact" className={styles.cta}>
            start a project
          </Button>
        </Container>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />
    </>
  );
}
