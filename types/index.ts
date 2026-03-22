export type AgeGroup = 'puppy' | 'young' | 'adult';
export type Rating = 'green' | 'yellow' | 'red' | null;
export type SoundCategory =
  | 'at-home'
  | 'outside'
  | 'other-animals'
  | 'out-and-about'
  | 'the-vet'
  | 'mystery';

export interface DogProfile {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  createdAt: number;
}

export interface SessionRating {
  sessionId: string;
  timestamp: number;
  duration: number; // minutes
  rating: Rating;
  volumeStart: number;
  volumeCeiling: number;
  soundId: string;
  soundName: string;
}

export interface SoundProgress {
  dogId: string;
  soundId: string;
  totalPlays: number;
  consecutiveGreenRatings: number;
  isConfident: boolean;
  lastCeiling: number;
  lastStart: number;
  ratings: SessionRating[];
  isFavorited: boolean;
}

export interface MilestoneCard {
  id: string;
  dogId: string;
  soundId: string;
  soundName: string;
  earnedAt: number;
}

export interface SoundDefinition {
  id: string;
  name: string;
  category: SoundCategory;
  emoji: string;
  description: string;
}

export interface MysteryState {
  soundId: string;
  unlockedAt: number;
  nextUnlockAt: number;
}
