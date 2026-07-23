import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/time';

/**
 * useDateLock
 * Manages the countdown state to determine if the cinematic experience is "unlocked".
 */
export function useDateLock() {
  const [timeState, setTimeState] = useState(calculateTimeRemaining());

  useEffect(() => {
    let animationFrameId;

    const tick = () => {
      const state = calculateTimeRemaining();
      setTimeState(state);

      if (!state.isUnlocked) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return timeState;
}
