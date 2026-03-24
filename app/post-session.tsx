import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { useAppStore } from '../store/appStore';
import { SoundRating } from '../types';

const dogHappy = require('../assets/dogs/dog-happy.png');
const dogTired = require('../assets/dogs/dog-tired.png');
const dogWorried = require('../assets/dogs/dog-worried.png');

const RESPONSE_COPY: Record<SoundRating, string> = {
  'good': "Yes! Keep up this level for a session or two, then slowly increase.",
  'soso': "That's okay — stay at this volume and try again next time.",
  'not-yet': "No worries. Keep the volume low and try again. Progress takes time.",
};

const DOG_IMAGE: Record<SoundRating, ReturnType<typeof require>> = {
  'good': dogHappy,
  'soso': dogTired,
  'not-yet': dogWorried,
};

function CheckIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17l-5-5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function XIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6l12 12" stroke={Colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function NeutralIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M8 15h8M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="white" strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function PostSessionScreen() {
  const { soundId, soundName } = useLocalSearchParams<{ soundId: string; soundName: string }>();
  const rateSound = useAppStore(s => s.rateSound);
  const getSoundState = useAppStore(s => s.getSoundState);
  const currentDog = useAppStore(s => s.currentDog());

  const dogName = currentDog?.name ?? 'your dog';
  const soundState = soundId ? getSoundState(soundId) : null;
  const plays = soundState?.plays ?? 0;

  const [selected, setSelected] = useState<SoundRating | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleRate = (rating: SoundRating) => {
    if (confirmed) return;
    setSelected(rating);

    const { milestoneEarned } = rateSound(soundId ?? '', rating);
    setConfirmed(true);

    setTimeout(() => {
      if (milestoneEarned) {
        router.replace({
          pathname: '/milestone',
          params: { soundId: soundId ?? '', soundName: soundName ?? '' },
        });
      } else {
        router.replace('/(tabs)');
      }
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Drag handle */}
      <View style={styles.handleRow}>
        <View style={styles.handle} />
      </View>

      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.sessionComplete}>SESSION COMPLETE</Text>
        <Text style={styles.soundName}>{soundName ?? 'Sound'}</Text>

        {/* Dog image — changes after rating */}
        <View style={styles.dogWrapper}>
          <Image
            source={selected ? DOG_IMAGE[selected] : dogHappy}
            style={styles.dogImage}
          />
        </View>

        {!confirmed ? (
          <>
            {/* Prompt */}
            <Text style={styles.prompt}>How did {dogName} do?</Text>

            {/* Rating buttons */}
            <View style={styles.ratingButtons}>
              {/* Handled it */}
              <TouchableOpacity
                style={styles.ratingBtn}
                activeOpacity={0.85}
                onPress={() => handleRate('good')}
              >
                <LinearGradient
                  colors={[Colors.ratingGood, Colors.ratingGoodEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.ratingGradient}
                >
                  <CheckIcon />
                  <Text style={styles.ratingLabelWhite}>Handled it</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* So-so */}
              <TouchableOpacity
                style={styles.ratingBtn}
                activeOpacity={0.85}
                onPress={() => handleRate('soso')}
              >
                <LinearGradient
                  colors={[Colors.ratingSoso, Colors.ratingSosoEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.ratingGradient}
                >
                  <NeutralIcon />
                  <Text style={styles.ratingLabelWhite}>So-so</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Not yet */}
              <TouchableOpacity
                style={[styles.ratingBtn, styles.ratingNotYet]}
                activeOpacity={0.85}
                onPress={() => handleRate('not-yet')}
              >
                <XIcon />
                <Text style={styles.ratingLabelDark}>Not yet</Text>
              </TouchableOpacity>
            </View>

            {/* Skip (only after 3+ plays) */}
            {plays > 3 && (
              <TouchableOpacity
                onPress={() => router.replace('/(tabs)')}
                style={styles.skipBtn}
              >
                <Text style={styles.skipText}>Skip rating</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          /* Response after rating */
          <View style={styles.responseArea}>
            <Text style={styles.responseText}>{selected ? RESPONSE_COPY[selected] : ''}</Text>
          </View>
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
    paddingBottom: 8,
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
    paddingBottom: 32,
    alignItems: 'center',
  },
  sessionComplete: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 6,
    marginTop: 8,
  },
  soundName: {
    fontFamily: Fonts.serifItalic,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 28,
    textAlign: 'center',
  },
  dogWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 28,
    backgroundColor: Colors.surfaceSecondary,
  },
  dogImage: {
    width: '100%',
    height: '100%',
  },
  prompt: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingButtons: {
    width: '100%',
    gap: 12,
  },
  ratingBtn: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  ratingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  ratingNotYet: {
    backgroundColor: Colors.ratingNotYet,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  ratingLabelWhite: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 17,
    color: Colors.white,
  },
  ratingLabelDark: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  skipBtn: {
    marginTop: 20,
    padding: 10,
  },
  skipText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  responseArea: {
    width: '100%',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
  },
  responseText: {
    fontFamily: Fonts.serifItalic,
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },
});
