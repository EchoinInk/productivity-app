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
import { selectMealsByDay } from "@/features/meals/selectors/mealSelectors";
import { selectBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { selectIncompleteItemCount } from "@/features/shopping/selectors/shoppingSelectors";

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

type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

const WEEKDAYS: Weekday[] = [
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
const todayWeekday = WEEKDAYS[new Date().getDay()] as Weekday;
  // Single subscription per store
  const { todayTasks, completedTasks } = useTasksStore(
    useShallow((s) => ({
      todayTasks: selectTodayTasks(s.tasks, today),
      completedTasks: selectCompletedTodayTasks(s.tasks, today),
    })),
  );

  const todayMeals = useMealsStore(
    useShallow((s) => selectMealsByDay(s.meals, todayWeekday)),
  );

  const budgetSummary = useBudgetStore(
    useShallow((s) => selectBudgetSummary(s.expenses, s.weeklyBudget, s.income)),
  );

  const incompleteShoppingCount = useShoppingStore(
    (s) => selectIncompleteItemCount(s.shoppingItems),
  );

  const { weeklyBudget, remaining: remainingBudget } = budgetSummary;

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
