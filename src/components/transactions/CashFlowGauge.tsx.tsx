import { useMemo } from "react";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export const CashFlowGauge = () => {
  const transactions = useFilteredTransactions();

  // Calculate Totals
  const { totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === "income") acc.totalIncome += curr.amount;
        if (curr.type === "expense") acc.totalExpense += curr.amount;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);

  const balance = totalIncome - totalExpense;
  const totalVolume = totalIncome + totalExpense || 1; // Prevent division by zero
  
  // Math for the SVG Semi-Circle
  const incomePercentage = (totalIncome / totalVolume) * 100;
  const expensePercentage = (totalExpense / totalVolume) * 100;
  
  // Circumference of a half circle with r=80 is ~251.3
  const CIRCUMFERENCE = 251.3; 
  const incomeDash = (incomePercentage / 100) * CIRCUMFERENCE;
  const expenseDash = (expensePercentage / 100) * CIRCUMFERENCE;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black border border-gray-800 p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-white tracking-tight">Cash Flow</h2>
        <span className="p-2 bg-gray-900 border border-gray-800 rounded-xl">
          <Wallet className="w-4 h-4 text-gray-400" />
        </span>
      </div>

      {/* 🔹 Custom SVG Gauge Chart */}
      <div className="relative flex-1 flex flex-col items-center justify-center min-h-[200px]">
        
        {/* SVG Drawing */}
        <svg viewBox="0 0 200 120" className="w-full max-w-[280px] drop-shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          {/* Background Track */}
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1f2937" strokeWidth="18" strokeLinecap="round" />
          
          {/* Income Arc (Emerald) */}
          <motion.path 
            initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
            animate={{ strokeDasharray: `${incomeDash} ${CIRCUMFERENCE}` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" stroke="#10b981" strokeWidth="18" strokeLinecap="round" 
          />

          {/* Expense Arc (Rose) - Draws from the right side back towards the middle */}
          <motion.path 
            initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
            animate={{ strokeDasharray: `${expenseDash} ${CIRCUMFERENCE}` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            d="M 180 100 A 80 80 0 0 0 20 100" 
            fill="none" stroke="#f43f5e" strokeWidth="18" strokeLinecap="round" 
          />
        </svg>

        {/* Center Text */}
        <div className="absolute bottom-6 flex flex-col items-center">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-1">Total Balance</p>
          <h3 className={`text-3xl font-black ${balance >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            ₹{Math.abs(balance).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* 🔹 Legend */}
      <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-800/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Income</p>
            <p className="text-sm font-bold text-white">₹{totalIncome.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Expense</p>
            <p className="text-sm font-bold text-white">₹{totalExpense.toLocaleString()}</p>
          </div>
          <div className="p-1.5 bg-rose-500/10 rounded-lg border border-rose-500/20">
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};