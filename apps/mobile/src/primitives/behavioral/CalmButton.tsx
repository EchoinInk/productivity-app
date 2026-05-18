import React from 'react';
import { TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native';
import { baseTokens } from '../../theme';
import { Text } from '../Text';
import { useInterruptionSafeAnimation } from '../../motion';

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
  const animation = useInterruptionSafeAnimation(0);
  
  const handlePressIn = () => {
    if (energyMode === 'overwhelmed') return;
    animation.animateTo(1, {
      type: 'spring',
      springPreset: 'gentle',
      energyMode,
    });
  };
  
  const handlePressOut = () => {
    if (energyMode === 'overwhelmed') return;
    animation.animateTo(0, {
      type: 'spring',
      springPreset: 'calm',
      energyMode,
    });
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
    opacity: disabled ? 0.5 : 1,
  };
  
  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={energyMode === 'overwhelmed' ? 1 : 0.9}
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
