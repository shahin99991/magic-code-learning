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

interface RegisterCredentials {
  email: string;
  password: string;
}

// モックユーザーストレージ
const mockUserStorage = new Map<string, { password: string; user: AuthResponse['user'] }>();

// テストユーザーの追加
mockUserStorage.set('test@example.com', {
  password: 'password123',
  user: {
    id: '1',
    email: 'test@example.com',
    name: 'Test User'
  }
});

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // モックの認証処理
    const userRecord = mockUserStorage.get(credentials.email);
    
    if (userRecord && userRecord.password === credentials.password) {
      return {
        token: 'mock-jwt-token',
        user: userRecord.user
      };
    }
    
    const error = new Error('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    error.name = 'AuthError';
    throw error;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // モックの登録処理
    if (credentials.email && credentials.password.length >= 8) {
      // 既存ユーザーチェック
      if (mockUserStorage.has(credentials.email)) {
        const error = new Error('このメールアドレスは既に登録されています。');
        error.name = 'RegisterError';
        throw error;
      }

      const newUser = {
        id: Date.now().toString(),
        email: credentials.email,
        name: '見習い魔法使い'
      };

      // ユーザー情報を保存
      mockUserStorage.set(credentials.email, {
        password: credentials.password,
        user: newUser
      });

      return {
        token: 'mock-jwt-token',
        user: newUser
      };
    }
    const error = new Error('登録に失敗しました。入力内容を確認してください。');
    error.name = 'RegisterError';
    throw error;
  },

  logout: async (): Promise<void> => {
    // モックのログアウト処理
    return Promise.resolve();
  }
}; 