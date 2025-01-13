import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/login', credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/register', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// インターセプターの設定
authApi.interceptors.request.use(
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

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 