import { useMemo } from "react";
import { useFilteredTransactions } from "../../transactions/hooks/useFilteredTransactions";
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
      // ✅ 1. Pure Glassmorphism Container applied here
      className="relative bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] flex flex-col h-full overflow-hidden transition-colors duration-300"
    >
      {/* ✅ 2. The Emerald Bottom Gradient Layer (Sits behind everything) */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/5 pointer-events-none z-0" />

      {/* ✅ 3. Content Wrapper (z-10 ensures it sits above the gradient) */}
      <div className="relative z-10 flex flex-col h-full w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Cash Flow</h2>
          <span className="p-2 bg-white/50 dark:bg-[#0a0a0a]/50 border border-white/60 dark:border-emerald-500/20 shadow-sm rounded-xl transition-colors">
            <Wallet className="w-4 h-4 text-gray-500 dark:text-emerald-500/70" />
          </span>
        </div>

        {/* 🔹 Custom SVG Gauge Chart */}
        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[200px]">
          
          {/* SVG Drawing - ✅ Dynamic drop shadow based on theme */}
          <svg viewBox="0 0 200 120" className="w-full max-w-[280px] drop-shadow-md dark:drop-shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300">
            {/* Background Track - ✅ Uses Tailwind stroke classes to switch colors for light/dark */}
            <path 
              d="M 20 100 A 80 80 0 0 1 180 100" 
              fill="none" 
              className="stroke-gray-200 dark:stroke-gray-800 transition-colors duration-300" 
              strokeWidth="18" 
              strokeLinecap="round" 
            />
            
            {/* Income Arc (Emerald) */}
            <motion.path 
              initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
              animate={{ strokeDasharray: `${incomeDash} ${CIRCUMFERENCE}` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d="M 20 100 A 80 80 0 0 1 180 100" 
              fill="none" stroke="#10b981" strokeWidth="18" strokeLinecap="round" 
            />

            {/* Expense Arc (Rose) */}
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
            <p className="text-gray-500 dark:text-emerald-500/70 text-xs font-semibold uppercase tracking-widest mb-1 transition-colors">Total Balance</p>
            <h3 className={`text-3xl font-black transition-colors ${balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              ₹{Math.abs(balance).toLocaleString()}
            </h3>
          </div>
        </div>

        {/* 🔹 Legend */}
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-200 dark:border-emerald-500/20 transition-colors">
          
          <div className="flex items-center gap-2">
            {/* ✅ Light/Dark specific badge styling */}
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-500/20 transition-colors">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">Income</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">₹{totalIncome.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">Expense</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">₹{totalExpense.toLocaleString()}</p>
            </div>
            {/* ✅ Light/Dark specific badge styling */}
            <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 rounded-lg border border-rose-200 dark:border-rose-500/20 transition-colors">
              <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};