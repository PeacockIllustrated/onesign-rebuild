import type { LaserCaseStudy } from '@onegroup/shared';

import { architecturalFinSet } from './architectural-fin-set';
import { illuminatedTrayPanels } from './illuminated-tray-panels';

/*
 * Seeded case studies, newest first. One typed object per study, no CMS.
 *
 * NOTE: the Specialty Services flagship (docs/v2-interactions.md,
 * journey-to-the-piece structure with the automated cut-and-build
 * hero) is deliberately NOT seeded here; its content and imagery have
 * not been supplied. Add it as another typed file in this folder,
 * with a `profileSvg` field, once the assets arrive.
 */
export const caseStudies: LaserCaseStudy[] = [architecturalFinSet, illuminatedTrayPanels];

export function getCaseStudy(slug: string): LaserCaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
