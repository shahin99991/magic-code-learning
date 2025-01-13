import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7B1FA2', // 深い紫：魔法の神秘性
      light: '#9C27B0',
      dark: '#4A148C',
    },
    secondary: {
      main: '#FFB300', // 金色：達成感
      light: '#FFD54F',
      dark: '#FF8F00',
    },
    info: {
      main: '#00BCD4', // 青：知性
      light: '#4DD0E1',
      dark: '#0097A7',
    },
    success: {
      main: '#4CAF50', // 緑：達成
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#F44336', // 赤：エラー
      light: '#E57373',
      dark: '#D32F2F',
    },
    background: {
      default: '#F5F5F5', // 明るいグレー：読みやすさ
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121', // 濃いグレー：可読性
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '0.875rem',
    },
    code: {
      fontFamily: 'Source Code Pro, monospace',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
}); 