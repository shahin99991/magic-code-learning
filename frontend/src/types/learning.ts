export interface Level {
  id: string;
  name: string;
  description: string;
  order: number;
  requiredLevel: number;
  theme: string;
  learningObjectives: string[];
  totalExperience: number;
  unlockRequirements: string[];
  rewards: Reward[];
  status: 'locked' | 'available' | 'completed';
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  description: string;
  levelId: string;
  order: number;
  requiredExperience: number;
  unlockRequirements: string[];
  rewards: Reward[];
  theme: string;
  status: 'locked' | 'available' | 'completed';
  quests: Quest[];
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  type: 'practice' | 'challenge' | 'project';
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
  stageId: string;
  experienceReward: number;
  prerequisites: string[];
  timeLimit?: number;
  tags: string[];
  status: 'locked' | 'available' | 'completed';
}

export interface Reward {
  type: 'experience' | 'achievement' | 'item';
  name: string;
  description: string;
  value: number;
}

export interface LearningProgress {
  currentLevel: number;
  experience: number;
  nextLevelExperience: number;
  completedQuests: string[];
  unlockedAchievements: string[];
  levelProgress: {
    [levelId: string]: {
      completed: boolean;
      progress: number;
      stages: {
        [stageId: string]: {
          completed: boolean;
          progress: number;
          quests: {
            [questId: string]: {
              completed: boolean;
              score: number;
            };
          };
        };
      };
    };
  };
} 