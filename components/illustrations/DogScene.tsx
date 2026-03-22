import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { SoundCategory } from '../../types';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

// Emotion/pose based on category
const SCENE_CONFIG: Record<SoundCategory | 'default', { emoji: string; bg: string; label: string }> = {
  'at-home': { emoji: '🐕', bg: '#F5EDE3', label: 'At ease' },
  'outside': { emoji: '🐕', bg: '#E8F0EE', label: 'Alert but okay' },
  'other-animals': { emoji: '🐕', bg: '#EEE8E0', label: 'Curious' },
  'out-and-about': { emoji: '🐕', bg: '#E8ECF0', label: 'Taking it in' },
  'the-vet': { emoji: '🐕', bg: '#F0EAE8', label: 'Brave face' },
  'mystery': { emoji: '🐕', bg: '#EDE8F5', label: 'Curious' },
  'default': { emoji: '🐕', bg: Colors.surfaceSecondary, label: 'Ready' },
};

interface Props {
  category: SoundCategory;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

export function DogScene({ category, style, size = 'medium' }: Props) {
  const config = SCENE_CONFIG[category] ?? SCENE_CONFIG.default;
  const dim = size === 'large' ? 200 : size === 'medium' ? 160 : 100;

  return (
    <View
      style={[
        styles.container,
        { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: config.bg },
        style,
      ]}
    >
      <Text style={[styles.emoji, { fontSize: dim * 0.42 }]}>{config.emoji}</Text>
      <Text style={styles.label}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emoji: {},
  label: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
