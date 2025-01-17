import React from 'react';
import { Box } from '@mui/material';

const MagicBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        zIndex: -1,
      }}
    />
  );
};

export default MagicBackground; 