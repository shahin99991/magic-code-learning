import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SolutionExample } from '../SolutionExample';

const mockSolution = {
  code: 'function example() { return true; }',
  explanation: 'This is an example solution',
  complexity: {
    time: 'O(1)',
    space: 'O(1)'
  },
  alternatives: [
    {
      description: 'Alternative approach',
      code: 'function alternative() { return true; }'
    }
  ]
};

jest.mock('react-syntax-highlighter', () => ({
  SyntaxHighlighter: ({ children }: { children: React.ReactNode }) => (
    <pre data-testid="code-block">{children}</pre>
  )
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  materialDark: {}
}));

describe('SolutionExample', () => {
  it('renders solution and toggles visibility', () => {
    render(<SolutionExample solution={mockSolution} />);
    
    // 初期状態では解答は非表示
    expect(screen.queryByTestId('code-block')).not.toBeInTheDocument();
    
    // 表示ボタンをクリック
    fireEvent.click(screen.getByText('解答を表示'));
    
    // 解答が表示される
    expect(screen.getByTestId('code-block')).toBeInTheDocument();
    expect(screen.getByText('This is an example solution')).toBeInTheDocument();
    expect(screen.getByText('時間計算量: O(1)')).toBeInTheDocument();
    
    // 代替アプローチの確認
    expect(screen.getByText('Alternative approach')).toBeInTheDocument();
    expect(screen.getByText('function alternative() { return true; }')).toBeInTheDocument();
    
    // 非表示ボタンをクリック
    fireEvent.click(screen.getByText('解答を隠す'));
    
    // 解答が非表示になる
    expect(screen.queryByTestId('code-block')).not.toBeInTheDocument();
  });
}); 