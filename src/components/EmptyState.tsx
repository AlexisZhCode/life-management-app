import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  emoji: string;
  title: string;
  message: string;
};

export function EmptyState({ emoji, title, message }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 18,
  },
  emoji: { fontSize: 42, marginBottom: 10 },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 6,
  },
  message: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 14,
    color: colors.textSoft,
    textAlign: 'center',
    lineHeight: 20,
  },
});
