import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ヘッダーセクション */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{ mb: 4 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: 'Merriweather',
            color: theme.palette.primary.main,
          }}
        >
          魔法使いの学習ダッシュボード
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          今日も新しい魔法（プログラミング）の習得に挑戦しましょう！
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 現在のステータス */}
        <Grid item xs={12} md={4}>
          <Paper
            component={motion.div}
            variants={itemVariants}
            sx={{
              p: 3,
              height: '100%',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
            }}
          >
            <Typography variant="h6" gutterBottom>
              現在のステータス
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">レベル: 5</Typography>
              <Typography variant="body1">経験値: 500 / 1000</Typography>
              <Typography variant="body1">称号: 見習い魔法使い</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 現在の課題 */}
        <Grid item xs={12} md={8}>
          <Paper
            component={motion.div}
            variants={itemVariants}
            sx={{ p: 3, height: '100%' }}
          >
            <Typography variant="h6" gutterBottom>
              現在の課題
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Level 1: 変数の基礎
              </Typography>
              <Typography variant="body2" color="text.secondary">
                魔法の基本となる変数の扱い方を学びましょう。
                この課題では、様々な型の変数を使って魔法の素材を管理する方法を学びます。
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 最近の活動 */}
        <Grid item xs={12}>
          <Paper
            component={motion.div}
            variants={itemVariants}
            sx={{ p: 3 }}
          >
            <Typography variant="h6" gutterBottom>
              最近の活動
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* 活動リストのプレースホルダー */}
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    py: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    '&:last-child': {
                      borderBottom: 0,
                    },
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    クエスト {item} を完了しました
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    2時間前
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 