import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BloomIcon } from '../icons/BloomIcon';
import { colors } from '../theme/colors';

type Props = {
  icon: string;
  title: string;
  message: string;
};

export function EmptyState({ icon, title, message }: Props) {
  return (
    <View style={styles.wrap}>
      <BloomIcon name={icon} size={72} />
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
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginTop: 8,
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
