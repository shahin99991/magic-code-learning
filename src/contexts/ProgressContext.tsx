import React, { createContext, useContext, useState, useEffect } from 'react';
import { Boss } from '../types/game';

interface Progress {
  completedChallenges: string[];
  totalPoints: number;
  bossesState: Record<'easy' | 'medium' | 'hard', Boss>;
}

interface ProgressContextType {
  progress: Progress | null;
  completeChallenge: (challengeId: string) => void;
  updateBossHp: (difficulty: 'easy' | 'medium' | 'hard', damage: number) => Promise<void>;
  resetProgress: () => void;
  resetDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const defaultBosses: Record<'easy' | 'medium' | 'hard', Boss> = {
  easy: {
    name: '見習い魔法使いのボス',
    maxHp: 1000,
    currentHp: 1000,
    image: '🧙‍♂️',
  },
  medium: {
    name: '上級魔法使いのボス',
    maxHp: 2000,
    currentHp: 2000,
    image: '🧙‍♀️',
  },
  hard: {
    name: '大魔法使いのボス',
    maxHp: 3000,
    currentHp: 3000,
    image: '🧙‍♂️✨',
  },
};

const defaultProgress: Progress = {
  completedChallenges: [],
  totalPoints: 0,
  bossesState: defaultBosses,
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>(() => {
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
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem('gameProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [progress]);

  const completeChallenge = (challengeId: string) => {
    if (!challengeId) return;
    setProgress(prev => ({
      ...prev,
      completedChallenges: [...prev.completedChallenges, challengeId],
    }));
  };

  const updateBossHp = async (difficulty: 'easy' | 'medium' | 'hard', damage: number) => {
    if (!difficulty || typeof damage !== 'number') return;
    setProgress(prev => ({
      ...prev,
      bossesState: {
        ...prev.bossesState,
        [difficulty]: {
          ...prev.bossesState[difficulty],
          currentHp: Math.max(0, prev.bossesState[difficulty].currentHp - damage),
        },
      },
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    try {
      localStorage.removeItem('gameProgress');
    } catch (error) {
      console.error('Failed to reset progress:', error);
    }
  };

  const resetDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!difficulty) return;
    setProgress(prev => ({
      ...prev,
      bossesState: {
        ...prev.bossesState,
        [difficulty]: defaultBosses[difficulty],
      },
    }));
  };

  const value = {
    progress,
    completeChallenge,
    updateBossHp,
    resetProgress,
    resetDifficulty,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}; 