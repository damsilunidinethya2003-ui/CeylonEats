
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router';

import { FavoritesProvider } from '../context/FavoritesContext';
import { ProfileProvider } from '../context/ProfileContext';
import { showLocalMessage } from '../utils/showLocalMessage';

export default function RootLayout() {

  const appState = useRef(AppState.currentState);

  useEffect(() => {

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {

        if (
          (appState.current === 'background' ||
            appState.current === 'inactive') &&
          nextAppState === 'active'
        ) {
          showLocalMessage(
            'Welcome back to CeylonEats! 👋'
          );
        }

        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };

  }, []);

  return (
    <FavoritesProvider>
      <ProfileProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="restaurant/[id]" />
        </Stack>
      </ProfileProvider>
    </FavoritesProvider>
  );
}
