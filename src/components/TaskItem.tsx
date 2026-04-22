import clsx from "clsx";
import checkmark from "@/assets/icons/checkmark.svg";

interface TaskItemProps {
  label: string;
  done: boolean;
  onToggle: () => void;
}

const TaskItem = ({ label, done, onToggle }: TaskItemProps) => {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-3 py-3.5 text-left active:opacity-70 transition">
      {done ? (
        <img src={checkmark} alt="" className="w-6 h-6 shrink-0" />
      ) : (
        <span className="w-6 h-6 shrink-0 rounded-md border-2 border-muted-foreground/30" />
      )}
      <span
        className={clsx(
          "text-[15px] font-medium transition-colors",
          done
            ? "text-muted-foreground/70 line-through decoration-muted-foreground/50 decoration-2"
            : "text-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default TaskItem;
