import { Challenge } from '../types/game';

class CodeExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CodeExecutionError';
  }
}

interface SandboxContext {
  [key: string]: unknown;
  fn?: Function;
}

export const executeCode = async (
  code: string,
  input: any[] = [],
  expected: any,
  timeoutMs: number = 3000
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve({
        success: false,
        message: '❌ 実行時間が長すぎます（制限時間: 3秒）',
      });
    }, timeoutMs);

    let errorMessage = '';
    try {
      const context: SandboxContext = {};
      const wrappedCode = `
        ${code}
        context.fn = ${code.trim()};
      `;
      
      eval(wrappedCode);
      
      if (typeof context.fn === 'function') {
        const result = context.fn(...input);

        // 結果の検証
        let success = false;
        if (Array.isArray(expected)) {
          success = Array.isArray(result) && 
                   result.length === expected.length &&
                   result.every((val, idx) => val === expected[idx]);
        } else {
          success = result === expected;
        }

        resolve({
          success,
          message: success
            ? '✨ テストに成功しました！'
            : `❌ 期待値: ${JSON.stringify(expected)}, 実際の値: ${JSON.stringify(result)}`,
        });
      } else {
        throw new Error('Function is not properly defined');
      }
    } catch (error: unknown) {
      // タイムアウトのクリア
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        console.error('Code execution error:', error.message);
        throw error;
      } else {
        const errorMessage = String(error);
        console.error('Code execution error:', errorMessage);
        throw new Error(errorMessage);
      }
    }
  });
}; 