import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Navbar />
      <Container
        component="main"
        sx={{
          flex: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout; 