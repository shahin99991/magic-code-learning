import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import LoginForm from './LoginForm';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />);
    mockNavigate.mockClear();
  });

  it('renders login form with all elements', () => {
    expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /メールアドレス/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /新規登録はこちら/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty inputs', async () => {
    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument();
      expect(screen.getByText('パスワードを入力してください')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email format', async () => {
    const emailInput = screen.getByRole('textbox', { name: /メールアドレス/i });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument();
    });
  });

  it('shows validation error for short password', async () => {
    const passwordInput = screen.getByLabelText(/パスワード/i);
    fireEvent.change(passwordInput, { target: { value: '123' } });

    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('パスワードは8文字以上である必要があります')).toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    const emailInput = screen.getByRole('textbox', { name: /メールアドレス/i });
    const passwordInput = screen.getByLabelText(/パスワード/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('disables form during submission', async () => {
    const emailInput = screen.getByRole('textbox', { name: /メールアドレス/i });
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(screen.getByText('ログイン中...')).toBeInTheDocument();
  });

  it('navigates to registration page when link is clicked', () => {
    const registerLink = screen.getByRole('button', { name: /新規登録はこちら/i });
    fireEvent.click(registerLink);
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
}); 