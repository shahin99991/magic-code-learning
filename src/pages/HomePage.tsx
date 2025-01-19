import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const MagicCard = styled(Box)`
  background: rgba(98, 0, 234, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(179, 136, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(179, 136, 255, 0.8);
    box-shadow: 0 5px 15px rgba(98, 0, 234, 0.3);
  }
`;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const navigationCards = [
    {
      title: '魔法の学習',
      description: 'プログラミングの基礎を学ぼう',
      path: '/learning'
    },
    {
      title: '魔法詠唱',
      description: '実際にコードを書いて魔法を使おう',
      path: '/coding'
    },
    {
      title: '魔導書',
      description: 'あなたの学習進捗を確認しよう',
      path: '/profile'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2 
        }}
      >
        Welcome to Magic Code Learning
      </Typography>
      <Typography variant="h5" color="secondary" gutterBottom>
        プログラミングは現代の魔法。あなたも魔法使いになろう。
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {navigationCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <MagicCard onClick={() => navigate(card.path)}>
              <Typography variant="h4" color="primary.light" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body1" color="secondary">
                {card.description}
              </Typography>
            </MagicCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/learning')}
          sx={{ minWidth: 200 }}
        >
          学習を始める
        </Button>
      </Box>
    </Container>
  );
}; 