import React from 'react';
import { TouchableOpacity, ViewStyle, GestureResponderEvent, Platform } from 'react-native';
import { baseTokens } from '../../theme';
import { EnergyMode } from '../../theme/types';

export interface HapticPressableProps {
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  hapticStyle?: 'light' | 'medium' | 'heavy' | 'none';
  energyMode?: EnergyMode;
  hitSlop?: number;
}

export function HapticPressable({
  children,
  onPress,
  onLongPress,
  style,
  hapticStyle = 'light',
  energyMode = 'normal',
  hitSlop = baseTokens.touchTarget.comfortable / 2,
  ...props
}: HapticPressableProps) {
  const triggerHaptic = () => {
    if (energyMode === 'overwhelmed' || hapticStyle === 'none') return;
    
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Placeholder for actual haptic feedback
      // In production, use expo-haptics or react-native-haptic-feedback
      // Example: Haptics.impactAsync(HapticFeedbackStyle[hapticStyle]);
    }
  };
  
  const handlePress = (event: GestureResponderEvent) => {
    triggerHaptic();
    onPress?.(event);
  };
  
  const pressableStyle: ViewStyle = {
    minHeight: baseTokens.touchTarget.min,
    minWidth: baseTokens.touchTarget.min,
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  return (
    <TouchableOpacity
      style={[pressableStyle, style]}
      onPress={handlePress}
      onLongPress={onLongPress}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      activeOpacity={energyMode === 'overwhelmed' ? 1 : 0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
