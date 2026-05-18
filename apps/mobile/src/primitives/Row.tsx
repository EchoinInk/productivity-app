import React from 'react';
import { View, ViewStyle, FlexAlignType } from 'react-native';
import { baseTokens } from '../theme';

export type FlexJustifyType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export interface RowProps {
  children?: React.ReactNode;
  spacing?: keyof typeof baseTokens.spacing;
  style?: ViewStyle;
  align?: FlexAlignType;
  justify?: FlexJustifyType;
  padding?: keyof typeof baseTokens.spacing;
}

export function Row({ 
  children, 
  spacing = 'md', 
  style, 
  align = 'center',
  justify = 'flex-start',
  padding,
  ...props 
}: RowProps) {
  const rowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: align,
    justifyContent: justify,
    gap: baseTokens.spacing[spacing],
    padding: padding ? baseTokens.spacing[padding] : undefined,
  };

  return (
    <View 
      style={[rowStyle, style]} 
      {...props}
    >
      {children}
    </View>
  );
}
