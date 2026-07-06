import type { ReactNode } from 'react';

/*
 * Content paragraphs may carry <b>...</b> emphasis (the CaseStudy type
 * allows it; the approved reference copy uses it). Render it without
 * dangerouslySetInnerHTML: split on the tags and emit real <b> elements.
 */
export function emphasis(text: string): ReactNode {
  const parts = text.split(/<b>(.*?)<\/b>/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part));
}

/*
 * Pull quotes colour one substring in the accent colour. Split the text
 * on the accent substring and wrap it.
 */
export function accented(text: string, accent: string | undefined, className: string): ReactNode {
  if (!accent) return text;
  const at = text.indexOf(accent);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
