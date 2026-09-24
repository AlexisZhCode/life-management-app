import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { CelebrationModal } from './src/components/CelebrationModal';
import { TabNavigator } from './src/navigation/TabNavigator';
import { colors } from './src/theme/colors';

function Root() {
  const { ready, celebration, dismissCelebration } = useApp();

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <TabNavigator />
      <CelebrationModal
        visible={Boolean(celebration)}
        title={celebration?.title ?? ''}
        subtitle={celebration?.subtitle ?? ''}
        emoji={celebration?.emoji ?? '🌼'}
        coins={celebration?.coins ?? 0}
        onClose={dismissCelebration}
      />
    </>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <AppProvider>
          {/* Keep the GitHub Pages URL under /life-management-app; path linking
              would rewrite to /Home and leave the project subpath (blank/404). */}
          <NavigationContainer
            linking={
              Platform.OS === 'web'
                ? { enabled: false, prefixes: [] }
                : undefined
            }
          >
            <StatusBar style="dark" />
            <Root />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
