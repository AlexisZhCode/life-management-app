import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  title,
  subtitle,
  headerRight,
  scroll = true,
  style,
}: Props) {
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, style]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.flex, style]}>{children}</View>
  );

  return (
    <LinearGradient colors={['#FFF6F0', '#FFE8DC', '#FFF3EA']} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        {(title || headerRight) && (
          <View style={styles.header}>
            <View style={styles.headerText}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            {headerRight}
          </View>
        )}
        {body}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerText: { flex: 1 },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 30,
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 15,
    color: colors.textSoft,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 110,
  },
});
