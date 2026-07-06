# One Group websites, build brief

Two production marketing sites for One Group (Onesign & Digital, Gateshead), built to a shared design system with pivoted intent per brand:

- **OneLaser** at onelasercutting.com, precision laser cutting service
- **OneDesign** at onedesignstudios.com, branding and creative studio

Both are sister brands to the existing signage business at onesignanddigital.com. The three-site strategy is deliberate (three specialist authorities rather than one broad domain); cross-linking rules in docs/seo-aeo.md are load-bearing, not decoration.

## What exists in this pack

- `reference/` — four approved single-file HTML concepts. These are the design truth. Landing page and case study template per brand. They use `@FONT_REG@`/`@FONT_BOLD@` placeholders; run `python3 reference/build.py` to compile openable previews. Production must not embed fonts as base64.
- `fonts/` — Gilroy Regular and Bold (TTF). Convert to woff2 for production.
- `docs/` — tokens, per-brand briefs, hero engine specs, SEO/AEO requirements, site structure.

## Stack

Next.js 14 (app router), deployed on Vercel. No CMS for v1; content lives in typed content files (one object per case study matching the template fields). Supabase only if/when the DXF upload quoting flow is built (phase 2, see onelaser brief). Static-first: every page should render fully without JS.

## Build order

1. Shared package: tokens, Gilroy font setup, layout primitives (container, nav, footer, buttons, section heads).
2. OneLaser: landing (port the beam hero engine per docs/hero-engines.md), case study template, 2 seeded case studies.
3. OneDesign: landing (port the ASCII hero engine), case study template, 2 seeded case studies.
4. SEO/AEO layer: metadata, JSON-LD, cross-links, sitemaps (docs/seo-aeo.md).
5. V2 interactions: flagship case studies, adaptive branding, bento grid, hero upgrades (docs/v2-interactions.md).

## Non-negotiable rules

- The reference HTML is the visual spec. Match it before improving it.
- Hero art canvases/SVGs are `aria-hidden` decoration. All copy stays semantic DOM. No headline ever rendered inside canvas.
- `prefers-reduced-motion` gets the static end-state of each hero (already implemented in references; preserve behaviour).
- Pause hero animation loops when the hero is out of the viewport (IntersectionObserver). Not yet in references; required in production.
- Flex hero gotcha: a flex child with `margin: 0 auto` shrink-wraps and mis-centres. Hero inner containers need `width: 100%`. (This bug was found and fixed in the references; do not reintroduce.)
- Lighthouse: 90+ across the board. The hero engines are cheap by design; keep them that way.

## Copy rules (all user-facing text)

British spelling. Sentence case headings. No em-dashes anywhere, use commas, semicolons or full stops. No emoji. No exclamation marks. Lowercase display headlines are a brand voice choice, keep them. OneLaser copy is clipped and technical; OneDesign copy is warm and concept-led. Reference file copy is approved; reuse it.
