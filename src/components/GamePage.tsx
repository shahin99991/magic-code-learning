import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import MagicBackground from './MagicBackground';
import MagicParticles from './MagicParticles';
import { useLevel } from '../contexts/LevelContext';
import LevelDisplay from './LevelDisplay';
import { useProgress } from '../contexts/ProgressContext';
import { executeCode } from '../utils/codeExecutor';
import { CodeExplanation } from './CodeExplanation';
import { SolutionExample } from './SolutionExample';
import { HintSystem } from './HintSystem';
import { useLearning } from '../contexts/LearningContext';
import { getQuestLearningData } from '../data/questData';
import { LoadingSpinner } from './LoadingSpinner';
import { CelebrationEffect } from './CelebrationEffect';
import { DamageEffect } from './DamageEffect';
import { LevelUpEffect } from './LevelUpEffect';

interface Challenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hint?: string;
  testCases: {
    input: any[];
    expected: any;
  }[];
}

interface Boss {
  name: string;
  maxHp: number;
  currentHp: number;
  image: string;
}

const challenges: Record<'easy' | 'medium' | 'hard', Challenge[]> = {
  easy: [
    {
      id: '1',
      title: '魔法の数字（足し算）',
      description: '与えられた2つの数字を足し算する魔法の関数を完成させましょう！',
      difficulty: 'easy',
      points: 100,
      hint: '+ 演算子を使って2つの数を足し合わせましょう',
      initialCode: `function magicAdd(a, b) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [1, 2], expected: 3 },
        { input: [5, 3], expected: 8 },
        { input: [10, -5], expected: 5 },
      ],
    },
    {
      id: '2',
      title: '魔法の数字（掛け算）',
      description: '2つの数字を掛け合わせる魔法の関数を作りましょう！',
      difficulty: 'easy',
      points: 150,
      hint: '* 演算子を使って2つの数を掛け合わせましょう',
      initialCode: `function magicMultiply(a, b) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [2, 3], expected: 6 },
        { input: [4, 5], expected: 20 },
        { input: [-2, 3], expected: -6 },
      ],
    },
    {
      id: '3',
      title: '魔法の文字列',
      description: '2つの文字列を結合する魔法の関数を作りましょう！',
      difficulty: 'easy',
      points: 120,
      hint: '+ 演算子または concat() メソッドを使って文字列を結合できます',
      initialCode: `function magicConcat(str1, str2) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: ['Hello', 'World'], expected: 'HelloWorld' },
        { input: ['Magic', 'Spell'], expected: 'MagicSpell' },
        { input: ['', 'Test'], expected: 'Test' },
      ],
    },
    {
      id: '10',
      title: '魔法の文字変換',
      description: '文字列を大文字に変換する魔法の関数を作りましょう！',
      difficulty: 'easy',
      points: 130,
      hint: 'toUpperCase() メソッドを使うと文字列を大文字に変換できます',
      initialCode: `function magicUpperCase(text) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: ['hello'], expected: 'HELLO' },
        { input: ['Magic'], expected: 'MAGIC' },
        { input: ['JavaScript'], expected: 'JAVASCRIPT' },
      ],
    },
    {
      id: '11',
      title: '魔法の長さ測定',
      description: '文字列の長さを計測する魔法の関数を作りましょう！',
      difficulty: 'easy',
      points: 110,
      hint: 'length プロパティを使うと文字列の長さを取得できます',
      initialCode: `function magicLength(text) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: ['hello'], expected: 5 },
        { input: [''], expected: 0 },
        { input: ['魔法'], expected: 2 },
      ],
    },
  ],
  medium: [
    {
      id: '4',
      title: '魔法の配列（合計）',
      description: '配列の中の数字を全て足し合わせる魔法の関数を作りましょう！',
      difficulty: 'medium',
      points: 200,
      hint: 'reduce メソッドを使うと配列の要素を集約できます',
      initialCode: `function magicSum(numbers) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [[1, 2, 3]], expected: 6 },
        { input: [[5, -2, 7, 0]], expected: 10 },
        { input: [[]], expected: 0 },
      ],
    },
    {
      id: '5',
      title: '魔法の配列（最大値）',
      description: '配列の中から最大の数を見つける魔法の関数を作りましょう！',
      difficulty: 'medium',
      points: 250,
      hint: 'Math.max() と spread 演算子を組み合わせると便利です',
      initialCode: `function magicMax(numbers) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [[1, 5, 3]], expected: 5 },
        { input: [[-1, -5, -3]], expected: -1 },
        { input: [[0]], expected: 0 },
      ],
    },
    {
      id: '6',
      title: '魔法のフィルター',
      description: '配列から偶数のみを抽出する魔法の関数を作りましょう！',
      difficulty: 'medium',
      points: 230,
      hint: 'filter メソッドと剰余演算子(%)を使うとよいでしょう',
      initialCode: `function magicFilter(numbers) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [[1, 2, 3, 4]], expected: [2, 4] },
        { input: [[5, 7, 9]], expected: [] },
        { input: [[2, 4, 6]], expected: [2, 4, 6] },
      ],
    },
    {
      id: '12',
      title: '魔法の配列（重複除去）',
      description: '配列から重複する要素を取り除く魔法の関数を作りましょう！',
      difficulty: 'medium',
      points: 220,
      hint: 'Set オブジェクトを使うと重複を簡単に除去できます',
      initialCode: `function magicUnique(numbers) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [[1, 2, 2, 3, 3, 4]], expected: [1, 2, 3, 4] },
        { input: [[5, 5, 5]], expected: [5] },
        { input: [[1, 2, 3]], expected: [1, 2, 3] },
      ],
    },
    {
      id: '13',
      title: '魔法の平均値',
      description: '配列の平均値を計算する魔法の関数を作りましょう！',
      difficulty: 'medium',
      points: 240,
      hint: '合計を要素数で割ると平均値が求められます',
      initialCode: `function magicAverage(numbers) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [[1, 2, 3]], expected: 2 },
        { input: [[10, 20, 30, 40]], expected: 25 },
        { input: [[0, 0, 0]], expected: 0 },
      ],
    },
  ],
  hard: [
    {
      id: '7',
      title: '魔法の回文',
      description: '与えられた文字列が回文かどうかを判定する魔法の関数を作りましょう！',
      difficulty: 'hard',
      points: 300,
      hint: '文字列を反転させて比較すると判定できます',
      initialCode: `function magicPalindrome(text) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: ['level'], expected: true },
        { input: ['hello'], expected: false },
        { input: [''], expected: true },
      ],
    },
    {
      id: '8',
      title: '魔法のソート',
      description: '数字の配列を小さい順に並び替える魔法の関数を作りましょう！',
      difficulty: 'hard',
      points: 350,
      hint: 'バブルソートやクイックソートなどのアルゴリズムを実装してみましょう',
      initialCode: `function magicSort(numbers) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [[3, 1, 4]], expected: [1, 3, 4] },
        { input: [[5, 2, 8, 1]], expected: [1, 2, 5, 8] },
        { input: [[]], expected: [] },
      ],
    },
    {
      id: '9',
      title: '魔法のアナグラム',
      description: '2つの文字列がアナグラムかどうかを判定する魔法の関数を作りましょう！',
      difficulty: 'hard',
      points: 400,
      hint: '文字列をソートして比較すると判定できます',
      initialCode: `function magicAnagram(str1, str2) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: ['listen', 'silent'], expected: true },
        { input: ['hello', 'world'], expected: false },
        { input: ['', ''], expected: true },
      ],
    },
    {
      id: '14',
      title: '魔法の文字列圧縮',
      description: '連続する文字を圧縮する魔法の関数を作りましょう！例：aabbbcccc → a2b3c4',
      difficulty: 'hard',
      points: 380,
      hint: '文字の出現回数をカウントして、文字と数字を組み合わせましょう',
      initialCode: `function magicCompress(text) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: ['aabbbcccc'], expected: 'a2b3c4' },
        { input: ['aaa'], expected: 'a3' },
        { input: ['abcd'], expected: 'a1b1c1d1' },
      ],
    },
    {
      id: '15',
      title: '魔法の階段',
      description: '数値nを受け取り、n段の階段パターンを作る魔法の関数を作りましょう！',
      difficulty: 'hard',
      points: 420,
      hint: '文字列の繰り返しとループを組み合わせて階段を作りましょう',
      initialCode: `function magicStairs(n) {
  // ここにコードを書いてください
  
}`,
      testCases: [
        { input: [3], expected: ['  *', ' **', '***'] },
        { input: [1], expected: ['*'] },
        { input: [2], expected: [' *', '**'] },
      ],
    },
  ],
};

