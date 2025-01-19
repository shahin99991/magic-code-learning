import React from 'react';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import { useLevel } from '../contexts/LevelContext';
import type { Hint } from '../types/hint';

interface HintSystemProps {
  hints: Hint[];
  onUnlockHint: (hintId: string) => void;
}

export const HintSystem: React.FC<HintSystemProps> = ({ hints, onUnlockHint }) => {
  const { currentExp } = useLevel();
  const unlockedHints = hints.filter(hint => hint.unlocked);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        ヒントシステム
      </Typography>
      <Typography variant="body2" gutterBottom>
        解放済みヒント: {unlockedHints.length} / {hints.length}
      </Typography>
      <List>
        {hints.map((hint, index) => (
          <ListItem key={index}>
            <Box>
              <Typography variant="subtitle1">
                ヒント {hint.level}
              </Typography>
              {hint.unlocked ? (
                <Typography variant="body1">{hint.content}</Typography>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={currentExp < hint.cost}
                    onClick={() => onUnlockHint(hint.level.toString())}
                  >
                    {hint.cost} EXPで解放
                  </Button>
                  {currentExp < hint.cost && (
                    <Typography variant="caption" color="error">
                      必要な経験値が不足しています
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 