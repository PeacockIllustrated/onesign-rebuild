# Hero engines

Both engines live as vanilla IIFEs at the bottom of their reference files. Port each to a client component (`'use client'`) mounted behind semantic hero content. Keep them dependency-free; neither needs a library.

## Shared requirements

- Element is `aria-hidden="true"`, absolutely positioned behind the hero copy, below the scrim.
- Rebuild on resize (debounced ~150ms, already implemented).
- `prefers-reduced-motion: reduce` renders the finished still and binds no loop or pointer handlers (already implemented; preserve).
- NEW for production: wrap the rAF loop in an IntersectionObserver so it pauses when the hero leaves the viewport.
- Copy contrast is handled by the scrim, not by dimming the artwork.

## OneLaser: the beam (`laser-landing.html`)

Concept: one continuous molten cut sweeps a dark sheet; on hover the beam hands over to the visitor's cursor.

Structure, one SVG:
- Atmosphere: radial teal bloom, brushed hairlines at 3% white, two faint cold seams from "previous passes".
- The cut is three stacked strokes on one generated path: settled seam (`#1E6E7E`, 1.4px), cooling window (`#2FD4EE`, 2.8px, bloom filter, dash window ~220px trailing the head), white-hot core (`#F4FEFF`, 1.6px, heavier bloom, ~54px window). Dash-window technique: `dasharray = WINDOW + ' ' + L`, `dashoffset = WINDOW - prog`.
- Beam column: 2.2px vertical rect from top of frame to the head, gradient fading upward, opacity flickers at `0.8 + 0.2 sin(47t) + 0.06 sin(137t)`.
- Embers: max 16 particles, slow drift, cyan/white only. No amber, no sparks bursting.
- Sweep paths are generated per pass (`sweep()`), randomised harmonics, so no two passes repeat.
- Traverse easing: `0.35 + 0.65 sin(pi * k)`, slow ignition, confident middle, soft landing. Pass completes, beam extinguishes, seam holds glow ~2.4s, re-sweeps.

Interaction: `pointerenter` seeds a live trail from the auto head's current position (continuity matters, do not teleport). Head lerps to cursor at 0.16. Trail is three heat layers on one polyline rebuilt from points (>3.5px spacing, cap 650 points). `pointerleave` fades hot 1.2s, cool 2.4s, settle 3.4s, then a fresh auto sweep after ~0.9s. Touch devices effectively get auto mode; do not add touch handlers.

## OneDesign: the ASCII mark (`design-landing.html`)

Concept: the real Onesign icon rendered as tonal ASCII in light on dark, breathing along its contours, rippled by the cursor.

Structure, one canvas:
- Offscreen scene at cell resolution: the icon (inlined `Path2D`, viewBox 27.08 x 24.64) drawn twice, body fill at 0.72 alpha for mid-tone texture, silhouette stroke at full for a crisp edge, plus the sweeping gesture bezier entering from the left. Blur 1.6px, then luminance sampled per cell.
- Grid: `CELL = 9px`, DPR capped 1.5. 21-step glyph ramp from dust to `▓`. Rare accents (`✳ ◦ ∗`) only above v .92.
- Colour (dark ground): dust `rgba(122,142,140)`, mid `rgba(66,174,191)`, dense `rgba(216,245,248)`, alpha scales with v.
- Performance rule: fonts are bucketed to exactly two states (regular 8.5px / bold 10px) and only switched when the bucket changes. Per-cell font assignment will tank the frame rate; do not do it.
- Breathe: `v *= .82 + .18 sin(1.4t + 9L + .12c - .09r)`. Cursor: smoothed (lerp .07), ripple displaces glyphs radially within 240px and brightens them.
- Swap-in note: the icon path string and IW/IH constants are the only coupling to the artwork. Any future mark drops in as a new path + viewBox.

## Case study templates

- Laser case study (`laser-case.html`): job-sheet format. Six-cell spec plate, kerf rail (dashed vertical with nodes), parameter table, verdict, three proof stats. All data-in-template: define a typed CaseStudy object and render.
- Design case study (`design-case.html`): editorial format. Centred title with drawn line, full-bleed hero, narrative chapters, pull quote, brand-system reveal driven by `--p1/--p2/--p3`, "made real by" cross-brand strip, next-project link.
