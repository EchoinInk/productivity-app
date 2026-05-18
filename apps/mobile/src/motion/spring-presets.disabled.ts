import { WithSpringConfig } from 'react-native-reanimated';

export const springPresets: Record<string, WithSpringConfig> = {
  // Subtle, gentle motion for calm interactions
  gentle: {
    damping: 15,
    stiffness: 80,
    mass: 1,
  },
  // Balanced, calm motion for standard interactions
  calm: {
    damping: 18,
    stiffness: 100,
    mass: 1,
  },
  // Quick but controlled for completion actions
  snappy: {
    damping: 12,
    stiffness: 250,
    mass: 0.8,
  },
  // Soft, welcoming for entry transitions
  soft: {
    damping: 20,
    stiffness: 70,
    mass: 1.2,
  },
  // Minimal motion for overwhelmed mode
  minimal: {
    damping: 30,
    stiffness: 40,
    mass: 1,
  },
};

export const getSpringPreset = (preset: keyof typeof springPresets, energyMode: 'normal' | 'low' | 'overwhelmed' = 'normal'): WithSpringConfig => {
  const basePreset = springPresets[preset];
  
  if (energyMode === 'normal') {
    return basePreset;
  }
  
  if (energyMode === 'low') {
    // Slower, more damped motion for low energy
    return {
      damping: (basePreset.damping || 18) * 1.3,
      stiffness: (basePreset.stiffness || 100) * 0.6,
      mass: (basePreset.mass || 1) * 1.1,
    };
  }
  
  if (energyMode === 'overwhelmed') {
    // Nearly instant for overwhelmed mode
    return {
      damping: 35,
      stiffness: 30,
      mass: 1,
    };
  }
  
  return basePreset;
};

export const getTimingForEnergy = (baseDuration: number, energyMode: 'normal' | 'low' | 'overwhelmed'): number => {
  if (energyMode === 'overwhelmed') return 0;
  if (energyMode === 'low') return baseDuration * 1.5;
  return baseDuration;
};
