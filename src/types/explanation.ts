export interface LineExplanation {
  lineNumber: number;
  explanation: string;
  concept: string;
}

export interface Explanation {
  lineByLine: string[];
  concepts: string[];
  tips: string[];
}

export interface ExplanationData {
  [key: string]: Explanation;
}

export interface CodeExplanation {
  lineByLine: string[];
  concepts: string[];
  tips: string[];
}

export interface CodeExplanationProps {
  explanation: CodeExplanation;
} 