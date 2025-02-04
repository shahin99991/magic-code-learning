export interface Hint {
  level: number;
  content: string;
  cost: number;
  unlocked?: boolean;
}

export interface HintData {
  [key: string]: Hint[];
}

export interface HintSystemProps {
  hints: Hint[];
  onUnlockHint: (hintId: string) => void;
} 