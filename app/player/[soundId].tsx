import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DualHandleSlider } from '../../components/ui/DualHandleSlider';
import { PawProgress } from '../../components/ui/PawProgress';
import { DogScene } from '../../components/illustrations/DogScene';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { SOUNDS } from '../../constants/sounds';

const DOG_NAME = 'Biscuit';
const DURATION_OPTIONS = [5, 10, 15, 20];
const TREAT_REMINDER = `Give ${DOG_NAME} a treat while this plays. The good ones, not the dusty ones at the back.`;

export default function PlayerScreen() {
  const { soundId } = useLocalSearchParams<{ soundId: string }>();
  const sound = SOUNDS.find((s) => s.id === soundId) ?? SOUNDS[0];

  const [duration, setDuration] = useState(10);
  const [startVol, setStartVol] = useState(20);
  const [ceilingVol, setCeilingVol] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Drag handle + close */}
      <View style={styles.handleRow}>
        <View style={styles.handle} />
        <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sound name + category */}
        <Text style={styles.category}>{sound.category.replace(/-/g, ' ').toUpperCase()}</Text>
        <Text style={styles.soundName}>{sound.name}</Text>

        {/* Dog scene illustration */}
        <DogScene category={sound.category} size="large" style={styles.scene} />

        {/* Volume suggestion */}
        <View style={styles.suggestionBadge}>
          <Text style={styles.suggestionText}>
            Last time you went to 40% — try 50% today?
          </Text>
        </View>

        {/* Duration chips */}
        <Text style={styles.label}>Session length</Text>
        <View style={styles.chips}>
          {DURATION_OPTIONS.map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setDuration(d)}
              style={[styles.chip, duration === d && styles.chipActive]}
            >
              <Text style={[styles.chipText, duration === d && styles.chipTextActive]}>
                {d} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Volume slider */}
        <Text style={styles.label}>Volume range</Text>
        <DualHandleSlider
          startValue={startVol}
          ceilingValue={ceilingVol}
          onStartChange={setStartVol}
          onCeilingChange={setCeilingVol}
          style={styles.slider}
        />

        {/* Paw progress */}
        <View style={styles.pawRow}>
          <Text style={styles.pawLabel}>Progress for this sound</Text>
          <PawProgress filled={3} size={20} />
        </View>

        {/* Treat reminder */}
        <View style={styles.treatBox}>
          <Text style={styles.treatEmoji}>🦴</Text>
          <Text style={styles.treatText}>{TREAT_REMINDER}</Text>
        </View>
      </ScrollView>

      {/* Play button */}
      <View style={styles.footer}>
        {isPlaying && (
          <View style={styles.playbackInfo}>
            <View style={styles.volumeBar}>
              <View style={[styles.volumeFill, { width: '48%' }]} />
            </View>
            <Text style={styles.countdown}>08:32 remaining</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (isPlaying) {
              setIsPlaying(false);
            } else {
              setIsPlaying(true);
            }
          }}
          activeOpacity={0.85}
          style={[styles.playButton, isPlaying && styles.pauseButton]}
        >
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        {isPlaying && (
          <TouchableOpacity
            onPress={() => {
              setIsPlaying(false);
              router.push('/post-session');
            }}
            style={styles.endSessionBtn}
          >
            <Text style={styles.endSessionText}>End session</Text>
          </TouchableOpacity>
        )}
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
    paddingBottom: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    position: 'absolute',
  },
  closeBtn: {
    marginLeft: 'auto',
    padding: 8,
  },
  closeText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  scroll: {
    flex: 1,
  },
  content: {
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
    fontSize: 30,
    color: Colors.textPrimary,
    marginBottom: 24,
    lineHeight: 36,
  },
  scene: {
    marginBottom: 20,
  },
  suggestionBadge: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  suggestionText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  label: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  chip: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  chipText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
  slider: {
    marginBottom: 28,
  },
  pawRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pawLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  treatBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  treatEmoji: {
    fontSize: 20,
    marginTop: 1,
  },
  treatText: {
    flex: 1,
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.accent,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 16,
  },
  playbackInfo: {
    width: '100%',
    gap: 8,
  },
  volumeBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  countdown: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  playButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  pauseButton: {
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
  },
  playIcon: {
    fontSize: 32,
    color: Colors.white,
    marginLeft: 4,
  },
  endSessionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  endSessionText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
