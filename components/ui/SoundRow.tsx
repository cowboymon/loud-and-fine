import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { SoundDefinition } from '../../types';
import { CATEGORY_DISPLAY } from '../../constants/sounds';
import { PawProgress } from './PawProgress';

interface Props {
  sound: SoundDefinition;
  pawsFilled: number;
  isFavorited: boolean;
  isConfident: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  onPlay: () => void;
}

export function SoundRow({
  sound,
  pawsFilled,
  isFavorited,
  isConfident,
  onPress,
  onToggleFavorite,
  onPlay,
}: Props) {
  const categoryLabel = CATEGORY_DISPLAY[sound.category]?.label ?? sound.category;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.row}>
      <View style={styles.emoji}>
        <Text style={styles.emojiText}>{sound.emoji}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {sound.name}
          </Text>
          {isConfident && (
            <View style={styles.confidentBadge}>
              <Text style={styles.confidentText}>Confident</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{categoryLabel}</Text>
        <PawProgress filled={pawsFilled} size={14} style={styles.paws} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onToggleFavorite} hitSlop={8} style={styles.starBtn}>
          <Text style={styles.star}>{isFavorited ? '★' : '☆'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlay} hitSlop={8} style={styles.playBtn}>
          <Text style={styles.playText}>▶</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 12,
  },
  emoji: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 15,
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  confidentBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  confidentText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  category: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  paws: {
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  starBtn: {
    padding: 4,
  },
  star: {
    fontSize: 22,
    color: Colors.primary,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    fontSize: 14,
    color: Colors.white,
    marginLeft: 2,
  },
});
