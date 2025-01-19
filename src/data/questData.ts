import type { CodeExplanation } from '../types/explanation';
import type { SolutionExample } from '../types/solution';
import type { Hint } from '../types/hint';

interface QuestData {
  explanation: CodeExplanation;
  solution: SolutionExample;
  hints: Hint[];
}

const questData: Record<string, QuestData> = {
  '1': {
    explanation: {
      lineByLine: [
        'function magicAdd(a, b) { ... } - 2つの数値を受け取る関数を定義します',
        'return a + b; - 受け取った2つの数値を加算して結果を返します'
      ],
      concepts: [
        '関数定義 - 特定の処理をまとめて再利用可能にします',
        'パラメータ - 関数に渡される値を表します',
        '加算演算子 (+) - 2つの値を足し合わせます',
        'return文 - 関数の結果を呼び出し元に返します'
      ],
      tips: [
        '引数の型は自動的に数値として扱われます',
        '加算演算子は最も基本的な算術演算子の1つです',
        '結果は新しい数値として返されます'
      ]
    },
    solution: {
      code: `function magicAdd(a, b) {
  return a + b;
}`,
      explanation: '2つの数値を受け取り、加算演算子を使って合計を計算します。シンプルで直接的なアプローチです。',
      complexity: {
        time: 'O(1) - 定数時間で実行されます',
        space: 'O(1) - 追加のメモリを使用しません'
      },
      alternatives: [
        {
          description: '一時変数を使用する方法',
          code: `function magicAdd(a, b) {
  let sum = a + b;
  return sum;
}`
        }
      ]
    },
    hints: [
      {
        level: 1,
        content: '2つの数を足すには + 演算子を使います',
        cost: 10,
        unlocked: false
      },
      {
        level: 2,
        content: 'return文を使って結果を返すことを忘れないでください',
        cost: 20,
        unlocked: false
      },
      {
        level: 3,
        content: '完全な解答例: return a + b;',
        cost: 50,
        unlocked: false
      }
    ]
  },
  // 他のクエストデータをここに追加
};

export const getQuestLearningData = (questId: string): QuestData | null => {
  return questData[questId] || null;
}; 