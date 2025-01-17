import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import styled from '@emotion/styled';

const MagicCard = styled(Card)`
  background: rgba(98, 0, 234, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(179, 136, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(179, 136, 255, 0.8);
    box-shadow: 0 5px 15px rgba(98, 0, 234, 0.3);
  }
`;

const GlowingProgress = styled(LinearProgress)`
  height: 10px;
  border-radius: 5px;
  background-color: rgba(179, 136, 255, 0.2);

  .MuiLinearProgress-bar {
    background-color: #B388FF;
    box-shadow: 0 0 10px #B388FF;
  }
`;

export const LearningPage: React.FC = () => {
  const [lessons] = useState([
    {
      title: '第1章: 魔法の基礎',
      description: '変数と型の概念を学ぼう',
      progress: 100,
      difficulty: '初級',
      duration: '30分'
    },
    {
      title: '第2章: 魔法の制御',
      description: '条件分岐とループを理解しよう',
      progress: 60,
      difficulty: '初級',
      duration: '45分'
    },
    {
      title: '第3章: 魔法の関数',
      description: '関数とスコープについて学ぼう',
      progress: 30,
      difficulty: '中級',
      duration: '60分'
    },
    {
      title: '第4章: 魔法のオブジェクト',
      description: 'オブジェクト指向プログラミングの基礎',
      progress: 0,
      difficulty: '中級',
      duration: '90分'
    }
  ]);

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" 
        sx={{ color: 'primary.light', textShadow: '0 0 10px #B388FF' }}>
        魔法の学習
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {lessons.map((lesson, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MagicCard>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary.light">
                  {lesson.title}
                </Typography>
                <Typography variant="body1" color="secondary" paragraph>
                  {lesson.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip 
                    label={lesson.difficulty} 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(98, 0, 234, 0.2)',
                      color: 'primary.light'
                    }}
                  />
                  <Chip 
                    label={lesson.duration}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(98, 0, 234, 0.2)',
                      color: 'primary.light'
                    }}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="secondary" gutterBottom>
                    進捗状況: {lesson.progress}%
                  </Typography>
                  <GlowingProgress 
                    variant="determinate" 
                    value={lesson.progress} 
                  />
                </Box>
              </CardContent>
            </MagicCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 