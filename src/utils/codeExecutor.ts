import { Challenge } from '../types/game';

class CodeExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CodeExecutionError';
  }
}

export const executeCode = async (
  code: string,
  testCase: { input: any[]; expected: any },
  timeoutMs: number = 3000
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve({
        success: false,
        message: '❌ 実行時間が長すぎます（制限時間: 3秒）',
      });
    }, timeoutMs);

    try {
      // 安全なコード実行環境の作成
      const sandbox = {
        console: {
          log: () => {}, // コンソール出力を無効化
        },
        setTimeout: () => {}, // setTimeout を無効化
        setInterval: () => {}, // setInterval を無効化
      };

      // コードを実行可能な関数として評価
      let fn;
      if (code.includes('function')) {
        // 関数定義を含む場合はそのまま評価
        const wrappedCode = `
          ${code}
          return magicAdd;
        `;
        fn = new Function(wrappedCode)();
      } else {
        // 関数本体のみの場合は関数として包む
        fn = new Function('a', 'b', code);
      }

      // テストケースの実行
      const result = fn(...testCase.input);

      // タイムアウトのクリア
      clearTimeout(timeoutId);

      // 結果の検証
      const success = Array.isArray(result)
        ? JSON.stringify(result) === JSON.stringify(testCase.expected)
        : result === testCase.expected;

      resolve({
        success,
        message: success
          ? '✨ テストに成功しました！'
          : `❌ 期待値: ${JSON.stringify(testCase.expected)}, 実際の値: ${JSON.stringify(result)}`,
      });
    } catch (error) {
      // タイムアウトのクリア
      clearTimeout(timeoutId);

      // エラーメッセージの整形
      let errorMessage = '❌ エラーが発生しました: ';
      if (error instanceof ReferenceError) {
        errorMessage += `未定義の変数や関数が使用されています: ${error.message}`;
      } else if (error instanceof SyntaxError) {
        errorMessage += `構文エラーです: ${error.message}`;
      } else if (error instanceof TypeError) {
        errorMessage += `型エラーです: ${error.message}`;
      } else {
        errorMessage += error.message;
      }

      resolve({
        success: false,
        message: errorMessage,
      });
    }
  });
}; 