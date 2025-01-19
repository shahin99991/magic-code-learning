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
  initialCode: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hint?: string;
  testCases: {
    input: any[];
    expected: any;
  }[];
}

export interface Progress {
  completedChallenges: string[];
  totalPoints: number;
  bossesState: Record<'easy' | 'medium' | 'hard', Boss>;
} 