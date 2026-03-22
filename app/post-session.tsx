import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RatingCard } from '../components/ui/RatingCard';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { Rating } from '../types';

const DOG_NAME = 'Biscuit';
const SOUND_NAME = 'Thunderstorm';
const PLAY_COUNT = 2; // < 4 = mandatory rating (no skip)

const RESPONSE_COPY: Record<string, string> = {
  green: 'Nice. Keep going at this volume for another session or two.',
  yellow: 'Fair enough. Same volume next session.',
  red: "That's okay. Stay at this volume and try again.",
};

export default function PostSessionScreen() {
  const [selected, setSelected] = useState<'green' | 'yellow' | 'red' | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleDone = () => {
    if (selected === 'green' && PLAY_COUNT >= 4) {
      // Would trigger milestone check in Phase B
      router.push('/milestone');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Drag handle */}
      <View style={styles.handleRow}>
        <View style={styles.handle} />
      </View>

      <View style={styles.container}>
        {/* Sound info */}
        <Text style={styles.category}>SESSION COMPLETE</Text>
        <Text style={styles.soundName}>{SOUND_NAME}</Text>

        {/* Dog scene placeholder */}
        <View style={styles.dogPlaceholder}>
          <Text style={styles.dogEmoji}>🐕</Text>
        </View>

        {/* Prompt */}
        <Text style={styles.prompt}>How did {DOG_NAME} do?</Text>

        {/* Rating cards */}
        <View style={styles.ratings}>
          {(['green', 'yellow', 'red'] as const).map((r) => (
            <RatingCard
              key={r}
              rating={r}
              selected={selected === r}
              onPress={() => {
                setSelected(r);
                setConfirmed(false);
              }}
            />
          ))}
        </View>

        {/* Response line */}
        {selected && (
          <Text style={styles.responseLine}>{RESPONSE_COPY[selected]}</Text>
        )}

        {/* Skip (only if play count >= 4) */}
        {PLAY_COUNT >= 4 && !confirmed && (
          <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip rating</Text>
          </TouchableOpacity>
        )}

        {/* Done */}
        <Button
          label="Done →"
          onPress={handleDone}
          disabled={!selected}
          style={styles.doneBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  category: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  soundName: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  dogPlaceholder: {
    alignItems: 'center',
    marginBottom: 24,
  },
  dogEmoji: {
    fontSize: 80,
  },
  prompt: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  ratings: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  responseLine: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  skipBtn: {
    alignSelf: 'center',
    marginBottom: 16,
    padding: 8,
  },
  skipText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  doneBtn: {
    marginTop: 'auto',
  },
});
