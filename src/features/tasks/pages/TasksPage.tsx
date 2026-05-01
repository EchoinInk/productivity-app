import { useTasksStore } from "../store/useTasksStore";
import { TaskSection } from "../components/TaskSection";
import { TaskRow } from "../components/TaskRow";
import { getToday } from "@/shared/lib/date";

const TasksPage = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);

  const today = getToday();

  const todayTasks = tasks.filter((t) => t.date === today);

  const incomplete = todayTasks.filter((t) => !t.completed);
  const completed = todayTasks.filter((t) => t.completed);

  const anytime = incomplete.filter((t) => !t.time);

  const morning = incomplete.filter((t) => {
    if (!t.time) return false;
    const hour = Number(t.time.split(":")[0]);
    return hour >= 5 && hour < 12;
  });

  const afternoon = incomplete.filter((t) => {
    if (!t.time) return false;
    const hour = Number(t.time.split(":")[0]);
    return hour >= 12 && hour < 18;
  });

  const evening = incomplete.filter((t) => {
    if (!t.time) return false;
    const hour = Number(t.time.split(":")[0]);
    return hour >= 18;
  });

  return (
    <div className="px-4 space-y-6 pb-24">

      <TaskSection title="Anytime" tasks={anytime} onToggle={toggleTask} />

      <TaskSection title="Morning" tasks={morning} onToggle={toggleTask} />

      <TaskSection title="Afternoon" tasks={afternoon} onToggle={toggleTask} />

      <TaskSection title="Evening" tasks={evening} onToggle={toggleTask} />

      {completed.length > 0 && (
        <div className="pt-4 space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Completed
          </h3>

          {completed.map((task) => (
            <div key={task.id} className="opacity-60">
              <TaskRow task={task} onToggle={toggleTask} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;