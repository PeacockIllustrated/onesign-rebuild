import { Button, Container } from '@onegroup/shared';

import { SiteFooter } from '../components/SiteFooter';
import { SiteNav } from '../components/SiteNav';
import styles from './subpage.module.css';

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <header className={styles.notfound}>
          <div className="hero-scrim" aria-hidden="true" />
          <Container className={styles.notfoundInner}>
            <div className={styles.notfoundEyebrow}>error / 404</div>
            <h1 className={styles.notfoundH1}>
              nothing on the bed
              <br />
              at this address.
            </h1>
            <p className={styles.notfoundLede}>
              The path does not match a cut file. Check the URL, or start again from the
              pages below; if you followed a link here, tell us and we will fix it.
            </p>
            <div className={styles.btns}>
              <Button href="/">back to the floor</Button>
              <Button href="/recent-cuts" variant="ghost">
                see recent cuts
              </Button>
            </div>
          </Container>
        </header>
      </main>
      <SiteFooter />
    </>
  );
}
