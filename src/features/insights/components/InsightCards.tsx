import { TrendingUp, TrendingDown, Flame, Sparkles } from "lucide-react";
import { type InsightsData } from "../hooks/useInsightsData";
import { motion, type Variants } from "framer-motion";

interface Props {
  insights: InsightsData;
  formatCurrency: (val: number) => string;
}

export const InsightCards = ({ insights, formatCurrency }: Props) => {
  
  // ✅ Explicitly typed as Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // ✅ Explicitly typed as Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
    >
      {/* 🔹 Savings Rate Card */}
      <motion.div variants={itemVariants} className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-6 rounded-[1.5rem] relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.05)] transition-colors duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 transition-opacity">
          <TrendingUp className="w-24 h-24 text-emerald-500 transform rotate-12" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 transition-colors">
          Savings Rate
        </p>
        <h3 className="text-4xl font-black text-gray-900 dark:text-white transition-colors">
          {insights.savingsRate.toFixed(1)}%
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium transition-colors">
          {insights.savingsRate > 20 ? (
            <span className="text-emerald-600 dark:text-emerald-400">Excellent! You are saving a healthy amount.</span>
          ) : (
            "Try to aim for a 20% savings rate this month."
          )}
        </p>
      </motion.div>

      {/* 🔹 Highest Spend Category */}
      <motion.div variants={itemVariants} className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-6 rounded-[1.5rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.05)] transition-colors duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 transition-opacity">
          <Flame className="w-24 h-24 text-rose-500 transform -rotate-12" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 transition-colors">
          Highest Spend
        </p>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white truncate transition-colors">
          {insights.highestCategory[0]}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium transition-colors">
          You spent <span className="text-rose-600 dark:text-rose-400 font-bold">{formatCurrency(insights.highestCategory[1])}</span> here this month.
        </p>
      </motion.div>

      {/* 🔹 MoM Comparison */}
      <motion.div variants={itemVariants} className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-6 rounded-[1.5rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.05)] transition-colors duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 transition-opacity">
          <Sparkles className="w-24 h-24 text-indigo-500" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 transition-colors">
          Vs. Last Month
        </p>
        <div className="flex items-center gap-3">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white transition-colors">
            {Math.abs(insights.momChange).toFixed(1)}%
          </h3>
          <div className={`p-1.5 rounded-lg transition-colors ${
            insights.momChange > 0 
              ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400" 
              : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          }`}>
            {insights.momChange > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium transition-colors">
          Your spending is {insights.momChange > 0 ? "up" : "down"} compared to last month.
        </p>
      </motion.div>

    </motion.div>
  );
};