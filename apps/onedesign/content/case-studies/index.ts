import type { DesignCaseStudy } from '@onegroup/shared';

import { communityShopSunderland } from './community-shop-sunderland';
import { dirtyMurphys } from './dirty-murphys';
import { tanglewoodEquestrian } from './tanglewood-equestrian';

/*
 * Seeded case studies, in display order.
 *
 * Tanglewood Equestrian is the flagship (docs/v2-interactions.md):
 * structure and the v2 scroll-adaptive brand takeover are wired, but
 * its narrative, imagery and icon SVG are clearly-marked placeholders
 * until the Tanglewood project archive is supplied (see the TODOs in
 * tanglewood-equestrian.ts).
 */
export const caseStudies: DesignCaseStudy[] = [
  tanglewoodEquestrian,
  communityShopSunderland,
  dirtyMurphys,
];

export function getCaseStudy(slug: string): DesignCaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
