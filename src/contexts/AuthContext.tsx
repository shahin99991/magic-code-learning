import React, { createContext, useContext, useState } from 'react';
import { authApi } from '../api/auth';

interface User {
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  clearError: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setError(null);
    } catch (err) {
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await authApi.register({ email, password });
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setError(null);
    } catch (err) {
      setError('登録に失敗しました。入力内容を確認してください。');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
    } catch (err) {
      setError('ログアウトに失敗しました。');
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 