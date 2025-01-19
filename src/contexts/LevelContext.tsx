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

// LocalStorageのキー
const LEVEL_DATA_KEY = 'magicCodeLearning_levelData';

// LocalStorageから経験値データを読み込む
const loadLevelData = () => {
  const savedData = localStorage.getItem(LEVEL_DATA_KEY);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
};

// LocalStorageに経験値データを保存
const saveLevelData = (data: {
  currentExp: number;
  currentLevel: number;
  totalExp: number;
}) => {
  localStorage.setItem(LEVEL_DATA_KEY, JSON.stringify(data));
};

export const LevelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 初期値の設定（LocalStorageから読み込むか、デフォルト値を使用）
  const savedData = loadLevelData();
  const [currentExp, setCurrentExp] = useState(savedData?.currentExp ?? 0);
  const [currentLevel, setCurrentLevel] = useState(savedData?.currentLevel ?? 1);
  const [totalExp, setTotalExp] = useState(savedData?.totalExp ?? 0);
  const [expToNextLevel, setExpToNextLevel] = useState(calculateExpForNextLevel(savedData?.currentLevel ?? 1));
  const [currentTitle, setCurrentTitle] = useState(getTitleForLevel(savedData?.currentLevel ?? 1));

  const checkLevelUp = () => {
    if (currentExp >= expToNextLevel) {
      const newLevel = currentLevel + 1;
      setCurrentLevel(newLevel);
      setCurrentExp(currentExp - expToNextLevel);
      setExpToNextLevel(calculateExpForNextLevel(newLevel));
      setCurrentTitle(getTitleForLevel(newLevel));
    }
  };

  const addExperience = (amount: number) => {
    setCurrentExp(prev => prev + amount);
    setTotalExp(prev => prev + amount);
  };

  // 経験値データの変更を監視してLocalStorageに保存
  useEffect(() => {
    saveLevelData({
      currentExp,
      currentLevel,
      totalExp,
    });
  }, [currentExp, currentLevel, totalExp]);

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
    throw new Error('useLevelは LevelProvider 内で使用する必要があります');
  }
  return context;
}; 