import { useMemo, useState } from "react";
import { useTasksStore } from "../store/useTasksStore";
import { CalendarStrip } from "../components/CalendarStrip";
import { TaskSections } from "../components/TaskSections";
import { FloatingAddButton } from "../components/FloatingAddButton";
import { AddTaskModal } from "../components/AddTaskModal/AddTaskModal.container";
import {
  selectTodayTasks,
  selectUpcomingFromDate,
  selectCompletedBeforeDate,
} from "../selectors/taskSelectors";
import { getToday } from "@/shared/lib/date";

const TasksPage = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);

  const [selectedDate, setSelectedDate] = useState(getToday());
  const [showAddModal, setShowAddModal] = useState(false);

  const todayTasks = useMemo(() => selectTodayTasks(tasks, selectedDate), [tasks, selectedDate]);
  const upcomingTasks = useMemo(() => selectUpcomingFromDate(tasks, selectedDate), [tasks, selectedDate]);
  const completedTasks = useMemo(() => selectCompletedBeforeDate(tasks, selectedDate), [tasks, selectedDate]);

  return (
    <div className="flex flex-col h-full bg-background">
      <CalendarStrip selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      <div className="flex-1 overflow-y-auto pb-20">
        <TaskSections
          todayTasks={todayTasks}
          upcomingTasks={upcomingTasks}
          completedTasks={completedTasks}
          onToggle={toggleTask}
        />
      </div>

      <FloatingAddButton onClick={() => setShowAddModal(true)} />

      <AddTaskModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        defaultDate={selectedDate}
      />
    </div>
  );
};

export default TasksPage;
