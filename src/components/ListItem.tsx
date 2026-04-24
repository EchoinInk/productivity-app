import clsx from "clsx";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { UIText } from "@/components/ui/Text";
import type { ReactNode } from "react";

interface ListItemProps {
  label: ReactNode; // ✅ FIXED
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
    >
      {/* LABEL */}
      <UIText.Body
        className={clsx(
          "font-semibold transition-all",
          checked && "opacity-50"
        )}
        style={{ color: style.text }}
      >
        {label}
      </UIText.Body>

      {/* META */}
      <div className="mt-1 flex flex-col gap-1">
        {subtitle && (
          <UIText.Meta className="leading-tight">
            {subtitle}
          </UIText.Meta>
        )}

        {category && (
          <span
            className="
              inline-block
              w-fit
              px-2 py-0.5
              rounded-full
              text-xs font-medium
            "
            style={{
              backgroundColor: style.bg,
              color: style.text,
            }}
          >
            {category}
          </span>
        )}
      </div>
    </CheckboxRow>
  );
};

export default ListItem;