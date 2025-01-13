import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CircularProgress, Box } from '@mui/material';

// レイアウトコンポーネント
const MainLayout = lazy(() => import('../layouts/MainLayout'));

// ページコンポーネント
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Learning = lazy(() => import('../pages/Learning'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

// ローディングコンポーネント
const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

export default function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* メインレイアウトを適用するルート */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning/:levelId/:questId" element={<Learning />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404ページ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
} 