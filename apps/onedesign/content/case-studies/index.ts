import type { DesignCaseStudy } from '@onegroup/shared';

import { communityShopSunderland } from './community-shop-sunderland';
import { dirtyMurphys } from './dirty-murphys';

/*
 * Seeded case studies, in display order.
 *
 * Tanglewood Equestrian is the planned flagship (docs/v2-interactions.md:
 * scroll-adaptive brand takeover, per-project ASCII icon hero). It is NOT
 * built here because its source assets (brand fonts, icon SVG, imagery)
 * have not been supplied to this build; add it as a new content file once
 * the Tanglewood project archive is available.
 */
export const caseStudies: DesignCaseStudy[] = [communityShopSunderland, dirtyMurphys];

export function getCaseStudy(slug: string): DesignCaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
