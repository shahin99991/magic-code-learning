import React from 'react';
import { Container, Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import MagicBackground from '../components/MagicBackground';
import MagicParticles from '../components/MagicParticles';

const RegisterPage: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <MagicBackground />
      <MagicParticles />
      <Container maxWidth="sm" sx={{ pt: 8 }}>
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage; 