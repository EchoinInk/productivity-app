import { useMemo } from "react";
import { shallow } from "zustand/shallow";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { useActivityStore } from "@/features/activity/useActivityStore";

import {
  selectTodayTasks,
  selectCompletedTodayTasks,
  selectIncompleteTodayTasks,
} from "@/features/tasks/selectors/taskSelectors";

export type TodayData = {
  focus: {
    percentage: number;
    label: string;
    subtext: string;
    motivation?: string;
  };
  summary: {
    tasks: { completed: number; total: number };
    meals: { logged: number; target: number };
    budget: { remaining: number };
    shopping: { remaining: number };
  };
  upNext: Array<{
    id: string;
    type: "task" | "meal" | "expense";
    title: string;
    time?: string;
  }>;
  activity: Array<{
    id: string;
    type: "task_completed" | "expense_added" | "meal_logged";
    label: string;
    timestamp: number;
  }>;
};

export const useTodayData = (): TodayData => {
  // ✅ Stable selectors
  const todayTasks = useTasksStore(
    (s) => selectTodayTasks(s.tasks),
    shallow
  );

  const completedTasks = useTasksStore(
    (s) => selectCompletedTodayTasks(s.tasks),
    shallow
  );

  const incompleteTasks = useTasksStore(
    (s) => selectIncompleteTodayTasks(s.tasks),
    shallow
  );

  const meals = useMealsStore((s) => s.meals);
  const weeklyBudget = useBudgetStore((s) => s.weeklyBudget);
  const expenses = useBudgetStore((s) => s.expenses);
  const shoppingItems = useShoppingStore((s) => s.shoppingItems);
  const events = useActivityStore((s) => s.events);

  // ===== DATE =====
  const todayWeekday = useMemo(() => {
    const weekdays = [
      "Sunday","Monday","Tuesday","Wednesday",
      "Thursday","Friday","Saturday"
    ];
    return weekdays[new Date().getDay()];
  }, []);

  // ===== DERIVED =====
  const todayMeals = useMemo(
    () => meals.filter((m) => m.day === todayWeekday),
    [meals, todayWeekday]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const remainingBudget = useMemo(
    () => weeklyBudget - totalExpenses,
    [weeklyBudget, totalExpenses]
  );

  const incompleteShoppingItems = useMemo(
    () => shoppingItems.filter((i) => !i.done),
    [shoppingItems]
  );

  // ===== FINAL DATA =====
  return useMemo((): TodayData => {
    // ===== FOCUS =====
    let focus: TodayData["focus"] = {
      percentage: 0,
      label: "No focus today",
      subtext: "Enjoy your day!",
    };

    if (todayTasks.length > 0) {
      const pct = Math.round(
        (completedTasks.length / todayTasks.length) * 100
      );
      const remaining = todayTasks.length - completedTasks.length;

      focus = {
        percentage: pct,
        label: `${remaining} task${remaining !== 1 ? "s" : ""} remaining`,
        subtext: `${completedTasks.length} of ${todayTasks.length} completed`,
      };
    } else if (remainingBudget > 0) {
      const pct = Math.round((remainingBudget / weeklyBudget) * 100);

      focus = {
        percentage: pct,
        label: `$${Math.round(remainingBudget)} remaining`,
        subtext: `of $${weeklyBudget} weekly budget`,
      };
    } else {
      const target = 3;
      const pct = Math.round((todayMeals.length / target) * 100);
      const remaining = target - todayMeals.length;

      focus = {
        percentage: pct,
        label: `${remaining} meal${remaining !== 1 ? "s" : ""} to log`,
        subtext: `${todayMeals.length} of ${target} logged`,
      };
    }

    // ===== SUMMARY =====
    const summary: TodayData["summary"] = {
      tasks: {
        completed: completedTasks.length,
        total: todayTasks.length,
      },
      meals: {
        logged: todayMeals.length,
        target: 3,
      },
      budget: {
        remaining: Math.round(remainingBudget),
      },
      shopping: {
        remaining: incompleteShoppingItems.length,
      },
    };

    // ===== UP NEXT =====
    const upNext: TodayData["upNext"] = [
      ...incompleteTasks
        .sort((a, b) => {
          if (a.time && b.time) return a.time.localeCompare(b.time);
          if (a.time) return -1;
          if (b.time) return 1;
          return 0;
        })
        .slice(0, 3)
        .map((task) => ({
          id: task.id,
          type: "task" as const,
          title: task.label,
          time: task.time,
        })),

      ...(todayMeals.length < 3
        ? [{
            id: `meal-${todayWeekday}`,
            type: "meal" as const,
            title: "Log next meal",
          }]
        : []),

      ...expenses.slice(0, 1).map((e) => ({
        id: `expense-${e.id}`,
        type: "expense" as const,
        title: `Track expense: ${e.name}`,
      })),
    ].slice(0, 5);

    // ===== ACTIVITY =====
    const activity: TodayData["activity"] = events
      .filter((e) =>
        e.type === "task_completed" ||
        e.type === "expense_added" ||
        e.type === "meal_logged"
      )
      .slice(0, 5)
      .map((e) => ({
        id: e.id,
        type: e.type as TodayData["activity"][number]["type"],
        label: e.label,
        timestamp: e.timestamp,
      }));

    return {
      focus,
      summary,
      upNext,
      activity,
    };
  }, [
    todayTasks,
    completedTasks,
    incompleteTasks,
    todayMeals,
    remainingBudget,
    incompleteShoppingItems,
    todayWeekday,
    weeklyBudget,
    expenses,
    events,
  ]);
};