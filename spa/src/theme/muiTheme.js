import { createTheme } from '@mui/material/styles'

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#000000', paper: '#1e2020' },
    primary: { main: '#ffb873', contrastText: '#4b2800' },
    secondary: { main: '#d66e4b', contrastText: '#5d1800' },
    text: { primary: '#e2e2e2', secondary: '#d9c2b0' },
    divider: 'rgba(255, 255, 255, 0.06)',
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

export default muiTheme