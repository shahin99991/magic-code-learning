import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeExplanation } from '../CodeExplanation';

const mockExplanation = {
  lineByLine: ['Line 1 explanation', 'Line 2 explanation'],
  concepts: ['Concept 1', 'Concept 2'],
  tips: ['Tip 1', 'Tip 2']
};

describe('CodeExplanation', () => {
  it('renders explanation correctly', () => {
    render(<CodeExplanation explanation={mockExplanation} />);
    
    // タイトルの確認
    expect(screen.getByText('コードの解説')).toBeInTheDocument();
    
    // 行ごとの解説の確認
    expect(screen.getByText('行 1:')).toBeInTheDocument();
    expect(screen.getByText('Line 1 explanation')).toBeInTheDocument();
    
    // 概念の確認
    mockExplanation.concepts.forEach(concept => {
      expect(screen.getByText(concept)).toBeInTheDocument();
    });
    
    // Tipsの確認
    mockExplanation.tips.forEach(tip => {
      expect(screen.getByText(tip)).toBeInTheDocument();
    });
  });
}); 