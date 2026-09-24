import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { defaultAppData, loadAppData, saveAppData } from '../storage/storage';
import { colors } from '../theme/colors';
import type {
  AppData,
  Habit,
  MealEntry,
  MealKind,
  MoodEntry,
  MoodValue,
  RedeemedReward,
  RestLog,
  RestSchedule,
  SipDay,
  Task,
  TaskCategory,
} from '../types';
import { createId, todayKey, yesterdayKey } from '../utils/helpers';
import {
  DEFAULT_SIP_GOAL,
  HABIT_COINS,
  MEAL_COINS,
  MOOD_COINS,
  REST_COINS,
  REWARD_CATALOG,
  SIP_GOAL_COINS,
  TASK_COINS,
} from '../utils/rewards';

type Celebration = {
  title: string;
  subtitle: string;
  coins: number;
  emoji: string;
} | null;

type AppContextValue = {
  ready: boolean;
  data: AppData;
  celebration: Celebration;
  dismissCelebration: () => void;
  addTask: (title: string, category: TaskCategory) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addHabit: (title: string, emoji: string) => void;
  completeHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  logMood: (value: MoodValue, note?: string) => void;
  redeemReward: (rewardId: string) => boolean;
  updateRestSchedule: (schedule: RestSchedule) => void;
  logRest: (input: {
    bedtime: string;
    wakeTime: string;
    quality: RestLog['quality'];
    note?: string;
  }) => void;
  addSip: () => void;
  removeSip: () => void;
  addMeal: (kind: MealKind, title: string) => void;
  deleteMeal: (id: string) => void;
  todayMood?: MoodEntry;
  todaySips?: SipDay;
  todayMeals: MealEntry[];
  latestRest?: RestLog;
};

const AppContext = createContext<AppContextValue | null>(null);

