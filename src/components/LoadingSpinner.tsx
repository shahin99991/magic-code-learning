import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  color = '#4CAF50' 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          border: `4px solid ${color}`,
          borderTop: '4px solid transparent',
          borderRadius: '50%',
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </Box>
  );
}; 