import type { EntityId } from "@/features/tasks/types";

export type ShoppingCategory = "Groceries" | "Household";

export interface ShoppingItem {
  id: EntityId; // ✅ FIX (not string)
  name: string;
  done: boolean;
  category: ShoppingCategory;
}

export interface CreateShoppingItemInput {
  name: string;
  category: ShoppingCategory; // ✅ REQUIRED
}