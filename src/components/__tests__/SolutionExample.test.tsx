import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SolutionExample } from '../SolutionExample';

const mockSolution = {
  code: 'function add(a, b) {\n  return a + b;\n}',
  explanation: '2つの数値を加算する関数です',
  complexity: {
    time: 'O(1)',
    space: 'O(1)'
  },
  alternativeApproaches: [
    {
      description: '再帰を使用する方法',
      pros: ['理解しやすい'],
      cons: ['スタックオーバーフローの可能性']
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
    expect(screen.getByText('2つの数値を加算する関数です')).toBeInTheDocument();
    expect(screen.getByText('時間計算量: O(1)')).toBeInTheDocument();
    
    // 代替アプローチの確認
    expect(screen.getByText('再帰を使用する方法')).toBeInTheDocument();
    expect(screen.getByText('理解しやすい')).toBeInTheDocument();
    
    // 非表示ボタンをクリック
    fireEvent.click(screen.getByText('解答を隠す'));
    
    // 解答が非表示になる
    expect(screen.queryByTestId('code-block')).not.toBeInTheDocument();
  });
}); 