import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LevelProvider } from './contexts/LevelContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LearningProvider } from './contexts/LearningContext';
import { theme } from './theme/theme';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <LevelProvider>
            <ProgressProvider>
              <LearningProvider>
                {children}
              </LearningProvider>
            </ProgressProvider>
          </LevelProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render }; 