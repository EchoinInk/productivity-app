import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { darken } from "@/utils/color";

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

  // ❗ IMPORTANT: we need ALL tasks for progress (not filtered)
  const allTodayTasks = tasks.filter((t) => t.date === selectedDate);

  // ✅ ONLY ACTIVE TASKS (for display count)
  const todayTasks = allTodayTasks.filter((t) => !t.completedDates.includes(selectedDate));

  // ✅ CATEGORY CONFIG
  const categoryConfig = {
    "Home & Household": { icon: catHome, bg: "#f2f7fe" },
    "Health & Wellness": { icon: catHealth, bg: "#fcf2f4" },
    "Career Development": { icon: catCareer, bg: "#f8f7f4" },
    "Errands & Life Admin": { icon: catErrands, bg: "#f5fcfe" },
    "Family & Relationships": { icon: catFamily, bg: "#fef0fc" },
    Finances: { icon: catFinance, bg: "#ececf7" },
    Other: { icon: catErrands, bg: "#F3F5F8" },
  } as const;

  // ✅ GROUP (ONLY ACTIVE TASKS)
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

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[17px] font-semibold text-secondary-foreground">Tasks by category</p>

        <button onClick={() => navigate(`/tasks?date=${selectedDate}`)} className="text-xs font-medium text-primary">
          View All →
        </button>
      </div>

      {/* LIST */}
      <ul className="divide-y divide-foreground/[0.06]">
        {categoryList.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">No tasks today</li>
        ) : (
          categoryList.map(([category, count]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.Other;

            // ✅ CALCULATE PROGRESS (ALL TASKS)
            const categoryTasks = allTodayTasks.filter((t) => (t.category || "Other") === category);

            const total = categoryTasks.length;

            const completed = categoryTasks.filter((t) => t.completedDates.includes(selectedDate)).length;

            const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

            // ✅ SVG math
            const radius = 16;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (percent / 100) * circumference;

            return (
              <li
                key={category}
                onClick={() => navigate(`/tasks?date=${selectedDate}&category=${encodeURIComponent(category)}`)}
                className="py-3 px-2 rounded-xl cursor-pointer hover:bg-white/40 active:scale-[0.98] transition"
              >
                <div className="flex items-center justify-between">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    {/* ICON */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: config.bg }}
                    >
                      <img src={config.icon} alt={category} className="w-5 h-5 object-contain opacity-90" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <p className="text-[12px] font-medium text-foreground">{category}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {count} {count === 1 ? "task" : "tasks"}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT — PROGRESS RING */}
                  <div className="relative w-10 h-10">
                    <svg width="40" height="40">
                      {/* BG */}
                      <circle
                        stroke={config.bg}
                        strokeOpacity={0.6}
                        fill="transparent"
                        strokeWidth="3"
                        r={radius}
                        cx="20"
                        cy="20"
                      />

                      {/* PROGRESS */}
                      <circle
                        stroke={darken(config.bg, 0.25)}
                        strokeOpacity={0.7}
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        r={radius}
                        cx="20"
                        cy="20"
                        transform="rotate(-90 20 20)"
                      />
                    </svg>

                    {/* TEXT */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-semibold">{percent}%</span>
                    </div>
                  </div>
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
