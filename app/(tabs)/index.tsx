import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useAppStore } from '../../store/appStore';
import { CATEGORIES, GREETINGS, SUB_GREETINGS, pickRandom } from '../../constants/sounds';
import Svg, { Path } from 'react-native-svg';

function ChevronRight() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={Colors.textSecondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LockIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M18 11H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" stroke="white" strokeWidth={1.8} />
      <Path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function ShuffleIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M16 3h5v5M4 20L21 3M16 21h5v-5M4 4l5 5" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PlayIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M5 3l14 9-14 9V3z" fill="white" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function HomeScreen() {
  const currentDog = useAppStore(s => s.currentDog());
  const getCategoryProgress = useAppStore(s => s.getCategoryProgress);
  const isMysteryUnlocked = useAppStore(s => s.isMysteryUnlocked());
  const hasGraduated = useAppStore(s => s.hasGraduated());
  const mysteryUnlockDate = useAppStore(s => s.mysteryUnlockDate);

  const [greeting, setGreeting] = useState('');
  const [subGreeting, setSubGreeting] = useState('');
  const [countdown, setCountdown] = useState('');

  const dogName = currentDog?.name ?? 'your dog';

  useEffect(() => {
    const g = pickRandom(GREETINGS).replace('{dogName}', dogName);
    setGreeting(g);
    setSubGreeting(pickRandom(SUB_GREETINGS));
  }, [dogName]);

  // Mystery countdown timer
  useEffect(() => {
    if (isMysteryUnlocked || !mysteryUnlockDate) return;

    const update = () => {
      const diff = new Date(mysteryUnlockDate).getTime() - Date.now();
      if (diff <= 0) { setCountdown(''); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [isMysteryUnlocked, mysteryUnlockDate]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.subGreeting}>{subGreeting}</Text>
        </View>

        {/* Graduation banner */}
        {hasGraduated && (
          <TouchableOpacity
            style={styles.graduationBanner}
            activeOpacity={0.9}
            onPress={() => router.push('/graduation')}
          >
            <Text style={styles.graduationTitle}>Graduation Ready</Text>
            <Text style={styles.graduationBody}>{dogName} has mastered all the sounds.</Text>
            <Text style={styles.graduationCta}>Tap to view certificate →</Text>
          </TouchableOpacity>
        )}

        {/* Mystery Sound + Woofer 2-col */}
        <View style={styles.featuredGrid}>
          {/* Mystery Sound */}
          <TouchableOpacity
            style={[
              styles.featuredCard,
              isMysteryUnlocked ? styles.mysteryUnlocked : styles.mysteryLocked,
            ]}
            activeOpacity={0.9}
            onPress={() => isMysteryUnlocked && router.push('/player/mystery')}
            disabled={!isMysteryUnlocked}
          >
            <View style={styles.featuredCardTop}>
              <Text style={styles.featuredCardTitle}>Mystery Sound</Text>
              {isMysteryUnlocked ? <PlayIcon /> : <LockIcon />}
            </View>
            {!isMysteryUnlocked && countdown ? (
              <Text style={styles.mysteryCountdown}>{countdown}</Text>
            ) : null}
          </TouchableOpacity>

          {/* The Woofer */}
          <TouchableOpacity
            style={[styles.featuredCard, styles.wooferCard]}
            activeOpacity={0.9}
            onPress={() => router.push('/woofer')}
          >
            <View style={styles.featuredCardTop}>
              <Text style={styles.featuredCardTitle}>The Woofer</Text>
              <ShuffleIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* Sound Library */}
        <Text style={styles.sectionLabel}>Sound Library</Text>
        <View style={styles.categoriesList}>
          {CATEGORIES.map(cat => {
            const progress = getCategoryProgress(cat.id);
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryRow}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: '/sounds', params: { category: cat.id } })}
              >
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                  <Text style={styles.categoryMeta}>
                    {progress.confident} of {progress.total} mastered
                  </Text>
                </View>
                <ChevronRight />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  // Greeting
  greetingSection: {
    paddingTop: 40,
    paddingBottom: 28,
  },
  greeting: {
    fontFamily: Fonts.serifItalic,
    fontSize: 36,
    color: Colors.textPrimary,
    lineHeight: 44,
    marginBottom: 10,
  },
  subGreeting: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  // Graduation
  graduationBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  graduationTitle: {
    fontFamily: Fonts.serifItalic,
    fontSize: 24,
    color: Colors.white,
    marginBottom: 6,
  },
  graduationBody: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  graduationCta: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },

  // Featured grid
  featuredGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  featuredCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  mysteryLocked: {
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mysteryUnlocked: {
    backgroundColor: Colors.primary,
  },
  wooferCard: {
    backgroundColor: Colors.accent,
  },
  featuredCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  featuredCardTitle: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.white,
    flex: 1,
  },
  mysteryCountdown: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 12,
  },

  // Categories
  sectionLabel: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  categoriesList: {
    gap: 10,
  },
  categoryRow: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 17,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  categoryMeta: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
