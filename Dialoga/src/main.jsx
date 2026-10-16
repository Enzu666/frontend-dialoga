import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Procura no index.html a <div id="root"> e manda o React desenhar o app lá dentro.
// StrictMode só ajuda a achar erros durante o desenvolvimento, não muda nada pro usuário.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)