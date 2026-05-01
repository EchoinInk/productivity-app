import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import { ActivityEvent } from "./activity.types";

type ActivityState = {
  events: ActivityEvent[];
  addEvent: (event: ActivityEvent) => void;
  clearEvents: () => void;
};

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [event, ...state.events].slice(0, 50), // limit history
        })),
      clearEvents: () => set({ events: [] }),
    }),
    {
      name: "activity",
      version: STORE_VERSION,
      storage: createNamespacedStorage<Pick<ActivityState, "events">>(["events"]),
      partialize: (state) => ({
        events: state.events,
      }),
    }
  )
);
