import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import styled from '@emotion/styled';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';

const MagicPaper = styled(Paper)`
  background: rgba(98, 0, 234, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(179, 136, 255, 0.3);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(179, 136, 255, 0.8);
    box-shadow: 0 5px 15px rgba(98, 0, 234, 0.3);
  }
`;

const GlowingProgress = styled(LinearProgress)`
  height: 10px;
  border-radius: 5px;
  background-color: rgba(179, 136, 255, 0.2);

  .MuiLinearProgress-bar {
    background-color: #B388FF;
    box-shadow: 0 0 10px #B388FF;
  }
`;

const MagicAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  border: 3px solid #B388FF;
  box-shadow: 0 0 20px rgba(179, 136, 255, 0.5);
  margin-bottom: 1rem;
`;

export const ProfilePage: React.FC = () => {
  const userProfile = {
    name: '見習い魔法使い',
    level: 5,
    exp: 75,
    totalLessons: 12,
    completedLessons: 8,
    achievements: [
      { title: '第一の魔法', description: '初めてのコードを実行' },
      { title: '熟練の一歩', description: '10個の課題を完了' },
      { title: '不屈の探究者', description: '3日連続でログイン' }
    ],
    recentActivity: [
      { action: '変数の魔法を学習', date: '2024/01/15' },
      { action: '条件分岐の課題を完了', date: '2024/01/14' },
      { action: 'ループの練習を実施', date: '2024/01/13' }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" 
        sx={{ color: 'primary.light', textShadow: '0 0 10px #B388FF' }}>
        魔導書
      </Typography>

      <Grid container spacing={4}>
        {/* プロファイル情報 */}
        <Grid item xs={12} md={4}>
          <MagicPaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MagicAvatar src="/wizard-avatar.png" alt="Wizard Avatar" />
              <Typography variant="h5" color="primary.light" gutterBottom>
                {userProfile.name}
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                レベル {userProfile.level}
              </Typography>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="body2" color="secondary">
                  経験値: {userProfile.exp}%
                </Typography>
                <GlowingProgress variant="determinate" value={userProfile.exp} />
              </Box>
            </Box>
          </MagicPaper>
        </Grid>

        {/* 学習進捗 */}
        <Grid item xs={12} md={8}>
          <MagicPaper elevation={3}>
            <Typography variant="h6" color="primary.light" gutterBottom>
              学習進捗
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="secondary">
                完了レッスン: {userProfile.completedLessons} / {userProfile.totalLessons}
              </Typography>
              <GlowingProgress 
                variant="determinate" 
                value={(userProfile.completedLessons / userProfile.totalLessons) * 100} 
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(98, 0, 234, 0.1)', borderRadius: 2 }}>
                  <Typography variant="h4" color="primary.light">
                    {userProfile.completedLessons}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    完了したレッスン
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(98, 0, 234, 0.1)', borderRadius: 2 }}>
                  <Typography variant="h4" color="primary.light">
                    {userProfile.totalLessons - userProfile.completedLessons}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    残りのレッスン
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MagicPaper>
        </Grid>

        {/* アチーブメント */}
        <Grid item xs={12} md={6}>
          <MagicPaper elevation={3}>
            <Typography variant="h6" color="primary.light" gutterBottom>
              獲得した称号
            </Typography>
            <List>
              {userProfile.achievements.map((achievement, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEventsIcon sx={{ color: '#B388FF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={achievement.title}
                      secondary={achievement.description}
                      primaryTypographyProps={{ color: 'primary.light' }}
                      secondaryTypographyProps={{ color: 'secondary' }}
                    />
                  </ListItem>
                  {index < userProfile.achievements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </MagicPaper>
        </Grid>

        {/* 最近の活動 */}
        <Grid item xs={12} md={6}>
          <MagicPaper elevation={3}>
            <Typography variant="h6" color="primary.light" gutterBottom>
              最近の活動
            </Typography>
            <List>
              {userProfile.recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <TimelineIcon sx={{ color: '#B388FF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={activity.action}
                      secondary={activity.date}
                      primaryTypographyProps={{ color: 'primary.light' }}
                      secondaryTypographyProps={{ color: 'secondary' }}
                    />
                  </ListItem>
                  {index < userProfile.recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </MagicPaper>
        </Grid>
      </Grid>
    </Container>
  );
}; 