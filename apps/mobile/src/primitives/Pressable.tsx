import React from 'react';
import { TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native';
import { baseTokens } from '../theme';

export interface PressableProps {
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  hitSlop?: number;
  energyMode?: 'normal' | 'low' | 'overwhelmed';
}

export function Pressable({ 
  children, 
  onPress, 
  onLongPress,
  style, 
  hitSlop = baseTokens.touchTarget.comfortable / 2,
  energyMode = 'normal',
  ...props 
}: PressableProps) {
  const pressableStyle: ViewStyle = {
    minHeight: baseTokens.touchTarget.min,
    minWidth: baseTokens.touchTarget.min,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TouchableOpacity 
      style={[pressableStyle, style]} 
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      activeOpacity={energyMode === 'overwhelmed' ? 1 : 0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
