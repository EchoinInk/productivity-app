import { memo } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { taskCategories } from "@/features/tasks/constants/categories";
import type {
  TaskCategory,
  TaskRecurrence,
  TaskPriority,
} from "@/features/tasks/types/types";

export interface AddTaskModalViewModel {
  open: boolean;
  label: string;
  notes: string;
  date: string;
  category: TaskCategory | "";
  recurrence: TaskRecurrence | "";
  priority: TaskPriority | "";
  canSave: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (event: React.FormEvent) => void;
  onLabelChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCategoryChange: (value: TaskCategory) => void;
  onRecurrenceChange: (value: TaskRecurrence) => void;
  onPriorityChange: (value: TaskPriority) => void;
}

export const AddTaskModalView = memo(
  ({ model }: { model: AddTaskModalViewModel }) => {
    const {
      open,
      label,
      notes,
      date,
      category,
      recurrence,
      priority,
      canSave,
      loading,
      onClose,
      onSave,
      onLabelChange,
      onNotesChange,
      onDateChange,
      onCategoryChange,
      onRecurrenceChange,
      onPriorityChange,
    } = model;

    return (
      <BottomSheetDialog open={open} title="Add Task" onClose={onClose}>
        {/* FORM */}
        <form onSubmit={onSave} className="flex flex-col h-full">
          
          {/* SCROLL AREA */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-32">

            {/* TASK NAME (CRITICAL FIX) */}
            <input
              autoFocus
              value={label}
              placeholder="Task name"
              onChange={(e) => onLabelChange(e.target.value)}
              onFocus={(e) => e.stopPropagation()}
              className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm outline-none"
            />

            {/* DATE + RECURRING */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
              />

              <select
                value={recurrence}
                onChange={(e) =>
                  onRecurrenceChange(e.target.value as TaskRecurrence)
                }
                className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
              >
                <option value="">Recurring</option>
                <option value="none">None</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* CATEGORY + PRIORITY */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={category}
                onChange={(e) =>
                  onCategoryChange(e.target.value as TaskCategory)
                }
                className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
              >
                <option value="">Category</option>
                {taskCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={priority}
                onChange={(e) =>
                  onPriorityChange(e.target.value as TaskPriority)
                }
                className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm"
              >
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* NOTES */}
            <textarea
              value={notes}
              placeholder="Notes"
              onChange={(e) => onNotesChange(e.target.value)}
              className="w-full rounded-xl bg-muted/50 px-4 py-3 text-sm min-h-[80px]"
            />

          </div>

          {/* CTA */}
          <div className="sticky bottom-0 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 bg-background">
            <button
              type="submit"
              disabled={!canSave || loading}
              className="
                w-full
                py-3
                rounded-xl
                text-inverse
                font-medium
                bg-primary
                disabled:opacity-50
              "
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>

        </form>
      </BottomSheetDialog>
    );
  }
);

AddTaskModalView.displayName = "AddTaskModalView";