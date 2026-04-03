import { useMemo } from "react";
import { useTransactionStore } from "../../../store/transactionStore";
import { isThisMonth, isSameMonth, subMonths } from "date-fns";

export interface InsightsData {
  thisMonthIncome: number;
  thisMonthExpense: number;
  lastMonthExpense: number;
  highestCategory: [string, number];
  topCategories: [string, number][];
  savingsRate: number;
  momChange: number;
}

export const useInsightsData = () => {
  const { transactions } = useTransactionStore();

  const insights = useMemo<InsightsData>(() => {
    let thisMonthIncome = 0;
    let thisMonthExpense = 0;
    let lastMonthExpense = 0;
    const categorySpend: Record<string, number> = {};

    const lastMonthReference = subMonths(new Date(), 1);

    transactions.forEach((t) => {
      const date = new Date(t.date);
      
      if (isThisMonth(date)) {
        if (t.type === "income") thisMonthIncome += t.amount;
        if (t.type === "expense") {
          thisMonthExpense += t.amount;
          categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
        }
      } else if (isSameMonth(date, lastMonthReference) && t.type === "expense") {
        lastMonthExpense += t.amount;
      }
    });

    const sortedCategories = Object.entries(categorySpend).sort(([, a], [, b]) => b - a);
    const highestCategory = sortedCategories.length > 0 ? sortedCategories[0] : ["None", 0];
    const savingsRate = thisMonthIncome > 0 ? ((thisMonthIncome - thisMonthExpense) / thisMonthIncome) * 100 : 0;
    const momChange = lastMonthExpense > 0 ? ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100 : 0;

    return {
      thisMonthIncome,
      thisMonthExpense,
      lastMonthExpense,
      highestCategory: highestCategory as [string, number],
      topCategories: sortedCategories.slice(0, 4) as [string, number][],
      savingsRate,
      momChange
    };
  }, [transactions]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return { insights, formatCurrency };
};