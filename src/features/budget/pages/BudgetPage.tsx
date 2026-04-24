import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { ListItemBase } from "@/components/ui/ListItemBase";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddExpense from "@/components/modal/AddExpense";
import AddIncome from "@/components/modal/AddIncome";
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
  const [openIncome, setOpenIncome] = useState(false);

  const summary = useMemo(
    () => getBudgetSummary(expenses, income),
    [expenses, income]
  );

  return (
    <PageShell>
      <div className="space-y-4">
        <PageHeader title="Budget" />

        {/* TOP CARD */}
        <Card variant="budget">
          <div className="space-y-3">
            <UIText.Title>Weekly Budget</UIText.Title>

            <UIText.Section>
              ${summary.remaining.toFixed(2)}
            </UIText.Section>

            <UIText.Micro>
              remaining of ${income.toFixed(2)}
            </UIText.Micro>

            {/* PROGRESS BAR */}
            <div className="h-2 w-full bg-primary-foreground/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-foreground rounded-full transition-all duration-300"
                style={{ width: `${summary.percentage}%` }}
              />
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="space-y-1">
                <UIText.Micro>Income</UIText.Micro>
                <UIText.Meta className="font-semibold">
                  ${income.toFixed(2)}
                </UIText.Meta>
              </div>

              <div className="space-y-1">
                <UIText.Micro>Expenses</UIText.Micro>
                <UIText.Meta className="font-semibold">
                  ${summary.spent.toFixed(2)}
                </UIText.Meta>
              </div>
            </div>
          </div>
        </Card>

        {/* TRANSACTIONS */}
        <Card>
          <UIText.Title className="mb-2">
            Transactions
          </UIText.Title>

          {expenses.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Add a transaction"
            />
          ) : (
            <div className="space-y-1">
              {expenses.map((item) => (
                <div key={item.id} className="px-2 py-2">
                  <ListItemBase
                    label={
                      <UIText.Body className="font-medium">
                        {item.name}
                      </UIText.Body>
                    }
                    right={
                      <UIText.Body className="font-semibold">
                        -${item.amount.toFixed(2)}
                      </UIText.Body>
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ACTIONS */}
        <div className="space-y-3 pt-5">
          <ActionButton
            fullWidth
            variant="budget"
            onClick={() => setOpenIncome(true)}
          >
            <Plus size={16} /> Add Income
          </ActionButton>

          <ActionButton
            fullWidth
            variant="primary"
            onClick={() => setOpenExpense(true)}
          >
            <Plus size={16} /> Add Expense
          </ActionButton>
        </div>

        {/* MODALS */}
        <AddExpense
          open={openExpense}
          onClose={() => setOpenExpense(false)}
          onSave={addExpense}
        />

        <AddIncome
          open={openIncome}
          onClose={() => setOpenIncome(false)}
          onSave={setIncome}
        />
      </div>
    </PageShell>
  );
};

export default BudgetPage;