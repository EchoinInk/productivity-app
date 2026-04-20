import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: {
    label: string;
    category: string;
    date: string;
    time: string;
    type: string;
  }) => void;
}

const AddTask = ({ open, onClose, onSave }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("Today");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("General");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md p-4">
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">New Task</h2>

          {/* Task Name */}
          <input
            placeholder="Task name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          >
            <option>Today</option>
            <option>Upcoming</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          />

          {/* Time */}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          />

          {/* Task Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          >
            <option>General</option>
            <option>Important</option>
          </select>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-white/60 border border-white/40 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                if (!label.trim()) return;

                onSave({ label, category, date, time, type });

                // reset
                setLabel("");
                setCategory("Today");
                setDate("");
                setTime("");
                setType("General");

                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm"
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
