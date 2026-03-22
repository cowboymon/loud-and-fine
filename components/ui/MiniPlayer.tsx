import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface Props {
  soundName: string;
  isPlaying: boolean;
  timeRemaining: string; // e.g. "8:32"
  onPlayPause: () => void;
  onPress: () => void;
}

export function MiniPlayer({ soundName, isPlaying, timeRemaining, onPlayPause, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <View style={styles.track} />
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.soundName} numberOfLines={1}>{soundName}</Text>
          <Text style={styles.timer}>{timeRemaining} left</Text>
        </View>
        <TouchableOpacity onPress={onPlayPause} activeOpacity={0.8} style={styles.playBtn}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  track: {
    height: 3,
    backgroundColor: Colors.primary,
    width: '60%', // placeholder progress
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  info: {
    flex: 1,
  },
  soundName: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.white,
  },
  timer: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: Colors.white,
  },
});
