import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddMealProps {
  open: boolean;
  onClose: () => void;
  onSave: (meal: { name: string; day: string }) => void;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddMeal = ({ open, onClose, onSave }: AddMealProps) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("Monday");

  if (!open) return null;

  const canSave = name.trim().length > 0;

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
          <h2 className="text-lg font-semibold">Add Meal</h2>

          <input
            autoFocus
            placeholder="Meal name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          >
            {days.map((d) => (
              <option key={d}>{d}</option>
            ))}
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
                onSave({ name, day });
                setName("");
                setDay("Monday");
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

export default AddMeal;
