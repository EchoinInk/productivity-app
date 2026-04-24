import clsx from "clsx";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { UIText } from "@/components/ui/Text";
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
      className="
        rounded-lg
        px-2 py-2
        transition-all duration-200
        active:scale-[0.98]
      "
    >
      <div className="flex items-stretch gap-2 w-full">
        {/* CATEGORY COLOR BAR */}
        {category && (
          <div
            className="w-1 rounded-full"
            style={{ backgroundColor: style.text }}
          />
        )}

        <div className="flex-1">
          {/* LABEL */}
          <UIText.Body
            className={clsx(
              "font-medium transition-all duration-200",
              checked && "opacity-50"
            )}
            style={{ color: style.text }}
          >
            {label}
          </UIText.Body>

          {/* META */}
          {(subtitle || category) && (
            <div className="mt-1 flex items-center flex-wrap gap-2">
              {subtitle && (
                <UIText.Meta className="leading-tight text-muted-foreground">
                  {subtitle}
                </UIText.Meta>
              )}

              {category && (
                <span
                  className="
                    inline-flex items-center
                    px-2.5 py-0.5
                    rounded-full
                    text-[11px] font-medium
                    backdrop-blur-sm
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
          )}
        </div>
      </div>
    </CheckboxRow>
  );
};

export default ListItem;