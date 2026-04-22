import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import AddExpense from "@/components/modal/AddExpense";

const Budget = () => {
  const expenseItems = useAppStore((s) => s.expenses);
  const addExpense = useAppStore((s) => s.addExpense);
  const income = useAppStore((s) => s.weeklyBudget);

  const [open, setOpen] = useState(false);

  const expenses = expenseItems.reduce((s, t) => s + t.amount, 0);
  const remaining = income - expenses;
  const percentage = Math.min((expenses / income) * 100, 100);

  return (
    <div className="space-y-5">
      <PageHeader title="Budget" />

      <AppCard gradient="budget">
        <div className="space-y-3">
          <p className="text-sm opacity-80">Weekly Budget</p>

          <p className="text-3xl font-medium">${remaining.toFixed(2)}</p>

          <p className="text-sm opacity-80">remaining of ${income.toFixed(2)}</p>

          <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${percentage}%` }} />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
            <div>
              <p className="opacity-70">Income</p>
              <p className="font-semibold">${income.toFixed(2)}</p>
            </div>
            <div>
              <p className="opacity-70">Expenses</p>
              <p className="font-semibold">${expenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Transactions</h2>

        {expenseItems.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No transactions yet</p>
        ) : (
          <div className="space-y-1">
            {expenseItems.map((t) => (
              <ListItem
                key={t.id}
                label={t.name}
                rightContent={
                  <span className="text-sm font-semibold">-${t.amount.toFixed(2)}</span>
                }
              />
            ))}
          </div>
        )}
      </AppCard>

      <ActionButton fullWidth variant="primary" onClick={() => setOpen(true)}>
        <Plus size={16} />
        Add Expense
      </ActionButton>

      <AddExpense
        open={open}
        onClose={() => setOpen(false)}
        onSave={(e) => addExpense(e.name, e.amount)}
      />
    </div>
  );
};

export default Budget;
