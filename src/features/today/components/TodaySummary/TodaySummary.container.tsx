import { CheckSquare, Utensils, DollarSign, ShoppingCart } from "lucide-react";
import { TodaySummaryView } from "./TodaySummary.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { useMemo } from "react";

export const TodaySummaryContainer = () => {
  const today = useTodayData();

  const cards = useMemo(() => {
    const getTasksValue = () => {
      const { completed, total } = today.summary.tasks;
      if (total === 0) return "No tasks today 🎉";
      return `${completed}/${total}`;
    };

    const getTasksSubtitle = () => {
      const { completed, total } = today.summary.tasks;
      if (total === 0) return "Enjoy your free day";
      if (completed === total) return "All completed!";
      return `${total - completed} remaining`;
    };

    const getMealsValue = () => {
      const { logged, target } = today.summary.meals;
      if (logged === 0) return "No meals logged";
      if (logged === target) return "All meals logged";
      return `${logged}/${target}`;
    };

    const getBudgetValue = () => {
      const { remaining } = today.summary.budget;
      if (remaining <= 0) return "Budget used";
      return `$${remaining}`;
    };

    const getBudgetSubtitle = () => {
      const { remaining } = today.summary.budget;
      if (remaining <= 0) return "All spent";
      return "remaining";
    };

    return [
      {
        title: "Tasks",
        value: getTasksValue(),
        subtitle: getTasksSubtitle(),
        icon: <CheckSquare size={20} />,
        variant: (today.summary.tasks.completed === today.summary.tasks.total ? "success" : "default") as "success" | "default" | "warning" | "primary"
      },
      {
        title: "Meals",
        value: getMealsValue(),
        subtitle: "logged today",
        icon: <Utensils size={20} />,
        variant: (today.summary.meals.logged >= today.summary.meals.target ? "success" : "default") as "success" | "default" | "warning" | "primary"
      },
      {
        title: "Budget",
        value: getBudgetValue(),
        subtitle: getBudgetSubtitle(),
        icon: <DollarSign size={20} />,
        variant: (today.summary.budget.remaining > 0 ? "success" : "warning") as "success" | "default" | "warning" | "primary"
      },
      {
        title: "Shopping",
        value: today.summary.shopping.remaining.toString(),
        subtitle: "items left",
        icon: <ShoppingCart size={20} />,
        variant: (today.summary.shopping.remaining === 0 ? "success" : "default") as "success" | "default" | "warning" | "primary"
      }
    ];
  }, [today.summary]);

  const viewModel = useMemo(() => ({ cards }), [cards]);

  return <TodaySummaryView model={viewModel} />;
};
