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

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <PageHeader title="Budget" />

      <AppCard gradient="budget">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs opacity-80">Income</p>
            <p className="text-lg font-bold">${income.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Expenses</p>
            <p className="text-lg font-bold">${expenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Left</p>
            <p className="text-lg font-bold">${remaining.toFixed(2)}</p>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-1">Transactions</h2>
        {transactions.map((t) => (
          <ListItem
            key={t.id}
            label={t.label}
            rightContent={
              <span className={`text-sm font-semibold ${t.amount > 0 ? "text-accent" : "text-foreground"}`}>
                {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </span>
            }
          />
        ))}
      </AppCard>

      <ActionButton fullWidth>
        <Plus size={16} /> Add Expense
      </ActionButton>
    </div>
  );
};

export default Budget;
