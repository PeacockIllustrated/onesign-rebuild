import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Container, SectionHead } from '@onegroup/shared';

import { AsciiHero } from '../components/AsciiHero';
import { BentoWorkGrid } from '../components/BentoWorkGrid';
import { Faq } from '../components/Faq';
import { SiteFooter, SiteNav } from '../components/SiteChrome';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Branding & creative studio, North East | OneDesign Studios',
  description:
    'Brand identity, retail and environmental graphics. The thinking behind great signage, offered as a studio in its own right. OneDesign Studios, Gateshead.',
};

/* Landing, ported section for section from reference/design-landing.html.
   All copy is the approved reference copy, verbatim. */
export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <header className={styles.hero}>
          <AsciiHero className={styles.stage} />
          <div className="hero-scrim" aria-hidden="true" />
          <Container className={styles.inner}>
            <div className={styles.eyebrow}>branding &amp; creative studio</div>
            <h1 className={styles.h1}>
              ideas that
              <br />
              <span className={styles.accent}>take shape.</span>
            </h1>
            <p className={styles.lede}>
              Brand identity, retail and environmental graphics. The thinking behind great signage,
              offered as a studio in its own right.
            </p>
            <div className={styles.btns}>
              <Button href="#work">see the work</Button>
              <Button href="/contact" variant="ghost">
                start a project
              </Button>
            </div>
          </Container>
        </header>

        <Container as="section" className={styles.mani} id="studio">
          <p>
            <span className={styles.dim}>Most studios stop at the screen.</span> We design brands
            that have to survive the real world,{' '}
            <span className={styles.maniAccent}>
              bolted to buildings, cut from steel, lit at night
            </span>
            , and still look right ten years on.
          </p>
          <p className={styles.sub}>
            OneDesign grew out of Onesign &amp; Digital, a signage manufacturer with fifty years of
            making behind it. Every identity we draw is tested against the question that matters:
            what does this look like three metres tall, in the rain, on a Tuesday.
          </p>
        </Container>

        <Container as="section" className={styles.svcs} id="services">
          <div className={styles.svc}>
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M10,50 C22,20 42,20 54,44" />
            </svg>
            <div>
              <h3>brand identity</h3>
              <p>
                Names, marks and full systems with room to grow. Built to work everywhere, from a
                favicon to a fascia.
              </p>
            </div>
            <Link className={styles.go} href="/services#brand-identity">
              identity work &rarr;
            </Link>
          </div>
          <div className={styles.svc}>
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M12,44 h40 M12,32 h28 M12,20 h34" />
            </svg>
            <div>
              <h3>retail branding</h3>
              <p>
                Store environments that pull people in and hold them. Interiors, window schemes,
                menus and displays.
              </p>
            </div>
            <Link className={styles.go} href="/services#retail-branding">
              retail work &rarr;
            </Link>
          </div>
          <div className={styles.svc}>
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M14,50 L32,14 L50,50 Z" />
            </svg>
            <div>
              <h3>environmental graphics</h3>
              <p>
                Wayfinding, interpretation and large-format graphics that turn a space into an
                experience.
              </p>
            </div>
            <Link className={styles.go} href="/services#environmental-graphics">
              environmental work &rarr;
            </Link>
          </div>
        </Container>

        <SectionHead
          id="work"
          label="selected work"
          title="recent shapes."
          action={{ label: 'all projects →', href: '/work' }}
        />
        <BentoWorkGrid
          entries={[
            {
              title: 'community shop, sunderland',
              description: 'environmental graphics, wayfinding, interior scheme',
              outcome: 'A big retail shed turned into somewhere you would happily spend your morning.',
              tags: ['wayfinding', 'interior scheme', 'made real by OneSign'],
              href: '/work/community-shop-sunderland',
            },
            {
              title: "dirty murphy's",
              description: 'identity, aged brass fascia',
              outcome: 'A new bar with an eighty-year-old soul, in aged brass that only gets better.',
              tags: ['identity', 'aged brass fascia', 'cut by OneLaser'],
              href: '/work/dirty-murphys',
            },
            {
              title: 'the tanning co',
              description: 'retail branding, interior signage',
              outcome: 'Retail branding with warmth built in; the full story is coming soon.',
              tags: ['retail branding', 'interior signage'],
              href: '/work',
            },
          ]}
        />

        <Container as="section">
          <div className={styles.ribbon}>
            <svg viewBox="0 0 1100 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-20,240 C180,80 380,300 580,160 S920,60 1120,200" />
            </svg>
            <div className={styles.ribbonIn}>
              <h2>an idea is only finished when it is standing up.</h2>
              <div className={styles.rsteps}>
                <div>
                  <div className={styles.rstepN}>01</div>
                  <div className={styles.rstepT}>discover</div>
                  <div className={styles.rstepD}>
                    We get under the brand, the audience and the space it has to live in.
                  </div>
                </div>
                <div>
                  <div className={styles.rstepN}>02</div>
                  <div className={styles.rstepT}>concept</div>
                  <div className={styles.rstepD}>
                    Routes explored wide, then the strongest idea drawn out and pushed.
                  </div>
                </div>
                <div>
                  <div className={styles.rstepN}>03</div>
                  <div className={styles.rstepT}>craft</div>
                  <div className={styles.rstepD}>
                    Identity, artwork and guidelines built to apply anywhere, at any size.
                  </div>
                </div>
                <div>
                  <div className={styles.rstepN}>04</div>
                  <div className={styles.rstepT}>make it real</div>
                  <div className={styles.rstepD}>
                    Our sister companies fabricate and install, so nothing is lost in handover.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container as="section" className={styles.note}>
          <div className={styles.notePh}>
            <span>studio image placeholder / gateshead floor</span>
          </div>
          <div>
            <h2>a studio with a factory attached.</h2>
            <p>
              Most creative studios hand over artwork and hope. We walk downstairs.{' '}
              <b>
                <a href="https://www.onelasercutting.com">OneLaser</a> cuts our metalwork and{' '}
                <a href="https://www.onesignanddigital.com">OneSign</a> installs the finished piece
              </b>
              , which means the concept you approve is the thing that ends up on the wall, to the
              millimetre.
            </p>
            <p>
              Need fabrication or signage manufacturing? Our{' '}
              <a href="https://www.onesignanddigital.com">sister companies</a> can help.
            </p>
          </div>
        </Container>

        <Faq />

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
