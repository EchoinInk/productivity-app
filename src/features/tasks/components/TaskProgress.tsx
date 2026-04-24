import { getToday } from "@/shared/lib/date";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getTaskProgress } from "@/features/tasks/selectors/taskSelectors";
import { UIText } from "@/components/ui/Text";

export const TaskProgress = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const today = getToday();

  const progress = getTaskProgress(tasks, today);

  if (progress.total === 0) return null;

  return (
    <div
      className="
        rounded-xl
        bg-white/60
        backdrop-blur-md
        border border-white/40
        px-3 py-3
        space-y-2
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <UIText.Section>Today Progress</UIText.Section>

        <UIText.Meta>
          {progress.completed}/{progress.total}
        </UIText.Meta>
      </div>

      {/* BAR */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
className="h-full bg-foreground transition-all duration-500 ease-out"          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* FOOTER */}
      <UIText.Meta>
        {progress.percentage === 100
          ? "All tasks completed 🎉"
          : `${progress.percentage}% complete`}
      </UIText.Meta>
    </div>
  );
};