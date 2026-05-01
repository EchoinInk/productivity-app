import { memo } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Body, BodyMuted } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/api";
import { cn } from "@/lib/utils";

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
    <motion.div 
      className={cn(
        "flex items-center gap-3 py-2.5 rounded-lg hover:bg-muted/40 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isCompleted && "task-complete"
      )}
      onClick={onSelectTask}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectTask();
        }
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: isCompleted ? 0.7 : 1, 
        scale: isCompleted ? 0.98 : 1 
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
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
          className={cn(
            "transition-all duration-200",
            isCompleted && "opacity-70 line-through"
          )}
        >
          {title}
        </Body>
        {subtitle && (
          <BodyMuted className="text-xs mt-1">
            {subtitle}
          </BodyMuted>
        )}
      </div>

      {categoryMeta && (
  <div className="shrink-0">
    <button
      className="
        w-11 h-11 
        rounded-lg 
        flex items-center justify-center 
        bg-white/60 backdrop-blur-sm
        border border-white/40
        transition-all hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      "
      style={{ backgroundColor: categoryMeta.bg }}
      title={categoryMeta.bg ? "" : "Other"}
      aria-label={`Category: ${category}`}
    >
      <img
        src={categoryMeta.icon}
        srcSet={`${categoryMeta.icon} 1x`}
        sizes="16px"
        alt=""
        width={16}
        height={16}
        loading="lazy"
        className="w-4 h-4 object-contain"
      />
    </button>
  </div>
)}
    </motion.div>
  );
});