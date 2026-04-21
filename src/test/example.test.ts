import { describe, expect, it, vi } from "vitest";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { buildRecipeWorkflow } from "@/features/recipes/services/recipeWorkflow";
import { getTaskProgress, getTaskTimelineGroups } from "@/features/tasks/selectors/taskSelectors";
import { formatDisplayDate } from "@/shared/lib/date";
import type { Task } from "@/features/tasks/types";

const tasks: Task[] = [
  { id: "1", label: "Today", date: "2026-04-21", completedDates: [], time: "09:00" },
  { id: "2", label: "Done", date: "2026-04-21", completedDates: ["2026-04-21"], time: "08:00" },
  { id: "3", label: "Upcoming", date: "2026-04-22", completedDates: [] },
  { id: "4", label: "Yesterday", date: "2026-04-20", completedDates: [] },
];

describe("selectors and workflows", () => {
  it("groups tasks into timeline buckets", () => {
    const groups = getTaskTimelineGroups(tasks, "2026-04-21");
    expect(groups.today).toHaveLength(2);
    expect(groups.upcoming[0].label).toBe("Upcoming");
    expect(groups.yesterday[0].label).toBe("Yesterday");
  });

  it("calculates progress safely", () => {
    expect(getTaskProgress(tasks, "2026-04-21")).toEqual({ total: 2, completed: 1, percentage: 50 });
    expect(getBudgetSummary([{ id: "e1", name: "Coffee", amount: 5 }], 0).percentage).toBe(0);
  });

  it("builds recipe workflow with a date key", () => {
    vi.useFakeTimers().setSystemTime(new Date("2026-04-21T12:00:00"));
    expect(buildRecipeWorkflow({ name: "Pasta", ingredients: ["Tomatoes"] }).task.date).toBe("2026-04-21");
    vi.useRealTimers();
  });

  it("formats invalid dates defensively", () => {
    expect(formatDisplayDate("Today")).toBe("Today");
  });
});
