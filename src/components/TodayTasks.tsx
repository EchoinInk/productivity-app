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

  // ✅ COUNT
  const count = todayTasks.length;

  // ✅ DYNAMIC TITLE
  const title = count === 0 ? "No tasks today" : count === 1 ? "1 task today" : `${count} tasks today`;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[16px] font-semibold text-foreground">{title}</h2>
      </div>

      {/* LIST */}
      <ul className="divide-y divide-foreground/[0.06]">
        {todayTasks.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">You're all clear ✨</li>
        ) : (
          todayTasks.map((t) => {
            const done = t.completedDates.includes(selectedDate);

            return (
              <li key={t.id}>
                <ListItem
                  label={t.label}
                  subtitle={t.notes}
                  category={t.category}
                  priority={t.priority}
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
