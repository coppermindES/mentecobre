import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeRoot from './theme/MuiThemeRoot'
import ThemeModeProvider from './theme/ThemeModeProvider'
import AuthProvider from './auth/AuthProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <AuthProvider>
          <MuiThemeRoot />
        </AuthProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>,
)