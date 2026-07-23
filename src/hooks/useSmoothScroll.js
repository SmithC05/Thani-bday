import { useEffect, useState } from 'react';
import Lenis from 'lenis';

/**
 * Scroll Engine
 * Implements Lenis for buttery smooth cinematic scrolling.
 * Exposes scroll progress for GSAP integration.
 */
export function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e) => {
      setScrollY(e.scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return { scrollY };
}
