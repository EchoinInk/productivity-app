import { WithSpringConfig } from 'react-native-reanimated';

export const springPresets: Record<string, WithSpringConfig> = {
  gentle: {
    damping: 12,
    stiffness: 80,
    mass: 1,
  },
  calm: {
    damping: 15,
    stiffness: 100,
    mass: 1,
  },
  snappy: {
    damping: 10,
    stiffness: 300,
    mass: 0.8,
  },
  bouncy: {
    damping: 8,
    stiffness: 400,
    mass: 1,
  },
  slow: {
    damping: 20,
    stiffness: 60,
    mass: 1.2,
  },
};

export const getSpringPreset = (preset: keyof typeof springPresets, energyMode: 'normal' | 'low' | 'overwhelmed' = 'normal'): WithSpringConfig => {
  const basePreset = springPresets[preset];
  
  if (energyMode === 'normal') {
    return basePreset;
  }
  
  if (energyMode === 'low') {
    return {
      damping: (basePreset.damping || 15) * 1.5,
      stiffness: (basePreset.stiffness || 100) * 0.7,
      mass: basePreset.mass || 1,
    };
  }
  
  if (energyMode === 'overwhelmed') {
    return {
      damping: 25,
      stiffness: 50,
      mass: 1,
    };
  }
  
  return basePreset;
};
