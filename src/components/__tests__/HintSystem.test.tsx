import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HintSystem } from '../HintSystem';

// LevelContextのモック
jest.mock('../../contexts/LevelContext', () => ({
  useLevel: () => ({
    currentExp: 100
  })
}));

const mockHints = {
  hints: [
    {
      level: 'basic',
      content: '配列の要素を足し合わせることを考えてみましょう',
      unlockCost: 50,
      code: 'let sum = 0;'
    },
    {
      level: 'intermediate',
      content: 'forループを使用することができます',
      unlockCost: 100,
      code: 'for (let i = 0; i < arr.length; i++) { }'
    }
  ],
  unlockedHints: [],
  totalHints: 2
};

describe('HintSystem', () => {
  const mockUnlockHint = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hints and handles unlocking', () => {
    render(<HintSystem hints={mockHints} onUnlockHint={mockUnlockHint} />);
    
    // ヒントの表示確認
    expect(screen.getByText('ヒントシステム')).toBeInTheDocument();
    expect(screen.getByText('ヒント 1')).toBeInTheDocument();
    
    // 解放前の状態確認
    expect(screen.getByText('50 EXPで解放')).toBeInTheDocument();
    
    // ヒント解放ボタンのクリック
    fireEvent.click(screen.getByText('50 EXPで解放'));
    expect(mockUnlockHint).toHaveBeenCalledWith('0');
    
    // 解放済みヒント数の表示確認
    expect(screen.getByText('解放済みヒント: 0 / 2')).toBeInTheDocument();
  });

  it('disables unlock button when exp is insufficient', () => {
    const expensiveHints = {
      ...mockHints,
      hints: [
        {
          ...mockHints.hints[0],
          unlockCost: 200 // currentExp(100)より大きい
        }
      ]
    };

    render(<HintSystem hints={expensiveHints} onUnlockHint={mockUnlockHint} />);
    
    // 解放ボタンが無効化されていることを確認
    const unlockButton = screen.getByText('200 EXPで解放');
    expect(unlockButton).toBeDisabled();
    
    // 必要な経験値が不足しているメッセージの確認
    expect(screen.getByText('必要な経験値が不足しています')).toBeInTheDocument();
  });
}); 