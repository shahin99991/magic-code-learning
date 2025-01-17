import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useLevel } from '../contexts/LevelContext';

const LevelDisplay: React.FC = () => {
  const { currentExp, currentLevel, expToNextLevel, currentTitle } = useLevel();
  const expPercentage = (currentExp / expToNextLevel) * 100;

  return (
    <Box sx={{ 
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
      minWidth: 200,
    }}>
      <Typography variant="h6" gutterBottom>
        Lv. {currentLevel} - {currentTitle}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          EXP:
        </Typography>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={expPercentage} 
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4caf50',
              },
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ minWidth: 60 }}>
          {currentExp}/{expToNextLevel}
        </Typography>
      </Box>
    </Box>
  );
};

export default LevelDisplay; 