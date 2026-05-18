import React from 'react';
import { View, ViewStyle, StyleSheet, Modal } from 'react-native';
import { baseTokens } from '../../theme';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Button } from '../Button';
import { EnergyMode } from '../../theme/types';

export interface CaptureSheetProps {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  energyMode?: EnergyMode;
  children?: React.ReactNode;
}

export function CaptureSheet({
  visible,
  onClose,
  title,
  energyMode = 'normal',
  children,
}: CaptureSheetProps) {
  const overlayStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'black',
    opacity: baseTokens.surface.overlayOpacity,
  };
  
  const sheetStyle: ViewStyle = {
    backgroundColor: baseTokens.surface.card,
    borderTopLeftRadius: baseTokens.radii.xl,
    borderTopRightRadius: baseTokens.radii.xl,
    paddingBottom: baseTokens.spacing.xxxl,
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType={energyMode === 'overwhelmed' ? 'none' : 'slide'}
      onRequestClose={onClose}
    >
      <View style={StyleSheet.absoluteFill}>
        <View style={overlayStyle} onTouchStart={onClose} />
        <View style={sheetStyle}>
          <Stack spacing="lg" padding="xl">
            <View style={styles.header}>
              <View style={styles.handle} />
              {title && (
                <Text variant="heading" style={styles.title}>
                  {title}
                </Text>
              )}
            </View>
            {children}
            {energyMode !== 'overwhelmed' && onClose && (
              <Button
                title="Close"
                variant="secondary"
                onPress={onClose}
                style={styles.closeButton}
              />
            )}
          </Stack>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: baseTokens.spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: baseTokens.color.border.medium,
    borderRadius: 2,
    marginBottom: baseTokens.spacing.lg,
  },
  title: {
    textAlign: 'center',
  },
  closeButton: {
    marginTop: baseTokens.spacing.md,
  },
});
