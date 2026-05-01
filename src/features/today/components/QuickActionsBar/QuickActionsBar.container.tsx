import taskillustration from "@/assets/tasksquickactions.webp";
import mealillustration from "@/assets/mealquickactions.webp";
import budgetillustration from "@/assets/budgetquickactions.webp";
import shoppingillustration from "@/assets/shoppingquickactions.webp";import { QuickActionsBarView, type QuickActionsBarViewModel } from "./QuickActionsBar.view";

interface QuickActionsBarContainerProps {
  onAddTask: () => void;
  onAddExpense: () => void;
}

export const QuickActionsBarContainer = ({ onAddTask, onAddExpense }: QuickActionsBarContainerProps) => {
  const viewModel: QuickActionsBarViewModel = {
    actions: [
      {
        id: "add-task",
        title: "Add Task",
        icon: <img src={taskillustration} alt="" width={20} height={20} className="object-contain" />,
        onPress: onAddTask,
        variant: "primary"
      },
      {
        id: "log-meal",
        title: "Log Meal",
        icon: <img src={mealillustration} alt="" width={20} height={20} className="object-contain" />,
        onPress: () => {
          // TODO: Open meal modal - hook into existing meal modal logic
        },
        variant: "default"
      },
      {
        id: "add-expense",
        title: "Add Expense",
        icon: <img src={budgetillustration} alt="" width={20} height={20} className="object-contain" />,
        onPress: onAddExpense,
        variant: "default"
      },
      {
        id: "add-shopping",
        title: "Add Item",
        icon: <img src={shoppingillustration} alt="" width={20} height={20} className="object-contain" />,
        onPress: () => {
          // TODO: Open shopping modal - hook into existing shopping modal logic
        },
        variant: "default"
      }
    ]
  };

  return <QuickActionsBarView model={viewModel} />;
};
