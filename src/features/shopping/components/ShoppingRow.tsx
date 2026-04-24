import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { ListItemBase } from "@/components/ui/ListItemBase";
import { UIText } from "@/components/ui/Text";

import type { ShoppingItem } from "@/features/shopping/types";

interface ShoppingRowProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
}

export const ShoppingRow = ({ item, onToggle }: ShoppingRowProps) => {
  return (
    <CheckboxRow
      checked={item.done}
      onToggle={() => onToggle(item.id)}
      className="
        rounded-lg
        px-2 py-2
        transition-all duration-200
        active:scale-[0.98]
      "
    >
      <ListItemBase
        label={
          <UIText.Micro
            className={item.done ? "line-through opacity-50" : ""}
          >
            {item.name}
          </UIText.Micro>
        }
      />
    </CheckboxRow>
  );
};