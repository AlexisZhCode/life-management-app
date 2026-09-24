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
import { EmptyState } from '../components/EmptyState';
import { Screen } from '../components/Screen';
import { SoftCard } from '../components/SoftCard';
import { TaskItem } from '../components/TaskItem';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import type { TaskCategory } from '../types';

const CATEGORIES: TaskCategory[] = ['personal', 'work', 'health', 'home', 'social'];

export function TasksScreen() {
  const { data, addTask, toggleTask, deleteTask } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [tab, setTab] = useState<'open' | 'done'>('open');

  const openTasks = useMemo(
    () => data.tasks.filter((t) => !t.completed),
    [data.tasks],
  );
  const doneTasks = useMemo(
    () => data.tasks.filter((t) => t.completed),
    [data.tasks],
  );
  const visible = tab === 'open' ? openTasks : doneTasks;

  const onAdd = () => {
    if (!title.trim()) {
      Alert.alert('Add a little title', 'What would you like to get done?');
      return;
    }
    addTask(title, category);
    setTitle('');
  };

  return (
    <Screen
      title="Tasks"
      subtitle="Tiny steps count. Finish one, earn a reward."
      headerRight={
        <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
      }
    >
      <SoftCard style={styles.composer}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="What needs a little love?"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <View style={styles.cats}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[styles.cat, category === cat && styles.catActive]}
            >
              <Text style={[styles.catText, category === cat && styles.catTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addText}>Add task ✨</Text>
        </Pressable>
      </SoftCard>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, tab === 'open' && styles.tabActive]}
          onPress={() => setTab('open')}
        >
          <Text style={[styles.tabText, tab === 'open' && styles.tabTextActive]}>
            To-do ({openTasks.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 'done' && styles.tabActive]}
          onPress={() => setTab('done')}
        >
          <Text style={[styles.tabText, tab === 'done' && styles.tabTextActive]}>
            Finished ({doneTasks.length})
          </Text>
        </Pressable>
      </View>

      {visible.length === 0 ? (
        <EmptyState
          emoji={tab === 'open' ? '🍃' : '🎉'}
          title={tab === 'open' ? 'All clear' : 'No finished tasks yet'}
          message={
            tab === 'open'
              ? 'Add something small and kind to start.'
              : 'Complete a task to see it here — with coins!'
          }
        />
      ) : (
        visible.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() =>
              Alert.alert('Remove task?', task.title, [
                { text: 'Keep', style: 'cancel' },
                {
                  text: 'Remove',
                  style: 'destructive',
                  onPress: () => deleteTask(task.id),
                },
              ])
            }
          />
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  composer: { marginBottom: 16 },
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
  cats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  cat: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 12,
    color: colors.textSoft,
    textTransform: 'capitalize',
  },
  catTextActive: { color: colors.white },
  addBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
  },
  addText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.white,
    fontSize: 15,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: colors.secondarySoft },
  tabText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 13,
    color: colors.textMuted,
  },
  tabTextActive: { color: colors.text },
});
