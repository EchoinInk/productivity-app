import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { getTodayCategorySummaries } from "@/features/tasks/selectors/taskSelectors";
import { Card } from "@/components/ui/Card";

interface Props {
  selectedDate: string;
}

const TodayTasks = ({ selectedDate }: Props) => {
  const tasks = useTasksStore((s) => s.tasks);
  const navigate = useNavigate();
  const categoryList = getTodayCategorySummaries(tasks, selectedDate);

  return (
    <Card className="px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[17px] font-semibold text-secondary-foreground">Tasks by category</p>
        <button
          type="button"
          onClick={() => navigate(`/tasks?date=${selectedDate}`)}
          className="text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          View All →
        </button>
      </div>
      <ul className="divide-y divide-border/60">
        {categoryList.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">No tasks today</li>
        ) : (
          categoryList.map(({ category, active, total, completed }) => {
            const config = getCategoryMetadata(category);
            const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
            const radius = 16;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (percent / 100) * circumference;

            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => navigate(`/tasks?date=${selectedDate}&category=${encodeURIComponent(category)}`)}
                  className="w-full py-3 px-2 rounded-lg cursor-pointer hover:bg-muted active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: config.bg }}
                      >
                        <img src={config.icon} alt="" className="w-5 h-5 object-contain opacity-90" />
                      </div>
                      <div className="text-left">
                        <p className="text-[12px] font-medium text-foreground">{category}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {active} {active === 1 ? "task" : "tasks"}
                        </p>
                      </div>
                    </div>
                    <div className="relative w-10 h-10" aria-label={`${percent}% complete`}>
                      <svg width="40" height="40" aria-hidden="true">
                        <circle
                          stroke="hsl(var(--muted))"
                          fill="transparent"
                          strokeWidth="3"
                          r={radius}
                          cx="20"
                          cy="20"
                        />
                        <circle
                          stroke={config.text}
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-semibold">{percent}%</span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </Card>
  );
};

export default TodayTasks;
