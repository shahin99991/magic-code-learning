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

interface StoredUser {
  password: string;
  user: AuthResponse['user'];
}

// ローカルストレージからユーザー情報を読み込む
const loadUsersFromStorage = (): Map<string, StoredUser> => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    return new Map(JSON.parse(storedUsers));
  }
  return new Map();
};

// ユーザー情報をローカルストレージに保存
const saveUsersToStorage = (users: Map<string, StoredUser>) => {
  localStorage.setItem('users', JSON.stringify(Array.from(users.entries())));
};

// モックユーザーストレージの初期化
const mockUserStorage = loadUsersFromStorage();

// テストユーザーの追加（存在しない場合のみ）
if (!mockUserStorage.has('test@example.com')) {
  mockUserStorage.set('test@example.com', {
    password: 'password123',
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    }
  });
  saveUsersToStorage(mockUserStorage);
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // 最新のユーザー情報を読み込む
    const users = loadUsersFromStorage();
    const userRecord = users.get(credentials.email);
    
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
    // 最新のユーザー情報を読み込む
    const users = loadUsersFromStorage();

    if (credentials.email && credentials.password.length >= 8) {
      // 既存ユーザーチェック
      if (users.has(credentials.email)) {
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
      users.set(credentials.email, {
        password: credentials.password,
        user: newUser
      });
      saveUsersToStorage(users);

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