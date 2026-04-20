import ListItem from "@/components/ListItem";
import { useAppStore } from "@/store/useAppStore";

interface Props {
  selectedDate: string;
}

const TodayTasks = ({ selectedDate }: Props) => {
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

  if (filtered.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-6">No tasks for this day</div>;
  }

  return (
    <div>
      {filtered.map((t) => {
        const done = t.completedDates.includes(selectedDate);

        return <ListItem key={t.id} label={t.label} checked={done} onToggle={() => toggleTask(t.id, selectedDate)} />;
      })}
    </div>
  );
};

export default TodayTasks;
