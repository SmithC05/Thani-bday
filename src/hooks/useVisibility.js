import { useState, useEffect } from 'react';

/**
 * Performance Engine
 * Pauses heavy animations and sounds when the user switches tabs or minimizing the browser.
 */
export function useVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      // Howler automatically mutes on visibility hidden natively, but we can hook in if needed
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isVisible;
}
