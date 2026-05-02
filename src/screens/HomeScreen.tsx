import { useState, useMemo, lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import { Heading } from "@/components/ui/Text";
import { TodayHeroCard } from "@/features/today/components/TodayHeroCard";
import TodayQuickActionsGrid from "@/features/today/components/TodayQuickActionsGrid";
import { UpNextCard } from "@/features/today/components/UpNextCard";
import { AddTaskModal } from "@/features/tasks";
import AddExpense from "@/features/budget/components/AddExpenseModal";
import AddMeal from "@/features/meals/components/AddMealModal";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { selectNextTask } from "@/features/tasks/selectors/taskSelectors";
import { getToday } from "@/shared/lib/date";

const InsightsCardContainer = lazy(() =>
  import("@/features/insights/components/InsightsCard.container").then((m) => ({
    default: m.InsightsCardContainer,
  }))
);

const greetingFor = (d: Date): string => {
  const h = d.getHours();
  if (h < 12) return "Good morning 👋";
  if (h < 18) return "Good afternoon 👋";
  return "Good evening 👋";
};

const todayStr = getToday();

const HomeScreen = () => {
  const addExpense = useBudgetStore((state) => state.addExpense);
  const addMeal = useMealsStore((state) => state.addMeal);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const nextTask = useTasksStore((state) => selectNextTask(state.tasks, todayStr));

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [mealOpen, setMealOpen] = useState(false);
  const [selectedDate] = useState(new Date());

  const today = useTodayData();
  const greeting = useMemo(() => greetingFor(selectedDate), [selectedDate]);

  const handleAddTask = () => setTaskOpen(true);
  const handleAddMeal = () => setMealOpen(true);
  const handleAddExpense = () => setExpenseOpen(true);

  return (
    <>
      <div className="relative min-h-screen bg-background overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] blur-2xl opacity-15 bg-gradient-hero" />
        </div>

        <div className="relative z-10 w-full max-w-[430px] mx-auto px-4 pt-4 pb-[calc(96px+env(safe-area-inset-bottom))] space-y-4">
          <Header
            showTopBar
            greeting={greeting}
            topBarSubtitle="Let's make today amazing"
            hasNotifications={false}
          />

          {/* HERO */}
          <div className="animate-[fadeIn_0.45s_ease-out]">
            <TodayHeroCard
              percentage={today.focus.percentage}
              total={today.summary.tasks.total}
              completed={today.summary.tasks.completed}
              onAddTask={handleAddTask}
            />
          </div>

          {/* UP NEXT (PRIMARY) */}
          <div className="animate-[fadeIn_0.65s_ease-out]">
            <div className="flex items-center justify-between mb-3">
              <Heading className="text-base text-muted-foreground">Up Next</Heading>
            </div>
            <UpNextCard
              task={nextTask}
              onPress={() => nextTask && toggleTask(nextTask.id)}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="animate-[fadeIn_0.85s_ease-out]">
            <TodayQuickActionsGrid
              tasks={today.summary.tasks.total}
              meals={today.summary.meals.logged}
              remaining={today.summary.budget.remaining}
              onAddTask={handleAddTask}
              onAddMeal={handleAddMeal}
              onAddExpense={handleAddExpense}
            />
          </div>

          {/* INSIGHTS */}
          <Suspense fallback={<div className="h-24 animate-pulse bg-muted/20 rounded-lg" />}>
            <div className="animate-[fadeIn_1.05s_ease-out]">
              <InsightsCardContainer />
            </div>
          </Suspense>
        </div>
      </div>

      {/* MODALS */}
      <AddTaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        defaultDate={todayStr}
      />

      <AddMeal
        open={mealOpen}
        onClose={() => setMealOpen(false)}
        onSave={(meal) => addMeal(meal)}
      />

      <AddExpense
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
        onSave={addExpense}
      />
    </>
  );
};

export default HomeScreen;
