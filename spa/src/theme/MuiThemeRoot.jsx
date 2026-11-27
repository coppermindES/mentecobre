import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from '../App'
import muiTheme from './muiTheme'
import muiThemeLight from './muiThemeLight'
import { useThemeMode } from './useThemeMode'

export default function MuiThemeRoot() {
  const { mode } = useThemeMode()
  const theme = mode === 'light' ? muiThemeLight : muiTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}