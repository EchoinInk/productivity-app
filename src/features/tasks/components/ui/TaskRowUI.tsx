import { motion } from "framer-motion";
import { memo } from "react";

import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { ListItemBase } from "@/components/ui/ListItemBase";
import { UIText } from "@/components/ui/Text";

type TaskRowUIProps = {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  categoryBackgroundColor: string;
  categoryTextColor: string;
  titleClassName: string;
  subtitleClassName: string;
  categoryBadgeClassName: string;
  categoryIndicatorOpacity: number;
  rowOpacity: number;
  rowScale: number;
  onToggleTask: () => void;
  onSelectTask: () => void;
};

export const TaskRowUI = memo(
  ({
    id,
    title,
    subtitle,
    categoryLabel,
    categoryBackgroundColor,
    categoryTextColor,
    titleClassName,
    subtitleClassName,
    categoryBadgeClassName,
    categoryIndicatorOpacity,
    rowOpacity,
    rowScale,
    onToggleTask,
    onSelectTask,
  }: TaskRowUIProps) => (
    <motion.div
      layout
      layoutId={id}
      initial={false}
      animate={{
        opacity: rowOpacity,
        scale: rowScale,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      <CheckboxRow
        checked={isCompleted}
        onToggle={onToggleTask}
        onClick={onSelectTask}
        className="
          rounded-lg
          px-2 py-2
          transition-all duration-200
          active:scale-[0.98]
        "
      >
        <ListItemBase
          left={
            <div
              className="w-1 h-full rounded-full"
              style={{
                backgroundColor: categoryTextColor,
                opacity: categoryIndicatorOpacity,
              }}
            />
          }
          label={
            <UIText.Micro
              className={titleClassName}
              style={{ color: categoryTextColor }}
            >
              {title}
            </UIText.Micro>
          }
          subtitle={
            <>
              <UIText.Meta className={subtitleClassName}>{subtitle}</UIText.Meta>
              <span
                className={categoryBadgeClassName}
                style={{
                  backgroundColor: categoryBackgroundColor,
                  color: categoryTextColor,
                }}
              >
                {categoryLabel}
              </span>
            </>
          }
        />
      </CheckboxRow>
    </motion.div>
  ),
);

TaskRowUI.displayName = "TaskRowUI";
