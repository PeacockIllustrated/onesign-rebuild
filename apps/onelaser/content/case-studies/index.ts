import type { LaserCaseStudy } from '@onegroup/shared';

import { architecturalFinSet } from './architectural-fin-set';
import { illuminatedTrayPanels } from './illuminated-tray-panels';
import { specialtyServices } from './specialty-services';

/*
 * Seeded case studies, newest first. One typed object per study, no CMS.
 *
 * The Specialty Services flagship (docs/v2-interactions.md) is seeded
 * as STRUCTURE ONLY: journey layout, cut-and-build hero (profileSvg)
 * and clearly-marked placeholder content. Its copy, imagery and job
 * data are still to be supplied; every placeholder carries a TODO in
 * specialty-services.ts. It is kept off the landing recent-cuts grid
 * (the reference three-card layout is the visual spec) until the real
 * content lands.
 */
export const caseStudies: LaserCaseStudy[] = [
  specialtyServices,
  architecturalFinSet,
  illuminatedTrayPanels,
];

export { specialtyServices };

export function getCaseStudy(slug: string): LaserCaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
