/*
 * @onegroup/shared barrel.
 *
 * Note: fonts are deliberately NOT re-exported here. Import them from
 * '@onegroup/shared/fonts' in the app root layout only (next/font
 * requires the Next compiler). tokens.css is imported by apps as
 * import '@onegroup/shared/tokens.css'.
 */

// brand
export type { Brand } from './types/brand';
export { brandClass } from './types/brand';

// content model
export type {
  CaseStudy,
  LaserCaseStudy,
  DesignCaseStudy,
  LaserSection,
  DesignChapter,
  SpecPlateCell,
  ParameterRow,
  ProofStat,
  Verdict,
  ImageSlot,
  NextProject,
  PaletteSwatch,
  TypeSample,
  IconSvg,
  ProfileSvg,
  CaseBrandTakeover,
} from './types/caseStudy';
export {
  isLaserCase,
  isDesignCase,
  defineCaseStudy,
  iconCell,
  profileAssembly,
  ICON_SVG_DEFAULT_CELL,
  PROFILE_SVG_DEFAULT_ASSEMBLY,
} from './types/caseStudy';

// layout primitives
export { Container } from './components/Container';
export type { ContainerProps, ContainerWidth } from './components/Container';
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';
export { Nav } from './components/Nav';
export type { NavProps, NavLinkItem } from './components/Nav';
export { Footer } from './components/Footer';
export type { FooterProps, FooterColumn, FooterLink } from './components/Footer';
export { SectionHead } from './components/SectionHead';
export type { SectionHeadProps } from './components/SectionHead';

// utilities
export { cx } from './lib/cx';
