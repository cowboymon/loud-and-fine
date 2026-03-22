import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export default function WelcomeScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Progress dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>

        {/* Hero illustration */}
        <View style={styles.hero}>
          <Text style={styles.dogEmoji}>🐕</Text>
          <View style={styles.tailWag}>
            <Text style={styles.sparkle}>✦</Text>
            <Text style={styles.sparkle2}>✦</Text>
          </View>
        </View>

        {/* App name */}
        <Text style={styles.appName}>Loud & Fine</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Loud world. Fine dog.</Text>

        <View style={styles.bottom}>
          <Button label="Let's go →" onPress={() => router.push('/onboarding/dog-name')} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.accent,
    width: 24,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dogEmoji: {
    fontSize: 120,
  },
  tailWag: {
    position: 'absolute',
    right: -10,
    top: 20,
  },
  sparkle: {
    fontSize: 24,
    color: Colors.primary,
  },
  sparkle2: {
    fontSize: 16,
    color: Colors.accent,
    marginLeft: 16,
    marginTop: -8,
  },
  appName: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 42,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  tagline: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  bottom: {
    width: '100%',
  },
});
