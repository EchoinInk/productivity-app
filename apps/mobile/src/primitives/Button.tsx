import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { baseTokens } from '../theme';
import { Text as PrimitiveText } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  energyMode?: 'normal' | 'low' | 'overwhelmed';
}

export function Button({ 
  title, 
  onPress, 
  onLongPress,
  variant = 'primary', 
  size = 'md',
  disabled = false,
  style,
  energyMode = 'normal',
  ...props 
}: ButtonProps) {
  const padding = size === 'sm' ? baseTokens.spacing.md : size === 'md' ? baseTokens.spacing.lg : baseTokens.spacing.xl;
  const minHeight = size === 'sm' ? baseTokens.touchTarget.min : size === 'md' ? baseTokens.touchTarget.comfortable : baseTokens.touchTarget.generous;
  const opacity = baseTokens.energyModes[energyMode].opacityScale;
  
  let backgroundColor = baseTokens.color.primary;
  let borderColor = 'transparent';
  
  if (variant === 'secondary') {
    backgroundColor = baseTokens.color.secondary;
  } else if (variant === 'outline') {
    backgroundColor = 'transparent';
    borderColor = baseTokens.color.primary;
  } else if (variant === 'ghost') {
    backgroundColor = 'transparent';
  }
  
  if (disabled) {
    backgroundColor = baseTokens.color.border.subtle;
    borderColor = baseTokens.color.border.subtle;
  }
  
  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderColor,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderRadius: baseTokens.radii.md,
    paddingVertical: padding,
    paddingHorizontal: padding * 1.5,
    minHeight,
    minWidth: baseTokens.touchTarget.min,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled || energyMode !== 'normal' ? opacity : 1,
  };

  let textColor = baseTokens.color.text.inverse;
  
  if (variant === 'outline' || variant === 'ghost') {
    textColor = baseTokens.color.primary;
  }
  
  if (disabled) {
    textColor = baseTokens.color.text.tertiary;
  }
  
  const textStyle: TextStyle = {
    color: textColor,
    fontWeight: '600',
  };

  return (
    <TouchableOpacity 
      style={[buttonStyle, style]} 
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={energyMode === 'overwhelmed' ? 1 : 0.8}
      {...props}
    >
      <PrimitiveText 
        variant={size === 'lg' ? 'body' : 'label'} 
        style={textStyle}
      >
        {title}
      </PrimitiveText>
    </TouchableOpacity>
  );
}
