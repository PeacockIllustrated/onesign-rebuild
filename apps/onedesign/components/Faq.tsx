import { Container } from '@onegroup/shared';

import styles from './Faq.module.css';

/*
 * FAQ section (phase 1.5, docs/seo-aeo.md): genuine questions in the
 * OneDesign warm voice, rendered as real DOM text and marked up with
 * FAQPage schema. The JSON-LD is built from the same array the DOM
 * renders, so the two can never drift apart.
 */

const faqs = [
  {
    q: 'do you only design signage?',
    a: 'No. We design full brand identities, retail environments and environmental graphics. Signage is where we grew up, and it taught us to design things that survive the real world, but most of our projects begin long before anything is bolted to a wall.',
  },
  {
    q: 'who actually makes the work?',
    a: 'Our sister companies do, and that is the point. OneLaser cuts our metalwork and OneSign fabricates and installs the finished piece, all part of One Group and all based on Team Valley in Gateshead. The concept you approve is the thing that ends up on the wall.',
  },
  {
    q: 'can you work with our existing brand?',
    a: 'Happily. Not every project needs a new identity. We often take a brand that works beautifully on screen and rework it for buildings, interiors and large-format graphics, keeping everything your customers already recognise.',
  },
  {
    q: 'do you work outside the North East?',
    a: 'Yes. The studio is on Team Valley in Gateshead and much of our work is across the North East, but we design and deliver schemes further afield too; distance has never stopped a good idea.',
  },
  {
    q: 'what does a project cost?',
    a: 'It depends on the shape of it. A focused identity refresh and a full multi-site retail scheme are very different jobs, so we scope every project on its own terms. Tell us what you are making and we will come back with a straight answer.',
  },
  {
    q: 'how do we start?',
    a: 'Call the studio on 0191 487 6767 or send us a note. We will ask about the brand, the audience and the space the work has to live in, then set out a clear route from first conversation to finished piece.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export function Faq() {
  return (
    <Container as="section" className={styles.faq} id="faq">
      <div className={styles.label}>questions</div>
      <h2 className={styles.title}>asked often, answered straight.</h2>
      <dl className={styles.list}>
        {faqs.map((f) => (
          <div className={styles.item} key={f.q}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </Container>
  );
}
