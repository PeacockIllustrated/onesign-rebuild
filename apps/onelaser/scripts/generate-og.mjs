/*
 * Static OpenGraph image generator (docs/seo-aeo.md).
 *
 * Rasterises a hand-built branded SVG (the dark hero frame) to
 * 1200 x 630 PNGs in public/og/ using sharp. We never screenshot the
 * live canvas; the frame is rebuilt here from the brand tokens
 * (packages/shared/src/tokens.css, .brand-onelaser scope).
 *
 * Run from apps/onelaser:  node scripts/generate-og.mjs
 * (sharp resolves from the workspace root node_modules; Gilroy TTFs
 * are picked up from the repo fonts/ directory via a temporary
 * fontconfig file, so no fonts need installing on the machine.)
 *
 * The PNGs are committed to public/og/ so the Next build and the
 * deployed site never depend on sharp or fontconfig at runtime.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..', '..');
const outDir = path.resolve(here, '..', 'public', 'og');

/* Point fontconfig at the repo Gilroy TTFs before sharp loads librsvg. */
const fontsConf = path.join(tmpdir(), 'onelaser-og-fonts.conf');
writeFileSync(
  fontsConf,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${path.join(repoRoot, 'fonts')}</dir>
  <dir>/usr/share/fonts</dir>
  <cachedir>${path.join(tmpdir(), 'onelaser-og-fc-cache')}</cachedir>
</fontconfig>
`,
);
process.env.FONTCONFIG_FILE = fontsConf;

const sharp = (await import('sharp')).default;

/* Brand tokens: .brand-onelaser dark hero frame. */
const C = {
  bg: '#0B1214',
  h1: '#F4F8F9',
  accent: '#2FD4EE',
  hotCore: '#EFFDFF',
  lede: '#93A7AC',
};

const MONO = 'DejaVu Sans Mono, monospace';

function esc(s) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * The dark hero frame: beam line with hot spark, mono eyebrow,
 * lowercase Gilroy Bold headline with an accent line, mono footer.
 */
function frame({ eyebrow, lines, accentLine, footer }) {
  const headline = lines
    .map((line, i) => {
      const fill = i === accentLine ? C.accent : C.h1;
      return `<text x="84" y="${378 + i * 92}" font-family="Gilroy-Bold, Gilroy" font-weight="700" font-size="82" letter-spacing="-1.6" fill="${fill}">${esc(line)}</text>`;
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="spark" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.hotCore}" stop-opacity="0.95"/>
      <stop offset="0.25" stop-color="${C.accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.05"/>
      <stop offset="0.72" stop-color="${C.accent}" stop-opacity="0.85"/>
      <stop offset="0.735" stop-color="${C.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.bg}"/>
  <!-- beam line device: cut path with the hot spark at the kerf -->
  <line x1="0" y1="150" x2="1200" y2="150" stroke="${C.accent}" stroke-opacity="0.12" stroke-width="1"/>
  <circle cx="882" cy="150" r="64" fill="url(#spark)"/>
  <rect x="0" y="148.5" width="882" height="3" fill="url(#beam)"/>
  <rect x="0" y="149.4" width="882" height="1.2" fill="${C.hotCore}" fill-opacity="0.9"/>
  <!-- HUD ticks under the beam -->
  <g stroke="${C.accent}" stroke-opacity="0.28" stroke-width="1">
    <line x1="84" y1="176" x2="84" y2="184"/>
    <line x1="284" y1="176" x2="284" y2="180"/>
    <line x1="484" y1="176" x2="484" y2="184"/>
    <line x1="684" y1="176" x2="684" y2="180"/>
    <line x1="884" y1="176" x2="884" y2="184"/>
    <line x1="1084" y1="176" x2="1084" y2="180"/>
  </g>
  <!-- wordmark -->
  <rect x="84" y="64" width="12" height="12" fill="${C.accent}"/>
  <text x="108" y="76" font-family="Gilroy-Bold, Gilroy" font-weight="700" font-size="26" letter-spacing="-0.4" fill="${C.h1}">onelaser</text>
  <!-- eyebrow -->
  <text x="84" y="286" font-family="${MONO}" font-size="19" letter-spacing="4.4" fill="${C.accent}">${esc(eyebrow.toUpperCase())}</text>
  ${headline}
  <!-- footer -->
  <text x="84" y="576" font-family="${MONO}" font-size="18" letter-spacing="2.6" fill="${C.lede}">${esc(footer.toUpperCase())}</text>
  <line x1="84" y1="540" x2="1116" y2="540" stroke="${C.accent}" stroke-opacity="0.16" stroke-width="1"/>
</svg>`;
}

const FOOTER = 'onelasercutting.com / gateshead';

/*
 * One frame per route. Case-study entries must stay in sync with
 * content/case-studies/ (slug, job number, headline).
 */
const pages = [
  {
    name: 'home',
    eyebrow: 'precision laser cutting / gateshead',
    lines: ['cut clean,', 'every pass.'],
    accentLine: 1,
  },
  {
    name: 'capabilities',
    eyebrow: 'capabilities / 3kw fibre',
    lines: ['one machine,', 'run properly.'],
    accentLine: 1,
  },
  {
    name: 'materials',
    eyebrow: 'materials / stainless, aluminium, mild steel',
    lines: ['what we profile', 'every day.'],
    accentLine: 1,
  },
  {
    name: 'recent-cuts',
    eyebrow: 'recent cuts / case studies',
    lines: ['every job leaves', 'with its numbers.'],
    accentLine: 1,
  },
  {
    name: 'upload',
    eyebrow: 'upload / dxf, dwg',
    lines: ['got a drawing', 'ready?'],
    accentLine: 1,
  },
  {
    name: 'contact',
    eyebrow: 'contact / team valley, gateshead',
    lines: ['talk to the people', 'who run the machine.'],
    accentLine: 1,
  },
  {
    name: 'recent-cuts-architectural-fin-set',
    eyebrow: 'job 1147 / 316 stainless / 3 mm',
    lines: ['96 architectural fins,', 'one sheet at a time.'],
    accentLine: 1,
  },
  {
    name: 'recent-cuts-illuminated-tray-panels',
    eyebrow: 'job 1152 / 5083 aluminium / 5 mm',
    lines: ['40 tray panels,', 'every aperture true.'],
    accentLine: 1,
  },
];

mkdirSync(outDir, { recursive: true });

for (const page of pages) {
  const svg = frame({ ...page, footer: FOOTER });
  const file = path.join(outDir, `${page.name}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
  console.log('wrote', path.relative(process.cwd(), file));
}
