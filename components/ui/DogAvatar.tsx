import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface Props {
  name: string;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}

export function DogAvatar({ name, onPress, size = 38, style }: Props) {
  const initials = name.slice(0, 1).toUpperCase();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Text style={[styles.initial, { fontSize: size * 0.42 }]}>{initials}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: Fonts.jakartaExtraBold,
    color: Colors.white,
  },
});
