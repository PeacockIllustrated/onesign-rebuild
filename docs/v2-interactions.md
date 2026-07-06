# V2 interactions and flagship case studies

Requirements captured from concept review. These are build targets for the Claude Code phase, not present in the reference HTML. Reference files remain the visual baseline; everything here extends them.

## OneDesign

### Flagship case study: Tanglewood Equestrian
All Tanglewood work to date is design (12-page A4 brochure, A5/A3 leaflets, five-sign set, landing page/website), making it the proof piece for the studio positioning. Brand system for the takeover spec below: orange #E65B2A, charcoal, cream; Inter, EB Garamond, Trajan Pro. Source assets exist in the Tanglewood project archive.

### Case study hero: ASCII mark of the client's icon
Port the landing ASCII engine (docs/hero-engines.md) into the case study title band, but sampling the case study client's icon SVG instead of the Onesign mark. Per-project icon SVGs will be provided as content. Requirements:
- Icon path + viewBox are content fields on the CaseStudy object; the engine already supports any Path2D drop-in.
- Some marks are physically finer than others; expose CELL as a per-case-study override (default 9px, allow down to ~6px) and scale glyph sizes with it. Test each supplied icon and set its cell size in content, not code.
- Same dark band, light glyph mapping, cursor ripple and reduced-motion still as the landing.

### Scroll-adaptive branding
As the reader scrolls into a case study, the page chrome takes on the case study's brand, demonstrating "we can make any brand website-ready". Spec:
- Extend the existing --p1/--p2/--p3 palette mechanism to a fuller takeover set: accent colour, heading font (loaded per case study via next/font, e.g. Tanglewood swaps display to its brand serif), button and link accents, pull-quote colour.
- Trigger: IntersectionObserver on the narrative start; transition custom properties over ~600ms. Scroll back above the threshold reverts to OneDesign chrome.
- Guardrails: body text stays Gilroy for readability; layout and spacing never change, only colour and display type; contrast-check the takeover accent against both light body and dark bands before applying (fall back to OneDesign teal if it fails).

### Bento work grid
Replace the current asymmetric work grid with a bento layout with fluid growth:
- Hovering (or focusing) a tile grows it fluidly to reveal more info (project meta, one-line outcome, tags); siblings compress to make room.
- No tile ever fully disappears or collapses below a legible minimum; everything returns to the resting grid when the pointer leaves.
- Implement with CSS grid + animated grid-template fractions or FLIP transforms; must remain keyboard-focusable and reduced-motion safe (instant state swap, no animation).

## OneLaser

### Flagship case study: Specialty Services
Structure the case study as the journey to the final piece in situ:
1. The finished piece in place (hero, see below).
2. The technical drawing stage.
3. Manufacture thinking and process.
4. Cut stats: material range, speed, accuracy/tolerance, in the existing spec-plate and parameter-table components.
Content and imagery from the Specialty Services job to be supplied.

### Case study hero: automated cut-and-build
The landing hero's beam engine, automated and pointed at the project:
- The laser traces and cuts out the actual project profile (per-case-study SVG path, same content-field pattern as the design icons), full heat treatment (hot core, cooling window, settled seam).
- On completion the cut part lifts and assembles in 3D into the finished form, e.g. a flat profile folding up into a kitchen counter brass cover. Implementation guidance: CSS 3D transforms on layered SVG groups for simple fold-ups; if a case study needs true 3D, use React Three Fiber (existing house pattern from the sign illumination visualiser) with the profile extruded via ExtrudeGeometry. Choose per case study; folding beats extrusion where possible for weight.
- No cursor control in the case study hero; it is a performance, not a toy. Reduced motion shows the assembled final form.

### Landing hero interaction upgrades
- Target cursor: while the pointer is over the hero and the beam is following it, replace the cursor with a targeting reticle (SVG cursor or a tracked element; hide the native cursor within the hero only, restore on leave, never hijack outside the hero).
- Click-and-hold power: while held, increase bloom intensity and ember spawn rate on the controlled beam (raise ember cap moderately, widen the hot window slightly); release returns to standard. Pointer capture so the hold survives small drift outside the hero edge.

## Content model implications
CaseStudy type gains: iconSvg { path, viewBox, cell? } (design), profileSvg + assembly mode (laser), brand { accent, displayFont, palette } (design takeover). All optional with sensible defaults so existing seeded studies build unchanged.
