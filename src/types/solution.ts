export interface SolutionExample {
  code: string;
  explanation: string;
  complexity: {
    time: string;
    space: string;
  };
  alternatives: Array<{
    description: string;
    code: string;
  }>;
}

export interface SolutionExampleProps {
  solution: SolutionExample;
} 