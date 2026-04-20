import ListItem from "@/components/ListItem";
import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

interface Props {
  selectedDate: string;
}

const TodayTasks = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const deleteTask = useAppStore((s) => s.deleteTask);

  const filtered = tasks.filter((t) => {
    const taskDate = new Date(t.date);
    const selected = new Date(selectedDate);

    if (!t.recurrence || t.recurrence === "none") {
      return t.date === selectedDate;
    }

    if (t.recurrence === "weekly") {
      return selected >= taskDate && taskDate.getDay() === selected.getDay();
    }

    if (t.recurrence === "monthly") {
      return selected >= taskDate && taskDate.getDate() === selected.getDate();
    }

    return false;
  });

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      <div className="flex justify-between mb-2">
        <h2 className="text-sm font-semibold">Today's Tasks</h2>
        <span className="text-xs">{filtered.filter((t) => !t.completedDates.includes(selectedDate)).length} left</span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">No tasks for this day</p>
      ) : (
        <div className="space-y-1">
          {filtered.map((t) => {
            const done = t.completedDates.includes(selectedDate);

            return (
              <ListItem
                key={t.id}
                label={t.label}
                checked={done}
                onToggle={() => toggleTask(t.id, selectedDate)}
                rightContent={
                  <button onClick={() => deleteTask(t.id)} className="text-xs text-red-400">
                    Delete
                  </button>
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TodayTasks;
