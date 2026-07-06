# SEO, AEO and site structure

The three-domain split is strategic: three specialist authorities instead of one broad one. New domains start with zero history, so the on-page layer has to be right from day one.

## Cross-linking (load-bearing)

Contextual cross-links between the sisters, in body copy and footers, exactly as in the references:

- OneLaser footer: "Need finished signage from your components? Visit OneSign."
- OneDesign: "Need fabrication or signage manufacturing? Our sister companies can help." plus the "made real by OneSign & OneLaser" strip on every case study.
- OneSign (existing site, separate task): add an "Our Group" section linking both sisters.

Shared projects get one perspective per site, never duplicated content: OneDesign tells the concept story, OneLaser tells the fabrication story, OneSign tells the install story, each linking the others.

## Per-site metadata

- Semantic HTML throughout: one h1 per page, hero copy in real DOM (never inside canvas/SVG), landmarks (nav/main/footer).
- Titles: "Precision laser cutting Gateshead | OneLaser" pattern; OneDesign leads with "Branding & creative studio, North East".
- JSON-LD on every page: `Organization` (parentOrganization: One Group / Onesign & Digital, address D86 Princesway North, Team Valley, Gateshead NE11 0TU, phone 0191 487 6767), `Service` per capability, `BreadcrumbList` on case studies. OneLaser services: laser cutting, stainless steel cutting, aluminium cutting, sheet metal profiling. OneDesign: brand identity, retail branding, environmental graphics, signage design.
- Case studies use `Article` schema with real dates.
- OpenGraph images per page (dark hero frame renders well as OG art; generate static OG images, do not screenshot the live canvas).

## AEO (answer engines)

- Every page answers "what does this company do, where, for whom" in the first rendered paragraph of real text. The reference ledes already do this; keep them.
- Specs as text, not images: thickness limits, tolerances, bed size, materials, lead times all live in the DOM (the capabilities strip and materials tables already do).
- FAQ sections (phase 1.5): 5 to 6 genuine questions per site ("What file formats do you accept", "What tolerance can you hold on 3mm stainless"), marked up with `FAQPage` schema.
- Plain-language service statements beat cleverness for AI retrieval; the case-study proof stats (96/96 fitted, 0.06mm variance) are exactly the kind of concrete claims answer engines quote.

## Routes

OneLaser: `/` `/capabilities` `/materials` `/recent-cuts` `/recent-cuts/[slug]` `/upload` (phase 2: live DXF quote; v1: form + file upload to email) `/contact`

OneDesign: `/` `/work` `/work/[slug]` `/services` `/studio` `/contact`

Both: `/sitemap.xml`, `/robots.txt`, 404 in brand voice.

## Performance

Fonts as woff2 with `font-display: swap`, preload the bold weight (headline paints in it). Hero engines are decoration: defer their JS, never block LCP on them. Target LCP under 1.8s; the h1 is the LCP element on both sites, keep it that way.
