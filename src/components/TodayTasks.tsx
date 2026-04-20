import ListItem from "@/components/ListItem";
import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

interface Props {
  selectedDate: string; // YYYY-MM-DD
}

const TodayTasks = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);

  // ✅ FILTER TASKS FOR SELECTED DATE
  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  // ✅ FILTER HIGH PRIORITY ONLY
  const highPriorityTasks = todayTasks.filter((t) => t.priority === "High");

  // ✅ TAKE TOP 3 (WITH FALLBACK)
  const topTasks = highPriorityTasks.length > 0 ? highPriorityTasks.slice(0, 3) : todayTasks.slice(0, 3);

  // ✅ HEADER TEXT
  const count = todayTasks.length;

  const headerText = count === 0 ? "You're all clear ✨" : `You have ${count} ${count === 1 ? "task" : "tasks"} today`;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[16px] font-semibold text-foreground">{headerText}</h2>
          <p className="text-xs text-muted-foreground">Top priority tasks</p>
        </div>

        <button className="text-xs font-medium text-primary">View All →</button>
      </div>

      {/* TASKS */}
      <ul className="divide-y divide-foreground/[0.06]">
        {topTasks.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">Nothing to show</li>
        ) : (
          topTasks.map((t) => {
            const done = t.completedDates.includes(selectedDate);

            return (
              <li key={t.id}>
                <ListItem
                  label={t.label}
                  subtitle={t.notes}
                  category={t.category}
                  checked={done}
                  onToggle={() => toggleTask(t.id, selectedDate)}
                />
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default TodayTasks;
