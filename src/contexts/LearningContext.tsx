import React, { createContext, useContext, useState } from 'react';
import type { Explanation } from '../types/explanation';
import type { Solution } from '../types/solution';
import type { Hint } from '../types/hint';

interface LearningContextType {
  // コード解説
  explanation: Explanation | null;
  setExplanation: (explanation: Explanation | null) => void;
  
  // 模範解答
  solution: Solution | null;
  setSolution: (solution: Solution | null) => void;
  
  // ヒントシステム
  hintSystem: Hint[] | null;
  setHintSystem: (hints: Hint[] | null) => void;
  unlockHint: (hintId: string) => void;
}

const LearningContext = createContext<LearningContextType | null>(null);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [hintSystem, setHintSystem] = useState<Hint[] | null>(null);

  const unlockHint = (hintId: string) => {
    if (!hintSystem) return;

    setHintSystem(prev => {
      if (!prev) return null;
      return prev.map(hint => 
        hint.level.toString() === hintId ? { ...hint, unlocked: true } : hint
      );
    });
  };

  return (
    <LearningContext.Provider
      value={{
        explanation,
        setExplanation,
        solution,
        setSolution,
        hintSystem,
        setHintSystem,
        unlockHint
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}; 