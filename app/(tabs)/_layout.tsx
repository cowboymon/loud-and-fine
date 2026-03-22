import { Tabs } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiFocused]}>{emoji}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="sounds"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔊" label="Sounds" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dog"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🐾" label="Biscuit" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 72,
    paddingTop: 8,
    paddingBottom: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingTop: 4,
  },
  tabEmoji: {
    fontSize: 22,
    opacity: 0.4,
  },
  tabEmojiFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontFamily: Fonts.jakartaSemiBold,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tabLabelFocused: {
    color: Colors.accent,
  },
});
