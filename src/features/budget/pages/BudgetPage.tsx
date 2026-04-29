import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ListItemBase } from "@/components/ui/ListItemBase";
import { ProgressBar } from "@/components/ui/ProgressBar";
import ActionButton from "@/components/ActionButton";
import Header from "@/components/Header";
import AddExpense from "@/components/modal/AddExpense";
import AddIncome from "@/components/modal/AddIncome";

import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useBudgetSummary, selectAddExpense, selectSetIncome, selectExpenses, selectIncome } from "@/features/budget/selectors/budgetSelectors";
import EmptyState from "@/components/ui/EmptyState";
import { UIText } from "@/components/ui/Text";

const BudgetPage = () => {
  const summary = useBudgetSummary();
  const expenses = useBudgetStore(selectExpenses);
  const income = useBudgetStore(selectIncome);
  const addExpense = useBudgetStore(selectAddExpense);
  const setIncome = useBudgetStore(selectSetIncome);

  const [openExpense, setOpenExpense] = useState(false);
  const [openIncome, setOpenIncome] = useState(false);

  return (
    <div className="space-y-4">
      <Header title="Budget" />

      {/* TOP CARD */}
      <Card variant="budget">
        <CardBody>
          <div className="space-y-4">
            <UIText.HeadingL>Weekly Budget</UIText.HeadingL>

            <UIText.HeadingM>
              ${summary.remaining.toFixed(2)}
            </UIText.HeadingM>

            <UIText.Micro>
              remaining of ${income.toFixed(2)}
            </UIText.Micro>

            <ProgressBar
              value={summary.percentage}
              tone="inverted"
              ariaLabel="Budget used"
            />

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
        </CardBody>
      </Card>

      <div className="space-y-4 pt-2">
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
