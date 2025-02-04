import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { LevelProvider } from './contexts/LevelContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LearningProvider } from './contexts/LearningContext';
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
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/game"
              element={
                <PrivateRoute>
                  <ProgressProvider>
                    <LevelProvider>
                      <LearningProvider>
                        <GamePage />
                      </LearningProvider>
                    </LevelProvider>
                  </ProgressProvider>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/game" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App; 