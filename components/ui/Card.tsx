import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'terracotta' | 'teal' | 'sand';
}

export function Card({ children, style, variant = 'default' }: Props) {
  return (
    <View
      style={[
        styles.card,
        variant === 'terracotta' && styles.terracotta,
        variant === 'teal' && styles.teal,
        variant === 'sand' && styles.sand,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 18,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  terracotta: {
    backgroundColor: Colors.primary,
  },
  teal: {
    backgroundColor: Colors.accent,
  },
  sand: {
    backgroundColor: Colors.surfaceSecondary,
  },
});
