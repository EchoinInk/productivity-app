import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createId } from "@/shared/lib/id";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import { useActivityStore } from "@/features/activity/useActivityStore";
import { createActivityEvent } from "@/features/activity/activity.utils";

import type {
  CreateShoppingItemInput,
  ShoppingItem,
} from "@/features/shopping/types/types";
import type { EntityId } from "@/features/tasks/types/types";

interface ShoppingState {
  shoppingItems: ShoppingItem[];
  addShoppingItem: (input: CreateShoppingItemInput) => void;
  toggleShoppingItem: (id: EntityId) => void;
}

export const useShoppingStore = create<ShoppingState>()(
  persist(
    (set) => ({
      shoppingItems: [],

      addShoppingItem: (input) =>
        set((state) => {
          // Track activity
          useActivityStore.getState().addEvent(
            createActivityEvent("shopping_item_added", `Added shopping item: ${input.name}`)
          );

          return {
            shoppingItems: [
              {
                id: createId(),
                name: input.name,
                category: input.category,
                done: false,
              },
              ...state.shoppingItems,
            ],
          };
        }),

      toggleShoppingItem: (id) =>
        set((state) => ({
          shoppingItems: state.shoppingItems.map((item) =>
            item.id === id
              ? { ...item, done: !item.done }
              : item
          ),
        })),
    }),
    {
      name: "shopping",
      version: STORE_VERSION,
      storage: createNamespacedStorage<
        Pick<ShoppingState, "shoppingItems">
      >(["shoppingItems"]),
      partialize: (state) => ({
        shoppingItems: state.shoppingItems,
      }),
    },
  ),
);
