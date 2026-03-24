export const Colors = {
  // Backgrounds
  background: '#FAF7F2',        // warm-cream — main screen bg
  surface: '#FFFFFF',           // pure white — cards
  surfaceSecondary: '#F2EDE5',  // warm-linen — secondary cards, inputs
  surfaceTertiary: '#E8E0D5',   // warm-sand — disabled states, subtle borders

  // Brand
  primary: '#D96B4A',           // terracotta — CTAs, confident state, milestone
  accent: '#1A4349',            // deep-teal — active nav, buttons, rating teal

  // Text
  textPrimary: '#1A1410',       // near-black
  textSecondary: '#7A6E65',     // warm-mid-grey

  // Border
  border: '#E8E0D5',            // warm-sand

  // Page bg (behind tab bar etc.)
  pageBg: '#EDE8DF',

  // Rating colours (map to Figma gradient stops)
  ratingGood: '#D96B4A',        // terracotta  ("Handled it")
  ratingGoodEnd: '#A56D5F',     // gradient end
  ratingSoso: '#1A4349',        // deep-teal   ("So-so")
  ratingSosoEnd: '#8B7A99',     // gradient end (purple)
  ratingNotYet: '#F2EDE5',      // linen bg    ("Not yet") — no gradient

  // Legacy aliases kept for any remaining imports
  ratingGreen: '#D96B4A',
  ratingYellow: '#1A4349',
  ratingRed: '#7A6E65',

  white: '#FFFFFF',
} as const;
