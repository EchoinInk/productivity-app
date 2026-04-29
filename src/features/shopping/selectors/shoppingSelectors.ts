import type { ShoppingItem, ShoppingCategory, CreateShoppingItemInput } from "../types";
import type { EntityId } from "@/features/tasks/types";

export const selectAllShoppingItems = (state: { shoppingItems: ShoppingItem[] }) => state.shoppingItems;

export const selectItemsByCategory =
  (category: ShoppingCategory) =>
  (items: ShoppingItem[]) =>
    items.filter((item) => item.category === category);

export const selectCompletedItems = (items: ShoppingItem[]) =>
  items.filter((item) => item.done);

export const selectPendingItems = (items: ShoppingItem[]) =>
  items.filter((item) => !item.done);

/** Action selectors — keep references stable across renders. */
export const selectAddShoppingItem = (s: { shoppingItems: ShoppingItem[]; addShoppingItem: (input: CreateShoppingItemInput) => void }) => s.addShoppingItem;
export const selectToggleShoppingItem = (s: { shoppingItems: ShoppingItem[]; toggleShoppingItem: (id: EntityId) => void }) => s.toggleShoppingItem;