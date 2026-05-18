import Animated, {
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import { motion } from '../theme';
import { springPresets, getSpringPreset } from './spring-presets';
import { EnergyMode } from '../theme/types';

export const transitionPresets = {
  fade: (duration?: number) => withTiming(1, { duration: duration || motion.normal }),
  spring: (preset: keyof typeof springPresets = 'calm') => withSpring(1, getSpringPreset(preset)),
  instant: () => withTiming(1, { duration: motion.instant }),
};

export const createFadeTransition = (
  toValue: number,
  duration?: number,
  energyMode: EnergyMode = 'normal'
) => {
  const adjustedDuration = energyMode === 'overwhelmed' ? 0 : duration || motion.normal;
  const scaledDuration = energyMode === 'low' ? adjustedDuration * 1.5 : adjustedDuration;
  
  return withTiming(toValue, { duration: scaledDuration });
};

export const createScaleTransition = (
  toValue: number,
  preset: keyof typeof springPresets = 'calm',
  energyMode: EnergyMode = 'normal'
) => {
  if (energyMode === 'overwhelmed') {
    return withTiming(toValue, { duration: 0 });
  }
  
  return withSpring(toValue, getSpringPreset(preset, energyMode));
};

export const createDelayedTransition = (
  animation: any,
  delayMs: number,
  energyMode: EnergyMode = 'normal'
) => {
  const adjustedDelay = energyMode === 'overwhelmed' ? 0 : delayMs;
  return withDelay(adjustedDelay, animation);
};

export const createSequence = (animations: any[]) => {
  return withSequence(...animations);
};
