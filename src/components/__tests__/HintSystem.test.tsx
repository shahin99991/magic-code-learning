import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HintSystem } from '../HintSystem';
import type { Hint } from '../../types/hint';

// LevelContextのモック
jest.mock('../../contexts/LevelContext', () => ({
  useLevel: () => ({
    currentExp: 100
  })
}));

const mockHints: Hint[] = [
  {
    level: 1,
    content: 'First hint',
    cost: 10,
    unlocked: false
  },
  {
    level: 2,
    content: 'Second hint',
    cost: 20,
    unlocked: false
  }
];

const expensiveHints: Hint[] = [
  {
    level: 1,
    content: 'Expensive hint',
    cost: 100,
    unlocked: false
  }
];

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
    expect(screen.getByText('10 EXPで解放')).toBeInTheDocument();
    
    // ヒント解放ボタンのクリック
    fireEvent.click(screen.getByText('10 EXPで解放'));
    expect(mockUnlockHint).toHaveBeenCalledWith('1');
    
    // 解放済みヒント数の表示確認
    expect(screen.getByText('解放済みヒント: 0 / 2')).toBeInTheDocument();
  });

  it('disables unlock button when exp is insufficient', () => {
    render(<HintSystem hints={expensiveHints} onUnlockHint={mockUnlockHint} />);
    
    // 解放ボタンが無効化されていることを確認
    const unlockButton = screen.getByText('100 EXPで解放');
    expect(unlockButton).toBeDisabled();
    
    // 必要な経験値が不足しているメッセージの確認
    expect(screen.getByText('必要な経験値が不足しています')).toBeInTheDocument();
  });
}); 