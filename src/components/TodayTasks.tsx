import { useNavigate } from "react-router-dom";
import ListItem from "@/components/ListItem";
import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

interface Props {
  selectedDate: string; // YYYY-MM-DD
}

const TodayTasks = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);

  // ✅ 1. DEFINE TODAY TASKS FIRST
  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  // ✅ 2. THEN GROUP THEM
  const grouped = todayTasks.reduce(
    (acc, task) => {
      const category = task.category || "Other";

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category]++;

      return acc;
    },
    {} as Record<string, number>,
  );

  // ✅ 3. THEN CONVERT
  const categoryList = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  // ✅ FILTER HIGH PRIORITY ONLY
  const highPriorityTasks = todayTasks.filter((t) => t.priority === "High");

  // ✅ TAKE TOP 3 (WITH FALLBACK)
  const topTasks = highPriorityTasks.length > 0 ? highPriorityTasks.slice(0, 3) : todayTasks.slice(0, 3);

  const isSingleCategory = categoryList.length === 1;

  const navigate = useNavigate();

  // ✅ HEADER TEXT
  const count = todayTasks.length;

  const headerText = count === 0 ? "You're all clear ✨" : `You have ${count} ${count === 1 ? "task" : "tasks"} today`;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[16px] font-semibold text-foreground">{headerText}</h2>
          <p className="text-xs text-muted-foreground">Tasks by category</p>
        </div>

        <button onClick={() => navigate(`/tasks?date=${selectedDate}`)} className="text-xs font-medium text-primary">
          View All →
        </button>
      </div>

      {/* TASKS */}
      <ul className="divide-y divide-foreground/[0.06]">
        {isSingleCategory && <p className="text-xs text-muted-foreground mt-2">All tasks are in one category</p>}
        {categoryList.map(([category, count]) => (
          <li key={category} className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{category}</p>
                <p className="text-xs text-muted-foreground">
                  {count} {count === 1 ? "task" : "tasks"}
                </p>
              </div>

              <span className="text-muted-foreground">→</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodayTasks;
