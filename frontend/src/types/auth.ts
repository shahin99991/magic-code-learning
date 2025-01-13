export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    level: number;
    experience: number;
    achievements: Achievement[];
    completedQuests: CompletedQuest[];
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: Date;
}

export interface CompletedQuest {
  id: string;
  name: string;
  completedAt: Date;
  score: number;
}

export interface AuthError {
  message: string;
  errors?: { [key: string]: string[] };
} 