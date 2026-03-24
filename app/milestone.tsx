import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { useAppStore } from '../store/appStore';

const dogGraduated = require('../assets/dogs/dog-graduated.png');

export default function MilestoneScreen() {
  const { soundName } = useLocalSearchParams<{ soundName: string }>();
  const currentDog = useAppStore(s => s.currentDog());
  const dogName = currentDog?.name ?? 'Your dog';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${dogName} just mastered "${soundName ?? 'a scary sound'}" in Loud & Fine! 🐾`,
      });
    } catch {}
  };

  return (
    <LinearGradient
      colors={['#D96B4A', '#C45A3A']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.container}>
          {/* Sparkles */}
          <View style={styles.sparkleRow}>
            <Text style={styles.sparkle}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleMid]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleSmall]}>✦</Text>
          </View>

          {/* Dog image */}
          <View style={styles.dogCircle}>
            <Image source={dogGraduated} style={styles.dogImage} />
          </View>

          {/* Sparkles below image */}
          <View style={styles.sparkleRow}>
            <Text style={[styles.sparkle, styles.sparkleSmall]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleMid]}>✦</Text>
            <Text style={styles.sparkle}>✦</Text>
          </View>

          {/* Text */}
          <Text style={styles.badge}>MILESTONE UNLOCKED</Text>
          <Text style={styles.headline}>{dogName} has mastered</Text>
          <Text style={styles.soundName}>{soundName ?? 'this sound'}</Text>
          <Text style={styles.body}>
            Five consecutive confident sessions.{'\n'}That's real progress.
          </Text>

          {/* CTAs */}
          <View style={styles.ctas}>
            <TouchableOpacity
              style={styles.shareBtn}
              activeOpacity={0.85}
              onPress={handleShare}
            >
              <Text style={styles.shareBtnText}>Share this win</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keepGoingBtn}
              activeOpacity={0.85}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.keepGoingText}>Keep going →</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 16,
    gap: 12,
  },
  sparkleRow: {
    flexDirection: 'row',
    gap: 20,
  },
  sparkle: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.9)',
  },
  sparkleMid: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  sparkleSmall: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  dogCircle: {
    width: 224,
    height: 224,
    borderRadius: 112,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  dogImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.8,
    marginTop: 8,
  },
  headline: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  soundName: {
    fontFamily: Fonts.serifItalic,
    fontSize: 32,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 40,
  },
  body: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  ctas: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  shareBtn: {
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
  keepGoingBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  keepGoingText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.white,
  },
});
