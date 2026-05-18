import React from 'react';
import { View, ViewStyle } from 'react-native';
import { baseTokens } from '../../theme';
import { EnergyMode } from '../../theme/types';
import { Stack, StackProps } from '../Stack';

export interface EnergyAwareStackProps extends Omit<StackProps, 'energyMode'> {
  energyMode?: EnergyMode;
  children?: React.ReactNode;
}

export function EnergyAwareStack({
  energyMode = 'normal',
  children,
  spacing = 'md',
  style,
  align = 'stretch',
  justify = 'flex-start',
  padding,
  ...props
}: EnergyAwareStackProps) {
  const adaptedSpacing = getAdaptedSpacing(spacing, energyMode);
  const adaptedPadding = padding ? getAdaptedSpacing(padding, energyMode) : undefined;
  
  return (
    <Stack
      spacing={adaptedSpacing}
      padding={adaptedPadding}
      align={align}
      justify={justify}
      style={style}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && energyMode !== 'normal') {
          return React.cloneElement(child as React.ReactElement<any>, {
            energyMode,
          });
        }
        return child;
      })}
    </Stack>
  );
}

function getAdaptedSpacing(
  spacing: keyof typeof baseTokens.spacing,
  energyMode: EnergyMode
): keyof typeof baseTokens.spacing {
  if (energyMode === 'normal') return spacing;
  
  const spacingValues = baseTokens.spacing;
  const spacingKeys = Object.keys(spacingValues) as Array<keyof typeof spacingValues>;
  const currentIndex = spacingKeys.indexOf(spacing);
  
  if (energyMode === 'low') {
    // Reduce spacing by one level
    return spacingKeys[Math.max(0, currentIndex - 1)] || spacing;
  }
  
  if (energyMode === 'overwhelmed') {
    // Minimize spacing
    return 'xs';
  }
  
  return spacing;
}
