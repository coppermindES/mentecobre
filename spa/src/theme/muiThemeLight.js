import { createTheme } from '@mui/material/styles'

const muiThemeLight = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#fff8f3', paper: '#ffffff' },
    primary: { main: '#8c5000', contrastText: '#ffffff' },
    secondary: { main: '#8c3a1e', contrastText: '#ffffff' },
    text: { primary: '#201b17', secondary: '#574b40' },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
})

export default muiThemeLight