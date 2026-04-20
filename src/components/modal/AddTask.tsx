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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<"General" | "Important">("General");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");

  if (!open) return null;

  const canSave = label.trim().length > 0;

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">New Task</h2>

          <input
            autoFocus
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="input"
          />

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />

          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" />

          <select value={type} onChange={(e) => setType(e.target.value as "General" | "Important")} className="input">
            <option value="General">General</option>
            <option value="Important">Important</option>
          </select>

          <select value={recurrence} onChange={(e) => setRecurrence(e.target.value as any)} className="input">
            <option value="none">None</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-secondary">
              Cancel
            </button>

            <button
              disabled={!canSave}
              onClick={() => {
                onSave({ label, date, time, type, recurrence });
                setLabel("");
                setDate("");
                setTime("");
                setType("General");
                setRecurrence("none");
                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
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
