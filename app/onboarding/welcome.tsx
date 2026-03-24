import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

const dogHappy = require('../../assets/dogs/dog-happy.png');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.imageWrapper}>
            <Image source={dogHappy} style={styles.dogImage} />
          </View>

          <Text style={styles.title}>Loud & Fine</Text>
          <Text style={styles.tagline}>Loud world. Fine dog.</Text>
          <Text style={styles.body}>
            Help your dog handle everyday sounds — vacuums, thunderstorms, fireworks.
            Play sounds, give treats, repeat. That's it.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() => router.push('/onboarding/dog-name')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 192,
    height: 192,
    borderRadius: 96,
    overflow: 'hidden',
    marginBottom: 32,
  },
  dogImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: Fonts.serifItalic,
    fontSize: 48,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  body: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 17,
    color: Colors.white,
  },
});
