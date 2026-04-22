import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddExpense from "@/components/modal/AddExpense";
import PageShell from "@/app/layout/PageShell";
import { useAppStore } from "@/store/useAppStore";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";

const BudgetPage = () => {
  const expenseItems = useAppStore((s) => s.expenses);
  const addExpense = useAppStore((s) => s.addExpense);
  const income = useAppStore((s) => s.weeklyBudget);
  const [open, setOpen] = useState(false);
  const summary = useMemo(() => getBudgetSummary(expenseItems, income), [expenseItems, income]);

  return (
    <PageShell>
      <PageHeader title="Budget" />
      <AppCard gradient="budget">
        <div className="space-y-3">
          <p className="text-sm opacity-80">Weekly Budget</p>
          <p className="text-3xl font-medium">${summary.remaining.toFixed(2)}</p>
          <p className="text-sm opacity-80">remaining of ${income.toFixed(2)}</p>
          <div className="h-2 w-full bg-primary-foreground/30 rounded-full overflow-hidden"><div className="h-full bg-primary-foreground rounded-full" style={{ width: `${summary.percentage}%` }} /></div>
          <div className="grid grid-cols-2 gap-2 pt-2 text-sm"><div><p className="opacity-70">Income</p><p className="font-semibold">${income.toFixed(2)}</p></div><div><p className="opacity-70">Expenses</p><p className="font-semibold">${summary.spent.toFixed(2)}</p></div></div>
        </div>
      </AppCard>
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Transactions</h2>
        {expenseItems.length === 0 ? <p className="text-sm text-muted-foreground py-4 text-center">No transactions yet</p> : <div className="space-y-1">{expenseItems.map((item) => <ListItem key={item.id} label={item.name} rightContent={<span className="text-sm font-semibold">-${item.amount.toFixed(2)}</span>} />)}</div>}
      </AppCard>
      <ActionButton fullWidth variant="primary" onClick={() => setOpen(true)}><Plus size={16} /> Add Expense</ActionButton>
      <AddExpense open={open} onClose={() => setOpen(false)} onSave={(expense) => addExpense(expense)} />
    </PageShell>
  );
};

export default BudgetPage;
