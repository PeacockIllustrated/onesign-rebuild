import type { Metadata } from 'next';

import { Button, Container } from '@onegroup/shared';

import { SiteFooter, SiteNav } from '../../components/SiteChrome';

import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Contact, start a project',
  description:
    'Start a project with OneDesign Studios, Gateshead. Brand identity, retail and environmental graphics; call 0191 487 6767 or write to the studio.',
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Container as="header" className={styles.head}>
          <div className={styles.eyebrow}>contact</div>
          <h1 className={styles.h1}>
            got something
            <br />
            <span className={styles.ctaAccent}>to shape?</span>
          </h1>
          <p className={styles.lede}>
            Tell us what you are making and where it has to live. We will come back with a straight
            answer, a view on the idea, and what it would take to make it real.
          </p>
          <Button
            href="mailto:studio@onedesignstudios.com" /* TODO: confirm studio email address */
            className={styles.cta}
          >
            start a project
          </Button>
        </Container>

        <Container as="section">
          <div className={styles.details}>
            <div className={styles.detail}>
              <h3>call</h3>
              <a href="tel:+441914876767">0191 487 6767</a>
            </div>
            <div className={styles.detail}>
              <h3>write</h3>
              {/* TODO: confirm studio email address before launch */}
              <a href="mailto:studio@onedesignstudios.com">studio@onedesignstudios.com</a>
            </div>
            <div className={styles.detail}>
              <h3>visit</h3>
              <p>D86 Princesway North</p>
              <p>Team Valley, Gateshead NE11 0TU</p>
            </div>
          </div>
        </Container>

        <Container as="section" className={styles.block}>
          <div className={styles.blockLab}>fabrication &amp; signage</div>
          <h2>need it cut or built, not designed?</h2>
          <p>
            Need fabrication or signage manufacturing? Our sister companies can help. Talk to{' '}
            <a href="https://www.onelasercutting.com">
              <b>OneLaser</b>
            </a>{' '}
            for precision laser cutting, or{' '}
            <a href="https://www.onesignanddigital.com">
              <b>OneSign</b>
            </a>{' '}
            for signage manufacture and installation.
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
