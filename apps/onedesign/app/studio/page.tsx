import type { Metadata } from 'next';

import { Button, Container } from '@onegroup/shared';

import { SiteFooter, SiteNav } from '../../components/SiteChrome';

import styles from '../subpage.module.css';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'OneDesign Studios is the creative studio of One Group, Gateshead. A studio with a factory attached: concept-first branding, fabricated and installed by our sister companies.',
  openGraph: {
    type: 'website',
    siteName: 'OneDesign Studios',
    url: 'https://onedesignstudios.com/studio',
    images: [{ url: '/og/studio.png', width: 1200, height: 630 }],
  },
};

export default function StudioPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Container as="header" className={styles.head}>
          <div className={styles.eyebrow}>the studio</div>
          <h1 className={styles.h1}>a studio with a factory attached.</h1>
          <p className={styles.lede}>
            OneDesign Studios is the creative studio of One Group, based on Team Valley in
            Gateshead. We design brand identity, retail and environmental graphics for owners and
            marketers across the North East and beyond.
          </p>
        </Container>

        <Container as="section" className={styles.block}>
          <div className={styles.blockLab}>where we come from</div>
          <h2>fifty years of making, one flight of stairs away.</h2>
          <p>
            OneDesign grew out of Onesign &amp; Digital, a signage manufacturer with fifty years of
            making behind it. Every identity we draw is tested against the question that matters:
            what does this look like three metres tall, in the rain, on a Tuesday.
          </p>
          <p>
            Most creative studios hand over artwork and hope. We walk downstairs.{' '}
            <b>
              <a href="https://www.onelasercutting.com">OneLaser</a> cuts our metalwork and{' '}
              <a href="https://www.onesignanddigital.com">OneSign</a> installs the finished piece
            </b>
            , which means the concept you approve is the thing that ends up on the wall, to the
            millimetre.
          </p>
        </Container>

        <Container as="section" className={styles.block}>
          <div className={styles.blockLab}>how we work</div>
          <h2>an idea is only finished when it is standing up.</h2>
          <p>
            <b>01 discover.</b> We get under the brand, the audience and the space it has to live
            in.
          </p>
          <p>
            <b>02 concept.</b> Routes explored wide, then the strongest idea drawn out and pushed.
          </p>
          <p>
            <b>03 craft.</b> Identity, artwork and guidelines built to apply anywhere, at any size.
          </p>
          <p>
            <b>04 make it real.</b> Our sister companies fabricate and install, so nothing is lost
            in handover.
          </p>
        </Container>

        <Container as="section">
          <div className={styles.details}>
            <div className={styles.detail}>
              <h3>find us</h3>
              <p>D86 Princesway North</p>
              <p>Team Valley, Gateshead NE11 0TU</p>
            </div>
            <div className={styles.detail}>
              <h3>talk to us</h3>
              <a href="tel:+441914876767">0191 487 6767</a>
            </div>
            <div className={styles.detail}>
              <h3>our group</h3>
              <a href="https://www.onesignanddigital.com">onesignanddigital.com</a>
              <a href="https://www.onelasercutting.com">onelasercutting.com</a>
            </div>
          </div>
        </Container>

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
    </>
  );
}
