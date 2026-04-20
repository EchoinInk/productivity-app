import ListItem from "@/components/ListItem";
import { useAppStore } from "@/store/useAppStore";

const TodayTasks = ({ selectedDate }: { selectedDate: string }) => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);

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
    <div>
      {filtered.map((t) => {
        const done = t.completedDates?.includes(selectedDate);

        return <ListItem key={t.id} label={t.label} checked={done} onToggle={() => toggleTask(t.id, selectedDate)} />;
      })}
    </div>
  );
};

export default TodayTasks;
