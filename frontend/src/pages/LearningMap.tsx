import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Level, LearningProgress } from '../types/learning';
import { getLevels, getLearningProgress } from '../api/learning';

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

const LearningMap: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [levelsData, progressData] = await Promise.all([
          getLevels(),
          getLearningProgress(),
        ]);
        setLevels(levelsData);
        setProgress(progressData);
      } catch (err) {
        setError('データの取得中にエラーが発生しました。');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 4,
          }}
        >
          魔法の学習マップ
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: theme.palette.text.secondary,
          }}
        >
          プログラミングの魔法を習得し、レベルアップを目指しましょう！
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {levels.map((level) => (
            <motion.div key={level._id} variants={itemVariants}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
                onClick={() => navigate(`/level/${level._id}`)}
              >
                <Typography variant="h6" gutterBottom>
                  {level.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {level.description}
                </Typography>
                {progress && (
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={
                        (progress.levels[level._id]?.completedQuests || 0) /
                        (level.totalQuests || 1) *
                        100
                      }
                      size={24}
                    />
                    <Typography variant="body2" color="text.secondary">
                      進捗状況: {progress.levels[level._id]?.completedQuests || 0}/{' '}
                      {level.totalQuests} クエスト完了
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
};

export default LearningMap; 