import type { Metadata } from 'next';

import { Button, Container } from '@onegroup/shared';

import { SiteFooter, SiteNav } from '../components/SiteChrome';

import styles from './subpage.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <Container as="section" className={styles.nf}>
          <div className={styles.eyebrow}>404</div>
          <h1 className={styles.h1}>
            this page never
            <br />
            <span className={styles.ctaAccent}>took shape.</span>
          </h1>
          <p className={styles.lede} style={{ margin: '18px auto 0' }}>
            The idea moved, or the link was drawn wrong. Everything we have made is in the work,
            and the studio door is always open.
          </p>
          <div className={styles.nfBtns}>
            <Button href="/work">see the work</Button>
            <Button href="/" variant="ghost">
              back to the studio
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
