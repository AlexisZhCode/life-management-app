import React, { useEffect, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  visible: boolean;
  title: string;
  subtitle: string;
  emoji: string;
  coins: number;
  onClose: () => void;
};

export function CelebrationModal({
  visible,
  title,
  subtitle,
  emoji,
  coins,
  onClose,
}: Props) {
  const [scale] = useState(() => new Animated.Value(0.7));
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!visible) return;
    scale.setValue(0.7);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, scale, opacity]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {coins > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>+{coins} coins</Text>
            </View>
          ) : null}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Keep blooming</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
  },
  emoji: { fontSize: 54, marginBottom: 10 },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 15,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 18,
  },
  badgeText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.text,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 28,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.white,
    fontSize: 16,
  },
});
