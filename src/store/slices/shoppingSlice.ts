import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import type { CreateShoppingItemInput, ShoppingItem } from "@/features/shopping/types";
import type { EntityId } from "@/features/tasks/types";
import type { AppState } from "@/store/rootStore";

export interface ShoppingSlice {
  shoppingItems: ShoppingItem[];
  addShoppingItem: (input: CreateShoppingItemInput) => void;
  toggleShoppingItem: (id: EntityId) => void;
}

export const createShoppingSlice: StateCreator<AppState, [], [], ShoppingSlice> = (set) => ({
  shoppingItems: [],
  addShoppingItem: (input) => set((state) => ({ shoppingItems: [{ id: createId(), ...input, done: false }, ...state.shoppingItems] })),
  toggleShoppingItem: (id) =>
    set((state) => ({ shoppingItems: state.shoppingItems.map((item) => (item.id === id ? { ...item, done: !item.done } : item)) })),
});
