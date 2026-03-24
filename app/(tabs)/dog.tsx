import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useAppStore } from '../../store/appStore';

const dogProfile = require('../../assets/dogs/dog-playful.png');

function CameraIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
        stroke={Colors.textSecondary}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={13} r={4} stroke={Colors.textSecondary} strokeWidth={1.8} />
    </Svg>
  );
}

function TrendingUpIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="23 6 13.5 15.5 8.5 10.5 1 18"
        stroke={Colors.accent}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="17 6 23 6 23 12"
        stroke={Colors.accent}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TrophyIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9H3a1 1 0 01-1-1V4h4M18 9h3a1 1 0 001-1V4h-4M6 9a6 6 0 1012 0H6zM12 15v6M8 21h8"
        stroke={Colors.primary}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronDown() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke={Colors.textSecondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
}

export default function ProfileTab() {
  const currentDog = useAppStore(s => s.currentDog());
  const dogs = useAppStore(s => s.dogs);
  const getOverallProgress = useAppStore(s => s.getOverallProgress);
  const getMilestones = useAppStore(s => s.getMilestones);
  const getRecentSessions = useAppStore(s => s.getRecentSessions);
  const updateDog = useAppStore(s => s.updateDog);

  const progress = getOverallProgress();
  const milestones = getMilestones();
  const recentSessions = getRecentSessions(5);

  const handlePhotoPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && currentDog) {
      updateDog(currentDog.id, { photoUrl: result.assets[0].uri });
    }
  };

  const confidentPct = progress.total > 0 ? (progress.confident / progress.total) * 100 : 0;
  const inProgressPct = progress.total > 0 ? (progress.inProgress / progress.total) * 100 : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Switch dog (if multiple) */}
        {dogs.length > 1 && (
          <TouchableOpacity
            style={styles.switchDogBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/dog-switcher')}
          >
            <View>
              <Text style={styles.switchDogLabel}>Training with</Text>
              <Text style={styles.switchDogName}>{currentDog?.name}</Text>
            </View>
            <ChevronDown />
          </TouchableOpacity>
        )}

        {/* Dog header */}
        <View style={styles.dogHeader}>
          <TouchableOpacity
            style={styles.photoWrapper}
            activeOpacity={0.8}
            onPress={handlePhotoPress}
          >
            {currentDog?.photoUrl ? (
              <Image source={{ uri: currentDog.photoUrl }} style={styles.photo} />
            ) : (
              <Image source={dogProfile} style={styles.photo} />
            )}
            <View style={styles.cameraOverlay}>
              <CameraIcon />
            </View>
          </TouchableOpacity>

          <View style={styles.dogInfo}>
            <Text style={styles.dogName}>{currentDog?.name ?? 'Your Dog'}</Text>
            <Text style={styles.dogAge}>
              {currentDog?.age === 'puppy' ? 'Puppy (under 6 months)' :
               currentDog?.age === 'young' ? 'Young dog (6m–2yrs)' :
               '2+ years'}
            </Text>
            <TouchableOpacity onPress={() => router.push('/dog-edit')}>
              <Text style={styles.editLink}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <TrendingUpIcon />
            <Text style={styles.progressTitle}>Overall Progress</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: Colors.primary }]}>{progress.confident}</Text>
              <Text style={styles.statLabel}>Confident</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: Colors.accent }]}>{progress.inProgress}</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: Colors.textSecondary }]}>{progress.notStarted}</Text>
              <Text style={styles.statLabel}>Not Started</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${confidentPct}%`, backgroundColor: Colors.primary }]} />
            <View style={[styles.progressFill, { width: `${inProgressPct}%`, backgroundColor: Colors.accent }]} />
          </View>
        </View>

        {/* Milestones */}
        {milestones.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <TrophyIcon />
              <Text style={styles.sectionTitle}>Milestone Shelf</Text>
            </View>
            <View style={styles.milestonesGrid}>
              {milestones.map(m => (
                <View key={m.id} style={styles.milestoneCard}>
                  <Text style={styles.milestoneName}>{m.soundName}</Text>
                  <Text style={styles.milestoneDate}>{formatDate(m.date)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            <View style={styles.sessionsList}>
              {recentSessions.map(session => {
                const lastRating = session.ratings[session.ratings.length - 1];
                const ratingLabel = lastRating === 'good' ? 'Handled it' : lastRating === 'soso' ? 'So-so' : 'Not yet';
                return (
                  <View key={session.id} style={styles.sessionRow}>
                    <View style={styles.sessionInfo}>
                      <Text style={styles.sessionName}>{session.name}</Text>
                      <Text style={styles.sessionMeta}>
                        {session.plays} {session.plays === 1 ? 'session' : 'sessions'}
                        {session.ratings.length > 0 ? ` · Last: ${ratingLabel}` : ''}
                      </Text>
                    </View>
                    <Text style={styles.sessionDate}>
                      {session.lastPlayed ? formatDate(session.lastPlayed) : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Empty state */}
        {milestones.length === 0 && recentSessions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>The journey begins</Text>
            <Text style={styles.emptyBody}>
              Start a session to build {currentDog?.name ?? "your dog"}'s confidence
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // Switch dog
  switchDogBtn: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchDogLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  switchDogName: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  // Dog header
  dogHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  photoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
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
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dogInfo: {
    flex: 1,
    paddingTop: 4,
  },
  dogName: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  dogAge: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  editLink: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.accent,
  },

  // Progress card
  progressCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  progressTitle: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontFamily: Fonts.jakartaExtraBold,
    fontSize: 26,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: Colors.surfaceTertiary,
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 14,
  },

  // Milestones
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  milestoneCard: {
    width: '47%',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
  },
  milestoneName: {
    fontFamily: Fonts.jakartaBold,
    fontSize: 13,
    color: Colors.white,
    marginBottom: 6,
  },
  milestoneDate: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },

  // Sessions
  sessionsList: {
    gap: 8,
  },
  sessionRow: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionInfo: {
    flex: 1,
    marginRight: 12,
  },
  sessionName: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  sessionMeta: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sessionDate: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 12,
    color: Colors.textSecondary,
    flexShrink: 0,
  },

  // Empty
  emptyState: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyTitle: {
    fontFamily: Fonts.serifItalic,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyBody: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
