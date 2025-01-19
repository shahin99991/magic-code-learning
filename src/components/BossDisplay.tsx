import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { Boss } from '../types/game';

interface BossDisplayProps {
  boss: Boss;
  results: { input: any[]; expected: any; actual: any; passed: boolean }[];
}

const BossDisplay: React.FC<BossDisplayProps> = ({ boss, results }) => {
  const [currentHp, setCurrentHp] = useState(boss.currentHp);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const passedTests = results.filter(result => result.passed).length;
    if (passedTests > 0) {
      const damage = passedTests * 100;
      setIsAnimating(true);
      const newHp = Math.max(0, currentHp - damage);
      
      // HPを徐々に減少させるアニメーション
      const step = damage / 10;
      let current = currentHp;
      const interval = setInterval(() => {
        current = Math.max(newHp, current - step);
        setCurrentHp(current);
        if (current <= newHp) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [results]);

  const hpPercentage = (currentHp / boss.maxHp) * 100;

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h5" sx={{ mr: 2 }}>
          {boss.image} {boss.name}
        </Typography>
        <Typography>
          HP: {Math.ceil(currentHp)}/{boss.maxHp}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={hpPercentage}
        sx={{
          height: 20,
          borderRadius: 1,
          backgroundColor: 'grey.300',
          '& .MuiLinearProgress-bar': {
            backgroundColor: isAnimating ? 'warning.main' : 'success.main',
            transition: 'transform 0.1s linear',
          },
        }}
      />
    </Box>
  );
};

export default BossDisplay; 