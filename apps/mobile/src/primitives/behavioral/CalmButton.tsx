import React, { useState } from 'react';
import { TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native';
import { baseTokens } from '../../theme';
import { Text } from '../Text';

export interface CalmButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'gentle';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  energyMode?: 'normal' | 'low' | 'overwhelmed';
}

export function CalmButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  energyMode = 'normal',
}: CalmButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (energyMode === 'overwhelmed') return;
    setIsPressed(true);
  };

  const handlePressOut = () => {
    if (energyMode === 'overwhelmed') return;
    setIsPressed(false);
  };
  
  const padding = size === 'sm' ? baseTokens.spacing.md : size === 'md' ? baseTokens.spacing.lg : baseTokens.spacing.xl;
  const minHeight = size === 'sm' ? baseTokens.touchTarget.min : size === 'md' ? baseTokens.touchTarget.comfortable : baseTokens.touchTarget.generous;
  
  let backgroundColor = baseTokens.color.primary;
  let textColor = baseTokens.color.text.inverse;
  
  if (variant === 'secondary') {
    backgroundColor = baseTokens.color.secondary;
  } else if (variant === 'gentle') {
    backgroundColor = baseTokens.color.primaryDim;
    textColor = baseTokens.color.primary;
  }
  
  if (disabled) {
    backgroundColor = baseTokens.color.border.subtle;
    textColor = baseTokens.color.text.tertiary;
  }
  
  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderRadius: baseTokens.radii.lg,
    paddingVertical: padding,
    paddingHorizontal: padding * 1.5,
    minHeight,
    minWidth: baseTokens.touchTarget.comfortable,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : isPressed ? 0.8 : 1,
  };
  
  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={energyMode === 'overwhelmed' ? 1 : 1}
    >
      <Text
        variant={size === 'lg' ? 'body' : 'label'}
        color={variant === 'gentle' ? 'primary' : 'inverse'}
        style={{ color: textColor }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
