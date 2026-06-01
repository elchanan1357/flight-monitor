import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeApp from './ThemeApp.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeApp />
  </StrictMode>,
)
