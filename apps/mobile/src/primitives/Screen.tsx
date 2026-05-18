import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { baseTokens } from '../theme';

export interface ScreenProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  energyMode?: 'normal' | 'low' | 'overwhelmed';
}

export function Screen({ children, style, energyMode = 'normal', ...props }: ScreenProps) {
  const screenStyle: ViewStyle = {
    flex: 1,
    backgroundColor: baseTokens.surface.background,
  };

  return (
    <View 
      style={[screenStyle, style]} 
      {...props}
    >
      {children}
    </View>
  );
}
