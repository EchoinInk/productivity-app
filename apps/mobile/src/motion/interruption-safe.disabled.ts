import Animated, {
  cancelAnimation,
  runOnJS,
  SharedValue,
  withTiming,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { motion } from '../theme';
import { springPresets, getSpringPreset, getTimingForEnergy } from './spring-presets.disabled';
import { EnergyMode } from '../theme/types';

export const useInterruptionSafeAnimation = (initialValue: number = 0) => {
  const sharedValue = useSharedValue(initialValue);
  const currentAnimation = useSharedValue<any>(null);
  
  const animateTo = (
    toValue: number,
    config: {
      type?: 'timing' | 'spring';
      duration?: number;
      springPreset?: keyof typeof springPresets;
      energyMode?: EnergyMode;
      onComplete?: () => void;
    } = {}
  ) => {
    const {
      type = 'spring',
      duration = motion.normal,
      springPreset = 'calm',
      energyMode = 'normal',
      onComplete,
    } = config;
    
    // Cancel any ongoing animation to prevent conflicts
    cancelAnimation(sharedValue);
    
    let animation;
    
    if (energyMode === 'overwhelmed') {
      // Instant transition in overwhelmed mode
      animation = withTiming(toValue, { duration: 0 });
    } else if (type === 'timing') {
      const adjustedDuration = getTimingForEnergy(duration, energyMode);
      animation = withTiming(toValue, { duration: adjustedDuration }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      });
    } else {
      animation = withSpring(toValue, getSpringPreset(springPreset, energyMode), (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      });
    }
    
    currentAnimation.value = animation;
    sharedValue.value = animation;
  };
  
  const cancel = () => {
    cancelAnimation(sharedValue);
    currentAnimation.value = null;
  };
  
  return {
    value: sharedValue,
    animateTo,
    cancel,
  };
};
