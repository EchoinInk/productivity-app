import { useState, useEffect } from "react";
import AppCard from "@/components/AppCard";
import type { Task } from "@/store/useAppStore";

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
  const [category, setCategory] = useState<Task["category"]>("Home & Household");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");

  // ✅ PREFILL
  useEffect(() => {
    if (!task) return;

    setLabel(task.label);
    setNotes(task.notes ?? "");
    setCategory(task.category ?? "Home & Household");
    setDate(task.date);
    setTime(task.time ?? "");
    setRecurrence(task.recurrence ?? "none");
  }, [task]);

  if (!open || !task) return null;

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

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
          >
            <option>Home & Household</option>
            <option>Health & Wellness</option>
            <option>Career Development</option>
            <option>Errands & Life Admin</option>
            <option>Family & Relationships</option>
            <option>Finances</option>
          </select>

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
          />

          {/* TIME */}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
          />

          {/* RECURRENCE */}
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as any)}
            className="w-full h-10 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
          >
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
              onClick={() =>
                onSave({
                  ...task,
                  label,
                  notes,
                  date,
                  time,
                  recurrence,
                  category,
                })
              }
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-white font-semibold"
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
