import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import MagicBackground from '../components/MagicBackground';
import MagicParticles from '../components/MagicParticles';

const LoginPage: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <MagicBackground />
      <MagicParticles />
      <Container maxWidth="sm" sx={{ pt: 8 }}>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage; 