import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getLearningProgress } from '../api/learning';
import { LearningProgress } from '../types/learning';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';

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

const Profile: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await getLearningProgress();
        setProgress(progressData);
      } catch (err) {
        setError('進捗データの取得中にエラーが発生しました。');
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
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
        <Grid container spacing={4}>
          {/* プロフィール情報 */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {user?.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {user?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user?.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<SchoolIcon />}
                    label={`レベル ${user?.level}`}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<StarIcon />}
                    label={`${user?.experience} EXP`}
                    color="secondary"
                  />
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* 進捗状況 */}
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  学習の進捗状況
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    次のレベルまで: {progress?.experienceToNextLevel} EXP
                  </Typography>
                  <Box sx={{ position: 'relative', pt: 1 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 8,
                        bgcolor: theme.palette.grey[200],
                        borderRadius: 4,
                      }}
                    />
                    <Box
                      sx={{
                        width: `${
                          ((user?.experience || 0) % 1000) / 10
                        }%`,
                        height: 8,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: 4,
                        position: 'absolute',
                        top: 8,
                        left: 0,
                        transition: 'width 0.5s ease-in-out',
                      }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  最近の活動
                </Typography>
                <List>
                  {progress?.recentActivities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <TimelineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={new Date(activity.timestamp).toLocaleString()}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* 実績 */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  獲得した実績
                </Typography>
                <Grid container spacing={2}>
                  {user?.achievements.map((achievement) => (
                    <Grid item xs={12} sm={6} md={4} key={achievement._id}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: theme.palette.grey[50],
                        }}
                      >
                        <EmojiEventsIcon
                          sx={{
                            mr: 2,
                            color:
                              achievement.rarity === 'legendary'
                                ? theme.palette.warning.main
                                : achievement.rarity === 'rare'
                                ? theme.palette.info.main
                                : theme.palette.success.main,
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle2">
                            {achievement.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                          >
                            {achievement.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 0.5 }}
                          >
                            獲得日:{' '}
                            {new Date(
                              achievement.unlockedAt
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Profile; 