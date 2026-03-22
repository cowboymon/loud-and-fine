import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = true,
}: Props) {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        isPrimary && styles.primary,
        isGhost && styles.ghost,
        isDanger && styles.danger,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.accent} />
      ) : (
        <Text
          style={[
            styles.label,
            isPrimary && styles.labelPrimary,
            isGhost && styles.labelGhost,
            isDanger && styles.labelDanger,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  danger: {
    backgroundColor: Colors.ratingRed,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  labelPrimary: {
    color: Colors.white,
  },
  labelGhost: {
    color: Colors.accent,
  },
  labelDanger: {
    color: Colors.white,
  },
});
