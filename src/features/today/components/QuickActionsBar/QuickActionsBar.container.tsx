import { CheckSquare, Utensils, DollarSign, ShoppingCart } from "lucide-react";
import { QuickActionsBarView, type QuickActionsBarViewModel } from "./QuickActionsBar.view";

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
        icon: <CheckSquare size={20} />,
        onPress: onAddTask,
        variant: "primary"
      },
      {
        id: "log-meal",
        title: "Log Meal",
        icon: <Utensils size={20} />,
        onPress: () => {
          // TODO: Open meal modal - hook into existing meal modal logic
          console.log("Open meal modal");
        },
        variant: "default"
      },
      {
        id: "add-expense",
        title: "Add Expense",
        icon: <DollarSign size={20} />,
        onPress: onAddExpense,
        variant: "default"
      },
      {
        id: "add-shopping",
        title: "Add Item",
        icon: <ShoppingCart size={20} />,
        onPress: () => {
          // TODO: Open shopping modal - hook into existing shopping modal logic
          console.log("Open shopping modal");
        },
        variant: "default"
      }
    ]
  };

  return <QuickActionsBarView model={viewModel} />;
};
