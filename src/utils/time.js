import { birthdayConfig } from '../config';

/**
 * Countdown Engine
 * Reusable mathematical utilities for time remaining until the lock lifts.
 */
export function calculateTimeRemaining(targetDateStr = birthdayConfig.targetDate) {
  const targetDate = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUnlocked: true,
      rawDifference: 0
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isUnlocked: false,
    rawDifference: difference
  };
}

/**
 * Formats time blocks into two-digit strings for cinematic typography.
 */
export function padTime(timeValue) {
  return timeValue.toString().padStart(2, '0');
}
