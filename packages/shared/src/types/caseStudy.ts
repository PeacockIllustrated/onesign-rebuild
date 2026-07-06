/*
 * CaseStudy content model.
 *
 * Covers both approved templates (reference/laser-case.html job-sheet
 * format and reference/design-case.html editorial format) plus the
 * optional v2 fields from docs/v2-interactions.md. All v2 fields are
 * optional with sensible defaults so seeded studies build unchanged.
 *
 * Content lives in typed content files: one object per case study,
 * matching the template fields (no CMS in v1).
 */

/* ---------- v2 optional fields (docs/v2-interactions.md) ---------- */

/**
 * OneDesign case hero: the landing ASCII engine sampling the client's
 * icon SVG instead of the Onesign mark. Path + viewBox are the only
 * coupling to the artwork; any mark drops in as a new path + viewBox.
 */
export interface IconSvg {
  /** SVG path data for the client's mark (Path2D drop-in). */
  path: string;
  /** viewBox of the supplied mark, e.g. '0 0 27.08 24.64'. */
  viewBox: string;
  /**
   * ASCII grid cell size in px. Default 9; finer marks may go down to
   * ~6. Set per supplied icon, in content, not code.
   */
  cell?: number;
}

/** Resolved defaults for {@link IconSvg}. */
export const ICON_SVG_DEFAULT_CELL = 9;

/**
 * OneLaser case hero: automated cut-and-build. The beam traces and
 * cuts the actual project profile, then the part lifts and assembles.
 */
export interface ProfileSvg {
  /** SVG path data for the project profile the beam cuts out. */
  path: string;
  /** viewBox of the profile path. */
  viewBox: string;
  /**
   * Assembly mode after the cut completes. 'fold' uses CSS 3D
   * transforms on layered SVG groups (preferred, lighter); 'extrude'
   * uses React Three Fiber ExtrudeGeometry for true 3D. Default 'fold'.
   */
  assembly?: 'fold' | 'extrude';
}

/** Resolved default for {@link ProfileSvg.assembly}. */
export const PROFILE_SVG_DEFAULT_ASSEMBLY: NonNullable<ProfileSvg['assembly']> = 'fold';

/**
 * OneDesign scroll-adaptive brand takeover. As the reader scrolls into
 * the narrative, page chrome takes on the case study's brand.
 * Guardrails (enforced by the engine, not this type): body text stays
 * Gilroy; only colour and display type change; the accent must pass
 * contrast checks or the engine falls back to OneDesign teal.
 */
export interface CaseBrandTakeover {
  /** Accent colour (buttons, links, pull quote), e.g. '#E65B2A'. */
  accent: string;
  /**
   * Optional display font key. The app maps this to a next/font
   * loaded per case study (e.g. Tanglewood's brand serif).
   */
  displayFont?: string;
  /** Full three-slot project palette applied as --p1/--p2/--p3. */
  palette: { p1: string; p2: string; p3: string };
}

/* ---------- shared building blocks ---------- */

/** A key/value cell in the laser spec plate (six cells in the reference). */
export interface SpecPlateCell {
  /** e.g. 'material', 'thickness', 'quantity', 'tolerance', 'finish', 'lead time' */
  label: string;
  /** e.g. '316 stainless', '3 mm', '96 parts', '±0.1 mm' */
  value: string;
}

/** One row of the laser parameter table. */
export interface ParameterRow {
  /** e.g. 'cut length per part', 'kerf', 'measured variance across batch' */
  parameter: string;
  /** e.g. '2.84 m', '0.18 mm', '0.06 mm' */
  value: string;
}

/** One of the three proof stats at the foot of a laser case study. */
export interface ProofStat {
  /** e.g. '96/96', '0.06 mm', '6 days' */
  value: string;
  /** e.g. 'parts fitted without rework' */
  label: string;
}

/** An image slot. References use teal gradient placeholders; real photography replaces them. */
export interface ImageSlot {
  /** Uppercased caption strip, e.g. 'nest layout / sheet 2 of 3'. */
  caption: string;
  /** Path to real photography once supplied; placeholder gradient when absent. */
  src?: string;
  /** Alt text, required once src is set. */
  alt?: string;
  /** Placeholder gradient variant matching the reference classes. */
  variant?: 'default' | 'alt' | 'dark' | 'warm';
}

/** Link to another case study. */
export interface NextProject {
  slug: string;
  /** Display title, lowercase per brand voice, e.g. 'community shop, sunderland' */
  title: string;
}

/* ---------- OneLaser: job-sheet format (laser-case.html) ---------- */

/** A narrative section beside the kerf rail (the brief / the cut / the finish). */
export interface LaserSection {
  /** Mono eyebrow, e.g. 'the brief'. */
  label: string;
  /** Sentence-case lowercase heading, e.g. 'identical, or the facade fails.' */
  title: string;
  /** Paragraphs; may contain <b> emphasis via markup at render time. */
  paragraphs: string[];
  /** Set true on the section that renders the parameter table (the cut). */
  showParameters?: boolean;
  /** Optional image pair under the section. */
  images?: ImageSlot[];
}

/** The client's words strip. */
export interface Verdict {
  /** Quoted sentence(s), no surrounding quote marks in content. */
  quote: string;
  /** e.g. 'site manager, facade contractor' */
  attribution: string;
}

