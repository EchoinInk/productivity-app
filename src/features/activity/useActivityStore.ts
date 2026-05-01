import { create } from "zustand";
import { ActivityEvent } from "./activity.types";

type ActivityState = {
  events: ActivityEvent[];
  addEvent: (event: ActivityEvent) => void;
  clearEvents: () => void;
};

export const useActivityStore = create<ActivityState>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events].slice(0, 50), // limit history
    })),
  clearEvents: () => set({ events: [] }),
}));
