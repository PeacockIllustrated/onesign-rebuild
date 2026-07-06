/*
 * V1 quote intake: receives the upload form (fields + drawing file)
 * and forwards it to the configured delivery endpoint, which handles
 * the "posting to email" step (a transactional-email webhook such as
 * Resend/Formspree/Make, set via QUOTE_FORWARD_URL on Vercel).
 *
 * PHASE 2 EXTENSION POINT (docs/brand-briefs.md): the live DXF quoting
 * tool replaces this forward with real pricing: parse the DXF here (or
 * in a dedicated service), compute true cut length, pierces and
 * material cost, persist to Supabase, and return a price in the
 * response body. The client (components/UploadForm.tsx) already
 * round-trips JSON, so it only needs to render the returned figure.
 */

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.dxf', '.dwg', '.pdf'];

export async function POST(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: 'The form data could not be read.' }, { status: 400 });
  }

  const name = form.get('name');
  const email = form.get('email');
  const drawing = form.get('drawing');

  if (typeof name !== 'string' || name.trim() === '' || typeof email !== 'string' || email.trim() === '') {
    return Response.json({ ok: false, error: 'Name and email are required.' }, { status: 400 });
  }
  if (!(drawing instanceof File) || drawing.size === 0) {
    return Response.json({ ok: false, error: 'Attach a drawing (DXF, DWG or PDF).' }, { status: 400 });
  }
  if (drawing.size > MAX_FILE_BYTES) {
    return Response.json({ ok: false, error: 'That file is over 20 MB.' }, { status: 413 });
  }
  const lower = drawing.name.toLowerCase();
  if (!ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return Response.json(
      { ok: false, error: 'We can price DXF, DWG or PDF files.' },
      { status: 415 },
    );
  }

  const forwardUrl = process.env.QUOTE_FORWARD_URL;
  if (!forwardUrl) {
    // Deployment not wired to a mail endpoint yet; the client shows the
    // email fallback. Configure QUOTE_FORWARD_URL in Vercel to enable.
    return Response.json(
      { ok: false, error: 'Quote uploads are not switched on for this deployment yet.' },
      { status: 503 },
    );
  }

  const upstream = await fetch(forwardUrl, { method: 'POST', body: form }).catch(() => null);
  if (!upstream || !upstream.ok) {
    return Response.json(
      { ok: false, error: 'The drawing could not be sent just now.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
