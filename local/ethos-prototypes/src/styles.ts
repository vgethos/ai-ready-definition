/**
 * Verified type scale + UI tokens — sourced from app.ethos.com computed styles.
 * Use these in all prototypes for pixel-accurate fidelity to the real product.
 */

export const type = {
  /** Page/screen heading (h1) — Cambon Bold */
  h1: {
    fontFamily: 'Cambon, Georgia, serif',
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '31px',
    color: 'var(--night-100)',
  },
  /** Card / option title — NewTheinhardt Medium */
  cardTitle: {
    fontFamily: 'NewTheinhardt, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '26px',
  },
  /** Card / option description — NewTheinhardt Regular */
  cardDescription: {
    fontFamily: 'NewTheinhardt, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  /** Primary CTA button label */
  button: {
    fontFamily: 'NewTheinhardt, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '26px',
  },
} as const;

export const ui = {
  /** Selection card (radio/checkbox style) */
  card: {
    borderRadius: '4px',
    padding: '15px 18px',
  },
  /** Primary CTA button */
  button: {
    borderRadius: '8px',
    padding: '18px',
  },
} as const;

/**
 * LP (landing page) type scale — sourced from EDS v2 typography.css mobile breakpoint.
 * Uses Portada for display/title text, Hauss for body copy.
 */
export const lp = {
  /** Hero headline — Portada Semibold, new-mobile-display-m */
  displayM: {
    fontFamily: 'Portada, sans-serif',
    fontSize: '33px',
    fontWeight: 600,
    lineHeight: '40px',
    letterSpacing: '-0.08px',
  },
  /** Section title — Portada Semibold, new-mobile-title-l */
  titleL: {
    fontFamily: 'Portada, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: '32px',
  },
  /** Body copy large — Hauss Regular, new-mobile-text-l-regular */
  bodyL: {
    fontFamily: 'Hauss, sans-serif',
    fontSize: '19px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  /** Body copy medium — Hauss Regular, new-mobile-text-m-regular */
  bodyM: {
    fontFamily: 'Hauss, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  /** CTA button label — Hauss Medium, new-mobile-text-l-medium */
  ctaButton: {
    fontFamily: 'Hauss, sans-serif',
    fontSize: '19px',
    fontWeight: 500,
    lineHeight: '24px',
  },
  /** Feature/card title — Hauss Medium (same metrics as ctaButton, cypress color) */
  cardTitle: {
    fontFamily: 'Hauss, sans-serif',
    fontSize: '19px',
    fontWeight: 500,
    lineHeight: '24px',
  },
} as const;

/**
 * LP color palette — verified from staging.ethos.com computed styles (2026-03-02).
 * Use these instead of hardcoding hex values in LP prototypes.
 */
export const lpColors = {
  heroBg: 'var(--dark-cypress)',  // #05594f — hero section background
  darkText: 'rgb(39, 39, 39)',    // headings + body text in content sections
  mutedText: '#5d5d5d',           // card/feature descriptions
  cardTitle: '#05594F',           // cypress green — feature card titles
  sectionBg: '#faf9f5',           // off-white — content section background
} as const;
