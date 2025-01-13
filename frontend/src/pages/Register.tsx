import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('登録に失敗しました。入力内容を確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              新規アカウント登録
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ユーザー名"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="パスワード（確認）"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? '登録中...' : '登録'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  sx={{ textDecoration: 'none' }}
                >
                  すでにアカウントをお持ちの方はこちら
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Register; 