import { useMemo } from "react";
import { useShoppingStore } from "../store/useShoppingStore";
import { 
  selectItemsByCategory, 
  selectCompletedItems, 
  selectPendingItems 
} from "../selectors/shoppingSelectors";
import type { ShoppingCategory } from "../types/types";

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

export const useShopping = () => {
  const items = useShoppingStore((state) => state.shoppingItems);
  const addShoppingItem = useShoppingStore((state) => state.addShoppingItem);
  const toggleShoppingItem = useShoppingStore((state) => state.toggleShoppingItem);

  const completedItems = useMemo(
    () => selectCompletedItems(items),
    [items]
  );

  const pendingItems = useMemo(
    () => selectPendingItems(items),
    [items]
  );

  return {
    items,
    completedItems,
    pendingItems,
    actions: {
      addShoppingItem,
      toggleShoppingItem,
    },
  };
};