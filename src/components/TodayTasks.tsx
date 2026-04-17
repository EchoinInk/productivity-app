import TaskItem from "./TaskItem";
import moreIcon from "@/assets/icons/more-vertical.svg";
import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

const TodayTasks = () => {
  const tasks = useAppStore((s) => s.tasks).filter((t) => t.category === "Today");
  const toggleTask = useAppStore((s) => s.toggleTask);

  // Fallback demo content matching mockup if store is empty
  const demo = [
    { id: -1, label: "Grocery Shopping", done: true },
    { id: -2, label: "Call the plumber", done: true },
    { id: -3, label: "Pay electric bill", done: true },
  ];
  const items = tasks.length ? tasks : demo;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[16px] font-bold text-foreground">Today's Tasks</h2>
        <button aria-label="More" className="p-1 -mr-1">
          <img src={moreIcon} alt="" className="w-5 h-5" />
        </button>
      </div>

      <ul className="divide-y divide-foreground/[0.06]">
        {items.map((t) => (
          <li key={t.id}>
            <TaskItem
              label={t.label}
              done={t.done}
              onToggle={() => t.id > 0 && toggleTask(t.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodayTasks;
