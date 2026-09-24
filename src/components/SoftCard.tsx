import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tint?: string;
};

export function SoftCard({ children, style, tint }: Props) {
  return (
    <View style={[styles.card, tint ? { backgroundColor: tint } : null, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
});
