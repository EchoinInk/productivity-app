import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { baseTokens } from '../theme';

export type TextVariant = 'display' | 'heading' | 'body' | 'caption' | 'label';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse';

export interface TextProps {
  children?: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  style?: TextStyle;
  energyMode?: 'normal' | 'low' | 'overwhelmed';
}

export function Text({ 
  children, 
  variant = 'body', 
  color = 'primary', 
  style, 
  energyMode = 'normal',
  ...props 
}: TextProps) {
  const typography = baseTokens.typography[variant];
  const textColor = baseTokens.color.text[color];
  const opacity = baseTokens.energyModes[energyMode].opacityScale;
  
  const textStyle: TextStyle = {
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    fontWeight: typography.fontWeight,
    letterSpacing: typography.letterSpacing,
    color: textColor,
    opacity: energyMode === 'normal' ? 1 : opacity,
  };
  
  return (
    <RNText 
      style={[textStyle, style]} 
      {...props}
    >
      {children}
    </RNText>
  );
}
