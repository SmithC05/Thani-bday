import { useState, useEffect } from 'react';

/**
 * useWindowSize
 * 
 * Returns the current window dimensions. Useful for responsive layouts
 * or canvas sizing for our particle background.
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call at initialization

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
