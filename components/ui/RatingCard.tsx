import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Rating } from '../../types';

interface Props {
  rating: 'green' | 'yellow' | 'red';
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const RATING_CONFIG = {
  green: { emoji: '🟢', label: 'Handled it', bg: Colors.ratingGreen, border: Colors.ratingGreen },
  yellow: { emoji: '🟡', label: 'So-so', bg: Colors.ratingYellow, border: Colors.ratingYellow },
  red: { emoji: '🔴', label: 'Not yet', bg: Colors.ratingRed, border: Colors.ratingRed },
};

export function RatingCard({ rating, selected, onPress, style }: Props) {
  const config = RATING_CONFIG[rating];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.card,
        selected && { backgroundColor: config.bg, borderColor: config.border },
        style,
      ]}
    >
      <Text style={styles.emoji}>{config.emoji}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {config.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 8,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  labelSelected: {
    color: Colors.white,
  },
});
