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
  TextField,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Quest } from '../types/learning';
import { getQuestDetails, submitQuestAnswer } from '../api/learning';
import Editor from '@monaco-editor/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const QuestDetail: React.FC = () => {
  const { questId } = useParams<{ questId: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const questData = await getQuestDetails(questId!);
        setQuest(questData);
        setCode(questData.initialCode || '// ここにコードを書いてください');
      } catch (err) {
        setError('クエストの取得中にエラーが発生しました。');
        console.error('Error fetching quest:', err);
      } finally {
        setLoading(false);
      }
    };

    if (questId) {
      fetchQuest();
    }
  }, [questId]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      setOutput('');

      const result = await submitQuestAnswer(questId!, code);
      
      if (result.success) {
        setSuccess(
          `クエスト完了！獲得経験値: ${result.experienceGained}点、スコア: ${result.score}点`
        );
        setOutput(result.message);
      } else {
        setError('クエストに失敗しました。もう一度挑戦してください。');
        setOutput(result.message);
      }
    } catch (err) {
      setError('クエストの提出中にエラーが発生しました。');
      console.error('Error submitting quest:', err);
    } finally {
      setSubmitting(false);
    }
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

  if (error || !quest) {
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
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            戻る
          </Button>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            {quest.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            {quest.description}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                課題内容
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  mb: 3,
                }}
              >
                {quest.content}
              </Typography>
              {quest.hints && quest.hints.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    ヒント
                  </Typography>
                  {quest.hints.map((hint, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {hint}
                    </Typography>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">コードエディタ</Typography>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? '実行中...' : '実行'}
                </Button>
              </Box>
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Editor
                  height="400px"
                  defaultLanguage="c"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </Box>

              {(success || error || output) && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    実行結果
                  </Typography>
                  {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {success}
                    </Alert>
                  )}
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  {output && (
                    <TextField
                      multiline
                      fullWidth
                      variant="outlined"
                      value={output}
                      InputProps={{
                        readOnly: true,
                        sx: {
                          fontFamily: 'monospace',
                          backgroundColor: theme.palette.grey[50],
                        },
                      }}
                      minRows={4}
                      maxRows={8}
                    />
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default QuestDetail; 