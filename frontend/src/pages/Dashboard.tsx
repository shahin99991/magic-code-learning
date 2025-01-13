import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            component="h1"
            variant="h4"
            color="primary"
            gutterBottom
          >
            魔法学校へようこそ
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            プログラミングの魔法を学び、新しい力を身につけましょう
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* 現在のステータス */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  現在のステータス
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    レベル: 3
                  </Typography>
                  <Typography variant="body1">
                    経験値: 2500 / 3000
                  </Typography>
                  <Typography variant="body1">
                    称号: 見習い魔法使い
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* 現在のチャレンジ */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  現在のチャレンジ
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    変数の魔法を習得せよ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    整数型と浮動小数点型の違いを理解し、
                    適切な変数を使って魔法の計算を行いましょう。
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* 最近の活動 */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  最近の活動
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    2024/03/20 15:30 - 「Hello World」の呪文を習得
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    2024/03/20 14:15 - 変数の基本を学習
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    2024/03/20 13:00 - 魔法学校に入学
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Dashboard; 