import { useMemo } from "react";
import { useShoppingStore } from "../store/useShoppingStore";
import { selectItemsByCategory } from "../selectors/shoppingSelectors";
import type { ShoppingCategory } from "../types";

export const useShoppingList = (category: ShoppingCategory) => {
  const items = useShoppingStore((s) => s.shoppingItems);
  const toggleItem = useShoppingStore((s) => s.toggleShoppingItem);

  const filteredItems = useMemo(
    () => selectItemsByCategory(category)(items),
    [items, category]
  );

  return {
    items: filteredItems,
    toggleItem,
  };
};