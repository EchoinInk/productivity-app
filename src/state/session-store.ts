import { create } from 'zustand';

interface SessionStore {
  lastOpened: string | null;
  onboardingComplete: boolean;
  loadSession: () => void;
  persistSession: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  lastOpened: null,
  onboardingComplete: false,
  loadSession: () => {
    // TODO: Implement storage loading
  },
  persistSession: () => {
    // TODO: Implement storage persistence
  },
}));
