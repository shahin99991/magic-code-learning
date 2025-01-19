import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeExplanation } from '../CodeExplanation';

const mockExplanation = {
  lineByLineExplanation: [
    {
      lineNumber: 1,
      explanation: '関数の定義',
      concept: '関数宣言'
    },
    {
      lineNumber: 2,
      explanation: '引数の加算',
      concept: '算術演算子'
    }
  ],
  conceptsUsed: ['関数', '加算', '戻り値'],
  tips: ['シンプルに保つことが重要', '変数名は分かりやすく']
};

describe('CodeExplanation', () => {
  it('renders explanation correctly', () => {
    render(<CodeExplanation explanation={mockExplanation} />);
    
    // タイトルの確認
    expect(screen.getByText('コードの解説')).toBeInTheDocument();
    
    // 行ごとの解説の確認
    expect(screen.getByText('行 1:')).toBeInTheDocument();
    expect(screen.getByText('関数の定義')).toBeInTheDocument();
    expect(screen.getByText('概念: 関数宣言')).toBeInTheDocument();
    
    // 概念の確認
    mockExplanation.conceptsUsed.forEach(concept => {
      expect(screen.getByText(concept)).toBeInTheDocument();
    });
    
    // Tipsの確認
    mockExplanation.tips.forEach(tip => {
      expect(screen.getByText(tip)).toBeInTheDocument();
    });
  });
}); 