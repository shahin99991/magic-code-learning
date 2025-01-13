import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import PrivateRoute from '../components/auth/PrivateRoute';

// 遅延ロードするコンポーネント
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const LearningMap = React.lazy(() => import('../pages/LearningMap'));
const LevelDetail = React.lazy(() => import('../pages/LevelDetail'));
const QuestDetail = React.lazy(() => import('../pages/QuestDetail'));
const Profile = React.lazy(() => import('../pages/Profile'));
const Achievements = React.lazy(() => import('../pages/Achievements'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// ローディング画面
const LoadingScreen = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

const Router = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* 認証不要のルート */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 認証が必要なルート */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learning-map" element={<LearningMap />} />
          <Route path="level/:levelId" element={<LevelDetail />} />
          <Route path="quest/:questId" element={<QuestDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="achievements" element={<Achievements />} />
        </Route>

        {/* 404ページ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router; 