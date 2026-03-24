import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { useAppStore } from '../store/appStore';

const dogProfile = require('../assets/dogs/dog-playful.png');

type AgeGroup = 'puppy' | 'young' | 'adult';

const AGE_OPTIONS: { value: AgeGroup; label: string; sub: string }[] = [
  { value: 'puppy', label: 'Puppy', sub: 'Under 6 months' },
  { value: 'young', label: 'Young Dog', sub: '6 months – 2 years' },
  { value: 'adult', label: '2+ Years', sub: 'Fully grown' },
];

function CameraIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
        stroke={Colors.white}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 13m-4 0a4 4 0 018 0 4 4 0 01-8 0" stroke={Colors.white} strokeWidth={1.8} />
    </Svg>
  );
}

export default function DogEditScreen() {
  const currentDog = useAppStore(s => s.currentDog());
  const updateDog = useAppStore(s => s.updateDog);

  const [name, setName] = useState(currentDog?.name ?? '');
  const [age, setAge] = useState<AgeGroup>((currentDog?.age as AgeGroup) ?? 'adult');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(currentDog?.photoUrl);

  const handlePhotoPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!currentDog || !name.trim()) return;
    updateDog(currentDog.id, { name: name.trim(), age, photoUrl });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Text style={styles.cancelBtn}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={!name.trim()}
          hitSlop={8}
        >
          <Text style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo */}
        <TouchableOpacity style={styles.photoSection} onPress={handlePhotoPress} activeOpacity={0.85}>
          <View style={styles.photoCircle}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.photo} />
            ) : (
              <Image source={dogProfile} style={styles.photo} />
            )}
            <View style={styles.cameraOverlay}>
              <CameraIcon />
            </View>
          </View>
          <Text style={styles.changePhotoText}>Change photo</Text>
        </TouchableOpacity>

        {/* Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your dog's name"
            placeholderTextColor={Colors.textSecondary}
            returnKeyType="done"
          />
        </View>

        {/* Age */}
        <View style={styles.section}>
          <Text style={styles.label}>Age group</Text>
          <View style={styles.ageOptions}>
            {AGE_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setAge(opt.value)}
                activeOpacity={0.8}
                style={[styles.ageCard, age === opt.value && styles.ageCardActive]}
              >
                <Text style={[styles.ageLabel, age === opt.value && styles.ageLabelActive]}>
                  {opt.label}
                </Text>
                <Text style={[styles.ageSub, age === opt.value && styles.ageSubActive]}>
                  {opt.sub}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cancelBtn: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  title: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  saveBtn: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.accent,
  },
  saveBtnDisabled: {
    color: Colors.textSecondary,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 28,
  },
  photoSection: {
    alignItems: 'center',
    gap: 12,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.accent,
  },
  section: {
    gap: 10,
  },
  label: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 18,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ageOptions: {
    gap: 10,
  },
  ageCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  ageCardActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  ageLabel: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  ageLabelActive: {
    color: Colors.white,
  },
  ageSub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  ageSubActive: {
    color: 'rgba(255,255,255,0.7)',
  },
});
