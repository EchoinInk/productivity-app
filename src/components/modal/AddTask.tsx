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

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <AppCard className="space-y-4">
          <input placeholder="Task name" value={label} onChange={(e) => setLabel(e.target.value)} className="input" />

          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option>General</option>
            <option>Important</option>
          </select>

          <select value={recurrence} onChange={(e) => setRecurrence(e.target.value as any)}>
            <option value="none">None</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <button
            onClick={() => {
              onSave({ label, date: "", time, type, recurrence });
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
