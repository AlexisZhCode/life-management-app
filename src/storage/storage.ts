import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppData } from '../types';

const STORAGE_KEY = '@bloom/app-data-v1';

export const defaultAppData = (): AppData => ({
  tasks: [
    {
      id: 'welcome-1',
      title: 'Explore Bloom and set your first goal',
      category: 'personal',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'welcome-2',
      title: 'Take a little sip of water',
      category: 'health',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ],
  habits: [
    {
      id: 'habit-1',
      title: 'Morning stretch',
      emoji: '🧘',
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'habit-2',
      title: 'Read 10 minutes',
      emoji: '📖',
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ],
  moods: [],
  redeemed: [],
  stats: {
    coins: 10,
    totalTasksCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
  restSchedule: {
    bedtime: '22:30',
    wakeTime: '07:00',
  },
  restLogs: [],
  sipDays: [],
  meals: [],
});

export async function loadAppData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAppData();
    const parsed = JSON.parse(raw) as Partial<AppData>;
    const defaults = defaultAppData();
    return {
      ...defaults,
      ...parsed,
      stats: { ...defaults.stats, ...parsed.stats },
      restSchedule: { ...defaults.restSchedule, ...parsed.restSchedule },
      restLogs: parsed.restLogs ?? defaults.restLogs,
      sipDays: parsed.sipDays ?? defaults.sipDays,
      meals: parsed.meals ?? defaults.meals,
    };
  } catch {
    return defaultAppData();
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
