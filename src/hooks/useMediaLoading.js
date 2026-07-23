import { useState, useEffect } from 'react';

/**
 * Media Engine
 * Preloads assets mapping and tracks loading progress (0-100).
 * Prevents FOUC (Flash of unstyled content) by ensuring critical assets are cached.
 */
export function useMediaLoading(assetList = []) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (assetList.length === 0) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }
    
    let loadedCount = 0;
    const total = assetList.length;

    assetList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) setIsLoaded(true);
      };
      img.onerror = () => {
        // If one fails, still increment so we don't hang the loader forever
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) setIsLoaded(true);
      };
    });
  }, [assetList]);

  return { progress, isLoaded };
}
