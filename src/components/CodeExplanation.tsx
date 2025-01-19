import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

interface CodeExplanationProps {
  explanation: {
    lineByLine: string[];
    concepts: string[];
    tips: string[];
  };
}

export const CodeExplanation: React.FC<CodeExplanationProps> = ({ explanation }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        コードの解説
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        行ごとの説明:
      </Typography>
      <List>
        {explanation.lineByLine.map((line, index) => (
          <ListItem key={index}>
            <ListItemText primary={line} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        使用される概念:
      </Typography>
      <List>
        {explanation.concepts.map((concept, index) => (
          <ListItem key={index}>
            <ListItemText primary={concept} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Tips:
      </Typography>
      <List>
        {explanation.tips.map((tip, index) => (
          <ListItem key={index}>
            <ListItemText primary={`💡 ${tip}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 