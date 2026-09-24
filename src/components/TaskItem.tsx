import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, categoryColors } from '../theme/colors';
import type { Task } from '../types';

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const accent = categoryColors[task.category] ?? colors.primary;

  return (
    <View style={[styles.row, task.completed && styles.done]}>
      <Pressable onPress={onToggle} style={styles.checkHit} hitSlop={8}>
        <View style={[styles.check, { borderColor: accent }, task.completed && { backgroundColor: accent }]}>
          {task.completed ? <Text style={styles.checkMark}>✓</Text> : null}
        </View>
      </Pressable>
      <View style={styles.body}>
        <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={2}>
          {task.title}
        </Text>
        <View style={styles.meta}>
          <View style={[styles.chip, { backgroundColor: `${accent}33` }]}>
            <Text style={[styles.chipText, { color: colors.text }]}>{task.category}</Text>
          </View>
          {task.completed && task.coinsEarned ? (
            <Text style={styles.coins}>+{task.coinsEarned} ⭐</Text>
          ) : null}
        </View>
      </View>
      <Pressable onPress={onDelete} hitSlop={10}>
        <Text style={styles.delete}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  done: {
    backgroundColor: colors.mintSoft,
    borderColor: '#C9EBD4',
  },
  checkHit: { padding: 2 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: colors.white,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 14,
  },
  body: { flex: 1 },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textSoft,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  chipText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  coins: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 12,
    color: colors.primary,
  },
  delete: {
    fontSize: 16,
    color: colors.textMuted,
    paddingHorizontal: 4,
  },
});
