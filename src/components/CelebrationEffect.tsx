import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

interface CelebrationEffectProps {
  show: boolean;
  message: string;
  points: number;
  onComplete?: () => void;
}

export const CelebrationEffect: React.FC<CelebrationEffectProps> = ({
  show,
  message,
  points,
  onComplete
}) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <Box
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
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#FFD700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                marginBottom: 2,
                textAlign: 'center'
              }}
            >
              {message}
            </Typography>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: '#4CAF50',
                  textAlign: 'center'
                }}
              >
                +{points} Points!
              </Typography>
            </motion.div>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}; 