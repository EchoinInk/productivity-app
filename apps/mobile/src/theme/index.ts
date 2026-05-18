import { ThemeTokens, EnergyMode, SpacingTokens, TypographyTokens, RadiiTokens, TouchTargetTokens, SurfaceTokens, ShadowTokens, ZIndexTokens, MotionTimingTokens, ColorTokens, EnergyModeTokens } from './types';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';
import { radii } from './tokens/radii';
import { touchTarget } from './tokens/touch-target';
import { surface } from './tokens/surface';
import { shadow } from './tokens/shadow';
import { zIndex } from './tokens/z-index';
import { motion } from './tokens/motion';
import { color } from './tokens/color';
import { energyModes } from './tokens/energy-modes';

export const baseTokens: ThemeTokens = {
  spacing,
  typography,
  radii,
  touchTarget,
  surface,
  shadow,
  zIndex,
  motion,
  color,
  energyModes,
};

export { EnergyMode, motion };
export type { ThemeTokens, SpacingTokens, TypographyTokens, RadiiTokens, TouchTargetTokens, SurfaceTokens, ShadowTokens, ZIndexTokens, MotionTimingTokens, ColorTokens, EnergyModeTokens };
