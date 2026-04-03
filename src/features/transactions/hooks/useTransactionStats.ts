import { useMemo } from "react";
import { type Transaction } from "../../../types/transaction";

export const useTransactionStats = (filteredTransactions: Transaction[]) => {
  return useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expense, net: income - expense };
  }, [filteredTransactions]);
};