import React, { useState } from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface HintSystemProps {
  hints: Array<{
    level: number;
    content: string;
    cost: number;
  }>;
}

export const HintSystem: React.FC<HintSystemProps> = ({ hints }) => {
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);

  const handleUnlockHint = (level: number) => {
    if (!unlockedHints.includes(level)) {
      setUnlockedHints([...unlockedHints, level]);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        ヒントシステム
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        ヒントを見ることでポイントが減少します。自力での解決を目指してください。
      </Typography>

      <Stack spacing={2}>
        {hints.map((hint, index) => (
          <Box key={index} sx={{ border: 1, borderColor: 'divider', p: 2, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1">
                ヒント {hint.level}
              </Typography>
              <Chip
                icon={<LightbulbIcon />}
                label={`コスト: ${hint.cost}ポイント`}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
            
            {unlockedHints.includes(hint.level) ? (
              <Typography variant="body1">
                {hint.content}
              </Typography>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleUnlockHint(hint.level)}
              >
                ヒントを表示
              </Button>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}; 