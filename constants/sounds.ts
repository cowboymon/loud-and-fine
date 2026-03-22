import { SoundDefinition, SoundCategory } from '../types';

export const SOUNDS: SoundDefinition[] = [
  // At Home
  { id: 'vacuum', name: 'Vacuum Cleaner', category: 'at-home', emoji: '🧹', description: 'The classic nemesis.' },
  { id: 'hairdryer', name: 'Hairdryer', category: 'at-home', emoji: '💨', description: 'Loud but predictable.' },
  { id: 'washing-machine', name: 'Washing Machine', category: 'at-home', emoji: '🫧', description: 'Rhythmic rumbling.' },
  { id: 'blender', name: 'Blender', category: 'at-home', emoji: '🥤', description: 'Brief and intense.' },
  { id: 'smoke-alarm', name: 'Smoke Alarm', category: 'at-home', emoji: '🚨', description: 'High-pitched and urgent.' },
  { id: 'doorbell', name: 'Doorbell', category: 'at-home', emoji: '🔔', description: 'A trigger for many.' },
  { id: 'loud-tv', name: 'Loud TV / Movies', category: 'at-home', emoji: '📺', description: 'Explosions, crowds, drama.' },
  { id: 'baby-crying', name: 'Baby Crying', category: 'at-home', emoji: '👶', description: 'Unsettling for everyone.' },

  // Outside
  { id: 'thunderstorm', name: 'Thunderstorm', category: 'outside', emoji: '⛈️', description: 'The big one.' },
  { id: 'heavy-rain', name: 'Heavy Rain', category: 'outside', emoji: '🌧️', description: 'Drumming on the roof.' },
  { id: 'fireworks', name: 'Fireworks', category: 'outside', emoji: '🎆', description: 'Once a year, every year.' },
  { id: 'lawnmower', name: 'Lawnmower', category: 'outside', emoji: '🌿', description: 'Regular and unavoidable.' },
  { id: 'traffic', name: 'Traffic / Cars', category: 'outside', emoji: '🚗', description: 'The ambient world.' },
  { id: 'motorbikes', name: 'Motorbikes', category: 'outside', emoji: '🏍️', description: 'Sudden and loud.' },
  { id: 'construction', name: 'Construction', category: 'outside', emoji: '🏗️', description: 'Unpredictable and sustained.' },

  // Other Animals
  { id: 'dogs-small', name: 'Dogs Barking — Small', category: 'other-animals', emoji: '🐕', description: 'High-pitched and persistent.' },
  { id: 'dogs-large', name: 'Dogs Barking — Large', category: 'other-animals', emoji: '🐕‍🦺', description: 'Deep and commanding.' },
  { id: 'cats', name: 'Cats', category: 'other-animals', emoji: '🐈', description: 'Hissing, yowling, meowing.' },
  { id: 'birds', name: 'Birds', category: 'other-animals', emoji: '🐦', description: 'Chirping and squawking.' },
  { id: 'horses', name: 'Horses', category: 'other-animals', emoji: '🐴', description: 'Neighing and hooves.' },

  // Out & About
  { id: 'cafe-crowd', name: 'Busy Café / Crowd', category: 'out-and-about', emoji: '☕', description: 'Chatter and clattering.' },
  { id: 'skateboards', name: 'Skateboards', category: 'out-and-about', emoji: '🛹', description: 'Grinding and rolling.' },
  { id: 'buses-trains', name: 'Buses / Trains', category: 'out-and-about', emoji: '🚌', description: 'Hissing and rumbling.' },
  { id: 'clapping', name: 'Clapping / Cheering', category: 'out-and-about', emoji: '👏', description: 'Unpredictable surges.' },

  // The Vet
  { id: 'clippers', name: 'Clippers', category: 'the-vet', emoji: '✂️', description: 'The grooming buzzer.' },
  { id: 'dryer', name: 'Dryer', category: 'the-vet', emoji: '💨', description: 'Hot air, loud.' },
  { id: 'metal-table', name: 'Metal Table / Instruments', category: 'the-vet', emoji: '🔧', description: 'Clinks and scrapes.' },
  { id: 'vet-ambience', name: 'Vet Office Ambience', category: 'the-vet', emoji: '🏥', description: 'The whole vibe.' },
];

export const SOUNDS_BY_CATEGORY: Record<SoundCategory, SoundDefinition[]> = {
  'at-home': SOUNDS.filter(s => s.category === 'at-home'),
  'outside': SOUNDS.filter(s => s.category === 'outside'),
  'other-animals': SOUNDS.filter(s => s.category === 'other-animals'),
  'out-and-about': SOUNDS.filter(s => s.category === 'out-and-about'),
  'the-vet': SOUNDS.filter(s => s.category === 'the-vet'),
  'mystery': [],
};

export const CATEGORY_DISPLAY: Record<SoundCategory, { label: string; emoji: string }> = {
  'at-home': { label: 'At Home', emoji: '🏠' },
  'outside': { label: 'Outside', emoji: '🌳' },
  'other-animals': { label: 'Other Animals', emoji: '🐾' },
  'out-and-about': { label: 'Out & About', emoji: '🛒' },
  'the-vet': { label: "The Place We Don't Talk About", emoji: '🩺' },
  'mystery': { label: 'The Surprise', emoji: '🔮' },
};

export const BROWSABLE_CATEGORIES: SoundCategory[] = [
  'at-home',
  'outside',
  'other-animals',
  'out-and-about',
  'the-vet',
];
