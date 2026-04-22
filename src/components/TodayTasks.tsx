import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { Card } from "@/shared/ui/Card";

interface TodayTasksProps {
  selectedDate: string;
}

const TodayTasks = ({ selectedDate }: TodayTasksProps) => {
  const tasks = useAppStore((s) => s.tasks);

  const categories = useMemo(() => getCategoryMetadata(tasks), [tasks]);

  return (
    <Card className="px-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-semibold text-foreground">Tasks by category</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All →</button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between">
            {/* ICON TILE */}
            <div
              className="
                w-10 h-10 rounded-xl flex items-center justify-center
                shadow-sm transition-transform duration-150
                hover:scale-[1.04]
              "
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.55))",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)",
              }}
            >
              <img
                src={cat.icon}
                alt=""
                className="
                  w-5 h-5 opacity-90
                  drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]
                "
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(20%) sepia(20%) saturate(600%) hue-rotate(220deg) brightness(95%) contrast(90%)",
                }}
              />
            </div>

            {/* LABEL + COUNT */}
            <div className="flex-1 ml-3">
              <p className="text-[14px] font-medium text-foreground">{cat.name}</p>
              <p className="text-[11px] opacity-90 mt-1 italic tracking-[0.2px]">
                {cat.completed} / {cat.total} completed
              </p>
            </div>

            {/* PROGRESS CIRCLE */}
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="rgba(0,0,0,0.08)" strokeWidth="4" fill="none" />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="hsl(220 80% 56%)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - cat.ratio)}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-foreground">
                {Math.round(cat.ratio * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TodayTasks;
