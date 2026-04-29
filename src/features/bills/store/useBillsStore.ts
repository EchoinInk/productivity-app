import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import { createId } from "@/shared/lib/id";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import type { Bill, CreateBillInput } from "@/features/bills/types/types";

interface BillsState {
  bills: Bill[];
  addBill: (input: CreateBillInput) => void;
}

export const useBillsStore = create<BillsState>()(
  persist(
    (set) => ({
      bills: [],
      addBill: (input) =>
        set((state) => ({ bills: [{ id: createId(), ...input }, ...state.bills] })),
    }),
    {
      name: "bills",
      version: STORE_VERSION,
      storage: createNamespacedStorage<Pick<BillsState, "bills">>(["bills"]),
      partialize: (state) => ({ bills: state.bills }),
    },
  ),
);

export interface BillView {
  key: string;
  name: string;
  amount: string;
  index: number;
}

const toBillViews = (bills: Bill[]): BillView[] =>
  bills.map((bill, index) => ({
    key: String(bill.id),
    name: bill.name,
    amount: `$${bill.amount.toFixed(0)}`,
    index,
  }));

export const useBillViews = (): BillView[] => {
  const bills = useBillsStore((state) => state.bills);
  return useMemo(() => toBillViews(bills), [bills]);
};
