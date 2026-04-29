import { useMemo } from "react";
import { useShoppingStore, selectItemsByCategory } from "../store/useShoppingStore";
import type { ShoppingCategory } from "../types";

export const useShoppingList = (category: ShoppingCategory) => {
  const items = useShoppingStore((state) => state.shoppingItems);
  const toggleItem = useShoppingStore((state) => state.toggleShoppingItem);

  const filteredItems = useMemo(
    () => selectItemsByCategory(category)(items),
    [items, category]
  );

  return {
    items: filteredItems,
    toggleItem,
  };
};