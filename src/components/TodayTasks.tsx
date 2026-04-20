import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

interface Props {
  selectedDate: string; // YYYY-MM-DD
}

const TodayTasks = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);
  const navigate = useNavigate();

  // ✅ FILTER TASKS FOR SELECTED DATE
  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  // ✅ GROUP BY CATEGORY
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

  // ✅ SORT CATEGORIES BY COUNT (DESC)
  const categoryList = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  const isSingleCategory = categoryList.length === 1;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-lg text-muted-foreground">Tasks by category</p>
        </div>

        <button onClick={() => navigate(`/tasks?date=${selectedDate}`)} className="text-xs font-medium text-primary">
          View All →
        </button>
      </div>

      {/* SINGLE CATEGORY HINT */}
      {isSingleCategory && <p className="text-xs text-muted-foreground mb-2">All tasks are in one category</p>}

      {/* CATEGORY LIST */}
      <ul className="divide-y divide-foreground/[0.06]">
        {categoryList.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">No tasks today</li>
        ) : (
          categoryList.map(([category, count]) => (
            <li
              key={category}
              onClick={() => navigate(`/tasks?date=${selectedDate}&category=${encodeURIComponent(category)}`)}
              className="py-3 px-2 rounded-lg cursor-pointer hover:bg-white/40 active:scale-[0.98] transition"
            >
              <div className="flex items-center justify-between">
                {/* LEFT */}
                <div>
                  <p className="text-sm font-semibold text-foreground">{category}</p>
                  <p className="text-xs text-muted-foreground">
                    {count} {count === 1 ? "task" : "tasks"}
                  </p>
                </div>

                {/* RIGHT ARROW */}
                <span className="text-muted-foreground">→</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default TodayTasks;
