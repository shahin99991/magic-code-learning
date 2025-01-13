import axios from 'axios';
import { Level, Quest, LearningProgress } from '../types/learning';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const learningApi = axios.create({
  baseURL: `${API_URL}/learning`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// インターセプターの設定
learningApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getLevels = async (): Promise<Level[]> => {
  const response = await learningApi.get<Level[]>('/levels');
  return response.data;
};

export const getQuestDetails = async (questId: string): Promise<Quest> => {
  const response = await learningApi.get<Quest>(`/quests/${questId}`);
  return response.data;
};

export const submitQuestAnswer = async (
  questId: string,
  answer: string
): Promise<{
  success: boolean;
  score: number;
  experienceGained: number;
  message: string;
}> => {
  const response = await learningApi.post(`/quests/${questId}/submit`, { answer });
  return response.data;
};

export const getLearningProgress = async (): Promise<LearningProgress> => {
  const response = await learningApi.get<LearningProgress>('/progress');
  return response.data;
}; 