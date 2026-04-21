import { useState } from "react";
import AppCard from "@/components/AppCard";

type TaskCategory =
  | "Home & Household"
  | "Health & Wellness"
  | "Career Development"
  | "Errands & Life Admin"
  | "Family & Relationships"
  | "Finances";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
  onSave: (task: {
    label: string;
    date: string;
    time: string;
    recurrence: "none" | "weekly" | "monthly";
    category: TaskCategory;
    notes?: string;
  }) => void;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

const AddTask = ({ open, onClose, onSave, defaultDate }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");
  const [category, setCategory] = useState<TaskCategory>("Home & Household");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  const canSave = label.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          {/* TITLE */}
          <div>
            <h2 className="text-lg font-semibold">New Task</h2>
            <p className="text-sm text-muted-foreground mt-1">{formatDate(date)}</p>
          </div>

          {/* DATE + TIME (SIDE BY SIDE) */}
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

          {/* TASK NAME */}
          <input
            autoFocus
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white/60 border border-white/40 text-sm"
          />

          {/* NOTES */}
          <input
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white/60 border border-white/40 text-sm"
          />

          {/* CATEGORY */}
          <div>
            <p className="text-xs text-muted-foreground mb-1 px-1">Category</p>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
            >
              <option>Home & Household</option>
              <option>Health & Wellness</option>
              <option>Career Development</option>
              <option>Errands & Life Admin</option>
              <option>Family & Relationships</option>
              <option>Finances</option>
            </select>
          </div>

          {/* RECURRING */}
          <div>
            <p className="text-xs text-muted-foreground mb-1 px-1">Recurring</p>

            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as "none" | "weekly" | "monthly")}
              className="w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
            >
              <option value="none">None</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-white/50 border border-white/40">
              Cancel
            </button>

            <button
              disabled={!canSave}
              onClick={() => {
                onSave({
                  label,
                  date,
                  time,
                  recurrence,
                  category,
                  notes,
                });

                setLabel("");
                setTime("");
                setNotes("");
                setCategory("Home & Household");
                setRecurrence("none");

                onClose();
              }}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-white font-semibold disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default AddTask;
