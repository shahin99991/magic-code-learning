import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

export const globalStyles = (
  <MuiGlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        width: '100%',
        height: '100%',
        WebkitOverflowScrolling: 'touch',
      },
      body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
      },
      '#root': {
        width: '100%',
        height: '100%',
      },
      input: {
        '&[type=number]': {
          MozAppearance: 'textfield',
          '&::-webkit-outer-spin-button': {
            margin: 0,
            WebkitAppearance: 'none',
          },
          '&::-webkit-inner-spin-button': {
            margin: 0,
            WebkitAppearance: 'none',
          },
        },
      },
      img: {
        display: 'block',
        maxWidth: '100%',
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      '.code-editor': {
        fontFamily: 'Source Code Pro, monospace',
        fontSize: '14px',
        lineHeight: 1.5,
      },
      '.magical-transition': {
        transition: 'all 0.3s ease-in-out',
      },
      '.hover-effect': {
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      },
      '.scroll-smooth': {
        scrollBehavior: 'smooth',
      },
      '@keyframes fadeIn': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      '@keyframes slideUp': {
        from: {
          transform: 'translateY(20px)',
          opacity: 0,
        },
        to: {
          transform: 'translateY(0)',
          opacity: 1,
        },
      },
      '.fade-in': {
        animation: 'fadeIn 0.3s ease-in-out',
      },
      '.slide-up': {
        animation: 'slideUp 0.3s ease-in-out',
      },
    }}
  />
); 