interface ExecuteCodeResult {
  success: boolean;
  message: string;
  actual?: any;
}

export const executeCode = async (
  code: string,
  input: any[] = [],
  expected: any,
  timeoutMs: number = 3000
): Promise<ExecuteCodeResult> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve({
        success: false,
        message: '❌ 実行時間が長すぎます（制限時間: 3秒）',
      });
    }, timeoutMs);

    try {
      const context: { [key: string]: unknown } = {};
      const wrappedCode = `
        ${code}
        context.fn = ${code.trim()};
      `;
      
      eval(wrappedCode);
      
      if (typeof context.fn === 'function') {
        const actual = context.fn(...input);

        // 結果の検証
        let success = false;
        if (Array.isArray(expected)) {
          success = Array.isArray(actual) && 
                   actual.length === expected.length &&
                   actual.every((val, idx) => val === expected[idx]);
        } else {
          success = actual === expected;
        }

        resolve({
          success,
          message: success
            ? '✨ テストに成功しました！'
            : `❌ 期待値: ${JSON.stringify(expected)}, 実際の値: ${JSON.stringify(actual)}`,
          actual,
        });
      } else {
        throw new Error('Function is not properly defined');
      }
    } catch (error: unknown) {
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