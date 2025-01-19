import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

interface LevelUpEffectProps {
  show: boolean;
  level: number;
  onComplete?: () => void;
}

export const LevelUpEffect: React.FC<LevelUpEffectProps> = ({
  show,
  level,
  onComplete
}) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
          }}
        >
          <Typography
            component={motion.h1}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            sx={{
              color: '#FFD700',
              fontSize: '4rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              marginBottom: 2,
            }}
          >
            LEVEL UP!
          </Typography>
          <Typography
            component={motion.h2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            sx={{
              color: '#FFF',
              fontSize: '3rem',
              fontWeight: 'bold',
            }}
          >
            Level {level}
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );
}; 