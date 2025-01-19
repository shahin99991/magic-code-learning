import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Boss } from '../types/game';

interface BossDisplayProps {
  boss: Boss;
}

const BossDisplay: React.FC<BossDisplayProps> = ({ boss }) => {
  const getBossStatus = (boss: Boss) => {
    const hpPercentage = (boss.currentHp / boss.maxHp) * 100;
    if (boss.currentHp === 0) return '倒れた！';
    if (hpPercentage <= 25) return '瀕死';
    if (hpPercentage <= 50) return '苦戦中';
    if (hpPercentage <= 75) return '余裕がある';
    return '健在';
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h5" component="span">
          {boss.image}
        </Typography>
        <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
          {boss.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          状態: {getBossStatus(boss)}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', bgcolor: 'grey.300', borderRadius: 1, height: 20, position: 'relative' }}>
        <Box
          sx={{
            width: `${(boss.currentHp / boss.maxHp) * 100}%`,
            bgcolor: 'error.main',
            height: '100%',
            borderRadius: 1,
            transition: 'width 0.5s ease-in-out',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textShadow: '1px 1px 2px black',
          }}
        >
          HP: {boss.currentHp} / {boss.maxHp}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BossDisplay; 