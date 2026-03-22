import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Card } from '../../components/ui/Card';
import { DogAvatar } from '../../components/ui/DogAvatar';
import { PawProgress } from '../../components/ui/PawProgress';
import { MiniPlayer } from '../../components/ui/MiniPlayer';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { BROWSABLE_CATEGORIES, CATEGORY_DISPLAY, SOUNDS_BY_CATEGORY } from '../../constants/sounds';
import { SoundCategory } from '../../types';

// Static placeholder data for Phase A preview
const DOG_NAME = 'Biscuit';
const SHOW_MINI_PLAYER = false; // toggle to preview the mini player

const CATEGORY_PROGRESS: Record<SoundCategory, number> = {
  'at-home': 2,
  'outside': 1,
  'other-animals': 0,
  'out-and-about': 0,
  'the-vet': 0,
  'mystery': 0,
};

export default function HomeScreen() {
  return (
    <ScreenWrapper edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>
              {'Hey! Time for '}
              <Text style={styles.greetingName}>{DOG_NAME}</Text>
              {"'s daily listen."}
            </Text>
            <Text style={styles.sub}>Even 10 minutes makes a difference. Probably.</Text>
          </View>
          <DogAvatar
            name={DOG_NAME}
            onPress={() => router.push('/dog-switcher')}
            size={42}
          />
        </View>

        {/* Mystery Sound card */}
        <Card variant="terracotta" style={styles.mysteryCard}>
          <View style={styles.mysteryTop}>
            <Text style={styles.mysteryLock}>🔒</Text>
            <View style={styles.mysteryBadge}>
              <Text style={styles.mysteryBadgeText}>THE SURPRISE</Text>
            </View>
          </View>
          <Text style={styles.mysteryTitle}>Mystery Sound</Text>
          <Text style={styles.mysterySubtitle}>Unlocks in 2 days</Text>
          <View style={styles.mysteryCountdown}>
            <Text style={styles.mysteryCountdownText}>47:22:08</Text>
          </View>
        </Card>

        {/* Sound Library label */}
        <Text style={styles.sectionLabel}>Sound Library</Text>

        {/* 2-column category grid */}
        <View style={styles.grid}>
          {BROWSABLE_CATEGORIES.map((cat) => {
            const display = CATEGORY_DISPLAY[cat];
            const count = SOUNDS_BY_CATEGORY[cat]?.length ?? 0;
            const progress = CATEGORY_PROGRESS[cat] ?? 0;

            return (
              <TouchableOpacity
                key={cat}
                style={styles.gridCell}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: '/sounds', params: { filter: cat } })}
              >
                <Card style={styles.categoryCard}>
                  <Text style={styles.catEmoji}>{display.emoji}</Text>
                  <Text style={styles.catName} numberOfLines={2}>{display.label}</Text>
                  <Text style={styles.catCount}>{count} sounds</Text>
                  <PawProgress filled={progress} size={14} style={styles.catPaws} />
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating mini player (shown when a session is active) */}
      {SHOW_MINI_PLAYER && (
        <View style={styles.miniPlayerContainer}>
          <MiniPlayer
            soundName="Thunderstorm"
            isPlaying
            timeRemaining="8:32"
            onPlayPause={() => {}}
            onPress={() => router.push('/player/thunderstorm')}
          />
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    gap: 12,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 22,
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: 6,
  },
  greetingName: {
    color: Colors.primary,
  },
  sub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  mysteryCard: {
    marginBottom: 28,
    minHeight: 140,
  },
  mysteryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mysteryLock: {
    fontSize: 28,
  },
  mysteryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  mysteryBadgeText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 1.5,
  },
  mysteryTitle: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 24,
    color: Colors.white,
    marginBottom: 4,
  },
  mysterySubtitle: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  mysteryCountdown: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  mysteryCountdownText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 18,
    color: Colors.white,
    letterSpacing: 1,
  },
  sectionLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCell: {
    width: '47.5%',
  },
  categoryCard: {
    padding: 16,
  },
  catEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  catName: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  catCount: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  catPaws: {},
  miniPlayerContainer: {
    paddingBottom: 4,
  },
});
