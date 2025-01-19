import React, { createContext, useContext, useState } from 'react';
import type { CodeExplanation } from '../types/explanation';
import type { SolutionExample } from '../types/solution';
import type { Hint } from '../types/hint';

interface LearningContextType {
  // コード解説
  explanation: CodeExplanation | null;
  setExplanation: (explanation: CodeExplanation | null) => void;
  
  // 模範解答
  solution: SolutionExample | null;
  setSolution: (solution: SolutionExample | null) => void;
  
  // ヒントシステム
  hintSystem: Hint[];
  setHintSystem: (hints: Hint[]) => void;
  unlockHint: (hintId: string) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [solution, setSolution] = useState<SolutionExample | null>(null);
  const [hintSystem, setHintSystem] = useState<Hint[]>([]);

  const unlockHint = (hintId: string) => {
    setHintSystem(prev => 
      prev.map(hint => 
        hint.level.toString() === hintId 
          ? { ...hint, unlocked: true }
          : hint
      )
    );
  };

  const value: LearningContextType = {
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