function bumpStreak(stats: AppData['stats']): AppData['stats'] {
  const today = todayKey();
  const yesterday = yesterdayKey();

  if (stats.lastActiveDate === today) {
    return stats;
  }

  const nextStreak =
    stats.lastActiveDate === yesterday ? stats.currentStreak + 1 : 1;

  return {
    ...stats,
    currentStreak: nextStreak,
    longestStreak: Math.max(stats.longestStreak, nextStreak),
    lastActiveDate: today,
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<AppData | null>(null);
  const [celebration, setCelebration] = useState<Celebration>(null);

  useEffect(() => {
    let cancelled = false;
    loadAppData()
      .then((loaded) => {
        if (cancelled) return;
        setData(loaded);
        setReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setData(defaultAppData());
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !data) return;
    saveAppData(data);
  }, [data, ready]);

  const celebrate = useCallback(
    (payload: NonNullable<Celebration>) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => undefined,
      );
      setCelebration(payload);
    },
    [],
  );

  const dismissCelebration = useCallback(() => setCelebration(null), []);

  const update = useCallback((updater: (prev: AppData) => AppData) => {
    setData((prev) => (prev ? updater(prev) : prev));
  }, []);

  const addTask = useCallback(
    (title: string, category: TaskCategory) => {
      const task: Task = {
        id: createId(),
        title: title.trim(),
        category,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      update((prev) => ({ ...prev, tasks: [task, ...prev.tasks] }));
    },
    [update],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setData((prev) => {
        if (!prev) return prev;
        const existing = prev.tasks.find((task) => task.id === id);
        if (!existing) return prev;

        if (!existing.completed) {
          const tasks = prev.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: true,
                  completedAt: new Date().toISOString(),
                  coinsEarned: TASK_COINS,
                }
              : task,
          );
          celebrate({
            title: 'Task finished!',
            subtitle: 'You showed up for yourself.',
            coins: TASK_COINS,
            emoji: '🌼',
          });
          return {
            ...prev,
            tasks,
            stats: bumpStreak({
              ...prev.stats,
              coins: prev.stats.coins + TASK_COINS,
              totalTasksCompleted: prev.stats.totalTasksCompleted + 1,
            }),
          };
        }

        const refund = existing.coinsEarned ?? TASK_COINS;
        return {
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: false,
                  completedAt: undefined,
                  coinsEarned: undefined,
                }
              : task,
          ),
          stats: {
            ...prev.stats,
            coins: Math.max(0, prev.stats.coins - refund),
            totalTasksCompleted: Math.max(0, prev.stats.totalTasksCompleted - 1),
          },
        };
      });
    },
    [celebrate],
  );

  const deleteTask = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      }));
    },
    [update],
  );

  const addHabit = useCallback(
    (title: string, emoji: string) => {
      const habit: Habit = {
        id: createId(),
        title: title.trim(),
        emoji,
        streak: 0,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      update((prev) => ({ ...prev, habits: [habit, ...prev.habits] }));
    },
    [update],
  );

  const completeHabit = useCallback(
    (id: string) => {
      const today = todayKey();
      setData((prev) => {
        if (!prev) return prev;
        const existing = prev.habits.find((habit) => habit.id === id);
        if (!existing || existing.completedDates.includes(today)) return prev;

        const continued =
          existing.lastCompletedDate === yesterdayKey()
            ? existing.streak + 1
            : 1;

        const habit = {
          ...existing,
          streak: continued,
          lastCompletedDate: today,
          completedDates: [...existing.completedDates, today],
        };

        celebrate({
          title: 'Habit checked!',
          subtitle: `${habit.emoji} ${habit.streak}-day streak`,
          coins: HABIT_COINS,
          emoji: habit.emoji,
        });

        return {
          ...prev,
          habits: prev.habits.map((item) => (item.id === id ? habit : item)),
          stats: bumpStreak({
            ...prev.stats,
            coins: prev.stats.coins + HABIT_COINS,
          }),
        };
      });
    },
    [celebrate],
  );

  const deleteHabit = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        habits: prev.habits.filter((habit) => habit.id !== id),
      }));
    },
    [update],
  );

  const logMood = useCallback(
    (value: MoodValue, note?: string) => {
      const today = todayKey();
      setData((prev) => {
        if (!prev) return prev;
        const withoutToday = prev.moods.filter((m) => m.date !== today);
        const entry: MoodEntry = {
          id: createId(),
          value,
          note: note?.trim() || undefined,
          date: today,
          createdAt: new Date().toISOString(),
        };

        const alreadyLogged = prev.moods.some((m) => m.date === today);
        if (!alreadyLogged) {
          celebrate({
            title: 'Mood saved',
            subtitle: 'Checking in is a win.',
            coins: MOOD_COINS,
            emoji: '💛',
          });
        }

        return {
          ...prev,
          moods: [entry, ...withoutToday],
          stats: alreadyLogged
            ? bumpStreak(prev.stats)
            : bumpStreak({
                ...prev.stats,
                coins: prev.stats.coins + MOOD_COINS,
              }),
        };
      });
    },
    [celebrate],
  );

  const redeemReward = useCallback(
    (rewardId: string) => {
      const reward = REWARD_CATALOG.find((item) => item.id === rewardId);
      if (!reward || !data || data.stats.coins < reward.cost) return false;

      const redeemed: RedeemedReward = {
        id: createId(),
        rewardId: reward.id,
        title: reward.title,
        emoji: reward.emoji,
        redeemedAt: new Date().toISOString(),
      };

      update((prev) => ({
        ...prev,
        redeemed: [redeemed, ...prev.redeemed],
        stats: {
          ...prev.stats,
          coins: prev.stats.coins - reward.cost,
        },
      }));

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(
        () => undefined,
      );
      setCelebration({
        title: 'Reward unlocked!',
        subtitle: `Enjoy your ${reward.title.toLowerCase()}.`,
        coins: 0,
        emoji: reward.emoji,
      });
      return true;
    },
    [data, update],
  );

  const updateRestSchedule = useCallback(
    (schedule: RestSchedule) => {
      update((prev) => ({ ...prev, restSchedule: schedule }));
      Haptics.selectionAsync().catch(() => undefined);
    },
    [update],
  );

  const logRest = useCallback(
    (input: {
      bedtime: string;
      wakeTime: string;
      quality: RestLog['quality'];
      note?: string;
    }) => {
      const today = todayKey();
      setData((prev) => {
        if (!prev) return prev;
        const already = prev.restLogs.some((log) => log.date === today);
        const entry: RestLog = {
          id: createId(),
          date: today,
          bedtime: input.bedtime,
          wakeTime: input.wakeTime,
          quality: input.quality,
          note: input.note?.trim() || undefined,
          createdAt: new Date().toISOString(),
          coinsEarned: already ? 0 : REST_COINS,
        };

        if (!already) {
          celebrate({
            title: 'Sweet rest logged',
            subtitle: 'Your body will thank you.',
            coins: REST_COINS,
            emoji: '😴',
          });
        }

        return {
          ...prev,
          restLogs: [entry, ...prev.restLogs.filter((log) => log.date !== today)],
          stats: already
            ? bumpStreak(prev.stats)
            : bumpStreak({
                ...prev.stats,
                coins: prev.stats.coins + REST_COINS,
              }),
        };
      });
    },
    [celebrate],
  );

  const addSip = useCallback(() => {
    const today = todayKey();
    setData((prev) => {
      if (!prev) return prev;
      const existing = prev.sipDays.find((day) => day.date === today);
      const goal = existing?.goal ?? DEFAULT_SIP_GOAL;
      const glasses = Math.min(goal + 4, (existing?.glasses ?? 0) + 1);
      const justHitGoal =
        !existing?.goalRewarded && glasses >= goal && (existing?.glasses ?? 0) < goal;

      const day: SipDay = {
        date: today,
        glasses,
        goal,
        goalRewarded: existing?.goalRewarded || justHitGoal,
      };

      if (justHitGoal) {
        celebrate({
          title: 'Sip goal reached!',
          subtitle: 'Hydrated and glowing.',
          coins: SIP_GOAL_COINS,
          emoji: '💧',
        });
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
          () => undefined,
        );
      }

      return {
        ...prev,
        sipDays: [day, ...prev.sipDays.filter((d) => d.date !== today)],
        stats: justHitGoal
          ? bumpStreak({
              ...prev.stats,
              coins: prev.stats.coins + SIP_GOAL_COINS,
            })
          : bumpStreak(prev.stats),
      };
    });
  }, [celebrate]);

  const removeSip = useCallback(() => {
    const today = todayKey();
    update((prev) => {
      const existing = prev.sipDays.find((day) => day.date === today);
      if (!existing || existing.glasses <= 0) return prev;
      return {
        ...prev,
        sipDays: [
          { ...existing, glasses: existing.glasses - 1 },
          ...prev.sipDays.filter((d) => d.date !== today),
        ],
      };
    });
  }, [update]);

  const addMeal = useCallback(
    (kind: MealKind, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      const entry: MealEntry = {
        id: createId(),
        kind,
        title: trimmed,
        date: todayKey(),
        createdAt: new Date().toISOString(),
        coinsEarned: MEAL_COINS,
      };

      celebrate({
        title: 'Nourish noted',
        subtitle: 'Fueling your day with care.',
        coins: MEAL_COINS,
        emoji: '🍽️',
      });

      update((prev) => ({
        ...prev,
        meals: [entry, ...prev.meals],
        stats: bumpStreak({
          ...prev.stats,
          coins: prev.stats.coins + MEAL_COINS,
        }),
      }));
    },
    [celebrate, update],
  );

  const deleteMeal = useCallback(
    (id: string) => {
      update((prev) => {
        const meal = prev.meals.find((item) => item.id === id);
        return {
          ...prev,
          meals: prev.meals.filter((item) => item.id !== id),
          stats: meal?.coinsEarned
            ? {
                ...prev.stats,
                coins: Math.max(0, prev.stats.coins - meal.coinsEarned),
              }
            : prev.stats,
        };
      });
    },
    [update],
  );

  const todayMood = useMemo(
    () => data?.moods.find((m) => m.date === todayKey()),
    [data?.moods],
  );

  const todaySips = useMemo(
    () => data?.sipDays.find((d) => d.date === todayKey()),
    [data?.sipDays],
  );

  const todayMeals = useMemo(
    () => data?.meals.filter((m) => m.date === todayKey()) ?? [],
    [data?.meals],
  );

  const latestRest = useMemo(() => data?.restLogs[0], [data?.restLogs]);

  const value = useMemo<AppContextValue | null>(() => {
    if (!data) return null;
    return {
      ready,
      data,
      celebration,
      dismissCelebration,
      addTask,
      toggleTask,
      deleteTask,
      addHabit,
      completeHabit,
      deleteHabit,
      logMood,
      redeemReward,
      updateRestSchedule,
      logRest,
      addSip,
      removeSip,
      addMeal,
      deleteMeal,
      todayMood,
      todaySips,
      todayMeals,
      latestRest,
    };
  }, [
    ready,
    data,
    celebration,
    dismissCelebration,
    addTask,
    toggleTask,
    deleteTask,
    addHabit,
    completeHabit,
    deleteHabit,
    logMood,
    redeemReward,
    updateRestSchedule,
    logRest,
    addSip,
    removeSip,
    addMeal,
    deleteMeal,
    todayMood,
    todaySips,
    todayMeals,
    latestRest,
  ]);

  if (!value) {
    return (
      <View style={loadingStyles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <AppContext.Provider value={value}>
      <View style={loadingStyles.flex}>{children}</View>
    </AppContext.Provider>
  );
}

const loadingStyles = StyleSheet.create({
  flex: { flex: 1 },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
