import { TrendingUp, TrendingDown, Flame, Sparkles, AlertCircle } from "lucide-react";
import { type InsightsData } from "../hooks/useInsightsData";
import { motion, type Variants } from "framer-motion";

interface Props {
  insights: InsightsData;
}

export const ObservationsFeed = ({ insights }: Props) => {
  // Animation variants for a staggered pop-in effect
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    // ✅ Pure Glassmorphism Container
    <div className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.05)] transition-colors duration-300">
      
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
        <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400 drop-shadow-sm" />
        Automated Observations
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {/* 🔹 Observation 1: Income vs Expense Ratio */}
        <motion.div variants={itemVariants} className="p-4 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl flex gap-4 items-start shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0 mt-0.5 transition-colors">
            {insights.thisMonthIncome > insights.thisMonthExpense ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors">Income vs Expense Ratio</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
              {insights.thisMonthIncome > insights.thisMonthExpense 
                ? "Great job! Your income is covering your expenses with room to spare. Consider sweeping the excess into investments."
                : "Warning: Your expenses are currently outpacing your income for this month. Review your variable categories."}
            </p>
          </div>
        </motion.div>

        {/* 🔹 Observation 2: Spending Spike Detected (Only shows if > 10%) */}
        {insights.momChange > 10 && (
          <motion.div variants={itemVariants} className="p-4 bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 rounded-2xl flex gap-4 items-start shadow-sm dark:shadow-none transition-colors duration-300">
            <div className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl shrink-0 mt-0.5 transition-colors">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors">Spending Spike Detected</p>
              <p className="text-xs text-rose-600/90 dark:text-rose-400/80 leading-relaxed transition-colors">
                Your spending is up by {insights.momChange.toFixed(0)}% compared to this time last month. Check your "{insights.highestCategory[0]}" category to see where the leak is.
              </p>
            </div>
          </motion.div>
        )}

        {/* 🔹 Observation 3: Category Dominance */}
        <motion.div variants={itemVariants} className="p-4 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl flex gap-4 items-start shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 mt-0.5 transition-colors">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors">Category Dominance</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
              {insights.highestCategory[0] !== "None" 
                ? `Your top category (${insights.highestCategory[0]}) makes up ${((insights.highestCategory[1] / insights.thisMonthExpense) * 100).toFixed(0)}% of your total monthly spend.`
                : "Add some expenses to see category dominance insights."}
            </p>
          </div>
        </motion.div>
      </motion.div>
      
    </div>
  );
};