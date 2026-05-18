import React from 'react';
import { View, ViewStyle, FlexAlignType } from 'react-native';
import { baseTokens } from '../theme';

export type FlexJustifyType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export interface StackProps {
  children?: React.ReactNode;
  spacing?: keyof typeof baseTokens.spacing;
  style?: ViewStyle;
  align?: FlexAlignType;
  justify?: FlexJustifyType;
  padding?: keyof typeof baseTokens.spacing;
}

export function Stack({ 
  children, 
  spacing = 'md', 
  style, 
  align = 'stretch',
  justify = 'flex-start',
  padding,
  ...props 
}: StackProps) {
  const stackStyle: ViewStyle = {
    flexDirection: 'column',
    alignItems: align,
    justifyContent: justify,
    gap: baseTokens.spacing[spacing],
    padding: padding ? baseTokens.spacing[padding] : undefined,
  };

  return (
    <View 
      style={[stackStyle, style]} 
      {...props}
    >
      {children}
    </View>
  );
}
