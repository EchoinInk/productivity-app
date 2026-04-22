import clsx from "clsx";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { CheckboxRow } from "@/shared/ui/CheckboxRow";

interface ListItemProps {
  label: string;
  subtitle?: string;
  checked?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  rightContent?: React.ReactNode;
  category?: string;
}

const ListItem = ({ label, subtitle, checked, onToggle, onClick, rightContent, category }: ListItemProps) => {
  const style = getCategoryMetadata(category);

  return (
    <CheckboxRow checked={checked} onToggle={onToggle} onClick={onClick} rightContent={rightContent}>
      <p className={clsx("text-sm font-semibold transition-all", checked && "line-through opacity-50")} style={{ color: style.text }}>
        {label}
      </p>
      <div className="mt-1 flex flex-col gap-1">
        {subtitle && <p className="text-xs text-muted-foreground leading-tight">{subtitle}</p>}
        {category && (
          <span className="inline-block w-fit text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: style.bg, color: style.text }}>
            {category}
          </span>
        )}
      </div>
    </CheckboxRow>
  );
};

export default ListItem;
