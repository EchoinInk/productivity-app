import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import type { Bill, CreateBillInput } from "@/features/bills/types";
import type { AppState } from "@/store/rootStore";

export interface BillsSlice {
  bills: Bill[];
  addBill: (input: CreateBillInput) => void;
}

export const createBillsSlice: StateCreator<AppState, [], [], BillsSlice> = (set) => ({
  bills: [],
  addBill: (input) => set((state) => ({ bills: [{ id: createId(), ...input }, ...state.bills] })),
});
