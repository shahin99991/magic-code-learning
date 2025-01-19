import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

interface DamageEffectProps {
  show: boolean;
  damage: number;
  position: { x: number; y: number };
  onComplete?: () => void;
}

export const DamageEffect: React.FC<DamageEffectProps> = ({
  show,
  damage,
  position,
  onComplete
}) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <Box
          sx={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
              y: -50,
              opacity: 0,
              scale: 1.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#FF4444',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              -{damage}
            </Typography>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}; 