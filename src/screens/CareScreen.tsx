import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CoinBadge } from '../components/CoinBadge';
import { Screen } from '../components/Screen';
import { SoftCard } from '../components/SoftCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import type { MealKind, RestLog } from '../types';
import {
  formatClock,
  formatDuration,
  formatFriendlyDate,
  minutesBetween,
  todayKey,
} from '../utils/helpers';
import { DEFAULT_SIP_GOAL } from '../utils/rewards';

const BEDTIMES = ['21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];
const WAKETIMES = ['05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00'];
const QUALITY: { value: RestLog['quality']; emoji: string; label: string }[] = [
  { value: 1, emoji: '😫', label: 'Rough' },
  { value: 2, emoji: '😕', label: 'Okay' },
  { value: 3, emoji: '😐', label: 'Fine' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😴', label: 'Dreamy' },
];

const MEAL_KINDS: { kind: MealKind; emoji: string; label: string }[] = [
  { kind: 'sunrise', emoji: '🌅', label: 'Sunrise plate' },
  { kind: 'midday', emoji: '🌞', label: 'Midday plate' },
  { kind: 'evening', emoji: '🌙', label: 'Evening plate' },
  { kind: 'bite', emoji: '🍪', label: 'Little bite' },
];

export function CareScreen() {
  const {
    data,
    updateRestSchedule,
    logRest,
    addSip,
    removeSip,
    addMeal,
    deleteMeal,
    todaySips,
    todayMeals,
    latestRest,
  } = useApp();

  const [bedtime, setBedtime] = useState(data.restSchedule.bedtime);
  const [wakeTime, setWakeTime] = useState(data.restSchedule.wakeTime);
  const [quality, setQuality] = useState<RestLog['quality']>(4);
  const [mealKind, setMealKind] = useState<MealKind>('sunrise');
  const [mealTitle, setMealTitle] = useState('');

  const glasses = todaySips?.glasses ?? 0;
  const goal = todaySips?.goal ?? DEFAULT_SIP_GOAL;
  const sipProgress = Math.min(1, glasses / goal);

  const idealHours = useMemo(
    () => formatDuration(minutesBetween(data.restSchedule.bedtime, data.restSchedule.wakeTime)),
    [data.restSchedule.bedtime, data.restSchedule.wakeTime],
  );

  const todayRest = data.restLogs.find((log) => log.date === todayKey());

  const saveSchedule = (nextBed: string, nextWake: string) => {
    setBedtime(nextBed);
    setWakeTime(nextWake);
    updateRestSchedule({ bedtime: nextBed, wakeTime: nextWake });
  };

  const onLogRest = () => {
    logRest({ bedtime, wakeTime, quality });
  };

  const onAddMeal = () => {
    if (!mealTitle.trim()) {
      Alert.alert('Add a dish name', 'What did you enjoy?');
      return;
    }
    addMeal(mealKind, mealTitle);
    setMealTitle('');
  };

  return (
    <Screen
      title="Care"
      subtitle="Rest, sips, and nourishment — gently tracked."
      headerRight={
        <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
      }
    >
      {/* Sweet Rest */}
      <SoftCard tint={colors.lavenderSoft} style={styles.block}>
        <Text style={styles.emoji}>🌙</Text>
        <Text style={styles.heading}>Sweet Rest</Text>
        <Text style={styles.copy}>
          Set your dream rhythm · about {idealHours} of rest
        </Text>

        <Text style={styles.label}>Lights out</Text>
        <View style={styles.chips}>
          {BEDTIMES.map((time) => (
            <Pressable
              key={`bed-${time}`}
              onPress={() => saveSchedule(time, wakeTime)}
              style={[styles.chip, bedtime === time && styles.chipActive]}
            >
              <Text style={[styles.chipText, bedtime === time && styles.chipTextActive]}>
                {formatClock(time)}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Rise & shine</Text>
        <View style={styles.chips}>
          {WAKETIMES.map((time) => (
            <Pressable
              key={`wake-${time}`}
              onPress={() => saveSchedule(bedtime, time)}
              style={[styles.chip, wakeTime === time && styles.chipActive]}
            >
              <Text style={[styles.chipText, wakeTime === time && styles.chipTextActive]}>
                {formatClock(time)}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>How was last night?</Text>
        <View style={styles.qualityRow}>
          {QUALITY.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => setQuality(item.value)}
              style={[styles.qualityBtn, quality === item.value && styles.qualityActive]}
            >
              <Text style={styles.qualityEmoji}>{item.emoji}</Text>
              <Text style={styles.qualityLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryBtn} onPress={onLogRest}>
          <Text style={styles.primaryText}>
            {todayRest ? 'Update rest log' : 'Log sweet rest (+3 ⭐)'}
          </Text>
        </Pressable>

        {latestRest ? (
          <Text style={styles.hint}>
            Last log · {formatFriendlyDate(latestRest.date)} ·{' '}
            {formatDuration(minutesBetween(latestRest.bedtime, latestRest.wakeTime))} ·{' '}
            {QUALITY.find((q) => q.value === latestRest.quality)?.emoji}
          </Text>
        ) : null}
      </SoftCard>

      {/* Little Sips */}
      <SoftCard tint={colors.secondarySoft} style={styles.block}>
        <Text style={styles.emoji}>💧</Text>
        <Text style={styles.heading}>Little Sips</Text>
        <Text style={styles.copy}>
          {glasses} of {goal} cozy glasses today
        </Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${sipProgress * 100}%` }]} />
        </View>

        <View style={styles.glasses}>
          {Array.from({ length: goal }).map((_, index) => (
            <Text key={index} style={styles.glass}>
              {index < glasses ? '🫧' : '⭘'}
            </Text>
          ))}
        </View>

        <View style={styles.sipActions}>
          <Pressable style={styles.secondaryBtn} onPress={removeSip}>
            <Text style={styles.secondaryText}>− Sip</Text>
          </Pressable>
          <Pressable style={[styles.primaryBtn, styles.sipAdd]} onPress={addSip}>
            <Text style={styles.primaryText}>+ Add a sip</Text>
          </Pressable>
        </View>
        {glasses >= goal ? (
          <Text style={styles.hint}>Goal reached — you're glowing ✨</Text>
        ) : (
          <Text style={styles.hint}>Hit your sip goal for +3 ⭐</Text>
        )}
      </SoftCard>

      {/* Nourish */}
      <SoftCard tint={colors.accentSoft} style={styles.block}>
        <Text style={styles.emoji}>🍽️</Text>
        <Text style={styles.heading}>Nourish</Text>
        <Text style={styles.copy}>Capture the plates that keep you going.</Text>

        <View style={styles.chips}>
          {MEAL_KINDS.map((item) => (
            <Pressable
              key={item.kind}
              onPress={() => setMealKind(item.kind)}
              style={[styles.chip, mealKind === item.kind && styles.chipActiveWarm]}
            >
              <Text style={[styles.chipText, mealKind === item.kind && styles.chipTextActive]}>
                {item.emoji} {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          value={mealTitle}
          onChangeText={setMealTitle}
          placeholder="e.g. Warm oatmeal with berries"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          onSubmitEditing={onAddMeal}
          returnKeyType="done"
        />
        <Pressable style={styles.primaryBtn} onPress={onAddMeal}>
          <Text style={styles.primaryText}>Save plate (+2 ⭐)</Text>
        </Pressable>

        <Text style={styles.subheading}>Today's plates</Text>
        {todayMeals.length === 0 ? (
          <Text style={styles.hint}>Nothing logged yet — start with a little bite.</Text>
        ) : (
          todayMeals.map((meal) => {
            const meta = MEAL_KINDS.find((item) => item.kind === meal.kind);
            return (
              <View key={meal.id} style={styles.mealRow}>
                <Text style={styles.mealEmoji}>{meta?.emoji}</Text>
                <View style={styles.mealBody}>
                  <Text style={styles.mealTitle}>{meal.title}</Text>
                  <Text style={styles.mealMeta}>{meta?.label}</Text>
                </View>
                <Pressable
                  onPress={() =>
                    Alert.alert('Remove plate?', meal.title, [
                      { text: 'Keep', style: 'cancel' },
                      {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => deleteMeal(meal.id),
                      },
                    ])
                  }
                >
                  <Text style={styles.delete}>✕</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </SoftCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: 14 },
  emoji: { fontSize: 30, marginBottom: 4 },
  heading: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    color: colors.text,
  },
  copy: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 14,
    color: colors.textSoft,
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 20,
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 13,
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  chipActiveWarm: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 12,
    color: colors.textSoft,
  },
  chipTextActive: { color: colors.white },
  qualityRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  qualityBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  qualityActive: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.lavender,
  },
  qualityEmoji: { fontSize: 18 },
  qualityLabel: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 10,
    color: colors.textSoft,
    marginTop: 2,
  },
  primaryBtn: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.white,
    fontSize: 14,
  },
  secondaryBtn: {
    flex: 1,
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.text,
    fontSize: 14,
  },
  hint: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 10,
    textAlign: 'center',
  },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.secondary,
  },
  glasses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  glass: { fontSize: 18, width: 28, textAlign: 'center' },
  sipActions: { flexDirection: 'row', gap: 10 },
  sipAdd: { flex: 2, marginTop: 12 },
  input: {
    marginTop: 12,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subheading: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: colors.text,
    marginTop: 18,
    marginBottom: 8,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  mealEmoji: { fontSize: 22 },
  mealBody: { flex: 1 },
  mealTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 15,
    color: colors.text,
  },
  mealMeta: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 12,
    color: colors.textSoft,
    marginTop: 2,
  },
  delete: { color: colors.textMuted, fontSize: 16, padding: 4 },
});
