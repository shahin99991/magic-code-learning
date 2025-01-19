import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

interface SolutionExampleProps {
  solution: {
    code: string;
    explanation: string;
    complexity: {
      time: string;
      space: string;
    };
    alternatives: Array<{
      description: string;
      code: string;
    }>;
  };
}

export const SolutionExample: React.FC<SolutionExampleProps> = ({ solution }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        解答例
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        コード:
      </Typography>
      <SyntaxHighlighter language="javascript" style={docco}>
        {solution.code}
      </SyntaxHighlighter>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        説明:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {solution.explanation}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        計算量:
      </Typography>
      <Typography variant="body1">
        時間計算量: {solution.complexity.time}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        空間計算量: {solution.complexity.space}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        別解:
      </Typography>
      {solution.alternatives.map((alt, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {alt.description}
          </Typography>
          <SyntaxHighlighter language="javascript" style={docco}>
            {alt.code}
          </SyntaxHighlighter>
        </Box>
      ))}
    </Box>
  );
}; 