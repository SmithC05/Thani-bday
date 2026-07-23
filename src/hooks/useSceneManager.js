import { useState, useCallback } from 'react';
import { SCENES } from '../constants';
import { devMode } from '../config';

/**
 * Scene Engine
 * Orchestrates the cinematic scene flow without traditional routing.
 */
export function useSceneManager() {
  const [currentScene, setCurrentScene] = useState(devMode.enabled && devMode.startScene ? devMode.startScene : SCENES.LOADING);

  const transitionTo = useCallback((newScene) => {
    // Allows us to intercept GSAP page transitions before React unmounts
    setCurrentScene(newScene);
  }, []);

  const preloadNext = useCallback(() => {
    // Concept: reads the next scene in the order array and triggers Media Engine early
    console.log("Preloading assets for next scene...");
  }, []);

  const next = useCallback(() => {
    const order = [
      SCENES.LOADING, 
      SCENES.HANDWRITING,
      SCENES.DATE_AWARE,
      SCENES.SECRET_VAULT,
      SCENES.MEMORY_JOURNEY_SOLO,
      SCENES.MEMORY_JOURNEY_TOGETHER,
      SCENES.INTERACTIVE_WISHES,
      SCENES.ARTIST_CHAPTER,
      SCENES.FINAL_MESSAGE
    ];
    const currentIndex = order.indexOf(currentScene);
    if (currentIndex >= 0 && currentIndex < order.length - 1) {
      preloadNext();
      transitionTo(order[currentIndex + 1]);
    }
  }, [currentScene, transitionTo, preloadNext]);

  return { currentScene, transitionTo, next };
}
