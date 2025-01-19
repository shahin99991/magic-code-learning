import React, { createContext, useContext, useState } from 'react';

interface LevelContextType {
  level: number;
  experience: number;
  currentExp: number;
  currentLevel: number;
  expToNextLevel: number;
  currentTitle: string;
  addExperience: (amount: number) => void;
}

const LevelContext = createContext<LevelContextType | null>(null);

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
};

export const LevelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  const expToNextLevel = level * 1000;
  const currentExp = experience;
  const currentLevel = level;
  const currentTitle = getTitleForLevel(level);

  const addExperience = (amount: number) => {
    setExperience(prev => {
      const newExp = prev + amount;
      const expForNextLevel = level * 1000;
      if (newExp >= expForNextLevel) {
        setLevel(prev => prev + 1);
        return newExp - expForNextLevel;
      }
      return newExp;
    });
  };

  return (
    <LevelContext.Provider 
      value={{ 
        level, 
        experience, 
        currentExp,
        currentLevel,
        expToNextLevel,
        currentTitle,
        addExperience 
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

function getTitleForLevel(level: number): string {
  if (level < 5) return '見習い魔法使い';
  if (level < 10) return '初級魔法使い';
  if (level < 15) return '中級魔法使い';
  if (level < 20) return '上級魔法使い';
  return '大魔法使い';
} 