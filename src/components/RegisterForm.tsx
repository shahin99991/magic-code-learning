import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    try {
      await register(email, password);
      navigate('/game');
    } catch (err) {
      setError('登録に失敗しました');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        新規登録
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="パスワード（確認）"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          登録
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate('/login')}
        >
          ログインページへ
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm; 