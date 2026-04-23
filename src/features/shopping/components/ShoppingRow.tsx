import React, { useCallback } from "react";
import ListItem from "@/components/ListItem";
import type { EntityId } from "@/features/tasks/types";

interface ShoppingRowProps {
  id: EntityId; // ✅ FIX
  name: string;
  done: boolean;
  onToggle: (id: EntityId) => void; // ✅ FIX
}

const ShoppingRowComponent = ({
  id,
  name,
  done,
  onToggle,
}: ShoppingRowProps) => {
  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [onToggle, id]);

  return (
    <ListItem
      label={name}
      checked={done}
      onToggle={handleToggle}
    />
  );
};

export const ShoppingRow = React.memo(ShoppingRowComponent);