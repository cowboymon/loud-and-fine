import { SoundDefinition, SoundCategory } from '../types';

export const SOUNDS: SoundDefinition[] = [
  // At Home
  { id: 'vacuum', name: 'Vacuum cleaner', category: 'at-home', emoji: '🧹', description: 'The classic nemesis.' },
  { id: 'hairdryer', name: 'Hairdryer', category: 'at-home', emoji: '💨', description: 'Loud but predictable.' },
  { id: 'washing-machine', name: 'Washing machine', category: 'at-home', emoji: '🫧', description: 'Rhythmic rumbling.' },
  { id: 'blender', name: 'Blender', category: 'at-home', emoji: '🥤', description: 'Brief and intense.' },
  { id: 'smoke-alarm', name: 'Smoke alarm', category: 'at-home', emoji: '🚨', description: 'High-pitched and urgent.' },
  { id: 'doorbell', name: 'Doorbell', category: 'at-home', emoji: '🔔', description: 'A trigger for many.' },
  { id: 'loud-tv', name: 'Loud TV / movie sounds', category: 'at-home', emoji: '📺', description: 'Explosions, crowds, drama.' },
  { id: 'baby-crying', name: 'Baby crying', category: 'at-home', emoji: '👶', description: 'Unsettling for everyone.' },

  // Outside
  { id: 'thunderstorm', name: 'Thunderstorm', category: 'outside', emoji: '⛈️', description: 'The big one.' },
  { id: 'heavy-rain', name: 'Heavy rain', category: 'outside', emoji: '🌧️', description: 'Drumming on the roof.' },
  { id: 'fireworks', name: 'Fireworks', category: 'outside', emoji: '🎆', description: 'Once a year, every year.' },
  { id: 'lawnmower', name: 'Lawnmower', category: 'outside', emoji: '🌿', description: 'Regular and unavoidable.' },
  { id: 'traffic', name: 'Traffic / cars', category: 'outside', emoji: '🚗', description: 'The ambient world.' },
  { id: 'motorbikes', name: 'Motorbikes', category: 'outside', emoji: '🏍️', description: 'Sudden and loud.' },
  { id: 'construction', name: 'Construction', category: 'outside', emoji: '🏗️', description: 'Unpredictable and sustained.' },

  // Other Animals
  { id: 'dogs-small', name: 'Dogs barking — small', category: 'other-animals', emoji: '🐕', description: 'High-pitched and persistent.' },
  { id: 'dogs-large', name: 'Dogs barking — large', category: 'other-animals', emoji: '🐕‍🦺', description: 'Deep and commanding.' },
  { id: 'cats', name: 'Cats', category: 'other-animals', emoji: '🐈', description: 'Hissing, yowling, meowing.' },
  { id: 'birds', name: 'Birds', category: 'other-animals', emoji: '🐦', description: 'Chirping and squawking.' },
  { id: 'horses', name: 'Horses', category: 'other-animals', emoji: '🐴', description: 'Neighing and hooves.' },

  // Out & About
  { id: 'busy-cafe', name: 'Busy café / crowd', category: 'out-and-about', emoji: '☕', description: 'Chatter and clattering.' },
  { id: 'skateboards', name: 'Skateboards', category: 'out-and-about', emoji: '🛹', description: 'Grinding and rolling.' },
  { id: 'buses-trains', name: 'Buses / trains', category: 'out-and-about', emoji: '🚌', description: 'Hissing and rumbling.' },
  { id: 'clapping-cheering', name: 'Clapping / cheering', category: 'out-and-about', emoji: '👏', description: 'Unpredictable surges.' },

  // The Place We Don't Talk About
  { id: 'clippers', name: 'Clippers', category: 'the-place-we-dont-talk-about', emoji: '✂️', description: 'The grooming buzzer.' },
  { id: 'dryer', name: 'Dryer', category: 'the-place-we-dont-talk-about', emoji: '💨', description: 'Hot air, loud.' },
  { id: 'metal-table', name: 'Metal table / instruments', category: 'the-place-we-dont-talk-about', emoji: '🔧', description: 'Clinks and scrapes.' },
  { id: 'vet-office', name: 'Vet office ambience', category: 'the-place-we-dont-talk-about', emoji: '🏥', description: 'The whole vibe.' },
];

export type CategoryInfo = {
  id: SoundCategory;
  name: string;
  emoji: string;
};

export const CATEGORIES: CategoryInfo[] = [
  { id: 'at-home', name: 'At Home', emoji: '🏠' },
  { id: 'outside', name: 'Outside', emoji: '⛈️' },
  { id: 'other-animals', name: 'Other Animals', emoji: '🐾' },
  { id: 'out-and-about', name: 'Out & About', emoji: '🏙️' },
  { id: 'the-place-we-dont-talk-about', name: "The Place We Don't Talk About", emoji: '✂️' },
];

export const SOUNDS_BY_CATEGORY: Record<SoundCategory, SoundDefinition[]> = {
  'at-home': SOUNDS.filter(s => s.category === 'at-home'),
  'outside': SOUNDS.filter(s => s.category === 'outside'),
  'other-animals': SOUNDS.filter(s => s.category === 'other-animals'),
  'out-and-about': SOUNDS.filter(s => s.category === 'out-and-about'),
  'the-place-we-dont-talk-about': SOUNDS.filter(s => s.category === 'the-place-we-dont-talk-about'),
};

export const BROWSABLE_CATEGORIES: SoundCategory[] = CATEGORIES.map(c => c.id);

export const CATEGORY_DISPLAY: Record<SoundCategory, { label: string; emoji: string }> = {
  'at-home': { label: 'At Home', emoji: '🏠' },
  'outside': { label: 'Outside', emoji: '⛈️' },
  'other-animals': { label: 'Other Animals', emoji: '🐾' },
  'out-and-about': { label: 'Out & About', emoji: '🏙️' },
  'the-place-we-dont-talk-about': { label: "The Place We Don't Talk About", emoji: '✂️' },
};

export const GREETINGS = [
  "Time for {dogName}'s daily listen.",
  '{dogName} deserves a calm life.',
  'Probably time for a session.',
  "The vacuum isn't going to desensitise itself.",
  'Just a quick listen for {dogName}.',
];

export const SUB_GREETINGS = [
  'Even 10 minutes makes a difference. Probably.',
  "The vacuum isn't going anywhere. Might as well.",
  'Consistency beats intensity.',
  'Small steps. Big difference.',
  "Your dog's going to be fine.",
];

export const rewardMessages = (dogName: string): string[] => [
  `Give ${dogName} a treat while the sound plays.`,
  `Play a quick game with ${dogName} right now.`,
  `Toss ${dogName} a reward. Keep it positive.`,
  `Time for ${dogName}'s favourite treat.`,
];

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
