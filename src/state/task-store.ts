import { create } from 'zustand';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (text: string) => void;
  completeTask: (id: string) => void;
  loadTasksFromStorage: () => void;
  persistTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (text) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  completeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      ),
    }));
  },
  loadTasksFromStorage: () => {
    // TODO: Implement storage loading
  },
  persistTasks: () => {
    // TODO: Implement storage persistence
  },
}));
