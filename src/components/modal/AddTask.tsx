import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: {
    label: string;
    date: string;
    time: string;
    type: "General" | "Important";
    recurrence: "none" | "weekly" | "monthly";
  }) => void;
}

const AddTask = ({ open, onClose, onSave }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<"General" | "Important">("General");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");

  if (!open) return null;

  const canSave = label.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-4 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <AppCard className="space-y-4">
          {/* TITLE */}
          <h2 className="text-lg font-semibold text-foreground">New Task</h2>

          {/* TASK NAME */}
          <input
            autoFocus
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="
              w-full h-11 px-4 rounded-xl
              bg-white/60 backdrop-blur
              border border-white/40
              text-sm
              placeholder:text-muted-foreground
            "
          />

          {/* ROW: TIME + TYPE + REPEAT */}
          <div className="flex gap-2">
            {/* TIME */}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
                flex-1 h-11 px-3 rounded-xl
                bg-white/60 backdrop-blur
                border border-white/40
                text-sm
              "
            />

            {/* TYPE */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "General" | "Important")}
              className="
                flex-1 h-11 px-3 rounded-xl
                bg-white/60 backdrop-blur
                border border-white/40
                text-sm
              "
            >
              <option value="General">General</option>
              <option value="Important">Important</option>
            </select>

            {/* RECURRENCE */}
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as any)}
              className="
                flex-1 h-11 px-3 rounded-xl
                bg-white/60 backdrop-blur
                border border-white/40
                text-sm
              "
            >
              <option value="none">None</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            {/* CANCEL */}
            <button
              onClick={onClose}
              className="
                flex-1 h-11 rounded-xl
                bg-white/50 backdrop-blur
                border border-white/40
                text-sm font-medium
              "
            >
              Cancel
            </button>

            {/* SAVE */}
            <button
              disabled={!canSave}
              onClick={() => {
                if (!canSave) return;

                onSave({
                  label,
                  date: "",
                  time,
                  type,
                  recurrence,
                });

                // reset
                setLabel("");
                setTime("");
                setType("General");
                setRecurrence("none");

                onClose();
              }}
              className="
                flex-1 h-11 rounded-xl
                bg-gradient-to-r from-blue-300 to-purple-300
                text-white text-sm font-semibold
                shadow-md
                active:scale-[0.97]
                transition-all
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
