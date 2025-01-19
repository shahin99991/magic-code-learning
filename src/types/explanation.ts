export interface CodeExplanation {
  lineByLine: string[];
  concepts: string[];
  tips: string[];
}

export interface CodeExplanationProps {
  explanation: CodeExplanation;
} 