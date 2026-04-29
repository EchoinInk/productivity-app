import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createId } from "@/shared/lib/id";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";

import type {
  CreateShoppingItemInput,
  ShoppingItem,
  ShoppingCategory,
} from "@/features/shopping/types";
import type { EntityId } from "@/features/tasks/types";

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
        set((state) => ({
          shoppingItems: [
            {
              id: createId(),
              name: input.name,
              category: input.category,
              done: false,
            },
            ...state.shoppingItems,
          ],
        })),

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

export const selectItemsByCategory =
  (category: ShoppingCategory) =>
  (items: ShoppingItem[]) =>
    items.filter((item) => item.category === category);

export const selectCompletedItems = (items: ShoppingItem[]) =>
  items.filter((item) => item.done);

export const selectPendingItems = (items: ShoppingItem[]) =>
  items.filter((item) => !item.done);
