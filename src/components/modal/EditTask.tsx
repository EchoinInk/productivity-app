import { useState, useEffect } from "react";
import AppCard from "@/components/AppCard";
import type { Task } from "@/store/useAppStore";
import clsx from "clsx";

interface Props {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updated: Task) => void;
  onDelete: () => void;
}

const EditTask = ({ open, onClose, task, onSave, onDelete }: Props) => {
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<Task["category"] | "">("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly" | "">("");

  useEffect(() => {
    if (!task) return;

    setLabel(task.label);
    setNotes(task.notes ?? "");
    setCategory(task.category ?? "");
    setDate(task.date);
    setTime(task.time ?? "");
    setRecurrence(task.recurrence ?? "");
  }, [task]);

  if (!open || !task) return null;

  const canSave = label.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">Edit Task</h2>

          {/* NAME */}
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="w-full h-11 px-4 rounded-xl bg-white/60 border border-white/40 text-sm"
          />

          {/* NOTES */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/60 border border-white/40 text-sm resize-none"
          />

          {/* DATE + TIME */}
          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
            />
          </div>

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className={clsx(
              "w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm",
              !category && "text-muted-foreground",
            )}
          >
            <option value="" disabled>
              Category
            </option>
            <option>Home & Household</option>
            <option>Health & Wellness</option>
            <option>Career Development</option>
            <option>Errands & Life Admin</option>
            <option>Family & Relationships</option>
            <option>Finances</option>
          </select>

          {/* RECURRING */}
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as any)}
            className={clsx(
              "w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm",
              !recurrence && "text-muted-foreground",
            )}
          >
            <option value="" disabled>
              Recurring
            </option>
            <option value="none">None</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-white/50 border border-white/40">
              Cancel
            </button>

            <button
              disabled={!canSave}
              onClick={() => {
                onSave({
                  ...task,
                  label,
                  notes: notes || undefined,
                  date,
                  time: time || undefined,
                  recurrence: recurrence || undefined,
                  category: category || undefined,
                });
              }}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-white font-semibold disabled:opacity-50"
            >
              Save
            </button>
          </div>

          {/* DELETE */}
          <button onClick={onDelete} className="w-full h-11 rounded-xl bg-red-500 text-white mt-2">
            Delete Task
          </button>
        </AppCard>
      </div>
    </div>
  );
};

export default EditTask;
