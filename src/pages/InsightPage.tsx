import { useMemo } from "react";
import { useTransactionStore } from "../store/transactionStore";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, Flame, AlertCircle, BrainCircuit } from "lucide-react";
import { isThisMonth, isSameMonth, subMonths } from "date-fns";

export const InsightsPage = () => {
  const { transactions } = useTransactionStore();

  const insights = useMemo(() => {
    let thisMonthIncome = 0;
    let thisMonthExpense = 0;
    let lastMonthExpense = 0;
    const categorySpend: Record<string, number> = {};

    // Get a reference date for exactly one month ago
    const lastMonthReference = subMonths(new Date(), 1);

    transactions.forEach((t) => {
      const date = new Date(t.date);
      
      // Totals for comparison
      if (isThisMonth(date)) {
        if (t.type === "income") thisMonthIncome += t.amount;
        if (t.type === "expense") {
          thisMonthExpense += t.amount;
          categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
        }
      } else if (isSameMonth(date, lastMonthReference) && t.type === "expense") {
        // ✅ Fixed: Using isSameMonth combined with subMonths
        lastMonthExpense += t.amount;
      }
    });

    // Highest Category Calculation
    const sortedCategories = Object.entries(categorySpend).sort(([, a], [, b]) => b - a);
    const highestCategory = sortedCategories.length > 0 ? sortedCategories[0] : ["None", 0];

    // Savings Rate
    const savingsRate = thisMonthIncome > 0 ? ((thisMonthIncome - thisMonthExpense) / thisMonthIncome) * 100 : 0;
    
    // Month over Month Change
    const momChange = lastMonthExpense > 0 ? ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100 : 0;

    return {
      thisMonthIncome,
      thisMonthExpense,
      lastMonthExpense,
      highestCategory,
      topCategories: sortedCategories.slice(0, 4),
      savingsRate,
      momChange
    };
  }, [transactions]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-10"
    >
      {/* 🔹 Header Section */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Smart Insights</h1>
          <p className="text-gray-400 text-sm font-medium mt-1">Automated analysis of your spending habits.</p>
        </div>
      </div>

      {/* 🔹 Top Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        
        {/* Savings Rate Card */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="w-24 h-24 text-emerald-500 transform rotate-12" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Savings Rate</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black text-white">{insights.savingsRate.toFixed(1)}%</h3>
          </div>
          <p className="text-sm text-gray-400 mt-4 font-medium">
            {insights.savingsRate > 20 
              ? <span className="text-emerald-400">Excellent! You are saving a healthy amount.</span> 
              : "Try to aim for a 20% savings rate this month."}
          </p>
        </div>

        {/* Highest Spend Category */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Flame className="w-24 h-24 text-rose-500 transform -rotate-12" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Highest Spend</p>
          <h3 className="text-3xl font-black text-white truncate">{insights.highestCategory[0]}</h3>
          <p className="text-sm text-gray-400 mt-4 font-medium">
            You spent <span className="text-rose-400 font-bold">{formatCurrency(insights.highestCategory[1] as number)}</span> here this month.
          </p>
        </div>

        {/* MoM Comparison */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24 text-indigo-500" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Vs. Last Month</p>
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-black text-white">{Math.abs(insights.momChange).toFixed(1)}%</h3>
            <div className={`p-1.5 rounded-lg ${insights.momChange > 0 ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"}`}>
              {insights.momChange > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4 font-medium">
            Your spending is {insights.momChange > 0 ? "up" : "down"} compared to last month.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* 🔹 Category Breakdown (Custom Bar Chart) */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Top Spending Categories
          </h3>
          
          <div className="space-y-6">
            {insights.topCategories.length > 0 ? (
              insights.topCategories.map(([category, amount], index) => {
                const percentage = ((amount as number) / insights.thisMonthExpense) * 100;
                return (
                  <div key={category}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-gray-300">{category}</span>
                      <span className="text-sm font-black text-white">{formatCurrency(amount as number)}</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
                      {/* Progress Bar Fill */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-gray-500">No expense data for this month yet.</div>
            )}
          </div>
        </div>

        {/* 🔹 AI Observations Feed */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Automated Observations
          </h3>

          <div className="space-y-4">
            
            {/* Observation 1 */}
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl flex gap-4 items-start">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0 mt-0.5">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Income vs Expense Ratio</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {insights.thisMonthIncome > insights.thisMonthExpense 
                    ? "Great job! Your income is covering your expenses with room to spare. Consider sweeping the excess into investments."
                    : "Warning: Your expenses are currently outpacing your income for this month. Review your variable categories."}
                </p>
              </div>
            </div>

            {/* Observation 2 */}
            {insights.momChange > 10 && (
              <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex gap-4 items-start">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Spending Spike Detected</p>
                  <p className="text-xs text-rose-400/80 leading-relaxed">
                    Your spending is up by {insights.momChange.toFixed(0)}% compared to this time last month. Check your "{insights.highestCategory[0]}" category to see where the leak is.
                  </p>
                </div>
              </div>
            )}

            {/* Observation 3 */}
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl flex gap-4 items-start">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl shrink-0 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Category Dominance</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {insights.highestCategory[0] !== "None" 
                    ? `Your top category (${insights.highestCategory[0]}) makes up ${((insights.highestCategory[1] as number / insights.thisMonthExpense) * 100).toFixed(0)}% of your total monthly spend.`
                    : "Add some expenses to see category dominance insights."}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};