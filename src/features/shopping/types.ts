import type { EntityId } from "@/features/tasks/types";

export interface ShoppingItem {
  id: EntityId;
  name: string;
  done: boolean;
}

export interface CreateShoppingItemInput {
  name: string;
}
