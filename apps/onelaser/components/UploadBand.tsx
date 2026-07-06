import { Button, Container } from '@onegroup/shared';

import styles from './UploadBand.module.css';

/** DXF upload band, the centrepiece CTA. Approved copy verbatim. */
export function UploadBand({ id }: { id?: string }) {
  return (
    <Container as="section" id={id}>
      <div className={styles.band}>
        <svg
          className={styles.path}
          viewBox="0 0 1100 220"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path d="M-10,170 H300 L360,110 H740 L800,170 H1120" />
        </svg>
        <div className={styles.in}>
          <div>
            <h2>got a drawing ready?</h2>
            <p>
              Drop a DXF and get a price back the same working day. No minimum order, no
              drawn-out quoting chain.
            </p>
            <div className={styles.steps}>
              <span>01 upload</span>
              <span>02 price</span>
              <span>03 cut</span>
              <span>04 delivered</span>
            </div>
          </div>
          <Button href="/upload">upload a DXF</Button>
        </div>
      </div>
    </Container>
  );
}
