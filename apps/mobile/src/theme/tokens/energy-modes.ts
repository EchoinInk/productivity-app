import { EnergyModeTokens } from '../types';

export const energyModes: EnergyModeTokens = {
  normal: {
    motionScale: 1,
    opacityScale: 1,
    saturationScale: 1,
  },
  low: {
    motionScale: 0.5,
    opacityScale: 0.9,
    saturationScale: 0.8,
  },
  overwhelmed: {
    motionScale: 0,
    opacityScale: 0.8,
    saturationScale: 0.6,
  },
};
