import { CodeExplanation } from '../types/explanation';
import { SolutionExample } from '../types/solution';
import { HintSystem } from '../types/hint';

interface QuestLearningData {
  id: string;
  explanation: CodeExplanation;
  solution: SolutionExample;
  hints: HintSystem;
}

export const questLearningData: Record<string, QuestLearningData> = {
  'quest-1': {
    id: 'quest-1',
    explanation: {
      lineByLineExplanation: [
        {
          lineNumber: 1,
          explanation: '2つの数値を受け取る関数を定義します',
          concept: '関数定義'
        },
        {
          lineNumber: 2,
          explanation: '受け取った2つの数値を加算して返します',
          concept: '算術演算子'
        }
      ],
      conceptsUsed: ['関数', '引数', '戻り値', '加算演算子'],
      tips: [
        '引数の型を意識しましょう',
        '戻り値の型も確認しましょう',
        'シンプルな実装を心がけましょう'
      ]
    },
    solution: {
      code: 'function magicAdd(a: number, b: number): number {\n  return a + b;\n}',
      explanation: '2つの数値を受け取り、その和を返す最もシンプルな実装です。TypeScriptの型アノテーションを使用して、引数と戻り値の型を明示的に指定しています。',
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      },
      alternativeApproaches: [
        {
          description: '再帰を使用する方法',
          pros: ['理解が深まる', '加算の仕組みを学べる'],
          cons: ['パフォーマンスが悪い', '実装が複雑になる']
        },
        {
          description: 'ビット演算を使用する方法',
          pros: ['低レベルの理解が深まる'],
          cons: ['可読性が低下する', '負の数の処理が複雑']
        }
      ]
    },
    hints: {
      hints: [
        {
          level: 'basic',
          content: '2つの数値を足し合わせることを考えてみましょう',
          unlockCost: 50
        },
        {
          level: 'intermediate',
          content: 'JavaScriptの + 演算子を使用します',
          unlockCost: 100,
          code: 'let result = a + b;'
        },
        {
          level: 'advanced',
          content: '型の安全性を考慮してTypeScriptの型アノテーションを使用します',
          unlockCost: 150,
          code: 'function add(a: number, b: number): number'
        }
      ],
      unlockedHints: [],
      totalHints: 3
    }
  },
  // 他のクエストデータをここに追加
};

export const getQuestLearningData = (questId: string): QuestLearningData | null => {
  return questLearningData[questId] || null;
}; 