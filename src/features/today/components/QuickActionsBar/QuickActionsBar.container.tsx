import taskillustration from "@/assets/tasksquickactions.webp";
import mealillustration from "@/assets/mealquickactions.webp";
import { QuickActionsBarView, type QuickActionsBarViewModel } from "./QuickActionsBar.view";

interface QuickActionsBarContainerProps {
  openAddTaskModal: () => void;
  openAddMealModal: () => void;
}

export const QuickActionsBarContainer = ({ openAddTaskModal, openAddMealModal }: QuickActionsBarContainerProps) => {
  const viewModel: QuickActionsBarViewModel = {
    actions: [
      {
        id: "add-task",
        title: "Add Task",
        icon: <img src={taskillustration} alt="" width={32} height={32} className="object-contain" />,
        onPress: openAddTaskModal,
        variant: "primary"
      },
      {
        id: "log-meal",
        title: "Log Meal",
        icon: <img src={mealillustration} alt="" width={32} height={32} className="object-contain" />,
        onPress: openAddMealModal,
        variant: "default"
      }
    ]
  };

  return <QuickActionsBarView model={viewModel} />;
};
