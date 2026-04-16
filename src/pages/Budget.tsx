import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

const transactions = [
  { id: 1, label: "Groceries", amount: -52.3 },
  { id: 2, label: "Coffee", amount: -4.5 },
  { id: 3, label: "Freelance payment", amount: 200 },
  { id: 4, label: "Gas", amount: -38.0 },
  { id: 5, label: "Lunch out", amount: -12.8 },
];

const Budget = () => {
  const income = 500;
  const expenses = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  const remaining = income - expenses;
  const percentage = Math.min((expenses / income) * 100, 100);

  return (
    <div className="space-y-5">
      <PageHeader title="Budget" />

      {/* HERO CARD */}
      <AppCard gradient="budget">
        <div className="space-y-3">
          <p className="text-sm opacity-80">Weekly Budget</p>

          <p className="text-3xl font-bold">${remaining.toFixed(2)}</p>

          <p className="text-sm opacity-80">remaining of ${income.toFixed(2)}</p>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${percentage}%` }} />
          </div>

          {/* Breakdown */}
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

      {/* TRANSACTIONS */}
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Transactions</h2>

        <div className="space-y-1">
          {transactions.map((t) => {
            const isIncome = t.amount > 0;

            return (
              <ListItem
                key={t.id}
                label={t.label}
                rightContent={
                  <span className={`text-sm font-semibold ${isIncome ? "text-green-600" : "text-foreground"}`}>
                    {isIncome ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                  </span>
                }
              />
            );
          })}
        </div>
      </AppCard>

      {/* PRIMARY ACTION */}
      <ActionButton fullWidth variant="primary">
        <Plus size={16} />
        Add Expense
      </ActionButton>
    </div>
  );
};

export default Budget;
