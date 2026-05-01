import { Surface } from "@/components/ui/Surface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Heading, Meta } from "@/components/ui/Text";

import { useTasksStore, selectTodayTasks } from "@/features/tasks/store/useTasksStore";

/**
 * Today's progress card. Pure presentation — data
 * comes from the selectTodayTasks selector.
 */
export const TaskProgress = () => {
  const todayTasks = useTasksStore(selectTodayTasks);
  
  const total = todayTasks.length;
  const completed = todayTasks.filter(t => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (total === 0) {
    return (
      <Surface className="space-y-2">
        <div className="flex items-center justify-between">
          <Heading>Today Progress</Heading>
          <Meta>No tasks</Meta>
        </div>
        <ProgressBar value={0} ariaLabel="No tasks progress" />
        <Meta>Enjoy your free day! 🎉</Meta>
      </Surface>
    );
  }

  return (
    <Surface className="space-y-2">
      <div className="flex items-center justify-between">
        <Heading>Today Progress</Heading>

        <Meta>
          {completed}/{total}
        </Meta>
      </div>

      <ProgressBar value={percentage} ariaLabel="Today progress" />

      <Meta>
        {percentage === 100
          ? "All tasks completed 🎉"
          : `${percentage}% complete`}
      </Meta>
    </Surface>
  );
};
