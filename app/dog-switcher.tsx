import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DogAvatar } from '../components/ui/DogAvatar';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

// Static placeholder data for Phase A preview
const DOGS = [
  { id: '1', name: 'Biscuit', ageGroup: 'Young dog', confident: 1, isActive: true },
  { id: '2', name: 'Pickle', ageGroup: 'Puppy', confident: 0, isActive: false },
];

export default function DogSwitcherScreen() {
  const [activeDogId, setActiveDogId] = useState('1');

  const handleSelect = (id: string) => {
    setActiveDogId(id);
    setTimeout(() => router.back(), 300);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Handle */}
      <View style={styles.handleRow}>
        <View style={styles.handle} />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Whose session is this?</Text>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {DOGS.map((dog) => {
            const isActive = dog.id === activeDogId;
            return (
              <TouchableOpacity
                key={dog.id}
                onPress={() => handleSelect(dog.id)}
                activeOpacity={0.8}
                style={[styles.dogCard, isActive && styles.dogCardActive]}
              >
                <DogAvatar name={dog.name} size={50} />
                <View style={styles.dogInfo}>
                  <Text style={styles.dogName}>{dog.name}</Text>
                  <Text style={styles.dogMeta}>{dog.ageGroup} · {dog.confident} confident</Text>
                </View>
                {isActive && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>Active</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Add another dog */}
          {DOGS.length < 5 && (
            <TouchableOpacity
              style={styles.addDogCard}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/onboarding/dog-name', params: { mode: 'add' } })}
            >
              <View style={styles.addDogCircle}>
                <Text style={styles.addDogPlus}>+</Text>
              </View>
              <View style={styles.dogInfo}>
                <Text style={styles.addDogLabel}>Add another dog</Text>
                <Text style={styles.addDogSub}>Max 5 profiles</Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>

        <TouchableOpacity onPress={() => router.back()} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
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
  handleRow: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
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
    paddingBottom: 24,
  },
  header: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
  },
  dogCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  dogCardActive: {
    borderColor: Colors.primary,
  },
  dogInfo: {
    flex: 1,
  },
  dogName: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 17,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  dogMeta: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  activeBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeBadgeText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 12,
    color: Colors.white,
  },
  addDogCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    gap: 14,
  },
  addDogCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addDogPlus: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 24,
    color: Colors.textSecondary,
  },
  addDogLabel: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  addDogSub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  cancelBtn: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 8,
  },
  cancelText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
