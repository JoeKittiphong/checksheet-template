import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { KeypadProvider } from './context/KeypadContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <KeypadProvider>
        <App />
      </KeypadProvider>
    </AuthProvider>
  </StrictMode>,
)
