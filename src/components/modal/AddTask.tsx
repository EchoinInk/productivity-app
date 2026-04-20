import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  defaultDate: string; // 👈 passed from Dashboard
  onSave: (task: {
    label: string;
    date: string;
    time: string;
    type: "General" | "Important";
    recurrence: "none" | "weekly" | "monthly";
  }) => void;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const AddTask = ({ open, onClose, onSave, defaultDate }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [type, setType] = useState<"General" | "Important">("General");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");

  if (!open) return null;

  const canSave = label.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          {/* TITLE */}
          <div>
            <h2 className="text-lg font-semibold">New Task</h2>

            {/* SELECTED DATE DISPLAY */}
            <label className="block text-sm text-muted-foreground mt-1">{formatDate(date)}</label>
          </div>

          {/* DATE PICKER */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              w-full h-10 px-3 rounded-xl
              bg-white/60 backdrop-blur
              border border-white/40 text-sm
            "
          />

          {/* TASK NAME */}
          <input
            autoFocus
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="
              w-full h-11 px-4 rounded-xl
              bg-white/60 backdrop-blur
              border border-white/40 text-sm
            "
          />

          {/* CONTROLS */}
          <div className="flex gap-2">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value as "General" | "Important")}
              className="flex-1 h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
            >
              <option value="General">General</option>
              <option value="Important">Important</option>
            </select>

            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as any)}
              className="flex-1 h-11 px-3 rounded-xl bg-white/60 border border-white/40 text-sm"
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
                if (!canSave) return;

                onSave({
                  label,
                  date,
                  time,
                  type,
                  recurrence,
                });

                setLabel("");
                setTime("");
                setType("General");
                setRecurrence("none");

                onClose();
              }}
              className="
                flex-1 h-11 rounded-xl
                bg-gradient-to-r from-blue-300 to-purple-300
                text-white font-semibold
                disabled:opacity-50
              "
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
