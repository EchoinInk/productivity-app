import type { ShoppingItem, ShoppingCategory } from "../types";

export const selectItemsByCategory =
  (category: ShoppingCategory) =>
  (items: ShoppingItem[]) =>
    items.filter((item) => item.category === category);

export const selectCompletedItems = (items: ShoppingItem[]) =>
  items.filter((item) => item.done);

export const selectPendingItems = (items: ShoppingItem[]) =>
  items.filter((item) => !item.done);