import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SceneProvider, AudioProvider, TimeProvider } from './context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimeProvider>
      <AudioProvider>
        <SceneProvider>
          <App />
        </SceneProvider>
      </AudioProvider>
    </TimeProvider>
  </StrictMode>,
)
