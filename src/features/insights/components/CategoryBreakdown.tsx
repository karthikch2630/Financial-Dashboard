import { motion } from "framer-motion";
import { type InsightsData } from "../hooks/useInsightsData";

interface Props {
  insights: InsightsData;
  formatCurrency: (val: number) => string;
}

export const CategoryBreakdown = ({ insights, formatCurrency }: Props) => {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
        Top Spending Categories
      </h3>
      
      <div className="space-y-6">
        {insights.topCategories.length > 0 ? (
          insights.topCategories.map(([category, amount], index) => {
            const percentage = (amount / insights.thisMonthExpense) * 100;
            return (
              <div key={category}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-300">{category}</span>
                  <span className="text-sm font-black text-white">{formatCurrency(amount)}</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
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
  );
};