import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TodayScreen } from '../features/today/TodayScreen';
import { CaptureSheet } from '../features/capture/CaptureSheet';
import { SettingsScreen } from '../features/settings/SettingsScreen';

const Stack = createStackNavigator();

export function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Today" component={TodayScreen} />
        <Stack.Screen name="Capture" component={CaptureSheet} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
