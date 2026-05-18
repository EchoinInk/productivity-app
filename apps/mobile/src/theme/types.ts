export type EnergyMode = 'normal' | 'low' | 'overwhelmed';

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface TypographyTokens {
  display: {
    fontSize: number;
    lineHeight: number;
    fontWeight: '400' | '500' | '600' | '700';
    letterSpacing: number;
  };
  heading: {
    fontSize: number;
    lineHeight: number;
    fontWeight: '400' | '500' | '600' | '700';
    letterSpacing: number;
  };
  body: {
    fontSize: number;
    lineHeight: number;
    fontWeight: '400' | '500' | '600' | '700';
    letterSpacing: number;
  };
  caption: {
    fontSize: number;
    lineHeight: number;
    fontWeight: '400' | '500' | '600' | '700';
    letterSpacing: number;
  };
  label: {
    fontSize: number;
    lineHeight: number;
    fontWeight: '400' | '500' | '600' | '700';
    letterSpacing: number;
  };
}

export interface RadiiTokens {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface TouchTargetTokens {
  min: number;
  comfortable: number;
  generous: number;
}

export interface SurfaceTokens {
  background: string;
  card: string;
  elevated: string;
  overlay: string;
  overlayOpacity: number;
}

export interface ShadowTokens {
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export interface ZIndexTokens {
  base: number;
  dropdown: number;
  sticky: number;
  modal: number;
  popover: number;
  toast: number;
  tooltip: number;
}

export interface MotionTimingTokens {
  instant: number;
  fast: number;
  normal: number;
  slow: number;
  slower: number;
}

export interface ColorTokens {
  primary: string;
  primaryDim: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    subtle: string;
    medium: string;
    strong: string;
  };
}

export interface EnergyModeTokens {
  [mode: string]: {
    motionScale: number;
    opacityScale: number;
    saturationScale: number;
  };
}

export interface ThemeTokens {
  spacing: SpacingTokens;
  typography: TypographyTokens;
  radii: RadiiTokens;
  touchTarget: TouchTargetTokens;
  surface: SurfaceTokens;
  shadow: ShadowTokens;
  zIndex: ZIndexTokens;
  motion: MotionTimingTokens;
  color: ColorTokens;
  energyModes: EnergyModeTokens;
}
