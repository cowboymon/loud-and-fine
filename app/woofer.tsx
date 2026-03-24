import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { useAppStore } from '../store/appStore';
import { SOUNDS } from '../constants/sounds';

const MAX_SOUNDS = 5;

function CloseIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6l12 12" stroke={Colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function CheckCircle({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={11} fill={Colors.accent} />
        <Path d="M7 12l3.5 3.5L17 9" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={11} stroke={Colors.border} strokeWidth={1.5} />
    </Svg>
  );
}

export default function WooferScreen() {
  const getSoundState = useAppStore(s => s.getSoundState);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tab, setTab] = useState<'played' | 'all'>('played');

  const playedSounds = SOUNDS.filter(s => getSoundState(s.id).plays > 0);
  const displaySounds = tab === 'played' ? playedSounds : SOUNDS;

  const toggleSound = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(s => s !== id);
      if (prev.length >= MAX_SOUNDS) return prev;
      return [...prev, id];
    });
  };

  const handleStart = () => {
    if (selectedIds.length === 0) return;
    // Navigate to player with first selected sound
    router.push(`/player/${selectedIds[0]}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>The Woofer</Text>
          <Text style={styles.subtitle}>Pick up to 5 sounds for a mix session</Text>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          The Woofer shuffles your selected sounds into a single session. Great for building confidence across multiple triggers.
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setTab('played')}
          style={[styles.tab, tab === 'played' && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === 'played' && styles.tabTextActive]}>
            Played Sounds {playedSounds.length > 0 ? `(${playedSounds.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('all')}
          style={[styles.tab, tab === 'all' && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === 'all' && styles.tabTextActive]}>
            All Sounds
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selection count + clear */}
      {selectedIds.length > 0 && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionCount}>{selectedIds.length} selected</Text>
          <TouchableOpacity onPress={() => setSelectedIds([])}>
            <Text style={styles.clearAll}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sound list */}
      <FlatList
        data={displaySounds}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No played sounds yet</Text>
            <Text style={styles.emptyBody}>Start a few sessions first, then come back to mix them.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const checked = selectedIds.includes(item.id);
          const disabled = !checked && selectedIds.length >= MAX_SOUNDS;
          return (
            <TouchableOpacity
              style={[styles.soundRow, checked && styles.soundRowChecked, disabled && styles.soundRowDisabled]}
              onPress={() => toggleSound(item.id)}
              activeOpacity={0.7}
              disabled={disabled}
            >
              <View style={styles.soundInfo}>
                <Text style={styles.soundName}>{item.name}</Text>
                <Text style={styles.soundCat}>{item.category.replace(/-/g, ' ')}</Text>
              </View>
              <CheckCircle checked={checked} />
            </TouchableOpacity>
          );
        }}
      />

      {/* Start button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.startBtn, selectedIds.length === 0 && styles.startBtnDisabled]}
          onPress={handleStart}
          disabled={selectedIds.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>
            {selectedIds.length === 0 ? 'Select sounds to start' : `Start Mix (${selectedIds.length})`}
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 26,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoCard: {
    marginHorizontal: 24,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.white,
  },
  tabText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  selectionCount: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.accent,
  },
  clearAll: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 8,
  },
  soundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  soundRowChecked: {
    borderColor: Colors.accent,
    backgroundColor: `${Colors.accent}08`,
  },
  soundRowDisabled: {
    opacity: 0.4,
  },
  soundInfo: {
    flex: 1,
  },
  soundName: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  soundCat: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  emptyBody: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },
  startBtn: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  startBtnDisabled: {
    backgroundColor: Colors.surfaceTertiary,
  },
  startBtnText: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 16,
    color: Colors.white,
  },
});