const bosses: Record<'easy' | 'medium' | 'hard', Boss> = {
  easy: {
    name: '見習い魔法使いのボス',
    maxHp: 1000,
    currentHp: 1000,
    image: '🧙‍♂️',
  },
  medium: {
    name: '上級魔法使いのボス',
    maxHp: 2000,
    currentHp: 2000,
    image: '🧙‍♀️',
  },
  hard: {
    name: '大魔法使いのボス',
    maxHp: 3000,
    currentHp: 3000,
    image: '🧙‍♂️✨',
  },
};

const GamePage: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges.easy[0]);
  const [code, setCode] = useState(challenges.easy[0].initialCode);
  const [results, setResults] = useState<{ success: boolean; message: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [bossesState, setBossesState] = useState<Record<'easy' | 'medium' | 'hard', Boss>>(bosses);
  const { addExperience, level } = useLevel();
  const { progress, completeChallenge, updateBossHp, resetProgress, resetDifficulty } = useProgress();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetType, setResetType] = useState<'all' | 'difficulty'>('all');
  const { explanation, setExplanation, solution, setSolution, hintSystem, setHintSystem, unlockHint } = useLearning();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  const [damagePosition, setDamagePosition] = useState({ x: 0, y: 0 });
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);

  const calculateDamage = (points: number) => {
    return Math.floor(points * 1.5); // ポイントの1.5倍のダメージを与える
  };

  const handleDifficultyChange = (_: React.SyntheticEvent, newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    const firstChallenge = challenges[newDifficulty][0];
    setSelectedChallenge(firstChallenge);
    setCode(firstChallenge.initialCode);
    setResults([]);
    setShowHint(false);
  };

  const handleChallengeChange = (challengeId: string) => {
    const challenge = challenges[difficulty].find(c => c.id === challengeId)!;
    setSelectedChallenge(challenge);
    setCode(challenge.initialCode);
    setResults([]);
    setShowHint(false);
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);
    let allTestsPassed = true;
    const results = [];

    try {
      for (const testCase of selectedChallenge.testCases) {
        const result = await executeCode(code, testCase.input, testCase.expected);
        results.push(result);
        if (!result.success) {
          allTestsPassed = false;
        }
      }

      setResults(results);

      if (allTestsPassed) {
        const damage = calculateDamage(selectedChallenge.points);
        
        // ダメージエフェクトの位置を設定
        const bossElement = document.querySelector('.boss-image');
        if (bossElement) {
          const rect = bossElement.getBoundingClientRect();
          setDamagePosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        }
        
        setShowDamage(true);
        await updateBossHp(difficulty, damage);
        
        // ローカルステートの更新
        setBossesState(prev => ({
          ...prev,
          [difficulty]: {
            ...prev[difficulty],
            currentHp: Math.max(0, prev[difficulty].currentHp - damage)
          }
        }));
        
        setCompletedChallenges(prev => [...prev, selectedChallenge.id]);
        setTotalPoints(prev => prev + selectedChallenge.points);
        
        // 経験値の付与と演出
        handleTestCaseSuccess(selectedChallenge);
        setShowCelebration(true);
      }
    } catch (error) {
      console.error('Test execution error:', error);
      setResults([{ success: false, message: error.message }]);
    } finally {
      setIsRunning(false);
    }
  };

  const getBossStatus = (boss: Boss) => {
    const hpPercentage = (boss.currentHp / boss.maxHp) * 100;
    let status = '';
    if (boss.currentHp === 0) {
      status = '倒れた！';
    } else if (hpPercentage <= 25) {
      status = '瀕死';
    } else if (hpPercentage <= 50) {
      status = '苦戦中';
    } else if (hpPercentage <= 75) {
      status = '余裕がある';
    } else {
      status = '健在';
    }
    return status;
  };

  const handleTestCaseSuccess = (challenge: Challenge) => {
    // 基本経験値の計算
    let expGain = 0;
    switch (challenge.difficulty) {
      case 'easy':
        expGain = 50;
        break;
      case 'medium':
        expGain = 100;
        break;
      case 'hard':
        expGain = 200;
        break;
    }

    // ボーナス経験値の計算
    if (!showHint) {
      expGain *= 1.25; // ヒント未使用ボーナス
    }

    addExperience(Math.floor(expGain));
  };

  const handleReset = () => {
    if (resetType === 'all') {
      resetProgress();
      setTotalPoints(0);
      setCompletedChallenges([]);
      setBossesState(bosses);
    } else {
      resetDifficulty(difficulty);
      // 現在の難易度のボスのみリセット
      setBossesState(prev => ({
        ...prev,
        [difficulty]: bosses[difficulty],
      }));
      // 現在の難易度のチャレンジの完了状態をリセット
      setCompletedChallenges(prev => 
        prev.filter(id => {
          const difficultyPrefix = difficulty === 'easy' ? '1' : difficulty === 'medium' ? '4' : '7';
          return !(
            id.startsWith(difficultyPrefix) || 
            (difficulty === 'easy' && (id === '2' || id === '3' || id === '10' || id === '11')) ||
            (difficulty === 'medium' && (id === '5' || id === '6' || id === '12' || id === '13')) ||
            (difficulty === 'hard' && (id === '8' || id === '9' || id === '14' || id === '15'))
          );
        })
      );
    }
    
    setSelectedChallenge(challenges[difficulty][0]);
    setCode(challenges[difficulty][0].initialCode);
    setResults([]);
    setShowHint(false);
    setResetDialogOpen(false);
  };

  useEffect(() => {
    if (progress) {
      setTotalPoints(progress.totalPoints);
      setCompletedChallenges(progress.completedChallenges);
      setBossesState(progress.bossesState);
    }
  }, [progress]);

  useEffect(() => {
    if (selectedChallenge) {
      const learningData = getQuestLearningData(selectedChallenge.id);
      if (learningData) {
        setExplanation(learningData.explanation);
        setSolution(learningData.solution);
        setHintSystem(learningData.hints);
      }
    }
  }, [selectedChallenge, setExplanation, setSolution, setHintSystem]);

  useEffect(() => {
    if (level > currentLevel) {
      setCurrentLevel(level);
      setShowLevelUp(true);
      
      // 3秒後に確実に非表示にする
      const timer = setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        setShowLevelUp(false);
      };
    }
  }, [level, currentLevel]);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <MagicBackground />
      <MagicParticles />
      <LevelDisplay />
      
      {/* アニメーションコンポーネント */}
      {isRunning && <LoadingSpinner />}
      
      <CelebrationEffect
        show={showCelebration}
        message="クエスト完了！"
        points={selectedChallenge?.points || 0}
        onComplete={() => setShowCelebration(false)}
      />
      
      <DamageEffect
        show={showDamage}
        damage={calculateDamage(selectedChallenge?.points || 0)}
        position={damagePosition}
        onComplete={() => setShowDamage(false)}
      />
      
      <LevelUpEffect
        show={showLevelUp}
        level={currentLevel}
        onComplete={() => setShowLevelUp(false)}
      />

      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 1
            }}
          >
            魔法使いの修行場
          </Typography>
          <Typography 
            variant="h5" 
            color="textSecondary"
            sx={{ 
              fontStyle: 'italic',
              mb: 3
            }}
          >
            〜 Magic Code Learning 〜
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={difficulty} onChange={handleDifficultyChange} centered>
            <Tab label="初級" value="easy" />
            <Tab label="中級" value="medium" />
            <Tab label="上級" value="hard" />
          </Tabs>
        </Box>

        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h5" component="span">
              {bossesState[difficulty].image}
            </Typography>
            <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
              {bosses[difficulty].name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              状態: {getBossStatus(bossesState[difficulty])}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', bgcolor: 'grey.300', borderRadius: 1, height: 20, position: 'relative' }}>
            <Box
              sx={{
                width: `${(bossesState[difficulty].currentHp / bossesState[difficulty].maxHp) * 100}%`,
                bgcolor: 'error.main',
                height: '100%',
                borderRadius: 1,
                transition: 'width 0.5s ease-in-out',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textShadow: '1px 1px 2px black',
              }}
            >
              HP: {bossesState[difficulty].currentHp} / {bossesState[difficulty].maxHp}
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>問題を選択</InputLabel>
            <Select
              value={selectedChallenge.id}
              onChange={(e) => handleChallengeChange(e.target.value)}
              label="問題を選択"
            >
              {challenges[difficulty].map((challenge) => (
                <MenuItem key={challenge.id} value={challenge.id}>
                  {challenge.title} {completedChallenges.includes(challenge.id) ? '✅' : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" color="primary">
            総ポイント: {totalPoints}
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              {selectedChallenge.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="textSecondary">
                難易度: {selectedChallenge.difficulty}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ポイント: {selectedChallenge.points}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" paragraph>
            {selectedChallenge.description}
          </Typography>
          {selectedChallenge.hint && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'ヒントを隠す' : 'ヒントを表示'}
              </Button>
              {showHint && (
                <Typography variant="body2" sx={{ mt: 1, color: 'info.main' }}>
                  💡 {selectedChallenge.hint}
                </Typography>
              )}
            </Box>
          )}
        </Paper>

        <Paper elevation={3} sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CodeMirror
            value={code}
            height="300px"
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
            theme="light"
          />
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={runTests}
            disabled={isRunning}
            sx={{ minWidth: 120 }}
          >
            {isRunning ? '実行中...' : '実行'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setResetDialogOpen(true)}
            sx={{ minWidth: 120 }}
          >
            リセット
          </Button>
        </Box>

        {results.length > 0 && (
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom>
              テスト結果
            </Typography>
            {results.map((result, index) => (
              <Typography
                key={index}
                variant="body1"
                paragraph
                color={result.success ? 'success.main' : 'error.main'}
              >
                {result.message}
              </Typography>
            ))}
            {results.every(r => r.success) && !progress.completedChallenges.includes(selectedChallenge.id) && (
              <>
                <Typography variant="h6" color="success.main">
                  🎉 おめでとうございます！{selectedChallenge.points}ポイント獲得しました！
                </Typography>
                <Typography variant="body1" color="success.main">
                  ボスに{calculateDamage(selectedChallenge.points)}ダメージを与えました！
                </Typography>
                {bossesState[difficulty].currentHp === 0 && (
                  <Typography variant="h5" color="success.main" sx={{ mt: 2 }}>
                    🎊 {bossesState[difficulty].name}を倒しました！次の難易度に挑戦しましょう！
                  </Typography>
                )}
              </>
            )}
          </Paper>
        )}

        {/* リセット確認ダイアログ */}
        <Dialog
          open={resetDialogOpen}
          onClose={() => setResetDialogOpen(false)}
          aria-labelledby="reset-dialog-title"
        >
          <DialogTitle id="reset-dialog-title">
            ゲームをリセットしますか？
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                リセットする範囲を選択してください：
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button
                  variant={resetType === 'all' ? 'contained' : 'outlined'}
                  onClick={() => setResetType('all')}
                  color="primary"
                >
                  全体リセット
                </Button>
                <Button
                  variant={resetType === 'difficulty' ? 'contained' : 'outlined'}
                  onClick={() => setResetType('difficulty')}
                  color="primary"
                >
                  現在の難易度のみ
                </Button>
              </Box>
            </Box>
            <Typography color="error">
              {resetType === 'all' 
                ? '全ての進捗（レベル、経験値、全難易度のボスの状態など）が初期状態に戻ります。'
                : `${difficulty}難易度の進捗（チャレンジの完了状態、ボスの状態）のみが初期状態に戻ります。`}
              この操作は取り消せません。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setResetDialogOpen(false)} color="primary">
              キャンセル
            </Button>
            <Button 
              onClick={handleReset} 
              color="error" 
              variant="contained"
              startIcon={resetType === 'all' ? '🔄' : '📊'}
            >
              {resetType === 'all' ? '全体リセット' : `${difficulty}難易度をリセット`}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 学習支援機能の追加 */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            学習サポート
          </Typography>
          
          {selectedChallenge && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {explanation && <CodeExplanation explanation={explanation} />}
              </Grid>
              
              <Grid item xs={12}>
                {solution && <SolutionExample solution={solution} />}
              </Grid>
              
              <Grid item xs={12}>
                {hintSystem && (
                  <HintSystem
                    hints={hintSystem}
                    onUnlockHint={unlockHint}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default GamePage; 