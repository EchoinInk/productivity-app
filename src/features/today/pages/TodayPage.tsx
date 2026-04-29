import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import Header from "@/components/Header";
import TodayHeroCard from "@/features/today/components/TodayHeroCard";
import TodaySummaryRow from "@/features/today/components/TodaySummaryRow";

import { useBillViews } from "@/features/bills/selectors/billsSelectors";
import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useBudgetSummary, selectAddExpense } from "@/features/budget/selectors/budgetSelectors";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

import { toDateString } from "@/shared/lib/date";

const TodayPage = () => {
  const navigate = useNavigate();
  const addExpense = useBudgetStore(selectAddExpense);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = useMemo(
    () => toDateString(selectedDate),
    [selectedDate],
  );

  const { progress, insights, sections, actions } = useTasks(selectedDateString);
  const budget = useBudgetSummary();
  const billViews = useBillViews();

  // ✅ CORRECT: derive from sections (your actual architecture)
  const upNextTasks = useMemo(() => {
    const todaySection = sections.find((s) => s.type === "today");

    if (!todaySection) return [];

    return todaySection.tasks
      .filter((t) => !t.isCompleted)
      .slice(0, 3);
  }, [sections]);

  // ✨ Optional smart message
  const completionMessage = useMemo(() => {
    const today = sections.find((s) => s.type === "today");

    if (!today) return null;

    if (today.percentage === 100 && today.total > 0) {
      return "You're done for today 🎉";
    }

    if (today.total === 0) {
      return "Nothing planned yet — start small ✨";
    }

    return null;
  }, [sections]);

  return (
    <>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <Header
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          showDatePill
          showTopBar
        />

        {/* Hero */}
        <TodayHeroCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
          categories={insights.summaries}
          onAddTask={() => setTaskOpen(true)}
          onViewAll={() => navigate("/tasks")}
        />

        {/* Summary */}
        <TodaySummaryRow
          remaining={Math.round(Math.max(0, budget.remaining))}
          billsDueCount={billViews.length}
        />

        {/* 🆕 Smart message */}
        {completionMessage && (
          <div className="text-center text-sm text-muted-foreground">
            {completionMessage}
          </div>
        )}

        {/* 🆕 Up Next */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Up Next
            </h2>
            <button
              onClick={() => navigate("/tasks")}
              className="text-xs text-primary"
            >
              View all →
            </button>
          </div>

          <div className="space-y-2">
            {upNextTasks.length > 0 ? (
              upNextTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {task.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {task.subtitle}
                    </span>
                  </div>

                  {task.category && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">
                      {task.category}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                You're all caught up 🎉
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🆕 Floating Action Button */}
      <button
        onClick={() => setTaskOpen(true)}
        className="fixed bottom-20 right-5 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg, #a4f0e8, #c0d3f0, #c7c9f4, #ddc9eb, #f7d0d0)",
        }}
      >
        <Plus className="text-white" />
      </button>

      {/* Modals */}
      <AddTask
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        defaultDate={selectedDateString}
        onSave={actions.addTask}
      />

      <AddExpense
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
        onSave={addExpense}
      />
    </>
  );
};

export default TodayPage;