import React from 'react';
import { View, ViewStyle } from 'react-native';
import { baseTokens } from '../theme';

export type SurfaceVariant = 'card' | 'elevated' | 'flat';
export type ShadowLevel = 'sm' | 'md' | 'lg' | 'none';

export interface SurfaceProps {
  children?: React.ReactNode;
  variant?: SurfaceVariant;
  shadow?: ShadowLevel;
  radius?: keyof typeof baseTokens.radii;
  padding?: keyof typeof baseTokens.spacing;
  style?: ViewStyle;
  energyMode?: 'normal' | 'low' | 'overwhelmed';
}

export function Surface({ 
  children, 
  variant = 'card', 
  shadow = 'sm', 
  radius = 'md',
  padding = 'lg',
  style,
  energyMode = 'normal',
  ...props 
}: SurfaceProps) {
  const shadowStyle = shadow === 'none' ? {} : baseTokens.shadow[shadow];
  const backgroundColor = variant === 'flat' ? 'transparent' : baseTokens.surface[variant];
  const opacity = baseTokens.energyModes[energyMode].opacityScale;
  
  const surfaceStyle: ViewStyle = {
    backgroundColor,
    borderRadius: baseTokens.radii[radius],
    padding: baseTokens.spacing[padding],
    ...(shadow !== 'none' ? shadowStyle : {}),
    opacity: energyMode === 'normal' ? 1 : opacity,
  };

  return (
    <View 
      style={[surfaceStyle, style]} 
      {...props}
    >
      {children}
    </View>
  );
}
