import type { RewardItem } from '../types';

export const REWARD_CATALOG: RewardItem[] = [
  {
    id: 'tea',
    title: 'Cozy Tea Break',
    emoji: '🍵',
    cost: 15,
    description: 'A soft pause with something warm.',
  },
  {
    id: 'walk',
    title: 'Sunshine Walk',
    emoji: '🌤️',
    cost: 20,
    description: 'Ten minutes outside, no rush.',
  },
  {
    id: 'movie',
    title: 'Movie Night',
    emoji: '🎬',
    cost: 40,
    description: 'Pick something comforting and sink in.',
  },
  {
    id: 'dessert',
    title: 'Sweet Treat',
    emoji: '🧁',
    cost: 25,
    description: 'A little dessert, fully deserved.',
  },
  {
    id: 'bath',
    title: 'Bubble Bath',
    emoji: '🛁',
    cost: 35,
    description: 'Warm water, soft music, no phone.',
  },
  {
    id: 'plant',
    title: 'Tiny Plant Care',
    emoji: '🪴',
    cost: 18,
    description: 'Water a plant and admire growth.',
  },
];

export const TASK_COINS = 5;
export const HABIT_COINS = 3;
export const MOOD_COINS = 2;
export const REST_COINS = 3;
export const SIP_GOAL_COINS = 3;
export const MEAL_COINS = 2;

export const DEFAULT_SIP_GOAL = 8;
