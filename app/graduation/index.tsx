import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { PawProgress } from '../../components/ui/PawProgress';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DOG_NAME = 'Biscuit';

const CARDS = [
  {
    id: 'opener',
    content: (
      <View style={cardStyles.cardContent}>
        <Text style={cardStyles.dogEmoji}>🐕</Text>
        <Text style={cardStyles.openerHeadline}>
          {DOG_NAME} started with a vacuum.{'\n'}
          They weren't ready.{'\n'}
          They are now.
        </Text>
        <Text style={cardStyles.openerSub}>This is their story.</Text>
      </View>
    ),
  },
  {
    id: 'time',
    content: (
      <View style={cardStyles.cardContent}>
        <Text style={cardStyles.statNumber}>4.2</Text>
        <Text style={cardStyles.statUnit}>hours of listening</Text>
        <Text style={cardStyles.statDesc}>
          {DOG_NAME} logged 34 sessions.{'\n'}
          They showed up every time.{'\n'}
          (You helped.)
        </Text>
      </View>
    ),
  },
  {
    id: 'hardest',
    content: (
      <View style={cardStyles.cardContent}>
        <Text style={cardStyles.cardLabel}>Hardest sound</Text>
        <Text style={cardStyles.soundEmoji}>⛈️</Text>
        <Text style={cardStyles.soundTitle}>Thunderstorm</Text>
        <Text style={cardStyles.soundDesc}>
          {DOG_NAME}'s toughest sound.{'\n'}
          It took 12 sessions.{'\n'}
          Respect.
        </Text>
      </View>
    ),
  },
  {
    id: 'easiest',
    content: (
      <View style={cardStyles.cardContent}>
        <Text style={cardStyles.cardLabel}>Easiest sound</Text>
        <Text style={cardStyles.soundEmoji}>🔔</Text>
        <Text style={cardStyles.soundTitle}>Doorbell</Text>
        <Text style={cardStyles.soundDesc}>
          {DOG_NAME} destroyed this in 5 sessions.{'\n'}
          Barely broke a sweat.{'\n'}
          Natural talent.
        </Text>
      </View>
    ),
  },
  {
    id: 'certificate',
    content: (
      <View style={cardStyles.certContent}>
        <View style={cardStyles.certPhotoSlot}>
          <Text style={cardStyles.certPhotoIcon}>📷</Text>
          <Text style={cardStyles.certPhotoLabel}>Add {DOG_NAME}'s photo</Text>
        </View>
        <Text style={cardStyles.certAppName}>Loud & Fine</Text>
        <Text style={cardStyles.certDogName}>{DOG_NAME}</Text>
        <Text style={cardStyles.certCopy}>
          Certificate of Bravery.{'\n'}
          For hearing the whole loud world{'\n'}
          and not once losing their mind.
        </Text>
        <PawProgress filled={5} size={20} style={cardStyles.certPaws} />
        <Text style={cardStyles.certYear}>Graduating class of 2026 🎓🐾</Text>
      </View>
    ),
  },
];

export default function GraduationScreen() {
  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goToCard = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * SCREEN_WIDTH, animated: true });
    setCurrentCard(idx);
  };

  return (
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
        {CARDS.map((card, i) => (
          <View key={card.id} style={[styles.card, i === CARDS.length - 1 && styles.certCard]}>
            {card.content}
          </View>
        ))}
      </ScrollView>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {CARDS.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => goToCard(i)}>
            <View style={[styles.dot, i === currentCard && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        {currentCard === CARDS.length - 1 ? (
          <Button label="Share certificate →" onPress={() => {}} />
        ) : (
          <Button
            label="Next →"
            onPress={() => goToCard(currentCard + 1)}
          />
        )}
        {currentCard < CARDS.length - 1 && (
          <TouchableOpacity onPress={() => goToCard(CARDS.length - 1)}>
            <Text style={styles.skipText}>Jump to certificate</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const cardStyles = StyleSheet.create({
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  dogEmoji: {
    fontSize: 100,
    marginBottom: 8,
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
    color: 'rgba(255,255,255,0.7)',
  },
  statNumber: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 80,
    color: Colors.primary,
    lineHeight: 90,
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
  cardLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  soundEmoji: {
    fontSize: 64,
  },
  soundTitle: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.white,
  },
  soundDesc: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 26,
  },
  certContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  certPhotoSlot: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  certPhotoIcon: {
    fontSize: 30,
  },
  certPhotoLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
    textAlign: 'center',
  },
  certAppName: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
  },
  certDogName: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 46,
    color: Colors.primary,
  },
  certCopy: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  certPaws: {
    marginVertical: 4,
  },
  certYear: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.5,
  },
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.accent,
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
    color: 'rgba(255,255,255,0.6)',
  },
  cardsScroll: {
    flex: 1,
  },
  card: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  certCard: {
    // cert has slightly different background feel — same teal
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
    backgroundColor: 'rgba(255,255,255,0.3)',
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
  skipText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textDecorationLine: 'underline',
  },
});
