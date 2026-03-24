import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOUNDS, CATEGORIES } from '../constants/sounds';
import { DogProfile, SoundState, Milestone, SoundRating, SoundCategory } from '../types';

// ─── State shape ────────────────────────────────────────────────────────────

interface AppState {
  // Onboarding
  hasCompletedOnboarding: boolean;

  // Dogs
  dogs: DogProfile[];
  currentDogId: string | null;

  // Sounds — keyed by soundId (global, not per-dog; ratings are per-dog via currentDogId)
  sounds: Record<string, SoundState>;

  // Starred sounds (global, not per-dog to keep it simple)
  starredSounds: string[];

  // Milestones
  milestones: Milestone[];

  // Mystery unlock date (ISO string) — set 3 days from first completion of onboarding
  mysteryUnlockDate: string | null;
}

// ─── Derived helpers ─────────────────────────────────────────────────────────

function isConfident(ratings: SoundRating[]): boolean {
  const last5 = ratings.slice(-5);
  return last5.length === 5 && last5.every(r => r === 'good');
}

// ─── Store interface ─────────────────────────────────────────────────────────

interface AppStore extends AppState {
  // Dog actions
  addDog: (name: string, age: DogProfile['age'], photoUrl?: string) => void;
  updateDog: (dogId: string, updates: Partial<Omit<DogProfile, 'id'>>) => void;
  switchDog: (dogId: string) => void;
  completeOnboarding: () => void;

  // Sound actions
  recordPlay: (soundId: string) => void;
  rateSound: (soundId: string, rating: SoundRating) => { milestoneEarned: boolean };
  toggleStar: (soundId: string) => void;

  // Computed helpers
  currentDog: () => DogProfile | null;
  getSoundState: (soundId: string) => SoundState;
  getCategoryProgress: (category: SoundCategory) => { total: number; confident: number; inProgress: number };
  getOverallProgress: () => { total: number; confident: number; inProgress: number; notStarted: number };
  isMysteryUnlocked: () => boolean;
  hasGraduated: () => boolean;
  getMilestones: () => Milestone[];
  getRecentSessions: (limit?: number) => SoundState[];
}

// ─── Initial sound states ────────────────────────────────────────────────────

function buildInitialSounds(): Record<string, SoundState> {
  const result: Record<string, SoundState> = {};
  for (const s of SOUNDS) {
    result[s.id] = { id: s.id, name: s.name, category: s.category, plays: 0, ratings: [] };
  }
  return result;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      hasCompletedOnboarding: false,
      dogs: [],
      currentDogId: null,
      sounds: buildInitialSounds(),
      starredSounds: [],
      milestones: [],
      mysteryUnlockDate: null,

      // ── Dog actions ──────────────────────────────────────────────────────

      addDog: (name, age, photoUrl) => {
        const newDog: DogProfile = {
          id: Date.now().toString(),
          name: name.trim(),
          age,
          photoUrl,
        };
        set(state => ({
          dogs: [...state.dogs, newDog],
          currentDogId: newDog.id,
        }));
      },

      updateDog: (dogId, updates) => {
        set(state => ({
          dogs: state.dogs.map(d => d.id === dogId ? { ...d, ...updates } : d),
        }));
      },

      switchDog: (dogId) => {
        set({ currentDogId: dogId });
      },

      completeOnboarding: () => {
        const unlockDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
        set({ hasCompletedOnboarding: true, mysteryUnlockDate: unlockDate });
      },

      // ── Sound actions ────────────────────────────────────────────────────

      recordPlay: (soundId) => {
        set(state => ({
          sounds: {
            ...state.sounds,
            [soundId]: {
              ...state.sounds[soundId],
              plays: (state.sounds[soundId]?.plays ?? 0) + 1,
              lastPlayed: new Date().toISOString(),
            },
          },
        }));
      },

      rateSound: (soundId, rating) => {
        let milestoneEarned = false;

        set(state => {
          const current = state.sounds[soundId];
          if (!current) return state;

          const newRatings = [...current.ratings, rating];
          const earned = isConfident(newRatings);

          // Only create milestone once per sound per dog
          let newMilestones = state.milestones;
          if (
            earned &&
            !state.milestones.find(
              m => m.soundId === soundId && m.dogId === state.currentDogId
            )
          ) {
            milestoneEarned = true;
            const milestone: Milestone = {
              id: Date.now().toString(),
              soundId,
              soundName: current.name,
              date: new Date().toISOString(),
              dogId: state.currentDogId ?? '',
            };
            newMilestones = [...state.milestones, milestone];
          }

          return {
            sounds: {
              ...state.sounds,
              [soundId]: { ...current, ratings: newRatings, lastPlayed: current.lastPlayed ?? new Date().toISOString() },
            },
            milestones: newMilestones,
          };
        });

        return { milestoneEarned };
      },

      toggleStar: (soundId) => {
        set(state => ({
          starredSounds: state.starredSounds.includes(soundId)
            ? state.starredSounds.filter(id => id !== soundId)
            : [...state.starredSounds, soundId],
        }));
      },

      // ── Computed helpers ─────────────────────────────────────────────────

      currentDog: () => {
        const { dogs, currentDogId } = get();
        return dogs.find(d => d.id === currentDogId) ?? null;
      },

      getSoundState: (soundId) => {
        return get().sounds[soundId] ?? { id: soundId, name: soundId, category: 'at-home', plays: 0, ratings: [] };
      },

      getCategoryProgress: (category) => {
        const sounds = Object.values(get().sounds).filter(s => s.category === category);
        const total = sounds.length;
        const confident = sounds.filter(s => isConfident(s.ratings)).length;
        const inProgress = sounds.filter(s => s.plays > 0 && !isConfident(s.ratings)).length;
        return { total, confident, inProgress };
      },

      getOverallProgress: () => {
        const sounds = Object.values(get().sounds);
        const total = sounds.length;
        const confident = sounds.filter(s => isConfident(s.ratings)).length;
        const inProgress = sounds.filter(s => s.plays > 0 && !isConfident(s.ratings)).length;
        const notStarted = total - confident - inProgress;
        return { total, confident, inProgress, notStarted };
      },

      isMysteryUnlocked: () => {
        const { mysteryUnlockDate } = get();
        if (!mysteryUnlockDate) return false;
        return new Date(mysteryUnlockDate) <= new Date();
      },

      hasGraduated: () => {
        const sounds = Object.values(get().sounds);
        const confident = sounds.filter(s => isConfident(s.ratings)).length;
        return confident >= sounds.length * 0.8;
      },

      getMilestones: () => {
        const { milestones, currentDogId } = get();
        return milestones.filter(m => m.dogId === currentDogId);
      },

      getRecentSessions: (limit = 10) => {
        return Object.values(get().sounds)
          .filter(s => s.lastPlayed)
          .sort((a, b) => new Date(b.lastPlayed!).getTime() - new Date(a.lastPlayed!).getTime())
          .slice(0, limit);
      },
    }),
    {
      name: 'loud-and-fine-app-state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
