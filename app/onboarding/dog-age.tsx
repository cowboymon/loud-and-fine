import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { AgeGroup } from '../../types';

const dogPlayful = require('../../assets/dogs/dog-playful.png');

const AGE_OPTIONS: { value: AgeGroup; label: string; description: string }[] = [
  { value: 'puppy', label: 'Puppy', description: 'Under 6 months' },
  { value: 'young', label: 'Young Dog', description: '6 months – 2 years' },
  { value: 'adult', label: '2+ years', description: 'Still learning, no shame' },
];

export default function DogAgeScreen() {
  const { name = 'your dog' } = useLocalSearchParams<{ name: string }>();
  const [selected, setSelected] = useState<AgeGroup | null>(null);

  const handleContinue = () => {
    if (selected) {
      router.push({ pathname: '/onboarding/all-set', params: { name, age: selected } });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.imageWrapper}>
            <Image source={dogPlayful} style={styles.dogImage} />
          </View>

          <Text style={styles.headline}>How old is {name}?</Text>
          <Text style={styles.sub}>Helps us understand where they're at.</Text>

          <View style={styles.options}>
            {AGE_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setSelected(opt.value)}
                activeOpacity={0.8}
                style={[
                  styles.option,
                  selected === opt.value && styles.optionSelected,
                ]}
              >
                <Text style={[
                  styles.optionLabel,
                  selected === opt.value && styles.optionLabelSelected,
                ]}>
                  {opt.label}
                </Text>
                <Text style={[
                  styles.optionDesc,
                  selected === opt.value && styles.optionDescSelected,
                ]}>
                  {opt.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          activeOpacity={0.9}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 32,
  },
  dogImage: {
    width: '100%',
    height: '100%',
  },
  headline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  sub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  options: {
    width: '100%',
    gap: 12,
  },
  option: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  optionLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 17,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: Colors.white,
  },
  optionDesc: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    opacity: 0.7,
  },
  optionDescSelected: {
    color: Colors.white,
    opacity: 0.9,
  },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 17,
    color: Colors.white,
  },
});
