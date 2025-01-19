export interface Hint {
  level: number;
  content: string;
  cost: number;
  unlocked?: boolean;
}

export interface HintSystemProps {
  hints: Hint[];
  onUnlockHint: (hintId: string) => void;
} 