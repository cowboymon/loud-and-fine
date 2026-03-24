import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { useAppStore } from '../store/appStore';

const dogProfile = require('../assets/dogs/dog-playful.png');

const AGE_LABEL: Record<string, string> = {
  puppy: 'Puppy (under 6 months)',
  young: 'Young dog (6m–2yrs)',
  adult: '2+ years',
};

export default function DogSwitcherScreen() {
  const dogs = useAppStore(s => s.dogs);
  const currentDogId = useAppStore(s => s.currentDogId);
  const switchDog = useAppStore(s => s.switchDog);
  const getOverallProgress = useAppStore(s => s.getOverallProgress);

  const handleSelect = (id: string) => {
    switchDog(id);
    setTimeout(() => router.back(), 200);
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
          {dogs.map((dog) => {
            const isActive = dog.id === currentDogId;
            return (
              <TouchableOpacity
                key={dog.id}
                onPress={() => handleSelect(dog.id)}
                activeOpacity={0.8}
                style={[styles.dogCard, isActive && styles.dogCardActive]}
              >
                <View style={styles.dogPhoto}>
                  {dog.photoUrl ? (
                    <Image source={{ uri: dog.photoUrl }} style={styles.dogPhotoImg} />
                  ) : (
                    <Image source={dogProfile} style={styles.dogPhotoImg} />
                  )}
                </View>
                <View style={styles.dogInfo}>
                  <Text style={styles.dogName}>{dog.name}</Text>
                  <Text style={styles.dogMeta}>{AGE_LABEL[dog.age] ?? dog.age}</Text>
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
          {dogs.length < 5 && (
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
                <Text style={styles.addDogSub}>Up to 5 profiles</Text>
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
  },
  dogCardActive: {
    borderColor: Colors.primary,
  },
  dogPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceSecondary,
    flexShrink: 0,
  },
  dogPhotoImg: {
    width: '100%',
    height: '100%',
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
    flexShrink: 0,
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
