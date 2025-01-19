import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Button, Collapse } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SolutionExample as SolutionExampleType } from '../types/solution';

interface SolutionExampleProps {
  solution: SolutionExampleType;
}

export const SolutionExample: React.FC<SolutionExampleProps> = ({ solution }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          模範解答
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? '解答を隠す' : '解答を表示'}
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Collapse in={showSolution}>
        {/* コード */}
        <Box sx={{ mt: 2 }}>
          <SyntaxHighlighter language="javascript" style={materialDark}>
            {solution.code}
          </SyntaxHighlighter>
        </Box>

        {/* 解説 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">解説:</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {solution.explanation}
          </Typography>
        </Box>

        {/* 計算量 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">計算量:</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            時間計算量: {solution.complexity.time}
          </Typography>
          <Typography variant="body2">
            空間計算量: {solution.complexity.space}
          </Typography>
        </Box>

        {/* 代替アプローチ */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">代替アプローチ:</Typography>
          {solution.alternativeApproaches.map((approach, index) => (
            <Box key={index} sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                アプローチ {index + 1}: {approach.description}
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" color="success.main">
                  メリット:
                </Typography>
                <ul>
                  {approach.pros.map((pro, i) => (
                    <li key={i}>
                      <Typography variant="body2">{pro}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="body2" color="error.main">
                  デメリット:
                </Typography>
                <ul>
                  {approach.cons.map((con, i) => (
                    <li key={i}>
                      <Typography variant="body2">{con}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
}; 