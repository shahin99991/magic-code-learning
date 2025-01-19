import React, { createContext, useContext, useState, useEffect } from 'react';

interface LevelContextType {
  level: number;
  experience: number;
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
    <LevelContext.Provider value={{ level, experience, addExperience }}>
      {children}
    </LevelContext.Provider>
  );
}; 