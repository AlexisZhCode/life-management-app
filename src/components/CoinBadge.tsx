import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BloomIcon } from '../icons/BloomIcon';
import { colors } from '../theme/colors';

type Props = {
  coins: number;
  streak: number;
};

export function CoinBadge({ coins, streak }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.pill}>
        <BloomIcon name="coin" size={16} />
        <Text style={styles.text}>{coins}</Text>
      </View>
      <View style={[styles.pill, styles.streak]}>
        <BloomIcon name="streak" size={16} />
        <Text style={styles.text}>{streak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', gap: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 6,
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
