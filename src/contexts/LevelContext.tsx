import React, { createContext, useContext, useState, useEffect } from 'react';

interface LevelContextType {
  currentExp: number;
  currentLevel: number;
  expToNextLevel: number;
  totalExp: number;
  addExperience: (amount: number) => void;
  currentTitle: string;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const calculateExpForNextLevel = (level: number): number => {
  const baseExp = 100;
  return Math.floor(baseExp * (level * 1.5));
};

export const getTitleForLevel = (level: number): string => {
  if (level >= 20) return "熟練魔法使い";
  if (level >= 15) return "上級魔法使い";
  if (level >= 10) return "中級魔法使い";
  if (level >= 5) return "見習い魔法使い";
  return "魔法見習生";
};

export const LevelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentExp, setCurrentExp] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [expToNextLevel, setExpToNextLevel] = useState(calculateExpForNextLevel(1));
  const [totalExp, setTotalExp] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(getTitleForLevel(1));

  const checkLevelUp = () => {
    if (currentExp >= expToNextLevel) {
      const newLevel = currentLevel + 1;
      setCurrentLevel(newLevel);
      setCurrentExp(currentExp - expToNextLevel);
      setExpToNextLevel(calculateExpForNextLevel(newLevel));
      setCurrentTitle(getTitleForLevel(newLevel));
      // TODO: レベルアップ時のアニメーションや報酬の処理
    }
  };

  const addExperience = (amount: number) => {
    setCurrentExp(prev => prev + amount);
    setTotalExp(prev => prev + amount);
  };

  useEffect(() => {
    checkLevelUp();
  }, [currentExp]);

  return (
    <LevelContext.Provider
      value={{
        currentExp,
        currentLevel,
        expToNextLevel,
        totalExp,
        addExperience,
        currentTitle,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
}; 