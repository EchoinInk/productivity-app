import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { useShallow } from "zustand/react/shallow";
import { getToday } from "@/shared/lib/date";

import {
  selectTodayTasks,
  selectCompletedTodayTasks,
} from "@/features/tasks/selectors/taskSelectors";

export type TodayData = {
  focus: {
    percentage: number;
    label: string;
    subtext: string;
  };
  summary: {
    tasks: { completed: number; total: number };
    meals: { logged: number; target: number };
    budget: { remaining: number };
    shopping: { remaining: number };
  };
};

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const useTodayData = (): TodayData => {
  const today = getToday();
  const todayWeekday = WEEKDAYS[new Date().getDay()];

  // Single subscription per store
  const { todayTasks, completedTasks } = useTasksStore(
    useShallow((s) => ({
      todayTasks: selectTodayTasks(s.tasks, today),
      completedTasks: selectCompletedTodayTasks(s.tasks, today),
    })),
  );

  const todayMeals = useMealsStore(
    useShallow((s) => s.meals.filter((m) => m.day === todayWeekday)),
  );

  const { weeklyBudget, totalExpenses } = useBudgetStore(
    useShallow((s) => ({
      weeklyBudget: s.weeklyBudget,
      totalExpenses: s.expenses.reduce((sum, e) => sum + e.amount, 0),
    })),
  );

  const incompleteShoppingCount = useShoppingStore(
    (s) => s.shoppingItems.filter((i) => !i.done).length,
  );

  const remainingBudget = weeklyBudget - totalExpenses;

  let focus: TodayData["focus"] = {
    percentage: 0,
    label: "No focus today",
    subtext: "Enjoy your day!",
  };

  if (todayTasks.length > 0) {
    const percentage = Math.round((completedTasks.length / todayTasks.length) * 100);
    const remaining = todayTasks.length - completedTasks.length;
    focus = {
      percentage,
      label: `${remaining} task${remaining !== 1 ? "s" : ""} remaining`,
      subtext: `${completedTasks.length} of ${todayTasks.length} completed`,
    };
  } else if (remainingBudget > 0 && weeklyBudget > 0) {
    const percentage = Math.round((remainingBudget / weeklyBudget) * 100);
    focus = {
      percentage,
      label: `$${Math.round(remainingBudget)} remaining`,
      subtext: `of $${weeklyBudget} weekly budget`,
    };
  } else {
    const target = 3;
    const percentage = Math.round((todayMeals.length / target) * 100);
    const remaining = target - todayMeals.length;
    focus = {
      percentage,
      label: `${remaining} meal${remaining !== 1 ? "s" : ""} to log`,
      subtext: `${todayMeals.length} of ${target} logged`,
    };
  }

  return {
    focus,
    summary: {
      tasks: { completed: completedTasks.length, total: todayTasks.length },
      meals: { logged: todayMeals.length, target: 3 },
      budget: { remaining: Math.round(remainingBudget) },
      shopping: { remaining: incompleteShoppingCount },
    },
  };
};
