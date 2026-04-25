import { useMemo } from "react";
import type { Bill } from "@/features/bills/types";
import { useBillsStore } from "@/features/bills/store/useBillsStore";

export interface BillView {
  key: string;
  name: string;
  amount: string;
  index: number;
}

export const selectAllBills = (state: { bills: Bill[] }) => state.bills;

export const toBillViews = (bills: Bill[]): BillView[] =>
  bills.map((bill, index) => ({
    key: String(bill.id),
    name: bill.name,
    amount: `$${bill.amount.toFixed(0)}`,
    index,
  }));

export const useBillViews = (): BillView[] => {
  const bills = useBillsStore(selectAllBills);
  return useMemo(() => toBillViews(bills), [bills]);
};
