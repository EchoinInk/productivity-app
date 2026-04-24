import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { ListItemBase } from "@/components/ui/ListItemBase";
import { UIText } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";

import type { ReactNode } from "react";

interface ListItemProps {
  label: ReactNode;
  subtitle?: string;
  checked?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  rightContent?: ReactNode;
  category?: string;
}

const ListItem = ({
  label,
  subtitle,
  checked,
  onToggle,
  onClick,
  rightContent,
  category,
}: ListItemProps) => {
  const style = getCategoryMetadata(category);

  return (
    <CheckboxRow
      checked={checked}
      onToggle={onToggle}
      onClick={onClick}
      rightContent={rightContent}
      className="rounded-lg px-2 py-2"
    >
      <ListItemBase
        label={
          <UIText.Body className="font-medium">
            {label}
          </UIText.Body>
        }
        subtitle={
          subtitle && (
            <UIText.Meta className="text-muted-foreground">
              {subtitle}
            </UIText.Meta>
          )
        }
        left={
          category && (
            <div
              className="w-1 h-full rounded-full"
              style={{ backgroundColor: style.text }}
            />
          )
        }
      />
    </CheckboxRow>
  );
};

export default ListItem;