// Global constants for the cinematic experience

export const SCENES = {
  LOADING: 'LOADING',
  HANDWRITING: 'HANDWRITING', // Phase 8.5: Intermediate reveal
  DATE_AWARE: 'DATE_AWARE', // Phase 8: Pre-birthday countdown scene
  INTRO: 'INTRO', // Cinematic opening
  GALLERY: 'GALLERY', // Artist chapter / photos
  MESSAGE: 'MESSAGE', // Final personal message
};

// Target date for the birthday (Set to mock date for dev if needed, or actual date)
export const BIRTHDAY_DATE = "2026-08-01T00:00:00Z";

// Animation Timings (in seconds, mapped from the design system)
export const TIMING = {
  MICRO: 0.4,
  REVEAL: 1.5,
  SCENE_TRANSITION: 2.5,
};

// Custom Easing Curves (mapped from design system)
export const EASING = {
  lux: [0.22, 1, 0.36, 1], // Slow, elegant deceleration
};
