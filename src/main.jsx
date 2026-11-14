import { StrictMode } from 'react' // StrictMode para ayudar a 
// identificar problemas potenciales en la aplicación durante el desarrollo.

import { createRoot } from 'react-dom/client' // el root es el punto de entrada de la 
// aplicación React, donde se monta el componente principal.

import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( // Creamos el root de la aplicación y 
// renderizamos el componente App dentro del BrowserRouter para habilitar el
//  enrutamiento en la aplicación.
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)