import taskillustration from "@/assets/tasksquickactions.webp";
import mealillustration from "@/assets/mealquickactions.webp";
import budgetillustration from "@/assets/budgetquickactions.webp";
import shoppingillustration from "@/assets/shoppingquickactions.webp";import { QuickActionsBarView, type QuickActionsBarViewModel } from "./QuickActionsBar.view";

interface QuickActionsBarContainerProps {
  onAddTask: () => void;
  onAddExpense: () => void;
  onAddMeal: () => void;
  onAddShopping: () => void;
}

export const QuickActionsBarContainer = ({ onAddTask, onAddExpense, onAddMeal, onAddShopping }: QuickActionsBarContainerProps) => {
  const viewModel: QuickActionsBarViewModel = {
    actions: [
      {
        id: "add-task",
        title: "Add Task",
        icon: <img src={taskillustration} alt="" width={32} height={32} className="object-contain" />,
        onPress: onAddTask,
        variant: "primary"
      },
      {
        id: "log-meal",
        title: "Log Meal",
        icon: <img src={mealillustration} alt="" width={32} height={32} className="object-contain" />,
        onPress: onAddMeal,
        variant: "default"
      },
      {
        id: "add-expense",
        title: "Add Expense",
        icon: <img src={budgetillustration} alt="" width={32} height={32} className="object-contain" />,
        onPress: onAddExpense,
        variant: "default"
      },
      {
        id: "add-shopping",
        title: "Add Item",
        icon: <img src={shoppingillustration} alt="" width={32} height={32} className="object-contain" />,
        onPress: () => onAddShopping(),
        variant: "default"
      }
    ]
  };

  return <QuickActionsBarView model={viewModel} />;
};
