# Build status

Final integration pass, 6 July 2026. Both apps build cleanly and prerender static-first; this note records what shipped, what is stubbed pending supplied assets, and how to run everything.

## What was built

- `packages/shared`: design tokens (tokens.css), Gilroy Regular and Bold as woff2 via `next/font/local` (font-display swap, both weights preloaded, no base64 embedding), layout primitives (Container, Nav, Footer, Button, SectionHead), typed case study content models. Frozen after foundation.
- `apps/onelaser`: landing with the beam hero engine (docs/hero-engines.md), capabilities, materials, recent cuts listing, case study template with the cut-and-build hero (SVG trace plus optional lazy-loaded three.js extrude), three seeded case studies, upload page with a working quote intake API (`/api/quote`, forwards to `QUOTE_FORWARD_URL`), contact, SEO layer (metadata, Article and Service JSON-LD, FAQ, sitemap, robots, OG images).
- `apps/onedesign`: landing with the ASCII hero engine, work listing with the bento grid, case study template with the ASCII case hero and scroll-adaptive brand takeover, three seeded case studies, services, studio, contact, matching SEO layer.
- Cross-links between the three brands per docs/seo-aeo.md live in the footers and contact pages.

## Routes

OneLaser (onelasercutting.com):

- `/` landing
- `/capabilities`
- `/materials`
- `/recent-cuts` and `/recent-cuts/[slug]` (specialty-services, architectural-fin-set, illuminated-tray-panels)
- `/upload` (form posts to `/api/quote`, the only dynamic route)
- `/contact`
- `/sitemap.xml`, `/robots.txt`

OneDesign (onedesignstudios.com):

- `/` landing
- `/work` and `/work/[slug]` (tanglewood-equestrian, community-shop-sunderland, dirty-murphys)
- `/services`
- `/studio`
- `/contact`
- `/sitemap.xml`, `/robots.txt`

Every route except `/api/quote` is prerendered at build time.

## How to run

All dependencies are installed at the workspace root.

- `npm run dev --workspace apps/onelaser` (or `--workspace apps/onedesign`) for local development
- `npm run build` at the root builds both apps
- `npm run typecheck` runs tsc across all workspaces
- `python3 reference/build.py` compiles the reference HTML previews (design truth, do not edit the sources)

Note on lint: the per-app `lint` scripts call `next lint`, but ESLint is not installed in this workspace and the root lockfile is frozen, so linting is deferred; `next build` performs the type validity pass.

## Stubbed pending supplied assets

Every invented or unverified value carries a `// TODO` at the point of use. The headline items:

- Real photography: no project photographs are wired in yet; case study image slots and hero art use generated or placeholder scenes. OG images are generated placeholders in each app's `public/og`.
- Flagship case studies: OneLaser specialty-services is a structural placeholder (job numbers, cut stats, quote and profile SVG all TBC from the job sheet); the OneLaser OEM bracket batch study is not yet written. OneDesign tanglewood-equestrian awaits the project archive (narrative, palette hex values, display samples, fabrication credits).
- Publish dates on all case studies are placeholders; Article JSON-LD needs real dates before launch (docs/seo-aeo.md).
- Contact details to confirm before launch: OneLaser quoting inbox address and opening hours; OneDesign studio email address; OneLaser free-issue sheet policy and reflective-material (brass, copper, zintec) stock position.
- Privacy and terms pages do not exist yet; footer links match the reference's placeholder behaviour.
- OneDesign case display fonts: Trajan Pro is commercial; EB Garamond (the openly licensed serif of the documented Tanglewood stack) carries the takeover display voice until the client licence is confirmed. It loads via next/font/google at build time, preload off.
- Phase 2: the `/api/quote` route is a working forward-to-email intake; live DXF pricing (parse, cut length, Supabase persistence) is the documented extension point in `apps/onelaser/app/api/quote/route.ts`.

## Compliance checks (this pass)

- One h1 per page on every prerendered route (OneLaser subpages now use an app-local PageHead that renders the SectionHead visual as an h1).
- Hero art is aria-hidden decoration behind the scrim; no headline text is drawn in any canvas or SVG (the ASCII hero draws only density-ramp glyphs).
- All four hero client components (BeamHero, AsciiHero, CutBuildHero, the extrude case hero) render the finished still under prefers-reduced-motion with no loop or pointer handlers bound, and pause their rAF loops offscreen via IntersectionObserver.
- Fonts ship as woff2 through the shared next/font module; no base64 font embedding anywhere in app code or build output.
- Container keeps `width: 100%` (the flex hero centring gotcha is documented in the shared CSS and not reintroduced).
