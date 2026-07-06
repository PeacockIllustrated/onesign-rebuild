# Design tokens

One system, two brand overrides. Implement as CSS custom properties in a shared stylesheet, with a per-site override layer. Values below are extracted from the approved references and are exact.

## Shared

Type: Gilroy for everything. 400 body, 700 display and emphasis. Display headlines are lowercase, tight (`letter-spacing: -0.02em` to `-0.028em`, `line-height: ~1.0`). Mono (system stack `ui-monospace, SFMono-Regular, Consolas`) is reserved for data: specs, job numbers, HUD-style labels. Never for prose.

Layout: container `max-width: 1160px` (case studies 1060px, narrative column 680px), `padding: 0 26px`. Section rhythm ~70 to 90px vertical.

Buttons: 700 weight, 13 to 15px. Primary solid, secondary ghost/soft.

Line device: each brand's hero engine is the line device. It is the signature; nothing else on the page competes with it.

## OneLaser (onelasercutting.com)

```css
--paper:#FFFFFF; --wash:#F1F4F5; --ink:#0F1719; --steel:#5B6B70;
--line:#DDE4E5; --teal:#127A8C; --teal-deep:#0C5464; --teal-bright:#19A7BE;
--nav:#0C1315; --r:6px;
/* dark hero */
--hero-bg:#0B1214; --hero-h1:#F4F8F9; --hero-accent:#2FD4EE;
--hero-lede:#93A7AC; --hot:#2FD4EE; --hot-core:#EFFDFF;
```

Temperament: near-square 6px radius, mono data everywhere numbers appear, dark hero on light page. Buttons rectangular (radius `--r`), not pills.

## OneDesign (onedesignstudios.com)

```css
--paper:#FDFDFC; --wash:#F3F6F5; --ink:#171E1D; --steel:#61706E;
--line:#E2E8E7; --teal:#2C8593; --teal-deep:#1D6270; --teal-bright:#42AEBF;
--nav:#12191A; --r:22px;
/* dark hero */
--hero-bg:#10181A; --hero-h1:#F4F8F7; --hero-lede:#9AAEAB;
/* per-case-study project palette, three slots */
--p1:#0F1B14; --p2:#B8935A; --p3:#E9E2D2; /* example: Dirty Murphy's */
```

Temperament: soft 22px radius, pill buttons (border-radius 100px), light nav, biggest type of the family, generous whitespace. Case studies carry their own three-colour project palette via `--p1/--p2/--p3` while the chrome stays OneDesign.

## Dark hero pattern (both sites)

Hero band is dark on an otherwise light page. Laser's dark is blue-black (#0B1214), Design's is warmer green-black (#10181A); keep them distinct. Left-side legibility scrim: `linear-gradient(90deg, hero-bg at ~.94 opacity to transparent by ~78%)`. Headline light, accent in the brand's bright teal, buttons re-cut for dark ground (see references).
