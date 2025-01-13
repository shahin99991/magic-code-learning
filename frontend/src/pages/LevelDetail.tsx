import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Button,
  useTheme,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Level, Stage, Quest } from '../types/learning';
import { getLevels } from '../api/learning';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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

const LevelDetail: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const [level, setLevel] = useState<Level | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const levels = await getLevels();
        const currentLevel = levels.find((l) => l._id === levelId);
        if (currentLevel) {
          setLevel(currentLevel);
        } else {
          setError('レベルが見つかりませんでした。');
        }
      } catch (err) {
        setError('データの取得中にエラーが発生しました。');
        console.error('Error fetching level:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [levelId]);

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

  if (error || !level) {
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

  const getStageStatus = (stage: Stage) => {
    if (stage.status === 'completed') return 'completed';
    if (stage.status === 'locked') return 'locked';
    return 'available';
  };

  const getQuestStatus = (quest: Quest) => {
    if (quest.status === 'completed') return 'completed';
    if (quest.status === 'locked') return 'locked';
    return 'available';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {level.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
              mb: 4,
            }}
          >
            {level.description}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {level.stages.map((stage) => (
            <Grid item xs={12} key={stage._id}>
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor:
                      getStageStatus(stage) === 'locked'
                        ? theme.palette.grey[100]
                        : theme.palette.background.paper,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {stage.name}
                    {getStageStatus(stage) === 'completed' && (
                      <CheckCircleIcon
                        sx={{
                          ml: 1,
                          color: theme.palette.success.main,
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stage.description}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      {stage.quests.map((quest) => (
                        <Grid item xs={12} sm={6} md={4} key={quest._id}>
                          <Paper
                            sx={{
                              p: 2,
                              bgcolor:
                                getQuestStatus(quest) === 'locked'
                                  ? theme.palette.grey[50]
                                  : theme.palette.background.default,
                              cursor:
                                getQuestStatus(quest) === 'locked'
                                  ? 'not-allowed'
                                  : 'pointer',
                              '&:hover': {
                                transform:
                                  getQuestStatus(quest) !== 'locked'
                                    ? 'translateY(-4px)'
                                    : 'none',
                                transition: 'transform 0.3s ease-in-out',
                              },
                            }}
                            onClick={() =>
                              getQuestStatus(quest) !== 'locked' &&
                              navigate(`/quest/${quest._id}`)
                            }
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography variant="subtitle2">
                                {quest.name}
                              </Typography>
                              {getQuestStatus(quest) === 'locked' ? (
                                <LockIcon
                                  sx={{ color: theme.palette.text.disabled }}
                                />
                              ) : getQuestStatus(quest) === 'completed' ? (
                                <CheckCircleIcon
                                  sx={{ color: theme.palette.success.main }}
                                />
                              ) : (
                                <PlayArrowIcon
                                  sx={{ color: theme.palette.primary.main }}
                                />
                              )}
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {quest.description}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/learning-map')}
            sx={{ mr: 2 }}
          >
            学習マップに戻る
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LevelDetail; 