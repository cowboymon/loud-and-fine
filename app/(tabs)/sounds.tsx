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
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useAppStore } from '../../store/appStore';
import { SOUNDS, CATEGORIES } from '../../constants/sounds';
import { SoundCategory } from '../../types';

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke={filled ? Colors.primary : Colors.textSecondary}
        strokeWidth={1.8}
        fill={filled ? Colors.primary : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17l-5-5"
        stroke={Colors.primary}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronRight() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={Colors.textSecondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={8} stroke={Colors.textSecondary} strokeWidth={1.8} />
      <Path d="M21 21l-4.35-4.35" stroke={Colors.textSecondary} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function SoundsScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory | null>(
    (params.category as SoundCategory) ?? null
  );

  const getSoundState = useAppStore(s => s.getSoundState);
  const starredSounds = useAppStore(s => s.starredSounds);
  const toggleStar = useAppStore(s => s.toggleStar);

  const isConfident = (ratings: string[]) => {
    const last5 = ratings.slice(-5);
    return last5.length === 5 && last5.every(r => r === 'good');
  };

  const filteredSounds = SOUNDS
    .filter(sound => {
      const matchSearch = sound.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCategory || sound.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const aStarred = starredSounds.includes(a.id);
      const bStarred = starredSounds.includes(b.id);
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;
      return 0;
    });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>All Sounds</Text>

          {/* Search */}
          <View style={styles.searchBar}>
            <SearchIcon />
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

          {/* Category filter pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.pillsScroll}
            contentContainerStyle={styles.pillsContent}
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              style={[styles.pill, !selectedCategory && styles.pillActive]}
            >
              <Text style={[styles.pillText, !selectedCategory && styles.pillTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[styles.pill, selectedCategory === cat.id && styles.pillActive]}
              >
                <Text style={[styles.pillText, selectedCategory === cat.id && styles.pillTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sound list */}
        <FlatList
          data={filteredSounds}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const state = getSoundState(item.id);
            const mastered = isConfident(state.ratings);
            const inProgress = state.plays > 0 && !mastered;
            const isStarred = starredSounds.includes(item.id);

            return (
              <TouchableOpacity
                style={styles.soundCard}
                activeOpacity={0.8}
                onPress={() => router.push(`/player/${item.id}`)}
              >
                <View style={styles.soundInfo}>
                  <View style={styles.soundNameRow}>
                    <Text style={styles.soundName}>{item.name}</Text>
                    {mastered && (
                      <View style={styles.masteredBadge}>
                        <CheckIcon />
                        <Text style={styles.masteredText}>Mastered</Text>
                      </View>
                    )}
                  </View>
                  {!mastered && (
                    <Text style={styles.soundStatus}>
                      {inProgress ? 'In progress' : 'Not started'}
                    </Text>
                  )}
                </View>

                <View style={styles.soundActions}>
                  <TouchableOpacity
                    onPress={() => toggleStar(item.id)}
                    hitSlop={8}
                    style={styles.starBtn}
                  >
                    <StarIcon filled={isStarred} />
                  </TouchableOpacity>
                  <ChevronRight />
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No sounds found.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 4,
  },
  title: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
    marginBottom: 16,
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
  pillsScroll: {
    maxHeight: 44,
    marginBottom: 8,
    marginHorizontal: -24,
  },
  pillsContent: {
    paddingHorizontal: 24,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    backgroundColor: Colors.surface,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  pillText: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 10,
  },
  soundCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  soundInfo: {
    flex: 1,
    marginRight: 12,
  },
  soundNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  soundName: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  masteredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.primary}18`,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  masteredText: {
    fontFamily: Fonts.jakartaMedium,
    fontSize: 12,
    color: Colors.primary,
  },
  soundStatus: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  soundActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  starBtn: {
    padding: 4,
  },
  empty: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
