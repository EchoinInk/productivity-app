import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: {
    label: string;
    category: "Today" | "Upcoming" | "Weekly" | "Monthly";
    date: string;
    time: string;
    type: string;
  }) => void;
}

const AddTask = ({ open, onClose, onSave }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState<"Today" | "Upcoming" | "Weekly" | "Monthly">("Today");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("General");

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
          <h2 className="text-lg font-semibold">New Task</h2>

          <input
            autoFocus
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          >
            <option>Today</option>
            <option>Upcoming</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          >
            <option>General</option>
            <option>Important</option>
          </select>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-secondary border border-border text-sm"
            >
              Cancel
            </button>
            <button
              disabled={!canSave}
              onClick={() => {
                if (!canSave) return;
                onSave({ label, category, date, time, type });
                setLabel("");
                setCategory("Today");
                setDate("");
                setTime("");
                setType("General");
                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50"
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
