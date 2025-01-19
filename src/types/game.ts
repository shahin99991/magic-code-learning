export interface Boss {
  name: string;
  maxHp: number;
  currentHp: number;
  image: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hint?: string;
  initialCode: string;
  testCases: {
    input: any[];
    expected: any;
  }[];
}

export interface TestResult {
  input: any[];
  expected: any;
  actual: any;
  passed: boolean;
  success?: boolean;
  message?: string;
}

export interface GameState {
  bossesState: Record<'easy' | 'medium' | 'hard', Boss>;
  completedChallenges: string[];
  totalPoints: number;
} 