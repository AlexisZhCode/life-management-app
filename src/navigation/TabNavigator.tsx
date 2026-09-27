import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { CareScreen } from '../screens/CareScreen';
import { HabitsScreen } from '../screens/HabitsScreen';
import { MoodScreen } from '../screens/MoodScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { TabGlyph, type TabGlyphName } from '../icons/TabGlyph';
import { colors } from '../theme/colors';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabIcon({ name, focused }: { name: TabGlyphName; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconFocused]}>
      <TabGlyph name={name} size={26} />
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
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="tasks" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Care"
        component={CareScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="care" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Habits"
        component={HabitsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="habits" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Mood"
        component={MoodScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="mood" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Treats',
          tabBarIcon: ({ focused }) => <TabIcon name="treats" focused={focused} />,
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
    height: 74,
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
    width: 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  iconFocused: {
    backgroundColor: '#F3E6D8',
  },
});
