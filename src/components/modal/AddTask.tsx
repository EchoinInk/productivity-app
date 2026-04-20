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
    priority: "Low" | "Medium" | "High";
    recurrence: "none" | "weekly" | "monthly";
    category: TaskCategory;
    notes?: string; // ✅ NEW
  }) => void;
}

const AddTask = ({ open, onClose, onSave, defaultDate }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState(""); // ✅ NEW
  const [time, setTime] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");
  const [category, setCategory] = useState<TaskCategory>("Home & Household");

  if (!open) return null;

  const canSave = label.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">New Task</h2>

          {/* NAME */}
          <input
            autoFocus
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white/60 border border-white/40 text-sm"
          />

          {/* NOTES ✅ */}
          <textarea
            placeholder="Notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/60 border border-white/40 text-sm resize-none"
          />

          {/* CATEGORY */}
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

          {/* PRIORITY */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full h-10 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

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
              disabled={!canSave}
              onClick={() => {
                onSave({
                  label,
                  date,
                  time,
                  priority,
                  recurrence,
                  category,
                  notes, // ✅ PASS NOTES
                });

                setLabel("");
                setNotes("");
                setTime("");
                setPriority("Medium");
                setRecurrence("none");

                onClose();
              }}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-white font-semibold"
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
