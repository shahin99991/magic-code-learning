import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  useTheme,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Achievement } from '../types/learning';
import { getAchievements } from '../api/learning';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`achievements-tabpanel-${index}`}
      aria-labelledby={`achievements-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Achievements: React.FC = () => {
  const theme = useTheme();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const achievementsData = await getAchievements();
        setAchievements(achievementsData);
      } catch (err) {
        setError('実績データの取得中にエラーが発生しました。');
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked
  );
  const lockedAchievements = achievements.filter(
    (achievement) => !achievement.unlocked && !achievement.isSecret
  );
  const secretAchievements = achievements.filter(
    (achievement) => !achievement.unlocked && achievement.isSecret
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return theme.palette.warning.main;
      case 'rare':
        return theme.palette.info.main;
      default:
        return theme.palette.success.main;
    }
  };

  const renderAchievementCard = (achievement: Achievement) => (
    <Grid item xs={12} sm={6} md={4} key={achievement._id}>
      <motion.div variants={itemVariants}>
        <Paper
          sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: achievement.unlocked
              ? theme.palette.background.paper
              : theme.palette.grey[50],
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            {achievement.unlocked ? (
              <EmojiEventsIcon
                sx={{
                  mr: 2,
                  color: getRarityColor(achievement.rarity),
                  fontSize: 32,
                }}
              />
            ) : (
              <LockIcon
                sx={{
                  mr: 2,
                  color: theme.palette.text.disabled,
                  fontSize: 32,
                }}
              />
            )}
            <Box>
              <Typography variant="h6" gutterBottom>
                {achievement.isSecret && !achievement.unlocked
                  ? '???'
                  : achievement.name}
              </Typography>
              <Chip
                label={achievement.rarity}
                size="small"
                sx={{
                  bgcolor: getRarityColor(achievement.rarity),
                  color: 'white',
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
          >
            {achievement.isSecret && !achievement.unlocked
              ? '達成条件は秘密です'
              : achievement.description}
          </Typography>

          {achievement.unlocked && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                獲得日: {new Date(achievement.unlockedAt).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {!achievement.unlocked && achievement.progress !== undefined && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 1 }}
              >
                進捗状況: {achievement.progress}%
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 4,
                    bgcolor: theme.palette.grey[200],
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    width: `${achievement.progress}%`,
                    height: 4,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 2,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </Box>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Grid>
  );

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
          実績
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="achievement tabs"
            centered
          >
            <Tab label={`獲得済み (${unlockedAchievements.length})`} />
            <Tab label={`未獲得 (${lockedAchievements.length})`} />
            <Tab label={`秘密 (${secretAchievements.length})`} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {unlockedAchievements.map(renderAchievementCard)}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {lockedAchievements.map(renderAchievementCard)}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {secretAchievements.map(renderAchievementCard)}
          </Grid>
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default Achievements; 