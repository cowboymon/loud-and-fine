import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export default function DogNameScreen() {
  const [name, setName] = useState('');

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Progress dots */}
          <View style={styles.dots}>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
            ))}
          </View>

          <View style={styles.content}>
            <Text style={styles.headline}>First things first — what's your dog's name?</Text>
            <Text style={styles.sub}>We'll be using it constantly. Fair warning.</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Biscuit"
              placeholderTextColor={Colors.border}
              autoFocus
              maxLength={20}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={() => {
                if (name.trim()) router.push({ pathname: '/onboarding/dog-age', params: { name: name.trim() } });
              }}
            />
          </View>

          <View style={styles.bottom}>
            <Button
              label="That's them →"
              onPress={() => router.push({ pathname: '/onboarding/dog-age', params: { name: name.trim() } })}
              disabled={!name.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1 },
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
    marginBottom: 12,
  },
  sub: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
    lineHeight: 24,
  },
  input: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 28,
    color: Colors.textPrimary,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  bottom: {
    width: '100%',
  },
});
