export const Config = {
  mysteryUnlockIntervalMs: 3 * 24 * 60 * 60 * 1000, // 3 days
  maxDogs: 5,
  pawsPerSound: 5,
  consecutiveGreensForConfident: 5,
  graduationMixSoundCount: 5,
  wooferMixMinSounds: 2,
  wooferMixMaxSounds: 5,
  wooferMixSoundDurationMs: 2 * 60 * 1000, // 2 min per sound
  crossfadeDurationMs: 2000,
  sessionDurationOptions: [5, 10, 15, 20] as number[], // minutes
  defaultVolumeStart: 20,
  defaultVolumeCeiling: 50,
  volumeSuggestedIncrement: 10,
  ratingWeights: { newest: 3, middle: 2, oldest: 1 },
  wooferScores: { green: 1.0, yellow: 0.5, red: 0.0, unplayed: 0.25 },
  sessionHistoryLimit: 10,
} as const;
