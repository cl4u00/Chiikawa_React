import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'        /* Este es el que vaciamos antes */
import './chiikawa.css'     /* Tus estilos principales */
import './registro.css'     /* Tus estilos de login */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
