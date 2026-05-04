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

  const filteredItems = selectItemsByCategory(category)(items);

  return {
    items: filteredItems,
    toggleItem,
  };
};

export const useShopping = () => {
  const items = useShoppingStore((state) => state.shoppingItems);
  const addShoppingItem = useShoppingStore((state) => state.addShoppingItem);
  const toggleShoppingItem = useShoppingStore((state) => state.toggleShoppingItem);

  const completedItems = selectCompletedItems(items);
  const pendingItems = selectPendingItems(items);

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