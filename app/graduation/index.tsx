import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useAppStore } from '../../store/appStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const dogGraduated = require('../../assets/dogs/dog-graduated.png');

export default function GraduationScreen() {
  const currentDog = useAppStore(s => s.currentDog());
  const getOverallProgress = useAppStore(s => s.getOverallProgress);
  const getMilestones = useAppStore(s => s.getMilestones);

  const dogName = currentDog?.name ?? 'Your dog';
  const progress = getOverallProgress();
  const milestones = getMilestones();

  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goToCard = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * SCREEN_WIDTH, animated: true });
    setCurrentCard(idx);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${dogName} just graduated from Loud & Fine! They've mastered ${progress.confident} sounds. 🐾🎓`,
      });
    } catch {}
  };

  const totalCards = 3;

  return (
    <LinearGradient colors={['#1A4349', '#0D2B30']} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* Close */}
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          style={styles.closeBtn}
          hitSlop={12}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Cards */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setCurrentCard(idx);
          }}
          style={styles.cardsScroll}
        >
          {/* Card 1: Opener */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.dogCircle}>
                <Image source={dogGraduated} style={styles.dogImage} />
              </View>
              <Text style={styles.badge}>GRADUATION</Text>
              <Text style={styles.openerHeadline}>
                {dogName} heard the{'\n'}whole loud world{'\n'}and didn't lose it once.
              </Text>
              <Text style={styles.openerSub}>This is their story.</Text>
            </View>
          </View>

          {/* Card 2: Stats */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.statNumber}>{progress.confident}</Text>
              <Text style={styles.statUnit}>sounds mastered</Text>
              <Text style={styles.statDesc}>
                {dogName} showed up,{'\n'}session after session.{'\n'}(You helped.)
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.statPill}>
                  <Text style={styles.statPillNum}>{milestones.length}</Text>
                  <Text style={styles.statPillLabel}>Milestones</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statPillNum}>{progress.total}</Text>
                  <Text style={styles.statPillLabel}>Total Sounds</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Card 3: Certificate */}
          <View style={styles.card}>
            <View style={styles.certContent}>
              <View style={styles.certDogCircle}>
                <Image source={dogGraduated} style={styles.dogImage} />
              </View>
              <Text style={styles.certAppName}>Loud & Fine</Text>
              <Text style={styles.certDogName}>{dogName}</Text>
              <Text style={styles.certCopy}>
                Certificate of Bravery.{'\n'}
                For hearing the whole loud world{'\n'}
                and not once losing their mind.
              </Text>
              <Text style={styles.certYear}>Graduating class of {new Date().getFullYear()} 🎓🐾</Text>
            </View>
          </View>
        </ScrollView>

        {/* Progress dots */}
        <View style={styles.dotsRow}>
          {Array.from({ length: totalCards }).map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goToCard(i)}>
              <View style={[styles.dot, i === currentCard && styles.dotActive]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.footer}>
          {currentCard === totalCards - 1 ? (
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
              <Text style={styles.shareBtnText}>Share certificate</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextBtn} onPress={() => goToCard(currentCard + 1)} activeOpacity={0.85}>
              <Text style={styles.nextBtnText}>Next →</Text>
            </TouchableOpacity>
          )}
          {currentCard < totalCards - 1 && (
            <TouchableOpacity onPress={() => goToCard(totalCards - 1)}>
              <Text style={styles.skipText}>Jump to certificate</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  closeText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
  },
  cardsScroll: {
    flex: 1,
  },
  card: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  dogCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 8,
  },
  dogImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1.8,
  },
  openerHeadline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 26,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 36,
  },
  openerSub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
  },
  statNumber: {
    fontFamily: Fonts.serifItalic,
    fontSize: 88,
    color: Colors.primary,
    lineHeight: 96,
  },
  statUnit: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 20,
    color: Colors.white,
  },
  statDesc: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 26,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  statPill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  statPillNum: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.white,
    marginBottom: 4,
  },
  statPillLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  certContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 14,
  },
  certDogCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  certAppName: {
    fontFamily: Fonts.serifItalic,
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
  },
  certDogName: {
    fontFamily: Fonts.serifItalic,
    fontSize: 48,
    color: Colors.primary,
    lineHeight: 56,
  },
  certCopy: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  certYear: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
    alignItems: 'center',
  },
  nextBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  nextBtnText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.white,
  },
  shareBtn: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  shareBtnText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.primary,
  },
  skipText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    textDecorationLine: 'underline',
  },
});
