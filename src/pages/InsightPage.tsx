import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useInsightsData } from "../features/insights/hooks/useInsightsData";
import { InsightCards } from "../features/insights/components/InsightCards";
import { CategoryBreakdown } from "../features/insights/components/CategoryBreakdown";
import { ObservationsFeed } from "../features/insights/components/ObservationsFeed";

export const InsightPage = () => {
  // Call the hook to get all data
  const { insights, formatCurrency } = useInsightsData();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-10"
    >
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Smart Insights</h1>
          <p className="text-gray-400 text-sm font-medium mt-1">Automated analysis of your spending habits.</p>
        </div>
      </div>

      {/* Assemble the Components */}
      <InsightCards insights={insights} formatCurrency={formatCurrency} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CategoryBreakdown insights={insights} formatCurrency={formatCurrency} />
        <ObservationsFeed insights={insights} />
      </div>

    </motion.div>
  );
};