import { WithTimingConfig } from 'react-native-reanimated';
import { EnergyMode } from '../theme/types';
import { getTimingForEnergy } from './spring-presets';

export interface TransitionConfig {
  duration: number;
  easing?: WithTimingConfig['easing'];
}

export const transitionPresets: Record<string, TransitionConfig> = {
  // Quick, subtle feedback
  instant: {
    duration: 150,
  },
  // Standard transitions
  standard: {
    duration: 250,
  },
  // Gentle, calm transitions
  gentle: {
    duration: 350,
  },
  // Slow, deliberate transitions
  slow: {
    duration: 500,
  },
};

export const getTransitionConfig = (
  preset: keyof typeof transitionPresets,
  energyMode: EnergyMode = 'normal'
): TransitionConfig => {
  const basePreset = transitionPresets[preset];
  const adjustedDuration = getTimingForEnergy(basePreset.duration, energyMode);
  
  return {
    duration: adjustedDuration,
    easing: basePreset.easing,
  };
};

// Sheet transitions
export const sheetTransitions = {
  enter: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(300, energyMode),
  }),
  exit: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(250, energyMode),
  }),
};

// Gesture completion timing
export const gestureCompletionTiming = {
  snap: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(200, energyMode),
  }),
  reverse: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(300, energyMode),
  }),
};

// Focus mode transitions
export const focusModeTransitions = {
  enter: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(400, energyMode),
  }),
  exit: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(300, energyMode),
  }),
  taskSwitch: (energyMode: EnergyMode = 'normal') => ({
    duration: getTimingForEnergy(250, energyMode),
  }),
};
