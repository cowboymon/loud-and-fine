import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useAppStore } from '../../store/appStore';
import { AgeGroup } from '../../types';

const dogHappy = require('../../assets/dogs/dog-happy.png');

export default function AllSetScreen() {
  const { name = 'Buddy', age = 'puppy' } = useLocalSearchParams<{ name: string; age: string }>();
  const addDog = useAppStore(s => s.addDog);
  const completeOnboarding = useAppStore(s => s.completeOnboarding);

  const handleStart = () => {
    addDog(name, age as AgeGroup);
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.imageWrapper}>
            <Image source={dogHappy} style={styles.dogImage} />
          </View>

          <Text style={styles.headline}>All set, {name}!</Text>
          <Text style={styles.body}>
            Ready to start building confidence. We'll take it slow and steady.
          </Text>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              A great companion to puppy school and professional training — or a solid place to start on your own.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Start Listening</Text>
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
  headline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 36,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 17,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  disclaimer: {
    backgroundColor: Colors.surfaceTertiary,
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  disclaimerText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
    opacity: 0.8,
    textAlign: 'center',
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
