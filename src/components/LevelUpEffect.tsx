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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1100,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 1,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: '#FFD700',
                textShadow: '0 0 10px #FFD700',
                marginBottom: 2,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              LEVEL UP!
            </Typography>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: '#4CAF50',
                  textAlign: 'center',
                  textShadow: '0 0 5px #4CAF50'
                }}
              >
                Level {level}
              </Typography>
            </motion.div>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}; 