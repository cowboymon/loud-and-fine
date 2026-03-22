import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export default function AllSetScreen() {
  const { name = 'Your dog' } = useLocalSearchParams<{ name: string; ageGroup: string }>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Progress dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === 3 && styles.dotActive]} />
          ))}
        </View>

        {/* Celebration illustration */}
        <View style={styles.hero}>
          <Text style={styles.dogEmoji}>🐕</Text>
          <View style={styles.sparkles}>
            <Text style={[styles.sparkle, { top: 0, right: 20 }]}>✦</Text>
            <Text style={[styles.sparkle, { top: 40, right: -10, fontSize: 14 }]}>✦</Text>
            <Text style={[styles.sparkle, { top: -10, left: 30, fontSize: 18 }]}>✦</Text>
            <Text style={[styles.sparkle, { top: 50, left: -5, fontSize: 12 }]}>✦</Text>
          </View>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.headline}>
            <Text>{name}</Text>
            <Text style={styles.headlineAccent}>'s ready.</Text>
            {'\n'}
            <Text style={styles.headlineMuted}>Probably.</Text>
          </Text>
        </View>

        <View style={styles.bottom}>
          <Button
            label="Start listening →"
            onPress={() => router.replace('/(tabs)')}
          />
          <Text style={styles.disclaimer}>
            A great companion to puppy school and professional training — or a solid place to start on your own.
          </Text>
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
    marginBottom: 32,
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
    fontSize: 110,
  },
  sparkles: {
    position: 'absolute',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    fontSize: 22,
    color: Colors.primary,
  },
  textBlock: {
    width: '100%',
    marginBottom: 40,
  },
  headline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 36,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 46,
  },
  headlineAccent: {
    color: Colors.primary,
  },
  headlineMuted: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 26,
    color: Colors.textSecondary,
  },
  bottom: {
    width: '100%',
    gap: 16,
  },
  disclaimer: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
