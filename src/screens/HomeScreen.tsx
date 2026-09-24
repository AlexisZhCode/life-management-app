import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CoinBadge } from '../components/CoinBadge';
import { Screen } from '../components/Screen';
import { SoftCard } from '../components/SoftCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { greetingForHour, todayKey } from '../utils/helpers';
import type { RootTabParamList } from '../navigation/types';

const moodEmoji = ['', '😢', '😕', '😐', '🙂', '😄'];

export function HomeScreen() {
  const { data, todayMood, todaySips, todayMeals, latestRest } = useApp();
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const today = todayKey();

  const openTasks = useMemo(
    () => data.tasks.filter((t) => !t.completed),
    [data.tasks],
  );
  const doneToday = useMemo(
    () =>
      data.tasks.filter(
        (t) => t.completed && t.completedAt?.startsWith(today),
      ).length,
    [data.tasks, today],
  );
  const habitsDone = useMemo(
    () => data.habits.filter((h) => h.completedDates.includes(today)).length,
    [data.habits, today],
  );

  const sipGlasses = todaySips?.glasses ?? 0;
  const sipGoal = todaySips?.goal ?? 8;

  return (
    <Screen
      title="Bloom"
      subtitle={`${greetingForHour()} — let's make today gentle.`}
      headerRight={
        <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
      }
    >
      <SoftCard style={styles.hero} tint={colors.primarySoft}>
        <Text style={styles.heroEmoji}>🌸</Text>
        <Text style={styles.heroTitle}>Your little garden</Text>
        <Text style={styles.heroCopy}>
          Finish tasks, tend your care rituals, and treat yourself kindly.
        </Text>
        <View style={styles.statsRow}>
          <Stat label="Open tasks" value={String(openTasks.length)} />
          <Stat label="Done today" value={String(doneToday)} />
          <Stat label="Habits" value={`${habitsDone}/${data.habits.length}`} />
        </View>
      </SoftCard>

      <Text style={styles.section}>Quick care</Text>
      <View style={styles.actions}>
        <QuickAction
          emoji="✅"
          label="Tasks"
          onPress={() => navigation.navigate('Tasks')}
          tint={colors.mintSoft}
        />
        <QuickAction
          emoji="🫧"
          label="Care"
          onPress={() => navigation.navigate('Care')}
          tint={colors.secondarySoft}
        />
        <QuickAction
          emoji="💛"
          label="Mood"
          onPress={() => navigation.navigate('Mood')}
          tint={colors.accentSoft}
        />
        <QuickAction
          emoji="🎁"
          label="Treats"
          onPress={() => navigation.navigate('Rewards')}
          tint={colors.lavenderSoft}
        />
      </View>

      <Text style={styles.section}>Today’s peek</Text>
      <SoftCard>
        <Row
          label="Mood"
          value={
            todayMood
              ? `${moodEmoji[todayMood.value]} Logged`
              : 'Not checked in yet'
          }
        />
        <Row label="Little sips" value={`${sipGlasses}/${sipGoal} glasses`} />
        <Row
          label="Nourish"
          value={
            todayMeals.length
              ? `${todayMeals.length} plate${todayMeals.length === 1 ? '' : 's'}`
              : 'No plates yet'
          }
        />
        <Row
          label="Sweet rest"
          value={
            latestRest?.date === today
              ? 'Logged for today'
              : latestRest
                ? 'Log last night'
                : 'Set your rhythm'
          }
        />
        <Row
          label="Streak"
          value={`${data.stats.currentStreak} day${data.stats.currentStreak === 1 ? '' : 's'}`}
          last
        />
      </SoftCard>

      {openTasks.length > 0 ? (
        <>
          <Text style={styles.section}>Up next</Text>
          <SoftCard>
            {openTasks.slice(0, 3).map((task, index) => (
              <Text
                key={task.id}
                style={[styles.nextItem, index === Math.min(2, openTasks.length - 1) && styles.lastItem]}
              >
                • {task.title}
              </Text>
            ))}
          </SoftCard>
        </>
      ) : null}
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickAction({
  emoji,
  label,
  onPress,
  tint,
}: {
  emoji: string;
  label: string;
  onPress: () => void;
  tint: string;
}) {
  return (
    <Pressable style={[styles.action, { backgroundColor: tint }]} onPress={onPress}>
      <Text style={styles.actionEmoji}>{emoji}</Text>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, last && styles.lastRow]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { marginBottom: 8 },
  heroEmoji: { fontSize: 36, marginBottom: 6 },
  heroTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 22,
    color: colors.text,
  },
  heroCopy: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 14,
    color: colors.textSoft,
    marginTop: 6,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  stat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
  },
  statLabel: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 11,
    color: colors.textSoft,
    marginTop: 2,
  },
  section: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginTop: 22,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  action: {
    width: '47%',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionEmoji: { fontSize: 24, marginBottom: 6 },
  actionLabel: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastRow: { borderBottomWidth: 0, paddingBottom: 0 },
  rowLabel: {
    fontFamily: 'Nunito_600SemiBold',
    color: colors.textSoft,
    fontSize: 14,
  },
  rowValue: {
    fontFamily: 'Nunito_700Bold',
    color: colors.text,
    fontSize: 14,
  },
  nextItem: {
    fontFamily: 'Nunito_600SemiBold',
    color: colors.text,
    fontSize: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastItem: { borderBottomWidth: 0, paddingBottom: 0 },
});
