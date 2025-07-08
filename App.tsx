
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Import navigation
import AppNavigator from './src/navigation/AppNavigator';

// Import styles
import './global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Initialize query client for React Query
const queryClient = new QueryClient();

// Configure theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3B82F6',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#111827',
    border: '#E5E7EB',
    notification: '#3B82F6',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#60A5FA',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
    notification: '#60A5FA',
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    // Load any custom fonts here
    // Example:
    // 'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });
  
  const theme = colorScheme === 'dark' ? MyDarkTheme : MyTheme;

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources here (e.g., assets, API calls, etc.)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <ThemeProvider value={theme}>
          <QueryClientProvider client={queryClient}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <AppNavigator />
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


