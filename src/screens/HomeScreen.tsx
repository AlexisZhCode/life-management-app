import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BeaverScene } from '../components/BeaverScene';
import type { BeaverScarf } from '../components/BeaverCharacter';
import { BloomIcon } from '../icons/BloomIcon';
import { CoinBadge } from '../components/CoinBadge';
import { useApp } from '../context/AppContext';
import { colors, categoryColors } from '../theme/colors';
import { todayKey } from '../utils/helpers';
import { HABIT_COINS, TASK_COINS } from '../utils/rewards';
import type { RootTabParamList } from '../navigation/types';
import type { Habit, Task } from '../types';

type Goal =
  | { kind: 'task'; id: string; title: string; done: boolean; task: Task }
  | { kind: 'habit'; id: string; title: string; done: boolean; habit: Habit };

export function HomeScreen() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const { data, toggleTask, completeHabit } = useApp();
  const today = todayKey();
  const [showDone, setShowDone] = useState(true);
  const [scarf, setScarf] = useState<BeaverScarf>('red');

  const goals = useMemo(() => {
    const tasks: Goal[] = data.tasks
      .filter((task) => !task.completed || task.completedAt?.startsWith(today))
      .map((task) => ({
        kind: 'task',
        id: task.id,
        title: task.title,
        done: task.completed,
        task,
      }));
    const habits: Goal[] = data.habits.map((habit) => ({
      kind: 'habit',
      id: habit.id,
      title: habit.title,
      done: habit.completedDates.includes(today),
      habit,
    }));
    return [...tasks, ...habits].sort((a, b) => Number(a.done) - Number(b.done));
  }, [data.habits, data.tasks, today]);

  const done = goals.filter((goal) => goal.done).length;
  const left = goals.length - done;
  const progress = goals.length === 0 ? 0 : done / goals.length;
  const visible = showDone ? goals : goals.filter((goal) => !goal.done);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View>
            <BeaverScene width={width} scarf={scarf} onScarf={setScarf} />
            <View style={styles.badge}>
              <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
            </View>
          </View>

          <View style={styles.sheet}>
            <View style={styles.progressCard}>
              <View style={styles.progressTop}>
                <View style={styles.leafBadge}>
                  <Svg width={22} height={22} viewBox="0 0 22 22">
                    <Path d="M11 20 V7" stroke="#6AAA45" strokeWidth={3} strokeLinecap="round" />
                    <Path d="M11 12 C6 10 4 6 6 3 C8 7 11 9 11 12 Z" fill="#7ED36A" />
                    <Path d="M11 9 C16 7 18 4 16 2 C14 5 11 7 11 9 Z" fill="#9ED9B0" />
                  </Svg>
                </View>
                <View style={styles.progressCopy}>
                  <Text style={styles.progressTitle}>Today at the lodge</Text>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${Math.max(progress * 100, goals.length ? 8 : 0)}%` },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.progressCount}>
                  {done} / {goals.length}
                </Text>
              </View>
            </View>

            <View style={styles.leftRow}>
              <Text style={styles.leftCopy}>
                {left === 0
                  ? 'All of today’s goals are done!'
                  : `${left} goal${left === 1 ? '' : 's'} left for today!`}
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Tasks')}
                style={styles.addBtn}
                accessibilityRole="button"
                accessibilityLabel="Add a goal"
              >
                <Text style={styles.addLabel}>+</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => setShowDone((open) => !open)}>
              <Text style={styles.section}>
                {showDone ? 'Today  ▾' : 'Still to do  ▾'}
              </Text>
            </Pressable>

            {visible.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>The lodge is quiet</Text>
                <Text style={styles.emptyCopy}>Add a task or a habit to start the day.</Text>
              </View>
            ) : (
              visible.map((goal) => (
                <GoalCard
                  key={`${goal.kind}-${goal.id}`}
                  goal={goal}
                  onCheck={() => {
                    if (goal.kind === 'task') {
                      toggleTask(goal.id);
                      return;
                    }
                    if (!goal.done) completeHabit(goal.id);
                  }}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function GoalCard({ goal, onCheck }: { goal: Goal; onCheck: () => void }) {
  const coins = goal.kind === 'task' ? TASK_COINS : HABIT_COINS;
  const tint = goal.kind === 'task' ? categoryColors[goal.task.category] : colors.mint;

  return (
    <View style={[styles.card, goal.done && styles.cardDone]}>
      <View style={[styles.goalIcon, { backgroundColor: tint }]}>
        {goal.kind === 'habit' ? (
          <BloomIcon name={goal.habit.emoji} size={28} />
        ) : (
          <BloomIcon
            name={
              goal.task.category === 'health'
                ? 'habit-sip'
                : goal.task.category === 'home'
                  ? 'habits'
                  : goal.task.category === 'work'
                    ? 'tasks'
                    : goal.task.category === 'social'
                      ? 'mood-great'
                      : 'mood-good'
            }
            size={28}
          />
        )}
      </View>
      <Text style={[styles.goalTitle, goal.done && styles.goalTitleDone]} numberOfLines={2}>
        {goal.title}
      </Text>
      <Text style={styles.coins}>{coins}</Text>
      <View style={styles.coinDot} />
      <Pressable
        onPress={onCheck}
        style={[styles.check, goal.done && styles.checkDone]}
        accessibilityRole="button"
        accessibilityLabel={goal.done ? `${goal.title} done` : `Finish ${goal.title}`}
      >
        {goal.done ? <Check /> : null}
      </Pressable>
    </View>
  );
}

function Check() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path
        d="M3 8.2 L6.4 11.6 L13 4.4"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#249E8C' },
  flex: { flex: 1 },
  scroll: { paddingBottom: 120 },
  badge: { position: 'absolute', top: 8, right: 16 },
  sheet: {
    marginTop: -28,
    backgroundColor: '#249E8C',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 16,
    minHeight: 420,
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 14,
  },
  progressTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  leafBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF3C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCopy: { flex: 1 },
  progressTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  track: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#F3E6D0',
    overflow: 'hidden',
  },
  fill: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#F0A23A',
  },
  progressCount: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 14,
    color: '#C9844A',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  leftCopy: {
    flex: 1,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.white,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    color: colors.white,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 22,
    lineHeight: 26,
  },
  section: {
    marginTop: 18,
    marginBottom: 10,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: 'rgba(255,255,255,0.92)',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    gap: 10,
  },
  cardDone: { opacity: 0.72 },
  goalIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    flex: 1,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.text,
  },
  goalTitleDone: { textDecorationLine: 'line-through' },
  coins: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#C9844A',
  },
  coinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0A23A',
    marginRight: 2,
  },
  check: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E7D8CC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkDone: {
    backgroundColor: '#6BCB8A',
    borderColor: '#6BCB8A',
  },
  empty: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 18,
    padding: 16,
  },
  emptyTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.white,
  },
  emptyCopy: {
    marginTop: 4,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.88)',
  },
});
