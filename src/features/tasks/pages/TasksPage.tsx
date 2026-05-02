import { useState } from "react";
import { useTasksStore } from "../store/useTasksStore";
import { CalendarStrip } from "../components/CalendarStrip";
import { TaskSections } from "../components/TaskSections";
import { FloatingAddButton } from "../components/FloatingAddButton";
import { AddTaskModal } from "../components/AddTaskModal/AddTaskModal.container";
import { getToday, isDateAfter, isDateBefore } from "@/shared/lib/date";

const TasksPage = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);
  
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter tasks by selected date
  const todayTasks = tasks.filter((t) => t.date === selectedDate);
  
  // Get upcoming tasks (future dates)
  const upcomingTasks = tasks.filter((t) => 
    !t.completed && isDateAfter(t.date, selectedDate)
  ).sort((a, b) => {
    // Sort by date and priority
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    
    const priorityOrder = { high: 0, medium: 1, low: 2, undefined: 3 };
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 3;
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 3;
    return priorityA - priorityB;
  });
  
  // Get completed tasks (past dates, excluding today)
  const completedTasks = tasks.filter((t) => 
    t.completed && isDateBefore(t.date, selectedDate)
  ).sort((a, b) => b.date.localeCompare(a.date));

  const handleAddTask = () => {
    setShowAddModal(true);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Calendar Strip */}
      <CalendarStrip 
        selectedDate={selectedDate} 
        onDateSelect={setSelectedDate} 
      />
      
      {/* Task Sections */}
      <div className="flex-1 overflow-y-auto pb-20">
        <TaskSections
          todayTasks={todayTasks}
          upcomingTasks={upcomingTasks}
          completedTasks={completedTasks}
          onToggle={toggleTask}
        />
      </div>
      
      {/* Floating Add Button */}
      <FloatingAddButton onClick={handleAddTask} />
      
      {/* Add Task Modal */}
      <AddTaskModal 
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        defaultDate={selectedDate}
      />
    </div>
  );
};

export default TasksPage;