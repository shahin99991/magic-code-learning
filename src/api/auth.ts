interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // モックの認証処理
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: credentials.email,
          name: 'Test User'
        }
      };
    }
    const error = new Error('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    error.name = 'AuthError';
    throw error;
  },

  logout: async (): Promise<void> => {
    // モックのログアウト処理
    return Promise.resolve();
  }
}; 