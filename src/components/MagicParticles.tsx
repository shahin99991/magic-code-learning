import React from 'react';
import { Box } from '@mui/material';

const MagicParticles: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200vw',
          height: '200vh',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          animation: 'sparkle 4s ease-in-out infinite',
        },
        '@keyframes sparkle': {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 0.3 },
        },
      }}
    />
  );
};

export default MagicParticles; 