import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddExpense from "@/components/modal/AddExpense";
import AddIncome from "@/components/modal/AddIncome"; // NEW
import PageShell from "@/app/layout/PageShell";

import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import EmptyState from "@/components/ui/EmptyState";

import { UIText } from "@/components/ui/Text";

const BudgetPage = () => {
  const expenses = useBudgetStore((s) => s.expenses);
  const addExpense = useBudgetStore((s) => s.addExpense);

  const income = useBudgetStore((s) => s.income);
  const setIncome = useBudgetStore((s) => s.setIncome);

  const [openExpense, setOpenExpense] = useState(false);
  const [openIncome, setOpenIncome] = useState(false); // NEW

  const summary = useMemo(() => getBudgetSummary(expenses, income), [expenses, income]);

  return (
    <PageShell>
      <PageHeader title="Budget" />

      {/* TOP CARD */}
      <AppCard gradient="budget">
        <div className="space-y-3">
          <p className="text-sm opacity-80">Weekly Budget</p>

          <p className="text-3xl font-medium">${summary.remaining.toFixed(2)}</p>

          <p className="text-sm opacity-80">remaining of ${income.toFixed(2)}</p>

          <div className="h-2 w-full bg-primary-foreground/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary-foreground rounded-full" style={{ width: `${summary.percentage}%` }} />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
            <div>
              <p className="opacity-70">Income</p>
              <p className="font-semibold">${income.toFixed(2)}</p>
            </div>

            <div>
              <p className="opacity-70">Expenses</p>
              <p className="font-semibold">${summary.spent.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </AppCard>

      {/* TRANSACTIONS */}
      <AppCard>
        <UIText.Section className="mb-2">Transactions</UIText.Section>

        {expenses.length === 0 ? (
<EmptyState

                  title="No transactions yet"

                  description="Add a transaction"

                />        ) : (
          <div className="space-y-1">
            {expenses.map((item) => (
              <ListItem
                key={item.id}
                label={item.name}
                rightContent={<span className="text-sm font-semibold">-${item.amount.toFixed(2)}</span>}
              />
            ))}
          </div>
        )}
      </AppCard>

      {/* ADD INCOME */}
      <ActionButton fullWidth variant="secondary" onClick={() => setOpenIncome(true)}>
        <Plus size={16} /> Add Income
      </ActionButton>

      {/* ADD EXPENSE */}
      <ActionButton fullWidth variant="primary" onClick={() => setOpenExpense(true)}>
        <Plus size={16} /> Add Expense
      </ActionButton>

      {/* MODALS */}
      <AddExpense open={openExpense} onClose={() => setOpenExpense(false)} onSave={(expense) => addExpense(expense)} />

      <AddIncome open={openIncome} onClose={() => setOpenIncome(false)} onSave={(amount) => setIncome(amount)} />
    </PageShell>
  );
};

export default BudgetPage;
