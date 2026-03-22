import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { PawProgress } from '../components/ui/PawProgress';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

const DOG_NAME = 'Biscuit';
const SOUND_NAME = 'Vacuum Cleaner';

export default function MilestoneScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Sparkles top */}
        <View style={styles.sparkleRow}>
          <Text style={styles.sparkle}>✦</Text>
          <Text style={[styles.sparkle, { fontSize: 18, color: Colors.accent }]}>✦</Text>
          <Text style={[styles.sparkle, { fontSize: 12 }]}>✦</Text>
        </View>

        {/* Dog illustration */}
        <View style={styles.hero}>
          <Text style={styles.dogEmoji}>🐕</Text>
          <View style={styles.capWrapper}>
            <Text style={styles.cap}>🎓</Text>
          </View>
          <View style={styles.sparklesHero}>
            <Text style={[styles.sparkle, { top: 0, right: -20 }]}>✦</Text>
            <Text style={[styles.sparkle, { top: 30, right: -35, fontSize: 14, color: Colors.accent }]}>✦</Text>
            <Text style={[styles.sparkle, { top: -10, left: -25, fontSize: 16 }]}>✦</Text>
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>
          {DOG_NAME} heard {SOUND_NAME} 5 times and didn't lose it once.
        </Text>

        {/* Shareable card preview */}
        <View style={styles.shareCard}>
          <View style={styles.shareCardHeader}>
            <Text style={styles.shareCardAppName}>Loud & Fine</Text>
            <PawProgress filled={5} size={16} />
          </View>
          <Text style={styles.shareCardHeadline}>
            {DOG_NAME}: unbothered. Finally.
          </Text>
          <Text style={styles.shareCardSub}>
            5 listens. 0 meltdowns.
          </Text>
          <Text style={styles.shareCardSound}>{SOUND_NAME} · Confident 🟢</Text>
        </View>

        {/* CTAs */}
        <View style={styles.ctas}>
          <Button label="Share this →" onPress={() => {}} />
          <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.keepGoing}>
            <Text style={styles.keepGoingText}>Keep going →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  sparkleRow: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 24,
    marginBottom: 8,
  },
  sparkle: {
    fontSize: 24,
    color: Colors.primary,
  },
  hero: {
    position: 'relative',
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dogEmoji: {
    fontSize: 100,
  },
  capWrapper: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  cap: {
    fontSize: 36,
  },
  sparklesHero: {
    position: 'absolute',
    width: 160,
    height: 120,
  },
  headline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 24,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  shareCard: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 22,
    padding: 22,
    marginBottom: 28,
    gap: 8,
  },
  shareCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  shareCardAppName: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  shareCardHeadline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 20,
    color: Colors.white,
    lineHeight: 28,
  },
  shareCardSub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  shareCardSound: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  ctas: {
    width: '100%',
    gap: 12,
  },
  keepGoing: {
    alignSelf: 'center',
    padding: 10,
  },
  keepGoingText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