export interface LaserCaseStudy {
  kind: 'laser';
  slug: string;
  /** e.g. '1147' (rendered as 'case study / job 1147'). */
  jobNumber: string;
  /** Display h1, lowercase, e.g. '96 architectural fins, one sheet at a time.' */
  title: string;
  /** e.g. 'for a commercial facade contractor, Newcastle upon Tyne' */
  client: string;
  /** ISO date for Article JSON-LD (real dates required by docs/seo-aeo.md). */
  datePublished?: string;
  /** Meta description for the page. */
  metaDescription?: string;
  /** Six-cell spec plate: material, thickness, quantity, tolerance, finish, lead time. */
  specPlate: SpecPlateCell[];
  /** Caption under the hero scene, e.g. '96 fins / brushed 316 / swap for site photography'. */
  heroCaption?: string;
  /** Hero image once real photography exists. */
  heroImage?: ImageSlot;
  /** Narrative sections beside the kerf rail. */
  sections: LaserSection[];
  /** Parameter table rows (rendered inside the section with showParameters). */
  parameters: ParameterRow[];
  /** The client's words. */
  verdict: Verdict;
  /** Three proof stats. */
  proofStats: ProofStat[];
  /** Materials cut on this job, e.g. ['316 stainless']. Used for listings and Service JSON-LD. */
  materials: string[];
  /** Card fields for the recent-cuts grid: 'architectural fin set' / 'JOB 1147 / 96 parts' / '316 stainless / 3 mm'. */
  card: { title: string; meta: string; tag: string };
  /** v2: automated cut-and-build hero. Absent = static reference-style hero. */
  profileSvg?: ProfileSvg;
}

/* ---------- OneDesign: editorial format (design-case.html) ---------- */

/** A narrative chapter (the challenge / the idea / ...). */
export interface DesignChapter {
  /** e.g. 'the challenge' */
  label: string;
  /** e.g. 'new bar, old soul.' */
  title: string;
  paragraphs: string[];
}

/** One palette swatch of the three-slot project palette. */
export interface PaletteSwatch {
  /** e.g. 'bottle green' */
  name: string;
  /** e.g. '#0F1B14' */
  hex: string;
}

/** Type/voice sample card in the brand-system reveal. */
export interface TypeSample {
  /** The sample text itself. */
  text: string;
  /** Caption, e.g. 'display / heavyweight grotesque, tight and warm'. */
  caption: string;
  /** 'display' renders big and bold; 'voice' renders smaller, running text. */
  style: 'display' | 'voice';
}

export interface DesignCaseStudy {
  kind: 'design';
  slug: string;
  /** Display h1, lowercase, e.g. "dirty murphy's". */
  title: string;
  /** Kicker above the title, e.g. 'case study / identity & fascia'. */
  kicker: string;
  /** Standfirst under the title. */
  sub: string;
  /** Client display name, e.g. "Dirty Murphy's, Newcastle". */
  client: string;
  /** e.g. 'identity, signage design' */
  disciplines: string;
  /** e.g. 'OneSign & OneLaser' */
  madeRealBy: string;
  /** Display year, e.g. '2026'. */
  year: string;
  /** ISO date for Article JSON-LD. */
  datePublished?: string;
  metaDescription?: string;
  /** Caption on the full-bleed hero, e.g. 'aged brass on bottle green / swap for dusk photography'. */
  heroCaption?: string;
  /** Full-bleed hero image once real photography exists. */
  heroImage?: ImageSlot;
  /** Narrative chapters in the 680px column. */
  chapters: DesignChapter[];
  /** Pull quote; accent is the substring coloured in brand teal (or takeover accent). */
  pullQuote: { text: string; accent?: string; attribution: string };
  /** Gallery image slots between chapters and system reveal. */
  moments?: ImageSlot[];
  /** Three-slot project palette driving --p1/--p2/--p3. */
  palette: { p1: PaletteSwatch; p2: PaletteSwatch; p3: PaletteSwatch };
  /** System reveal heading, e.g. 'small palette, big character.' */
  systemTitle?: string;
  /** Type/voice sample cards. */
  typeSamples?: TypeSample[];
  /** 'then we walked it downstairs' cross-brand strip. */
  madeReal: { title: string; text: string; chips: string[] };
  /** Next-project link. */
  nextProject: NextProject;
  /** v2: ASCII case hero sampling the client's icon. Absent = drawn-line title band. */
  iconSvg?: IconSvg;
  /** v2: scroll-adaptive brand takeover. Absent = OneDesign chrome throughout. */
  brand?: CaseBrandTakeover;
}

/* ---------- union + helpers ---------- */

export type CaseStudy = LaserCaseStudy | DesignCaseStudy;

export function isLaserCase(cs: CaseStudy): cs is LaserCaseStudy {
  return cs.kind === 'laser';
}

export function isDesignCase(cs: CaseStudy): cs is DesignCaseStudy {
  return cs.kind === 'design';
}

/** Identity helper for typed content files: `export default defineCaseStudy({...})`. */
export function defineCaseStudy<T extends CaseStudy>(cs: T): T {
  return cs;
}

/** Effective ASCII cell size for a design case hero. */
export function iconCell(icon: IconSvg): number {
  return icon.cell ?? ICON_SVG_DEFAULT_CELL;
}

/** Effective assembly mode for a laser cut-and-build hero. */
export function profileAssembly(profile: ProfileSvg): NonNullable<ProfileSvg['assembly']> {
  return profile.assembly ?? PROFILE_SVG_DEFAULT_ASSEMBLY;
}
