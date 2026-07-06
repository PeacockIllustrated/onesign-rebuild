/*
 * Static OpenGraph image generator for OneDesign Studios.
 *
 * Rasterises a hand-built branded SVG (the dark hero frame from
 * reference/design-landing.html, per docs/seo-aeo.md: "dark hero frame
 * renders well as OG art; generate static OG images, do not screenshot
 * the live canvas") to 1200x630 PNGs in public/og/ using sharp.
 *
 * Run manually whenever titles change:
 *
 *   node scripts/generate-og.mjs        (from apps/onedesign)
 *
 * The PNGs are committed, so production builds (Vercel) never depend on
 * sharp or on Gilroy being installed in fontconfig. Locally, sharp's
 * librsvg needs Gilroy visible to fontconfig:
 *
 *   mkdir -p ~/.fonts && cp ../../fonts/*.ttf ~/.fonts && fc-cache -f
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og');

/* OneDesign tokens (docs/tokens.md, dark hero set) */
const HERO_BG = '#10181A';
const HERO_H1 = '#F4F8F7';
const HERO_LEDE = '#9AAEAB';
const TEAL_BRIGHT = '#42AEBF';
const LINE_DIM = '#22322F';

/* one card per page; headline lines mirror the page h1 (lowercase, brand voice) */
const cards = [
  { file: 'home', lines: [['ideas that'], ['take shape.', true]] },
  { file: 'work', lines: [['recent'], ['shapes.', true]] },
  { file: 'services', lines: [['what'], ['we do.', true]] },
  { file: 'studio', lines: [['a studio with a'], ['factory attached.', true]] },
  { file: 'contact', lines: [['got something'], ['to shape?', true]] },
  {
    file: 'work-community-shop-sunderland',
    eyebrow: 'case study',
    lines: [['community shop,'], ['sunderland', true]],
  },
  {
    file: 'work-dirty-murphys',
    eyebrow: 'case study',
    lines: [["dirty murphy's", true]],
  },
  {
    file: 'work-tanglewood-equestrian',
    eyebrow: 'case study',
    lines: [['tanglewood'], ['equestrian', true]],
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#39;');

function svg({ eyebrow = 'branding & creative studio', lines }) {
  const size = lines.length > 1 ? 96 : 104;
  const leading = size * 1.04;
  const blockH = leading * (lines.length - 1);
  const baseline = 360 - blockH / 2;
  const text = lines
    .map(
      ([t, accent], i) =>
        `<text x="90" y="${baseline + i * leading}" font-family="Gilroy-Bold" font-weight="700" font-size="${size}" letter-spacing="-2.5" fill="${accent ? TEAL_BRIGHT : HERO_H1}">${esc(t)}</text>`,
    )
    .join('\n  ');

  /* the ribbon line device, echoing the landing hero's flowing stroke */
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${HERO_BG}"/>
  <path d="M-40,520 C220,300 480,610 740,420 S1060,220 1260,380" fill="none" stroke="${LINE_DIM}" stroke-width="2"/>
  <path d="M-40,560 C240,360 500,640 760,470 S1080,280 1260,430" fill="none" stroke="${TEAL_BRIGHT}" stroke-width="3" opacity="0.9"/>
  <text x="90" y="150" font-family="Gilroy-Bold" font-weight="700" font-size="22" letter-spacing="4" fill="${TEAL_BRIGHT}">${esc(eyebrow.toUpperCase())}</text>
  ${text}
  <text x="90" y="560" font-family="Gilroy-Regular" font-size="24" fill="${HERO_LEDE}">onedesignstudios.com</text>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });
for (const card of cards) {
  const out = join(OUT_DIR, `${card.file}.png`);
  await sharp(Buffer.from(svg(card)), { density: 96 }).png().toFile(out);
  console.log('wrote', out);
}
