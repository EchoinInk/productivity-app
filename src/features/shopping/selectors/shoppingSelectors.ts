import type { ShoppingItem, ShoppingCategory } from "../types";

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
export const selectAddShoppingItem = (s: { shoppingItems: ShoppingItem[]; addShoppingItem: (input: any) => void }) => s.addShoppingItem;
export const selectToggleShoppingItem = (s: { shoppingItems: ShoppingItem[]; toggleShoppingItem: (id: any) => void }) => s.toggleShoppingItem;