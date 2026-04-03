import { create } from "zustand";
import { type Transaction } from "../types/transaction";
import { mockTransactions } from "../data/mockTransactions";

type TransactionState = {
  transactions: Transaction[];

  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updatedData: Partial<Transaction>) => void;
};

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: mockTransactions,

  addTransaction: (t) =>
    set((state) =>({
      transactions: [t, ...state.transactions],
    })),

  deleteTransaction: (id) => 
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),


  editTransaction: (id, updatedData) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      ),
    })),
}));