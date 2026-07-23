import { createContext, useContext } from 'react';
import { useSceneManager } from '../hooks/useSceneManager';

const SceneContext = createContext(null);

export function SceneProvider({ children }) {
  const sceneState = useSceneManager();

  return (
    <SceneContext.Provider value={sceneState}>
      {children}
    </SceneContext.Provider>
  );
}

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) throw new Error('useScene must be used within a SceneProvider');
  return context;
};
