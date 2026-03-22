import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { AgeGroup } from '../../types';

const AGE_OPTIONS: { key: AgeGroup; emoji: string; label: string; sub: string }[] = [
  { key: 'puppy', emoji: '🐶', label: 'Puppy', sub: 'Under 6 months' },
  { key: 'young', emoji: '🐕', label: 'Young dog', sub: '6 months to 2 years' },
  { key: 'adult', emoji: '🦮', label: '2+ years', sub: 'Still learning, no shame' },
];

export default function DogAgeScreen() {
  const { name = 'Your dog' } = useLocalSearchParams<{ name: string }>();
  const [selected, setSelected] = useState<AgeGroup | null>(null);

  const handleSelect = (key: AgeGroup) => {
    setSelected(key);
    // Auto-advance after a short delay
    setTimeout(() => {
      router.push({ pathname: '/onboarding/all-set', params: { name, ageGroup: key } });
    }, 300);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Progress dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === 2 && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.content}>
          <Text style={styles.headline}>How old is {name}?</Text>

          <View style={styles.options}>
            {AGE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                onPress={() => handleSelect(opt.key)}
                activeOpacity={0.8}
                style={[styles.option, selected === opt.key && styles.optionSelected]}
              >
                <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                <View style={styles.optionText}>
                  <Text style={[styles.optionLabel, selected === opt.key && styles.optionLabelSelected]}>
                    {opt.label}
                  </Text>
                  <Text style={styles.optionSub}>{opt.sub}</Text>
                </View>
                {selected === opt.key && (
                  <View style={styles.check}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottom}>
          <Button
            label="Next →"
            onPress={() => {
              if (selected) {
                router.push({ pathname: '/onboarding/all-set', params: { name, ageGroup: selected } });
              }
            }}
            disabled={!selected}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
    marginBottom: 48,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.accent,
    width: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 32,
    color: Colors.textPrimary,
    lineHeight: 40,
    marginBottom: 32,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  optionSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  optionEmoji: {
    fontSize: 32,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  optionLabelSelected: {
    color: Colors.white,
  },
  optionSub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: Colors.white,
    fontFamily: Fonts.jakartaBold,
    fontSize: 14,
  },
  bottom: {
    width: '100%',
  },
});
