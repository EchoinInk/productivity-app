import { useMemo } from "react";
import { useShoppingStore } from "../store/useShoppingStore";
import { selectItemsByCategory, selectAllShoppingItems, selectToggleShoppingItem } from "../selectors/shoppingSelectors";
import type { ShoppingCategory } from "../types";

export const useShoppingList = (category: ShoppingCategory) => {
  const items = useShoppingStore(selectAllShoppingItems);
  const toggleItem = useShoppingStore(selectToggleShoppingItem);

  const filteredItems = useMemo(
    () => selectItemsByCategory(category)(items),
    [items, category]
  );

  return {
    items: filteredItems,
    toggleItem,
  };
};