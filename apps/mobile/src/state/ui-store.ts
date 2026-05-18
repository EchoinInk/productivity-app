import { create } from 'zustand';
import { AppState, AppStateStatus } from 'react-native';

interface UiStore {
  lowEnergy: boolean;
  toggleLowEnergy: () => void;
  density: 'normal' | 'reduced';
  appState: AppStateStatus;
  lastActiveTime: number;
  wasInterrupted: boolean;
  setAppState: (state: AppStateStatus) => void;
  checkInterruption: () => boolean;
  markActive: () => void;
}

export const useUiStore = create<UiStore>((set, get) => ({
  lowEnergy: false,
  toggleLowEnergy: () => set((state) => ({ lowEnergy: !state.lowEnergy, density: !state.lowEnergy ? 'reduced' : 'normal' })),
  density: 'normal',
  appState: AppState.currentState,
  lastActiveTime: Date.now(),
  wasInterrupted: false,
  setAppState: (state) => {
    const previousState = get().appState;
    const now = Date.now();
    
    // Detect interruption: app went from active to background/inactive for more than 30 seconds
    if (previousState === 'active' && (state === 'background' || state === 'inactive')) {
      set({ lastActiveTime: now });
    } else if ((previousState === 'background' || previousState === 'inactive') && state === 'active') {
      const timeAway = now - get().lastActiveTime;
      const wasInterrupted = timeAway > 30000; // 30 seconds threshold
      set({ wasInterrupted, appState: state, lastActiveTime: now });
    } else {
      set({ appState: state });
    }
  },
  checkInterruption: () => {
    const wasInterrupted = get().wasInterrupted;
    if (wasInterrupted) {
      set({ wasInterrupted: false });
    }
    return wasInterrupted;
  },
  markActive: () => {
    set({ lastActiveTime: Date.now(), wasInterrupted: false });
  },
}));
