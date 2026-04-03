import { Sparkles, TrendingDown, AlertCircle, Flame } from "lucide-react";
import { type InsightsData } from "../hooks/useInsightsData";

interface Props {
  insights: InsightsData;
}

export const ObservationsFeed = ({ insights }: Props) => {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        Automated Observations
      </h3>

      <div className="space-y-4">
        {/* Observation 1 */}
        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl flex gap-4 items-start">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0 mt-0.5"><TrendingDown className="w-4 h-4" /></div>
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
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl shrink-0 mt-0.5"><AlertCircle className="w-4 h-4" /></div>
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
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl shrink-0 mt-0.5"><Flame className="w-4 h-4" /></div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Category Dominance</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              {insights.highestCategory[0] !== "None" 
                ? `Your top category (${insights.highestCategory[0]}) makes up ${((insights.highestCategory[1] / insights.thisMonthExpense) * 100).toFixed(0)}% of your total monthly spend.`
                : "Add some expenses to see category dominance insights."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};