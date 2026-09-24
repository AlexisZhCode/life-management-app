export type TaskCategory = 'personal' | 'work' | 'health' | 'home' | 'social';

export type Task = {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  coinsEarned?: number;
};

export type Habit = {
  id: string;
  title: string;
  emoji: string;
  streak: number;
  lastCompletedDate?: string;
  completedDates: string[];
  createdAt: string;
};

export type MoodValue = 1 | 2 | 3 | 4 | 5;

export type MoodEntry = {
  id: string;
  value: MoodValue;
  note?: string;
  date: string;
  createdAt: string;
};

export type RewardItem = {
  id: string;
  title: string;
  emoji: string;
  cost: number;
  description: string;
};

export type RedeemedReward = {
  id: string;
  rewardId: string;
  title: string;
  emoji: string;
  redeemedAt: string;
};

export type UserStats = {
  coins: number;
  totalTasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: string;
};

/** Ideal bedtime + wake-up rhythm */
export type RestSchedule = {
  bedtime: string; // "HH:MM"
  wakeTime: string; // "HH:MM"
};

export type RestLog = {
  id: string;
  date: string; // night of / morning after key (YYYY-MM-DD of wake day)
  bedtime: string;
  wakeTime: string;
  quality: 1 | 2 | 3 | 4 | 5;
  note?: string;
  createdAt: string;
  coinsEarned?: number;
};

export type SipDay = {
  date: string;
  glasses: number;
  goal: number;
  goalRewarded?: boolean;
};

export type MealKind = 'sunrise' | 'midday' | 'evening' | 'bite';

export type MealEntry = {
  id: string;
  kind: MealKind;
  title: string;
  date: string;
  createdAt: string;
  coinsEarned?: number;
};

export type AppData = {
  tasks: Task[];
  habits: Habit[];
  moods: MoodEntry[];
  redeemed: RedeemedReward[];
  stats: UserStats;
  restSchedule: RestSchedule;
  restLogs: RestLog[];
  sipDays: SipDay[];
  meals: MealEntry[];
};
