import React, { useCallback } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface Props {
  startValue: number;    // 0-100
  ceilingValue: number;  // 0-100
  onStartChange: (val: number) => void;
  onCeilingChange: (val: number) => void;
  minGap?: number; // minimum gap between handles (default 10)
}

const THUMB_SIZE = 30;

export function DualHandleSlider({
  startValue,
  ceilingValue,
  onStartChange,
  onCeilingChange,
  minGap = 10,
}: Props) {
  const trackWidth = useSharedValue(0);
  const startX = useSharedValue((startValue / 100));
  const ceilingX = useSharedValue((ceilingValue / 100));

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    trackWidth.value = e.nativeEvent.layout.width;
  }, []);

  const startGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (trackWidth.value === 0) return;
      const ratio = Math.max(0, Math.min(1, (e.absoluteX) / trackWidth.value));
      const minRatio = minGap / 100;
      startX.value = Math.min(ratio, ceilingX.value - minRatio);
      runOnJS(onStartChange)(Math.round(startX.value * 100));
    });

  const ceilingGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (trackWidth.value === 0) return;
      const ratio = Math.max(0, Math.min(1, e.absoluteX / trackWidth.value));
      const minRatio = minGap / 100;
      ceilingX.value = Math.max(ratio, startX.value + minRatio);
      runOnJS(onCeilingChange)(Math.round(ceilingX.value * 100));
    });

  const startThumbStyle = useAnimatedStyle(() => ({
    left: startX.value * (trackWidth.value || 200) - THUMB_SIZE / 2,
  }));

  const ceilingThumbStyle = useAnimatedStyle(() => ({
    left: ceilingX.value * (trackWidth.value || 200) - THUMB_SIZE / 2,
  }));

  const fillStyle = useAnimatedStyle(() => ({
    left: startX.value * (trackWidth.value || 200),
    width: (ceilingX.value - startX.value) * (trackWidth.value || 200),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>Start: {startValue}%</Text>
        <Text style={styles.label}>Max: {ceilingValue}%</Text>
      </View>
      <View style={styles.trackContainer} onLayout={handleLayout}>
        <View style={styles.track} />
        <Animated.View style={[styles.fill, fillStyle]} />
        <GestureDetector gesture={startGesture}>
          <Animated.View style={[styles.thumb, styles.startThumb, startThumbStyle]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={ceilingGesture}>
          <Animated.View style={[styles.thumb, styles.ceilingThumb, ceilingThumbStyle]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </GestureDetector>
      </View>
      <View style={styles.subLabels}>
        <Text style={styles.subLabel}>Quiet</Text>
        <Text style={styles.subLabel}>Loud</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  trackContainer: {
    height: THUMB_SIZE,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  fill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
    position: 'absolute',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  startThumb: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  ceilingThumb: {
    backgroundColor: Colors.primary,
  },
  thumbInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  subLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  subLabel: {
    fontFamily: Fonts.jakartaRegular,
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
