/** The two production sites built from this system. */
export type Brand = 'onelaser' | 'onedesign';

/** Class applied to <html> or <body> to activate a brand's token scope. */
export const brandClass: Record<Brand, string> = {
  onelaser: 'brand-onelaser',
  onedesign: 'brand-onedesign',
};
