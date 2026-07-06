import { Container, SectionHead } from '@onegroup/shared';

import { faqPageJsonLd, faqs } from '../lib/faqs';
import { JsonLd } from './JsonLd';
import styles from './FaqSection.module.css';

/**
 * FAQ section with FAQPage JSON-LD (docs/seo-aeo.md, phase 1.5).
 * Server component; all questions and answers are plain DOM text so
 * answer engines can quote them directly.
 */
export function FaqSection({ id }: { id?: string }) {
  return (
    <>
      <SectionHead
        label="faq"
        title="the usual questions, answered straight."
        id={id}
      />
      <Container as="section">
        <div className={styles.list}>
          {faqs.map(({ q, a }) => (
            <div key={q} className={styles.item}>
              <h3 className={styles.q}>{q}</h3>
              <p className={styles.a}>{a}</p>
            </div>
          ))}
        </div>
      </Container>
      <JsonLd data={faqPageJsonLd} />
    </>
  );
}
