import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { CareScreen } from '../screens/CareScreen';
import { HabitsScreen } from '../screens/HabitsScreen';
import { MoodScreen } from '../screens/MoodScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { colors } from '../theme/colors';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconFocused]}>
      <Text style={styles.icon}>{emoji}</Text>
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="✅" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Care"
        component={CareScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🫧" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Habits"
        component={HabitsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🌱" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Mood"
        component={MoodScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💛" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Treats',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎁" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 16,
    height: 70,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderTopWidth: 0,
    paddingTop: 6,
    paddingBottom: 8,
    shadowColor: colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 10,
    marginBottom: 2,
  },
  iconWrap: {
    width: 32,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  iconFocused: {
    backgroundColor: colors.primarySoft,
  },
  icon: {
    fontSize: 16,
  },
});
