import { render, screen, fireEvent, waitFor, act } from '../test-utils';
import { useAuth } from './AuthContext';

const TestComponent = () => {
  const { user, error, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {user ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="user-email">
        {user ? user.email : 'no-user'}
      </div>
      <div data-testid="error">
        {error || 'no-error'}
      </div>
      <button
        data-testid="login-button"
        onClick={() => login({ email: 'test@example.com', password: 'password123' })}
      >
        ログイン
      </button>
      <button
        data-testid="logout-button"
        onClick={logout}
      >
        ログアウト
      </button>
    </div>
  );
};

const ErrorTestComponent = () => {
  const { login, error } = useAuth();

  return (
    <div>
      <div data-testid="error-message">{error}</div>
      <button
        data-testid="error-login-button"
        onClick={async () => {
          try {
            await login({ email: 'invalid@example.com', password: 'wrongpassword' });
          } catch (err) {
            // エラーは AuthContext で処理されるので、ここでは何もしない
          }
        }}
      >
        ログイン
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial authentication state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('no-user');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('handles successful login', async () => {
    render(<TestComponent />);
    
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('error')).toHaveTextContent('no-error');
    });
  });

  it('handles logout', async () => {
    render(<TestComponent />);
    
    // First login
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    });

    // Then logout
    await act(async () => {
      fireEvent.click(screen.getByTestId('logout-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('no-user');
    });
  });

  it('handles login error', async () => {
    render(<ErrorTestComponent />);
    
    await act(async () => {
      fireEvent.click(screen.getByTestId('error-login-button'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    });
  });
}); 