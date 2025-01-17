import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EA',
      light: '#B388FF',
      dark: '#3700B3',
    },
    secondary: {
      main: '#E8E3F4',
      light: '#FFFFFF',
      dark: '#B1AAC4',
    },
  },
  typography: {
    fontFamily: 'Rajdhani, Arial, sans-serif',
    h1: {
      background: 'linear-gradient(45deg, #B388FF 30%, #6200EA 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #6200EA 30%, #B388FF 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(98, 0, 234, .3)',
          color: 'white',
          padding: '0 30px',
          '&:hover': {
            background: 'linear-gradient(45deg, #B388FF 30%, #6200EA 90%)',
            boxShadow: '0 3px 5px 2px rgba(179, 136, 255, .3)',
          },
        },
      },
    },
  },
}); 