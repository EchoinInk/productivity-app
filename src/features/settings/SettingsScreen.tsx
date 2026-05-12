import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useUiStore } from '../../state/ui-store';
import { useSessionStore } from '../../state/session-store';
import { emit } from '../../orchestration/events';
import { Screen } from '../../primitives/Screen';

export function SettingsScreen() {
  const { lowEnergy, toggleLowEnergy } = useUiStore();
  const { lastOpened } = useSessionStore();

  const handleToggle = () => {
    toggleLowEnergy();
    if (!lowEnergy) {
      emit({ type: 'LOW_ENERGY_ENABLED' });
    } else {
      emit({ type: 'LOW_ENERGY_DISABLED' });
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Low Energy Mode</Text>
          <Switch value={lowEnergy} onValueChange={handleToggle} />
        </View>
        <Text>Last Opened: {lastOpened || 'Never'}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
