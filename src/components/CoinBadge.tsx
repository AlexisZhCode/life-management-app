import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  coins: number;
  streak: number;
};

export function CoinBadge({ coins, streak }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.pill}>
        <Text style={styles.text}>⭐ {coins}</Text>
      </View>
      <View style={[styles.pill, styles.streak]}>
        <Text style={styles.text}>🔥 {streak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', gap: 8 },
  pill: {
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#F5E3A1',
  },
  streak: {
    backgroundColor: colors.primarySoft,
    borderColor: '#F5C4BA',
  },
  text: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 13,
    color: colors.text,
  },
});
