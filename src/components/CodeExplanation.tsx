import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { CodeExplanation as CodeExplanationType } from '../types/explanation';

interface CodeExplanationProps {
  explanation: CodeExplanationType;
}

export const CodeExplanation: React.FC<CodeExplanationProps> = ({ explanation }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        コードの解説
      </Typography>
      <Divider sx={{ my: 1 }} />
      
      {/* 行ごとの解説 */}
      <Box sx={{ mt: 2 }}>
        {explanation.lineByLineExplanation.map((line) => (
          <Box key={line.lineNumber} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              {`行 ${line.lineNumber}:`}
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {line.explanation}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 2, display: 'block' }}>
              概念: {line.concept}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 使用されている概念 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">使用されている概念:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {explanation.conceptsUsed.map((concept, index) => (
            <Paper key={index} variant="outlined" sx={{ px: 1, py: 0.5 }}>
              <Typography variant="body2">{concept}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Tips */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Tips:</Typography>
        <ul>
          {explanation.tips.map((tip, index) => (
            <li key={index}>
              <Typography variant="body2">{tip}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
}; 