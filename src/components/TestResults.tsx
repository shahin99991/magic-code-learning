import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface TestCase {
  input: any[];
  expected: any;
}

interface TestResult {
  input: any[];
  expected: any;
  actual: any;
  passed: boolean;
}

interface TestResultsProps {
  code: string;
  testCases: TestCase[];
  onSuccess: () => void;
  setResults: React.Dispatch<React.SetStateAction<TestResult[]>>;
}

const TestResults: React.FC<TestResultsProps> = ({ code, testCases, onSuccess, setResults }) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const runTests = async () => {
      setIsRunning(true);
      try {
        const testResults = await Promise.all(
          testCases.map(async (testCase) => {
            try {
              // Function constructor を使用してコードを実行
              const func = new Function(...testCase.input.map((_, i) => `arg${i}`), code + `\nreturn ${code.match(/function\s+(\w+)/)?.[1]}(${testCase.input.map((_, i) => `arg${i}`).join(', ')});`);
              const actual = await func(...testCase.input);
              const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
              return {
                input: testCase.input,
                expected: testCase.expected,
                actual,
                passed,
              };
            } catch (error) {
              return {
                input: testCase.input,
                expected: testCase.expected,
                actual: error.message,
                passed: false,
              };
            }
          })
        );

        setResults(testResults);
        if (testResults.every(result => result.passed)) {
          onSuccess();
        }
      } catch (error) {
        console.error('Error running tests:', error);
      } finally {
        setIsRunning(false);
      }
    };

    if (code) {
      runTests();
    }
  }, [code, testCases, onSuccess, setResults]);

  if (isRunning) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        テスト結果
      </Typography>
      {testCases.map((testCase, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography>
            入力: {JSON.stringify(testCase.input)}
          </Typography>
          <Typography>
            期待値: {JSON.stringify(testCase.expected)}
          </Typography>
          <Typography color={testCase.passed ? 'success.main' : 'error.main'}>
            結果: {testCase.passed ? '成功' : '失敗'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TestResults; 