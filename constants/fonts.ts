export const Fonts = {
  // Instrument Serif — headings, display, editorial (italic only in Figma)
  serifItalic: 'InstrumentSerif_400Regular_Italic',

  // Plus Jakarta Sans — all UI text
  jakartaRegular: 'PlusJakartaSans_400Regular',
  jakartaMedium: 'PlusJakartaSans_500Medium',
  jakartaSemiBold: 'PlusJakartaSans_600SemiBold',
  jakartaBold: 'PlusJakartaSans_700Bold',
  jakartaExtraBold: 'PlusJakartaSans_800ExtraBold',

  // Legacy alias so existing imports don't break during rebuild
  spectralBoldItalic: 'InstrumentSerif_400Regular_Italic',
} as const;
