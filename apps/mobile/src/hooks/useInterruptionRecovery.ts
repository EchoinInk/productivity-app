import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useUiStore } from '../state/ui-store';
import { useTaskStore } from '../state/task-store';
import { useHapticFeedback } from './useHapticFeedback';
import { EnergyMode } from '../theme/types';

export function useInterruptionRecovery(energyMode: EnergyMode) {
  const { setAppState, checkInterruption, markActive } = useUiStore();
  const { recoverInterruptedState, draftTask } = useTaskStore();
  const { triggerHaptic } = useHapticFeedback();
  const hasRecovered = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Check for interruption on mount
    if (checkInterruption() && !hasRecovered.current) {
      handleRecovery();
      hasRecovered.current = true;
    }

    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    setAppState(nextAppState);

    if (nextAppState === 'active' && checkInterruption()) {
      handleRecovery();
    }

    if (nextAppState === 'active') {
      markActive();
    }
  };

  const handleRecovery = () => {
    // Trigger recovery haptic
    triggerHaptic('recovery', energyMode);
    
    // Recover interrupted state from task store
    recoverInterruptedState();
    
    // Log recovery for debugging
    console.log('Interruption recovery triggered');
  };

  const handleBeforeCapture = () => {
    markActive();
  };

  const handleAfterCapture = () => {
    markActive();
  };

  return {
    handleBeforeCapture,
    handleAfterCapture,
    isRecovering: checkInterruption(),
  };
}
