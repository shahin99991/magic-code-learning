import React from 'react';
import { Box, Typography, Paper, Button, Chip, Divider } from '@mui/material';
import { HintSystem as HintSystemType } from '../types/hint';
import { useLevel } from '../contexts/LevelContext';

interface HintSystemProps {
  hints: HintSystemType;
  onUnlockHint: (hintId: string) => void;
}

export const HintSystem: React.FC<HintSystemProps> = ({ hints, onUnlockHint }) => {
  const { currentExp } = useLevel();

  const getHintLevelColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        ヒントシステム
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Box sx={{ mt: 2 }}>
        {hints.hints.map((hint, index) => {
          const isUnlocked = hints.unlockedHints.includes(String(index));
          const canUnlock = currentExp >= hint.unlockCost;

          return (
            <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Chip
                  label={`ヒント ${index + 1}`}
                  color={getHintLevelColor(hint.level)}
                  size="small"
                />
                {!isUnlocked && (
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!canUnlock}
                    onClick={() => onUnlockHint(String(index))}
                  >
                    {`${hint.unlockCost} EXPで解放`}
                  </Button>
                )}
              </Box>

              {isUnlocked ? (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    {hint.content}
                  </Typography>
                  {hint.code && (
                    <Paper variant="outlined" sx={{ p: 1, mt: 1, bgcolor: 'grey.100' }}>
                      <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                        {hint.code}
                      </Typography>
                    </Paper>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {canUnlock ? 'クリックして解放' : '必要な経験値が不足しています'}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {`解放済みヒント: ${hints.unlockedHints.length} / ${hints.totalHints}`}
        </Typography>
      </Box>
    </Paper>
  );
}; 