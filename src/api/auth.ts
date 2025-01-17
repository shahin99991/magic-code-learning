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

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // モックの登録処理
    // 実際のアプリケーションでは、ここでバックエンドAPIを呼び出して新規ユーザーを登録します
    if (credentials.email && credentials.password.length >= 8) {
      return {
        token: 'mock-jwt-token',
        user: {
          id: Date.now().toString(), // 一意のIDを生成
          email: credentials.email,
          name: '見習い魔法使い' // デフォルトの名前
        }
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