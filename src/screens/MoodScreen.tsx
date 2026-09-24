import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CoinBadge } from '../components/CoinBadge';
import { Screen } from '../components/Screen';
import { SoftCard } from '../components/SoftCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import type { MoodValue } from '../types';
import { formatFriendlyDate } from '../utils/helpers';

const MOODS: { value: MoodValue; emoji: string; label: string }[] = [
  { value: 1, emoji: '😢', label: 'Low' },
  { value: 2, emoji: '😕', label: 'Meh' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

export function MoodScreen() {
  const { data, logMood, todayMood } = useApp();
  const [value, setValue] = useState<MoodValue>(todayMood?.value ?? 4);
  const [note, setNote] = useState(todayMood?.note ?? '');

  return (
    <Screen
      title="Mood"
      subtitle="A soft check-in with yourself."
      headerRight={
        <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
      }
    >
      <SoftCard tint={colors.accentSoft}>
        <Text style={styles.prompt}>How are you feeling today?</Text>
        <View style={styles.moods}>
          {MOODS.map((mood) => (
            <Pressable
              key={mood.value}
              onPress={() => setValue(mood.value)}
              style={[styles.moodBtn, value === mood.value && styles.moodActive]}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Optional note..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          multiline
        />
        <Pressable
          style={styles.saveBtn}
          onPress={() => logMood(value, note)}
        >
          <Text style={styles.saveText}>
            {todayMood ? 'Update mood' : 'Save mood (+2 ⭐)'}
          </Text>
        </Pressable>
      </SoftCard>

      <Text style={styles.section}>Recent check-ins</Text>
      {data.moods.length === 0 ? (
        <SoftCard>
          <Text style={styles.empty}>Your first mood will bloom here.</Text>
        </SoftCard>
      ) : (
        data.moods.slice(0, 8).map((entry) => {
          const mood = MOODS.find((m) => m.value === entry.value);
          return (
            <SoftCard key={entry.id} style={styles.entry}>
              <Text style={styles.entryEmoji}>{mood?.emoji}</Text>
              <View style={styles.entryBody}>
                <Text style={styles.entryTitle}>
                  {mood?.label} · {formatFriendlyDate(entry.date)}
                </Text>
                {entry.note ? (
                  <Text style={styles.entryNote}>{entry.note}</Text>
                ) : (
                  <Text style={styles.entryNote}>No note</Text>
                )}
              </View>
            </SoftCard>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  prompt: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 14,
  },
  moods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  moodBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  moodActive: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  moodEmoji: { fontSize: 24 },
  moodLabel: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 11,
    color: colors.textSoft,
    marginTop: 4,
  },
  input: {
    marginTop: 14,
    minHeight: 72,
    fontFamily: 'Nunito_500Medium',
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  saveBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.white,
    fontSize: 15,
  },
  section: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginTop: 22,
    marginBottom: 10,
  },
  empty: {
    fontFamily: 'Nunito_500Medium',
    color: colors.textSoft,
    textAlign: 'center',
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    paddingVertical: 14,
  },
  entryEmoji: { fontSize: 28 },
  entryBody: { flex: 1 },
  entryTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: colors.text,
  },
  entryNote: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 2,
  },
});
