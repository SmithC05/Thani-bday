import { animationTimings } from '../config';

/**
 * Animation Engine Presets
 * Centralizes all Framer Motion configurations to guarantee perfectly synced timings across the app.
 */

// Easing curves matching the luxury cinematic feel
export const easeCinematic = [0.16, 1, 0.3, 1]; // custom cubic bezier
export const easeSlow = [0.25, 0.1, 0.25, 1];

export const fadeIn = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: animationTimings.reveal, ease: easeCinematic }
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(5px)',
    transition: { duration: animationTimings.micro, ease: easeCinematic }
  }
};

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: animationTimings.reveal, ease: easeCinematic }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: animationTimings.micro }
  }
};

export const staggerContainer = (staggerChildren = 0.2) => ({
  animate: {
    transition: {
      staggerChildren
    }
  }
});
