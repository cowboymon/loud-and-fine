export type AgeGroup = 'puppy' | 'young' | 'adult';

// Figma rating labels map to these keys
export type SoundRating = 'good' | 'soso' | 'not-yet';

// Legacy alias
export type Rating = 'green' | 'yellow' | 'red' | null;

export type SoundCategory =
  | 'at-home'
  | 'outside'
  | 'other-animals'
  | 'out-and-about'
  | 'the-place-we-dont-talk-about';

export interface DogProfile {
  id: string;
  name: string;
  age: AgeGroup;       // Figma uses 'age', not 'ageGroup'
  photoUrl?: string;
}

export interface SoundState {
  id: string;
  name: string;
  category: SoundCategory;
  plays: number;
  ratings: SoundRating[];
  lastPlayed?: string; // ISO string
}

export interface Milestone {
  id: string;
  soundId: string;
  soundName: string;
  date: string; // ISO string
  dogId: string;
}

export interface SoundDefinition {
  id: string;
  name: string;
  category: SoundCategory;
  emoji: string;
  description: string;
}

// Legacy types kept for any remaining references
export interface SoundProgress {
  dogId: string;
  soundId: string;
  totalPlays: number;
  consecutiveGreenRatings: number;
  isConfident: boolean;
  lastCeiling: number;
  lastStart: number;
  ratings: any[];
  isFavorited: boolean;
}

export interface MilestoneCard {
  id: string;
  dogId: string;
  soundId: string;
  soundName: string;
  earnedAt: number;
}

export interface MysteryState {
  soundId: string;
  unlockedAt: number;
  nextUnlockAt: number;
}
