import { useState } from "react";
import AppCard from "@/components/AppCard";

interface Props {
  open: boolean;
  onClose: () => void;
  task: any;
  onSave: (updated: any) => void;
  onDelete: () => void;
}

const EditTask = ({ open, onClose, task, onSave, onDelete }: Props) => {
  const [label, setLabel] = useState(task?.label || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AppCard className="space-y-4">

          <h2 className="text-lg font-semibold">Edit Task</h2>

          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-white/60 border"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full h-11 px-3 rounded-xl bg-white/60 border"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-white/50 border"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onSave({
                  ...task,
                  label,
                  priority,
                })
              }
              className="flex-1 h-11 rounded-xl bg-blue-400 text-white"
            >
              Save
            </button>
          </div>

          {/* 🔥 DELETE AT BOTTOM */}
          <button
            onClick={onDelete}
            className="w-full h-11 rounded-xl bg-red-500 text-white mt-2"
          >
            Delete Task
          </button>

        </AppCard>
      </div>
    </div>
  );
};

export default EditTask;
