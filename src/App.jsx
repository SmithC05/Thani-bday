import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useScene } from './context/SceneContext';
import { SCENES } from './constants';
import { OpeningScene } from './scenes/OpeningScene';
import { HandwritingReveal } from './scenes/HandwritingReveal';
import { DateAwareScene } from './scenes/DateAwareScene';
import { Loader } from './components/ui/Loader';
import { Background } from './components/ui/Background';
import { useMediaLoading } from './hooks/useMediaLoading';
import { MagicCursor } from './components/ui/MagicCursor';

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
        
        {/* Future Scenes */}
        {isLoaded && currentScene === SCENES.DATE_AWARE && (
          <DateAwareScene key="date-aware" />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
