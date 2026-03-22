import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { SoundRow } from '../../components/ui/SoundRow';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { SOUNDS, BROWSABLE_CATEGORIES, CATEGORY_DISPLAY } from '../../constants/sounds';
import { SoundCategory } from '../../types';

// Static placeholder data for Phase A preview
const PLACEHOLDER_PROGRESS: Record<string, { paws: number; favorited: boolean; confident: boolean }> = {
  vacuum: { paws: 5, favorited: true, confident: true },
  thunderstorm: { paws: 3, favorited: true, confident: false },
  fireworks: { paws: 1, favorited: false, confident: false },
  doorbell: { paws: 2, favorited: false, confident: false },
};

const FILTER_OPTIONS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'starred', label: '★ Starred' },
  ...BROWSABLE_CATEGORIES.map((cat) => ({
    key: cat,
    label: CATEGORY_DISPLAY[cat].emoji + ' ' + CATEGORY_DISPLAY[cat].label,
  })),
];

export default function SoundsScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['vacuum', 'thunderstorm']));

  const filtered = SOUNDS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'starred') return matchesSearch && favorites.has(s.id);
    return matchesSearch && s.category === filter;
  });

  const starred = filtered.filter((s) => favorites.has(s.id));
  const rest = filtered.filter((s) => !favorites.has(s.id));
  const showStarredSection = filter === 'all' && starred.length > 0;

  return (
    <ScreenWrapper edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sounds</Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search sounds..."
            placeholderTextColor={Colors.textSecondary}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTER_OPTIONS.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.pill, filter === f.key && styles.pillActive]}
            >
              <Text
                style={[styles.pillText, filter === f.key && styles.pillTextActive]}
                numberOfLines={1}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sound list */}
        <FlatList
          data={showStarredSection ? [...starred, ...rest] : filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            showStarredSection && starred.length > 0 ? (
              <Text style={styles.divider}>★ Starred</Text>
            ) : null
          }
          ItemSeparatorComponent={() => null}
          renderItem={({ item, index }) => {
            const isFirstRest = showStarredSection && index === starred.length;
            const prog = PLACEHOLDER_PROGRESS[item.id] ?? { paws: 0, favorited: false, confident: false };

            return (
              <>
                {isFirstRest && <Text style={styles.divider}>All sounds</Text>}
                <SoundRow
                  sound={item}
                  pawsFilled={prog.paws}
                  isFavorited={favorites.has(item.id)}
                  isConfident={prog.confident}
                  onPress={() => router.push(`/player/${item.id}`)}
                  onToggleFavorite={() => {
                    setFavorites((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.id)) next.delete(item.id);
                      else next.add(item.id);
                      return next;
                    });
                  }}
                  onPlay={() => router.push(`/player/${item.id}`)}
                />
              </>
            );
          }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No sounds found.</Text>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.textPrimary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: Colors.textPrimary,
    padding: 0,
  },
  clearBtn: {
    fontSize: 14,
    color: Colors.textSecondary,
    padding: 4,
  },
  filtersScroll: {
    maxHeight: 44,
    marginBottom: 8,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  pillText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.white,
  },
  divider: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
