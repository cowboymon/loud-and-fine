import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

const PAW_COUNT = 5;

// Simple paw print SVG path
function PawIcon({ filled, size = 20 }: { filled: boolean; size?: number }) {
  const color = filled ? Colors.pawFilled : Colors.pawEmpty;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Main pad */}
      <Path
        d="M12 10.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
        fill={color}
      />
      {/* Top pads */}
      <Path d="M6.5 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill={color} />
      <Path d="M17.5 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill={color} />
      <Path d="M9.5 4c-.8 0-1.5.7-1.5 1.5S8.7 7 9.5 7 11 6.3 11 5.5 10.3 4 9.5 4z" fill={color} />
      <Path d="M14.5 4c-.8 0-1.5.7-1.5 1.5S13.7 7 14.5 7 16 6.3 16 5.5 15.3 4 14.5 4z" fill={color} />
    </Svg>
  );
}

interface Props {
  filled: number; // 0-5
  size?: number;
  style?: ViewStyle;
}

export function PawProgress({ filled, size = 18, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: PAW_COUNT }, (_, i) => (
        <View key={i} style={styles.paw}>
          <PawIcon filled={i < filled} size={size} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  paw: {},
});
