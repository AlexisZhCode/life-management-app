import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CoinBadge } from '../components/CoinBadge';
import { EmptyState } from '../components/EmptyState';
import { Screen } from '../components/Screen';
import { SoftCard } from '../components/SoftCard';
import { BloomIcon, type BloomIconName } from '../icons/BloomIcon';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { todayKey } from '../utils/helpers';

const HABIT_ICONS: BloomIconName[] = [
  'habit-stretch',
  'habit-sip',
  'habit-read',
  'habit-run',
  'habit-yoga',
  'habit-sleep',
  'habit-tidy',
  'habit-music',
];

export function HabitsScreen() {
  const { data, addHabit, completeHabit, deleteHabit } = useApp();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState<BloomIconName>('habit-stretch');
  const today = todayKey();

  const onAdd = () => {
    if (!title.trim()) {
      Alert.alert('Name your habit', 'Keep it small and friendly.');
      return;
    }
    addHabit(title, icon);
    setTitle('');
  };

  return (
    <Screen
      title="Habits"
      subtitle="Show up a little every day."
      headerRight={
        <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
      }
    >
      <SoftCard style={styles.composer}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="New gentle habit..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          onSubmitEditing={onAdd}
        />
        <View style={styles.emojis}>
          {HABIT_ICONS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setIcon(item)}
              style={[styles.emojiBtn, icon === item && styles.emojiActive]}
            >
              <BloomIcon name={item} size={28} />
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addText}>Plant habit</Text>
        </Pressable>
      </SoftCard>

      {data.habits.length === 0 ? (
        <EmptyState
          icon="empty-habits"
          title="No habits yet"
          message="Start with one tiny ritual you can keep."
        />
      ) : (
        data.habits.map((habit) => {
          const done = habit.completedDates.includes(today);
          return (
            <SoftCard
              key={habit.id}
              style={styles.habit}
              tint={done ? colors.mintSoft : colors.surface}
            >
              <View style={styles.habitTop}>
                <BloomIcon name={habit.emoji} size={44} />
                <View style={styles.habitBody}>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <View style={styles.habitMeta}>
                    <BloomIcon name="streak" size={16} />
                    <Text style={styles.habitMetaText}>
                      {habit.streak} day streak
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() =>
                    Alert.alert('Remove habit?', habit.title, [
                      { text: 'Keep', style: 'cancel' },
                      {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => deleteHabit(habit.id),
                      },
                    ])
                  }
                >
                  <Text style={styles.delete}>✕</Text>
                </Pressable>
              </View>
              <Pressable
                style={[styles.checkBtn, done && styles.checkBtnDone]}
                onPress={() => !done && completeHabit(habit.id)}
                disabled={done}
              >
                <Text style={[styles.checkText, done && styles.checkTextDone]}>
                  {done ? 'Done for today' : 'Mark done (+3 coins)'}
                </Text>
              </Pressable>
            </SoftCard>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  composer: { marginBottom: 14 },
  input: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundSoft,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emojis: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  emojiBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emojiActive: {
    backgroundColor: colors.secondarySoft,
    borderColor: colors.secondary,
  },
  addBtn: {
    marginTop: 14,
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
  },
  addText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.white,
    fontSize: 15,
  },
  habit: { marginBottom: 12 },
  habitTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  habitBody: { flex: 1 },
  habitTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.text,
  },
  habitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  habitMetaText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 13,
    color: colors.textSoft,
  },
  delete: { color: colors.textMuted, fontSize: 16, padding: 4 },
  checkBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkBtnDone: { backgroundColor: colors.mint },
  checkText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.white,
    fontSize: 14,
  },
  checkTextDone: { color: colors.text },
});
