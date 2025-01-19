import React, { createContext, useContext, useState, useCallback } from 'react';
import { CodeExplanation } from '../types/explanation';
import { SolutionExample } from '../types/solution';
import { HintSystem } from '../types/hint';

interface LearningContextType {
  // コード解説
  explanation: CodeExplanation | null;
  setExplanation: (exp: CodeExplanation | null) => void;
  
  // 模範解答
  solution: SolutionExample | null;
  setSolution: (sol: SolutionExample | null) => void;
  
  // ヒントシステム
  hintSystem: HintSystem | null;
  setHintSystem: (hints: HintSystem | null) => void;
  unlockHint: (hintId: string) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [solution, setSolution] = useState<SolutionExample | null>(null);
  const [hintSystem, setHintSystem] = useState<HintSystem | null>(null);

  const unlockHint = useCallback((hintId: string) => {
    setHintSystem(prev => {
      if (!prev) return null;
      return {
        ...prev,
        unlockedHints: [...prev.unlockedHints, hintId]
      };
    });
  }, []);

  const value = {
    explanation,
    setExplanation,
    solution,
    setSolution,
    hintSystem,
    setHintSystem,
    unlockHint
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}; 