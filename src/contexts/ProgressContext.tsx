import React, { createContext, useContext, useState } from 'react';
import { GameState } from '../types/game';

interface ProgressContextType {
  progress: GameState | null;
  updateProgress: (points: number) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<GameState | null>(null);

  const updateProgress = (points: number) => {
    setProgress((prev: GameState | null) => {
      if (!prev) return null;
      return {
        ...prev,
        totalPoints: prev.totalPoints + points
      };
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}; 