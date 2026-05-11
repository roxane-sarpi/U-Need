import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'   ← commenter ou supprimer
// import './tailwind.css' ← commenter ou supprimer ici
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
