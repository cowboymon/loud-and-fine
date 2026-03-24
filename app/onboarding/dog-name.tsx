import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

const dogListening = require('../../assets/dogs/dog-listening.png');

export default function DogNameScreen() {
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      router.push({ pathname: '/onboarding/dog-age', params: { name: name.trim() } });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.hero}>
            <View style={styles.imageWrapper}>
              <Image source={dogListening} style={styles.dogImage} />
            </View>

            <Text style={styles.headline}>What's your dog's name?</Text>
            <Text style={styles.sub}>
              We'll use it throughout the app. Makes it more personal.
            </Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Biscuit"
              placeholderTextColor={Colors.textSecondary}
              autoFocus
              maxLength={24}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleContinue}
              textAlign="center"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !name.trim() && styles.buttonDisabled]}
            activeOpacity={0.9}
            onPress={handleContinue}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  kav: { flex: 1 },
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
    marginBottom: 12,
  },
  sub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontFamily: Fonts.jakartaBold,
    fontSize: 22,
    color: Colors.textPrimary,
    borderWidth: 2,
    borderColor: 'transparent',
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
