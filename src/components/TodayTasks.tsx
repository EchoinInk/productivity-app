import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

// ✅ ICON IMPORTS
import catHome from "@/assets/categoryIcons/cathome.png";
import catHealth from "@/assets/categoryIcons/cathealth.png";
import catCareer from "@/assets/categoryIcons/catcareer.png";
import catErrands from "@/assets/categoryIcons/caterrands.png";
import catFamily from "@/assets/categoryIcons/catfamily.png";
import catFinance from "@/assets/categoryIcons/catfinance.png";

interface Props {
  selectedDate: string;
}

const TodayTasks = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);
  const navigate = useNavigate();

  // ✅ FILTER TASKS
  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  // ✅ CATEGORY CONFIG
  const categoryConfig = {
    "Home & Household": {
      icon: catHome,
      bg: "#b8fff8", // soft aqua
    },
    "Health & Wellness": {
      icon: catHealth,
      bg: "#e5ccfd", // lavender blue
    },
    "Career Development": {
      icon: catCareer,
      bg: "#d2e1fb", // powder periwinkle
    },
    "Errands & Life Admin": {
      icon: catErrands,
      bg: "#edf2fe", // lavender blush
    },
    "Family & Relationships": {
      icon: catFamily,
      bg: "#fec8f8", // lilac
    },
    Finances: {
      icon: catFinance,
      bg: "#fbe2d1", //rose haze
    },
    Other: {
      icon: catErrands,
      bg: "#F3F5F8",
    },
  } as const;

  // ✅ GROUP
  const grouped = todayTasks.reduce(
    (acc, task) => {
      const category = task.category || "Other";

      if (!acc[category]) acc[category] = 0;
      acc[category]++;

      return acc;
    },
    {} as Record<string, number>,
  );

  // ✅ SORT
  const categoryList = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  const isSingleCategory = categoryList.length === 1;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[17px] font-semibold text-secondary-foreground">Tasks by category</p>

        <button onClick={() => navigate(`/tasks?date=${selectedDate}`)} className="text-xs font-medium text-primary">
          View All →
        </button>
      </div>

      {/* SINGLE CATEGORY HINT */}
      {isSingleCategory && <p className="text-xs text-muted-foreground mb-2">All tasks are in one category</p>}

      {/* LIST */}
      <ul className="divide-y divide-foreground/[0.06]">
        {categoryList.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">No tasks today</li>
        ) : (
          categoryList.map(([category, count]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.Other;

            return (
              <li
                key={category}
                onClick={() => navigate(`/tasks?date=${selectedDate}&category=${encodeURIComponent(category)}`)}
                className="py-3 px-2 rounded-xl cursor-pointer hover:bg-white/40 active:scale-[0.98] transition"
              >
                <div className="flex items-center justify-between">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    {/* ICON */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: config.bg }}
                    >
                      <img src={config.icon} alt={category} className="w-5 h-5 object-contain opacity-90" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{category}</p>
                      <p className="text-xs text-muted-foreground">
                        {count} {count === 1 ? "task" : "tasks"}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <span className="text-muted-foreground">→</span>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default TodayTasks;
