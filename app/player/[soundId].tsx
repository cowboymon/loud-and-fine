import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Slider,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle } from 'react-native-svg';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useAppStore } from '../../store/appStore';
import { SOUNDS, rewardMessages, pickRandom } from '../../constants/sounds';

// Placeholder audio — replace per-sound once real files are available
const PLACEHOLDER_AUDIO_URL =
  'https://cdn.freesound.org/previews/531/531947_11349499-lq.mp3';

const RING_SIZE = 176;
const RING_RADIUS = 82;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const DURATIONS = [2, 5, 10, 15];

const dogListening = require('../../assets/dogs/dog-listening.png');

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function PlayerScreen() {
  useKeepAwake();

  const { soundId } = useLocalSearchParams<{ soundId: string }>();
  const soundDef = SOUNDS.find(s => s.id === soundId) ?? SOUNDS[0];

  const recordPlay = useAppStore(s => s.recordPlay);
  const getSoundState = useAppStore(s => s.getSoundState);
  const currentDog = useAppStore(s => s.currentDog());

  const dogName = currentDog?.name ?? 'your dog';

  // Session params
  const [duration, setDuration] = useState(10); // minutes
  const [startVol, setStartVol] = useState(20); // 0-100
  const [maxVol, setMaxVol] = useState(80);     // 0-100

  // Runtime
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [rewardMsg] = useState(() => pickRandom(rewardMessages(dogName)));

  const soundRef = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep timeRemaining in sync with duration before session starts
  useEffect(() => {
    if (!hasStarted) setTimeRemaining(duration * 60);
  }, [duration, hasStarted]);

  const totalSeconds = duration * 60;
  const elapsed = totalSeconds - timeRemaining;
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

  // Current volume based on ramp progress
  const currentVolume = hasStarted
    ? Math.round(startVol + (maxVol - startVol) * progress)
    : startVol;

  // ── Audio ──────────────────────────────────────────────────────────────────

  const loadAndPlay = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      const { sound } = await Audio.Sound.createAsync(
        { uri: PLACEHOLDER_AUDIO_URL },
        { shouldPlay: true, isLooping: true, volume: startVol / 100 }
      );
      soundRef.current = sound;
    } catch {
      // Audio failed silently — timer still runs
    }
  }, [startVol]);

  const updateVolume = useCallback(async (vol: number) => {
    try {
      await soundRef.current?.setVolumeAsync(Math.max(0, Math.min(1, vol / 100)));
    } catch {}
  }, []);

  const stopAudio = useCallback(async () => {
    try {
      await soundRef.current?.stopAsync();
      await soundRef.current?.unloadAsync();
      soundRef.current = null;
    } catch {}
  }, []);

  // ── Timer ──────────────────────────────────────────────────────────────────

  const startSession = async () => {
    recordPlay(soundDef.id);
    setHasStarted(true);
    setIsPlaying(true);
    await loadAndPlay();
  };

  const pauseSession = async () => {
    setIsPlaying(false);
    try { await soundRef.current?.pauseAsync(); } catch {}
  };

  const resumeSession = async () => {
    setIsPlaying(true);
    try { await soundRef.current?.playAsync(); } catch {}
  };

  // Volume ramp + countdown
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          stopAudio();
          // Navigate to post-session
          setTimeout(() => router.push({
            pathname: '/post-session',
            params: { soundId: soundDef.id, soundName: soundDef.name },
          }), 300);
          return 0;
        }
        const newElapsed = totalSeconds - (prev - 1);
        const newVol = startVol + (maxVol - startVol) * (newElapsed / totalSeconds);
        updateVolume(newVol);
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopAudio();
    };
  }, []);

  const handleClose = () => {
    if (hasStarted && timeRemaining < totalSeconds) {
      // Prompt rating if any time played
      stopAudio();
      if (intervalRef.current) clearInterval(intervalRef.current);
      router.push({
        pathname: '/post-session',
        params: { soundId: soundDef.id, soundName: soundDef.name },
      });
    } else {
      stopAudio();
      router.back();
    }
  };

  const handlePlayPause = async () => {
    if (!hasStarted) {
      await startSession();
    } else if (isPlaying) {
      await pauseSession();
    } else {
      await resumeSession();
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.soundName}>{soundDef.name}</Text>
          <Text style={styles.category}>
            {soundDef.category.replace(/-/g, ' ')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={handleClose}
          hitSlop={8}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Main area */}
      <View style={styles.main}>

        {/* Circular progress ring */}
        <View style={styles.ringContainer}>
          <Svg
            width={RING_SIZE}
            height={RING_SIZE}
            style={styles.ringAbsolute}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          >
            {/* Track */}
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke={Colors.surfaceSecondary}
              strokeWidth={6}
            />
            {/* Progress */}
            {hasStarted && (
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                fill="none"
                stroke={Colors.accent}
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
              />
            )}
          </Svg>

          {/* Dog image inside ring */}
          <View style={styles.dogImageWrapper}>
            <Image source={dogListening} style={styles.dogImage} />
          </View>
        </View>

        {/* Timer */}
        <View style={styles.timerSection}>
          <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
          {hasStarted && (
            <Text style={styles.volumeLabel}>Volume {currentVolume}%</Text>
          )}
        </View>

        {/* Pre-session controls */}
        {!hasStarted && (
          <View style={styles.controls}>
            {/* Duration */}
            <View style={styles.controlCard}>
              <Text style={styles.controlLabel}>Session Duration</Text>
              <View style={styles.durationGrid}>
                {DURATIONS.map(d => (
                  <TouchableOpacity
                    key={d}
                    onPress={() => setDuration(d)}
                    style={[
                      styles.durationBtn,
                      duration === d && styles.durationBtnActive,
                    ]}
                  >
                    <Text style={[
                      styles.durationText,
                      duration === d && styles.durationTextActive,
                    ]}>
                      {d}m
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Volume range */}
            <View style={styles.controlCard}>
              <Text style={styles.controlLabel}>Volume Auto-Ramp</Text>
              <View style={styles.sliderRow}>
                <View style={styles.sliderCol}>
                  <View style={styles.sliderHeader}>
                    <Text style={styles.sliderSubLabel}>Start</Text>
                    <Text style={[styles.sliderValue, { color: Colors.accent }]}>{startVol}%</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={10}
                    maximumValue={100}
                    step={5}
                    value={startVol}
                    onValueChange={setStartVol}
                    minimumTrackTintColor={Colors.accent}
                    maximumTrackTintColor={Colors.surfaceTertiary}
                    thumbTintColor={Colors.accent}
                  />
                </View>
                <View style={styles.sliderCol}>
                  <View style={styles.sliderHeader}>
                    <Text style={styles.sliderSubLabel}>Max</Text>
                    <Text style={[styles.sliderValue, { color: Colors.primary }]}>{maxVol}%</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={10}
                    maximumValue={100}
                    step={5}
                    value={maxVol}
                    onValueChange={setMaxVol}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor={Colors.surfaceTertiary}
                    thumbTintColor={Colors.primary}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Play / Pause button */}
        <TouchableOpacity
          style={styles.playBtn}
          activeOpacity={0.85}
          onPress={handlePlayPause}
        >
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        {/* Reward reminder (shown when playing) */}
        <View style={styles.rewardArea}>
          {hasStarted && (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardText}>{rewardMsg}</Text>
            </View>
          )}
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerText: { flex: 1, marginRight: 12 },
  soundName: {
    fontFamily: Fonts.serifItalic,
    fontSize: 24,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: 2,
  },
  category: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  // Main
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    justifyContent: 'center',
    gap: 20,
  },

  // Ring
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ringAbsolute: {
    position: 'absolute',
  },
  dogImageWrapper: {
    width: RING_SIZE - 24,
    height: RING_SIZE - 24,
    borderRadius: (RING_SIZE - 24) / 2,
    overflow: 'hidden',
  },
  dogImage: {
    width: '100%',
    height: '100%',
  },

  // Timer
  timerSection: {
    alignItems: 'center',
  },
  timer: {
    fontFamily: Fonts.serifItalic,
    fontSize: 52,
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  volumeLabel: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  // Controls
  controls: {
    width: '100%',
    gap: 12,
  },
  controlCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 20,
    padding: 16,
  },
  controlLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  durationGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  durationBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  durationBtnActive: {
    backgroundColor: Colors.accent,
  },
  durationText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  durationTextActive: {
    color: Colors.white,
  },
  sliderRow: {
    flexDirection: 'row',
    gap: 16,
  },
  sliderCol: { flex: 1 },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sliderSubLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  sliderValue: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 12,
  },
  slider: {
    width: '100%',
    height: 28,
  },

  // Play button
  playBtn: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  playIcon: {
    fontSize: 32,
    color: Colors.white,
    marginLeft: 4,
  },

  // Reward
  rewardArea: {
    minHeight: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '100%',
  },
  rewardText: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
