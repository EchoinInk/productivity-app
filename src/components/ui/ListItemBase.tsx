import clsx from "clsx";
import type { ReactNode } from "react";

interface ListItemBaseProps {
  label: ReactNode;
  subtitle?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export const ListItemBase = ({
  label,
  subtitle,
  left,
  right,
  className,
}: ListItemBaseProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 w-full",
        className
      )}
    >
      {/* LEFT SLOT (checkbox / color bar / icon) */}
      {left && <div className="flex-shrink-0">{left}</div>}

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="truncate">{label}</div>

        {subtitle && (
          <div className="mt-1">{subtitle}</div>
        )}
      </div>

      {/* RIGHT SLOT */}
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
};