import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: {
    label: string;
    date: string;
    time: string;
    type: string;
    recurrence: "none" | "weekly" | "monthly";
  }) => void;
}

const AddTask = ({ open, onClose, onSave }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("General");
  const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");

  if (!open) return null;

  const canSave = label.trim().length > 0;

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">New Task</h2>

          <input value={label} onChange={(e) => setLabel(e.target.value)} className="input" />

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />

          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" />

          <select value={type} onChange={(e) => setType(e.target.value)} className="input">
            <option>General</option>
            <option>Important</option>
          </select>

          <select value={recurrence} onChange={(e) => setRecurrence(e.target.value as any)} className="input">
            <option value="none">None</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <button
            disabled={!canSave}
            onClick={() => {
              onSave({ label, date, time, type, recurrence });
              onClose();
            }}
          >
            Save
          </button>
        </AppCard>
      </div>
    </div>
  );
};

export default AddTask;
