import { motion } from "framer-motion";
import { type InsightsData } from "../hooks/useInsightsData";

interface Props {
  insights: InsightsData;
  formatCurrency: (val: number) => string;
}

export const CategoryBreakdown = ({ insights, formatCurrency }: Props) => {
  return (
    // ✅ Pure Glassmorphism Container
    <div className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] transition-colors duration-300">
      
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
        {/* ✅ Changed from Indigo to glowing Emerald */}
        <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-sm dark:shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        Top Spending Categories
      </h3>
      
      <div className="space-y-6">
        {insights.topCategories.length > 0 ? (
          insights.topCategories.map(([category, amount], index) => {
            const percentage = (amount / insights.thisMonthExpense) * 100;
            return (
              <div key={category}>
                <div className="flex justify-between items-end mb-2">
                  {/* ✅ Text adapts to Light/Dark Mode */}
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors">{category}</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white transition-colors">{formatCurrency(amount)}</span>
                </div>
                
                {/* ✅ Progress bar track */}
                <div className="w-full bg-gray-200/50 dark:bg-gray-900/50 rounded-full h-3 overflow-hidden border border-gray-300/50 dark:border-gray-800/50 transition-colors">
                  
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${percentage}%` }} 
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    // ✅ Progress bar fill changed from Indigo to Emerald
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 dark:from-emerald-600 dark:to-emerald-400 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                  </motion.div>
                  
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 font-medium transition-colors">
            No expense data for this month yet.
          </div>
        )}
      </div>
    </div>
  );
};