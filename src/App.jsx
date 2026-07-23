import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useScene } from './context/SceneContext';
import { SCENES } from './constants';
import { OpeningScene } from './scenes/OpeningScene';
import { HandwritingReveal } from './scenes/HandwritingReveal';
import { DateAwareScene } from './scenes/DateAwareScene';
import { SecretVault } from './scenes/SecretVault';
import { MemoryJourney } from './scenes/MemoryJourney';
import { Loader } from './components/ui/Loader';
import { Background } from './components/ui/Background';
import { useMediaLoading } from './hooks/useMediaLoading';
import { MagicCursor } from './components/ui/MagicCursor';

// Memory data is now managed internally by MemoryJourney

function App() {
  const { currentScene } = useScene();
  
  // Note: Later we will read this array from config/gallery.json
  const initialAssetsToLoad = [
    '/images/gift-assets/gift-box.png'
  ];
  const { progress, isLoaded } = useMediaLoading(initialAssetsToLoad);

  return (
    <>
      <MagicCursor />
      <Background />
      
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader key="loader" progress={progress} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoaded && currentScene === SCENES.LOADING && (
          // We map SCENES.LOADING to OpeningScene for now as the entry point
          <OpeningScene key="opening" />
        )}
        
        {isLoaded && currentScene === SCENES.HANDWRITING && (
          <HandwritingReveal key="handwriting" />
        )}
        
        {/* Birthday Reveal */}
        {isLoaded && currentScene === SCENES.DATE_AWARE && (
          <DateAwareScene key="date-aware" />
        )}

        {/* Phase 9.1: Secret Vault */}
        {isLoaded && currentScene === SCENES.SECRET_VAULT && (
          <SecretVault key="secret-vault" />
        )}

        {/* Phase 10: Memory Journey — all chapters in one self-contained component */}
        {isLoaded && (currentScene === SCENES.MEMORY_JOURNEY_SOLO || currentScene === SCENES.MEMORY_JOURNEY_TOGETHER) && (
          <MemoryJourney key="memory-journey" />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
