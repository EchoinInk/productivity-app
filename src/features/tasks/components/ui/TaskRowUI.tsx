import { memo } from "react";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Body, BodyMuted } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/api";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  category: string | null;
  onToggleTask: () => void;
  onSelectTask: () => void;
};

export const TaskRowUI = memo((props: Props) => {
  const { title, subtitle, isCompleted, category, onToggleTask, onSelectTask } = props;

  const categoryMeta = category ? getCategoryMetadata(category) : null;

  return (
    <div 
      className="flex items-center gap-3 py-2.5 rounded-lg hover:bg-muted/40 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={onSelectTask}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectTask();
        }
      }}
    >
      <Checkbox
        checked={isCompleted}
        onCheckedChange={onToggleTask}
        onClick={(e) => e.stopPropagation()}
      />
      
      <div className="flex-1 min-w-0">
        <Body 
          weight="medium" 
          truncate
          className={isCompleted ? "opacity-50 line-through" : ""}
        >
          {title}
        </Body>
        {subtitle && (
          <BodyMuted className="text-xs mt-0.5">
            {subtitle}
          </BodyMuted>
        )}
      </div>

      {categoryMeta && (
  <div className="shrink-0">
    <div
      className="
        w-7 h-7 
        rounded-lg 
        flex items-center justify-center 
        bg-white/60 backdrop-blur-sm
        border border-white/40
      "
      style={{ backgroundColor: categoryMeta.bg }}
    >
      <img
        src={categoryMeta.icon}
        alt=""
        className="w-4 h-4 object-contain"
      />
    </div>
  </div>
)}
    </div>
  );
});