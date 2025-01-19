import React, { createContext, useContext, useState, useEffect } from 'react';
import { Boss, Progress } from '../types/game';

interface ProgressContextType {
  progress: Progress | null;
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
  const [progress, setProgress] = useState<Progress | null>(() => {
    try {
      const savedProgress = localStorage.getItem('gameProgress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed && 
            Array.isArray(parsed.completedChallenges) && 
            typeof parsed.totalPoints === 'number' && 
            parsed.bossesState) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to parse saved progress:', error);
    }
    return {
      completedChallenges: [],
      totalPoints: 0,
      bossesState: {
        easy: { name: '見習い魔法使いのボス', maxHp: 1000, currentHp: 1000, image: '🧙‍♂️' },
        medium: { name: '上級魔法使いのボス', maxHp: 2000, currentHp: 2000, image: '🧙‍♀️' },
        hard: { name: '大魔法使いのボス', maxHp: 3000, currentHp: 3000, image: '🧙‍♂️✨' }
      }
    };
  });

  const updateProgress = (points: number) => {
    setProgress(prev => {
      if (!prev) return null;
      return {
        ...prev,
        totalPoints: prev.totalPoints + points
      };
    });
  };

  useEffect(() => {
    if (progress) {
      try {
        localStorage.setItem('gameProgress', JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}; 