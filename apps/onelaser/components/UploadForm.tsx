'use client';

/*
 * V1 quote request: a form with a drawing attached, posted to
 * /api/quote, which forwards it to the quoting inbox. This is NOT the
 * phase-2 live DXF quoting tool; when that lands (docs/brand-briefs.md
 * phase 2), this component is the extension point: parse the DXF
 * client-side, price from true cut length, pierces and material, and
 * replace the "we reply the same working day" promise with a figure.
 */

import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@onegroup/shared';

import styles from './UploadForm.module.css';

const MAX_FILE_BYTES = 20 * 1024 * 1024;

// Keep in sync with lib/site.ts QUOTE_EMAIL (client component, so the
// value is inlined rather than imported through the server-only module
// graph). TODO: confirm the quoting inbox address before launch.
const FALLBACK_EMAIL = 'quotes@onelasercutting.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function UploadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const file = data.get('drawing');
    if (file instanceof File && file.size > MAX_FILE_BYTES) {
      setStatus('error');
      setError(`That file is over 20 MB. Email it to ${FALLBACK_EMAIL} instead.`);
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: data });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Something went wrong sending the form.');
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? `${err.message} You can email your drawing straight to ${FALLBACK_EMAIL}.`
          : `Something went wrong. Email your drawing to ${FALLBACK_EMAIL} and we will price it from there.`,
      );
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.done}>
        <div className={styles.doneLab}>received</div>
        <h2>drawing received.</h2>
        <p>
          Your file is with the floor. A price comes back the same working day, from the
          person who will run the job.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="q-name">
          name
        </label>
        <input className={styles.input} id="q-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="q-email">
          email
        </label>
        <input className={styles.input} id="q-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="q-material">
          material
        </label>
        <select className={styles.select} id="q-material" name="material" defaultValue="stainless steel">
          <option>stainless steel</option>
          <option>aluminium</option>
          <option>mild steel</option>
          <option>other / advise me</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="q-thickness">
          thickness / quantity
        </label>
        <input
          className={styles.input}
          id="q-thickness"
          name="thicknessQuantity"
          type="text"
          placeholder="3 mm, 96 parts"
        />
      </div>
      <div className={`${styles.field} ${styles.wide}`}>
        <label className={styles.label} htmlFor="q-file">
          drawing
        </label>
        <div className={styles.file}>
          <input id="q-file" name="drawing" type="file" accept=".dxf,.dwg,.pdf" required />
          <span className={styles.fileHint}>DXF or DWG preferred / PDF for reference / 20 MB max</span>
        </div>
      </div>
      <div className={`${styles.field} ${styles.wide}`}>
        <label className={styles.label} htmlFor="q-notes">
          notes
        </label>
        <textarea
          className={styles.textarea}
          id="q-notes"
          name="notes"
          placeholder="Finish, tolerance, site date, anything the drawing does not say."
        />
      </div>
      <div className={styles.actions}>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'sending' : 'send for a price'}
        </Button>
        {status === 'error' && (
          <span className={`${styles.status} ${styles.statusError}`} role="alert">
            {error}
          </span>
        )}
        {status === 'idle' && (
          <span className={styles.status}>Price back the same working day.</span>
        )}
      </div>
    </form>
  );
}
