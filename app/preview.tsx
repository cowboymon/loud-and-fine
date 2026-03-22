/**
 * Preview screen — navigate to any screen for visual review.
 * Remove before shipping.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

const SCREENS = [
  { label: '1. Onboarding — Welcome', href: '/onboarding/welcome' },
  { label: '2. Onboarding — Dog Name', href: '/onboarding/dog-name' },
  { label: '3. Onboarding — Dog Age', href: { pathname: '/onboarding/dog-age', params: { name: 'Biscuit' } } },
  { label: '4. Onboarding — All Set', href: { pathname: '/onboarding/all-set', params: { name: 'Biscuit', ageGroup: 'young' } } },
  { label: '5. Home Tab', href: '/(tabs)' },
  { label: '6. Sounds Tab', href: '/(tabs)/sounds' },
  { label: '7. Dog Profile Tab', href: '/(tabs)/dog' },
  { label: '8. Sound Player — Thunderstorm', href: '/player/thunderstorm' },
  { label: '9. Sound Player — Vacuum', href: '/player/vacuum' },
  { label: '10. Post-Session Rating', href: '/post-session' },
  { label: '11. Milestone', href: '/milestone' },
  { label: '12. Graduation Story', href: '/graduation' },
  { label: '13. Dog Switcher', href: '/dog-switcher' },
] as const;

export default function PreviewScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Screen Preview</Text>
        <Text style={styles.sub}>Tap any screen to preview. Remove before shipping.</Text>

        {SCREENS.map((s) => (
          <TouchableOpacity
            key={s.label}
            style={styles.row}
            onPress={() => router.push(s.href as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.rowText}>{s.label}</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 2,
  },
  title: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 32,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowText: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  arrow: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.primary,
  },
});
