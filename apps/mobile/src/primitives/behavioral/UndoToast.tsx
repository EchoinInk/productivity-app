import React, { useEffect, useState } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { baseTokens } from '../../theme';
import { Surface } from '../Surface';
import { Text } from '../Text';
import { Button } from '../Button';
import { EnergyMode } from '../../theme/types';

export interface UndoToastProps {
  visible: boolean;
  message: string;
  onUndo?: () => void;
  onDismiss?: () => void;
  energyMode?: EnergyMode;
  autoHideDuration?: number;
}

export function UndoToast({
  visible,
  message,
  onUndo,
  onDismiss,
  energyMode = 'normal',
  autoHideDuration = 4000,
}: UndoToastProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      if (autoHideDuration > 0 && energyMode !== 'overwhelmed') {
        const timer = setTimeout(() => {
          onDismiss?.();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => setShouldRender(false), 150);
      return () => clearTimeout(timer);
    }
  }, [visible, energyMode, autoHideDuration, onDismiss]);
  
  const containerStyle: ViewStyle = {
    position: 'absolute',
    bottom: baseTokens.spacing.xxl,
    left: baseTokens.spacing.lg,
    right: baseTokens.spacing.lg,
    zIndex: baseTokens.zIndex.toast,
  };
  
  if (!shouldRender) return null;
  
  return (
    <View style={containerStyle}>
      <Surface
        variant="elevated"
        shadow="lg"
        radius="lg"
        padding="lg"
        energyMode={energyMode}
      >
        <View style={styles.content}>
          <Text variant="body" style={styles.message}>
            {message}
          </Text>
          {onUndo && energyMode !== 'overwhelmed' && (
            <Button
              title="Undo"
              variant="ghost"
              size="sm"
              onPress={() => {
                onUndo();
                onDismiss?.();
              }}
              style={styles.undoButton}
            />
          )}
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: baseTokens.spacing.md,
  },
  message: {
    flex: 1,
  },
  undoButton: {
    marginLeft: baseTokens.spacing.md,
  },
});
