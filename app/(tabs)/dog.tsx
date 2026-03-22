import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Card } from '../../components/ui/Card';
import { PawProgress } from '../../components/ui/PawProgress';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

// Static placeholder data for Phase A preview
const DOG_NAME = 'Biscuit';
const DOG_AGE = 'Young dog · 6 months to 2 years';

const STATS = { confident: 1, inProgress: 3, notStarted: 24 };

const SESSION_HISTORY = [
  { id: '1', sound: 'Vacuum Cleaner', duration: '10 min', day: 'Today', rating: '🟢' },
  { id: '2', sound: 'Thunderstorm', duration: '15 min', day: 'Yesterday', rating: '🟡' },
  { id: '3', sound: 'Thunderstorm', duration: '10 min', day: 'Mon', rating: '🟢' },
  { id: '4', sound: 'Fireworks', duration: '5 min', day: 'Sun', rating: '🔴' },
  { id: '5', sound: 'Doorbell', duration: '10 min', day: 'Sat', rating: '🟢' },
];

const MILESTONES = [
  { id: '1', sound: 'Vacuum Cleaner', date: 'Mar 20' },
];

export default function DogScreen() {
  return (
    <ScreenWrapper edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dogName}>{DOG_NAME}</Text>
            <View style={styles.ageRow}>
              <Text style={styles.ageText}>{DOG_AGE}</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.switchBtn}
            onPress={() => router.push('/dog-switcher')}
          >
            <Text style={styles.switchText}>Switch dog</Text>
          </TouchableOpacity>
        </View>

        {/* Progress summary */}
        <View style={styles.statsRow}>
          <View style={[styles.statPill, { backgroundColor: '#E8F5EC' }]}>
            <Text style={[styles.statNum, { color: Colors.ratingGreen }]}>{STATS.confident}</Text>
            <Text style={styles.statLabel}>Confident</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.statNum, { color: Colors.ratingYellow }]}>{STATS.inProgress}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: Colors.surfaceSecondary }]}>
            <Text style={[styles.statNum, { color: Colors.textSecondary }]}>{STATS.notStarted}</Text>
            <Text style={styles.statLabel}>Not Started</Text>
          </View>
        </View>

        {/* Milestone shelf */}
        {MILESTONES.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Milestones</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.milestoneScroll}
              contentContainerStyle={styles.milestoneContent}
            >
              {MILESTONES.map((m) => (
                <Card key={m.id} variant="teal" style={styles.milestoneCard}>
                  <Text style={styles.milestoneEmoji}>🏆</Text>
                  <Text style={styles.milestoneSound}>{m.sound}</Text>
                  <Text style={styles.milestoneDate}>{m.date}</Text>
                  <PawProgress filled={5} size={12} style={styles.milestonePaws} />
                  <TouchableOpacity style={styles.shareBtn}>
                    <Text style={styles.shareBtnText}>Share →</Text>
                  </TouchableOpacity>
                </Card>
              ))}
              {/* "Add more" nudge */}
              <Card variant="sand" style={styles.milestoneAddCard}>
                <Text style={styles.milestoneAddEmoji}>🎯</Text>
                <Text style={styles.milestoneAddText}>
                  {'5 consecutive\n🟢 sessions\nto earn one'}
                </Text>
              </Card>
            </ScrollView>
          </>
        )}

        {/* Session history */}
        <Text style={styles.sectionLabel}>Recent Sessions</Text>
        <Card style={styles.historyCard}>
          {SESSION_HISTORY.map((session, idx) => (
            <View key={session.id} style={[styles.historyRow, idx < SESSION_HISTORY.length - 1 && styles.historyBorder]}>
              <View style={styles.historyInfo}>
                <Text style={styles.historySound}>{session.sound}</Text>
                <Text style={styles.historyMeta}>{session.day} · {session.duration}</Text>
              </View>
              <Text style={styles.historyRating}>{session.rating}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dogName: {
    fontFamily: Fonts.spectralBoldItalic,
    fontSize: 38,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ageText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  switchBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.surfaceSecondary,
  },
  switchText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.accent,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  statPill: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statNum: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 26,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  sectionLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  milestoneScroll: {
    marginBottom: 28,
    marginHorizontal: -20,
  },
  milestoneContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  milestoneCard: {
    width: 140,
    padding: 14,
    gap: 6,
  },
  milestoneEmoji: {
    fontSize: 28,
  },
  milestoneSound: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 13,
    color: Colors.white,
    lineHeight: 18,
  },
  milestoneDate: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  milestonePaws: {
    marginTop: 4,
  },
  shareBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
  },
  shareBtnText: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 11,
    color: Colors.white,
  },
  milestoneAddCard: {
    width: 120,
    padding: 14,
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneAddEmoji: {
    fontSize: 24,
  },
  milestoneAddText: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  historyCard: {
    padding: 0,
    overflow: 'hidden',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 12,
  },
  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyInfo: {
    flex: 1,
  },
  historySound: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  historyMeta: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  historyRating: {
    fontSize: 20,
  },
});
