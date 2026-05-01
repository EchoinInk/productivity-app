# State Management

## Rules

- one store per feature
- no cross-store mutation
- no derived state

---

## Access

ts useTasksStore(s => s.tasks) 

---

## Updates

ts set(state => ({   tasks: [...state.tasks, newTask] })) 