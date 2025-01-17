import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { LevelProvider } from './contexts/LevelContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { theme } from './theme/theme';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GamePage from './components/GamePage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <ProgressProvider>
            <LevelProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/game"
                  element={
                    <PrivateRoute>
                      <GamePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/game" replace />} />
              </Routes>
            </LevelProvider>
          </ProgressProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App; 