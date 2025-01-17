import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameProgress {
  completedChallenges: string[];
  totalPoints: number;
  bossesState: Record<'easy' | 'medium' | 'hard', {
    currentHp: number;
    maxHp: number;
  }>;
  lastPlayedChallenge?: string;
}

interface ProgressContextType {
  progress: GameProgress;
  updateProgress: (newProgress: Partial<GameProgress>) => void;
  completeChallenge: (challengeId: string, points: number) => void;
  updateBossHp: (difficulty: 'easy' | 'medium' | 'hard', damage: number) => void;
  resetProgress: () => void;
  resetDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const defaultProgress: GameProgress = {
  completedChallenges: [],
  totalPoints: 0,
  bossesState: {
    easy: { currentHp: 1000, maxHp: 1000 },
    medium: { currentHp: 2000, maxHp: 2000 },
    hard: { currentHp: 3000, maxHp: 3000 },
  },
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const savedProgress = localStorage.getItem('gameProgress');
    return savedProgress ? JSON.parse(savedProgress) : defaultProgress;
  });

  const updateProgress = (newProgress: Partial<GameProgress>) => {
    setProgress(prev => {
      const updated = { ...prev, ...newProgress };
      localStorage.setItem('gameProgress', JSON.stringify(updated));
      return updated;
    });
  };

  const completeChallenge = (challengeId: string, points: number) => {
    if (!progress.completedChallenges.includes(challengeId)) {
      updateProgress({
        completedChallenges: [...progress.completedChallenges, challengeId],
        totalPoints: progress.totalPoints + points,
        lastPlayedChallenge: challengeId,
      });
    }
  };

  const updateBossHp = (difficulty: 'easy' | 'medium' | 'hard', damage: number) => {
    const currentBoss = progress.bossesState[difficulty];
    const newHp = Math.max(0, currentBoss.currentHp - damage);
    
    updateProgress({
      bossesState: {
        ...progress.bossesState,
        [difficulty]: {
          ...currentBoss,
          currentHp: newHp,
        },
      },
    });
  };

  const resetProgress = () => {
    localStorage.removeItem('gameProgress');
    setProgress(defaultProgress);
  };

  const resetDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    const difficultyPrefix = difficulty === 'easy' ? '1' : difficulty === 'medium' ? '4' : '7';
    const challengesToRemove = progress.completedChallenges.filter(id => 
      id.startsWith(difficultyPrefix) || 
      (difficulty === 'easy' && (id === '2' || id === '3' || id === '10' || id === '11')) ||
      (difficulty === 'medium' && (id === '5' || id === '6' || id === '12' || id === '13')) ||
      (difficulty === 'hard' && (id === '8' || id === '9' || id === '14' || id === '15'))
    );

    const pointsToRemove = challengesToRemove.reduce((total, id) => {
      if (id.startsWith('1') || id.startsWith('2') || id.startsWith('3') || id === '10' || id === '11') return total + 100;
      if (id.startsWith('4') || id.startsWith('5') || id.startsWith('6') || id === '12' || id === '13') return total + 200;
      return total + 300;
    }, 0);

    updateProgress({
      completedChallenges: progress.completedChallenges.filter(id => !challengesToRemove.includes(id)),
      totalPoints: progress.totalPoints - pointsToRemove,
      bossesState: {
        ...progress.bossesState,
        [difficulty]: {
          currentHp: defaultProgress.bossesState[difficulty].currentHp,
          maxHp: defaultProgress.bossesState[difficulty].maxHp,
        },
      },
    });
  };

  useEffect(() => {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        completeChallenge,
        updateBossHp,
        resetProgress,
        resetDifficulty,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 