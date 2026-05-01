import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

export interface AddTaskModalViewModel {
  open: boolean;
  label: string;
  notes: string;
  time: string;
  date: string;
  category: TaskCategory | "";
  recurrence: TaskRecurrence | "";
  canSave: boolean;
  onClose: () => void;
  onSave: (event: React.FormEvent) => void;
  onLabelChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCategoryChange: (value: TaskCategory) => void;
  onRecurrenceChange: (value: TaskRecurrence) => void;
}

export const AddTaskModalView = ({ model }: { model: AddTaskModalViewModel }) => {
  const {
    open,
    label,
    notes,
    time,
    date,
    category,
    recurrence,
    canSave,
    onClose,
    onSave,
    onLabelChange,
    onNotesChange,
    onTimeChange,
    onDateChange,
    onCategoryChange,
    onRecurrenceChange,
  } = model;

  return (
    <BottomSheetDialog open={open} title="Add Task" onClose={onClose}>
      
      {/* CONTENT */}
      <form onSubmit={onSave} className="flex flex-col h-full">

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4 pb-32">

          {/* TASK NAME */}
          <input
            placeholder="e.g. Buy groceries"
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm outline-none"
          />

          {/* QUICK ACTIONS (OPTIONAL — matches screenshot style) */}
          <div className="flex gap-2">
            <button type="button" className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs">
              Today
            </button>
            <button type="button" className="px-3 py-1.5 rounded-full bg-muted text-xs">
              Tomorrow
            </button>
            <button type="button" className="px-3 py-1.5 rounded-full bg-muted text-xs">
              This Weekend
            </button>
          </div>

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
          />

          {/* TIME */}
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as TaskCategory)}
            className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
          >
            <option value="">Category</option>
            {taskCategories.map((c: TaskCategory) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* RECURRENCE */}
          <select
            value={recurrence}
            onChange={(e) => onRecurrenceChange(e.target.value as TaskRecurrence)}
            className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
          >
            <option value="">Recurring</option>
            <option value="none">None</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {/* NOTES */}
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
          />

        </div>

        {/* STICKY CTA */}
        <div className="sticky bottom-0 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 bg-background">
          <button
            type="submit"
            disabled={!canSave}
            className="
              w-full
              py-3
              rounded-xl
              text-white
              font-medium
              bg-gradient-to-r from-primary to-purple-400
              disabled:opacity-50
            "
          >
            Add Task
          </button>
        </div>

      </form>
    </BottomSheetDialog>
  );
};