import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ListItemBase } from "@/components/ui/ListItemBase";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import AddExpense from "@/features/budget/components/AddExpenseModal";
import AddIncome from "@/features/budget/components/AddIncomeModal";

import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useBudgetSummary } from "@/features/budget/store/useBudgetStore";
import { EmptyState } from "@/components/ui/EmptyState";
import { HeroTitle, Metric, Meta, Label, Body } from "@/components/ui/Text";

const BudgetPage = () => {
  const summary = useBudgetSummary();
  const expenses = useBudgetStore((state) => state.expenses);
  const income = useBudgetStore((state) => state.income);
  const addExpense = useBudgetStore((state) => state.addExpense);
  const setIncome = useBudgetStore((state) => state.setIncome);

  const [openExpense, setOpenExpense] = useState(false);
  const [openIncome, setOpenIncome] = useState(false);

  return (
    <div className="space-y-4">
      <Header title="Budget" />

      {/* TOP CARD */}
      <Card variant="budget">
        <CardBody>
          <div className="space-y-4">
            <HeroTitle>Weekly Budget</HeroTitle>

            <Metric>
              ${summary.remaining.toFixed(2)}
            </Metric>

            <Meta>
              remaining of ${income.toFixed(2)}
            </Meta>

            <ProgressBar
              value={summary.percentage}
              tone="inverted"
              ariaLabel="Budget used"
            />

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="space-y-1">
                <Label>Income</Label>
                <Meta className="font-semibold">
                  ${income.toFixed(2)}
                </Meta>
              </div>

              <div className="space-y-1">
                <Label>Expenses</Label>
                <Meta className="font-semibold">
                  ${summary.spent.toFixed(2)}
                </Meta>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* TRANSACTIONS */}
      <Card>
        <CardHeader title="Transactions" />
        <CardBody>
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
                      <Body className="font-medium">
                        {item.name}
                      </Body>
                    }
                    right={
                      <Body className="font-semibold">
                        -${item.amount.toFixed(2)}
                      </Body>
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <div className="space-y-4 pt-2">
        <Button
          fullWidth
          variant="budget"
          onClick={() => setOpenIncome(true)}
        >
          <Plus size={16} /> Add Income
        </Button>

        <Button
          fullWidth
          variant="primary"
          onClick={() => setOpenExpense(true)}
        >
          <Plus size={16} /> Add Expense
        </Button>
      </div>

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
  );
};

export default BudgetPage;
