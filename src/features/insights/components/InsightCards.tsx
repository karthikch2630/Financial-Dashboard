import { TrendingUp, TrendingDown, Flame, Sparkles } from "lucide-react";
import {type InsightsData } from "../hooks/useInsightsData";

interface Props {
  insights: InsightsData;
  formatCurrency: (val: number) => string;
}

export const InsightCards = ({ insights, formatCurrency }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {/* Savings Rate Card */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp className="w-24 h-24 text-emerald-500 transform rotate-12" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Savings Rate</p>
        <h3 className="text-4xl font-black text-white">{insights.savingsRate.toFixed(1)}%</h3>
        <p className="text-sm text-gray-400 mt-4 font-medium">
          {insights.savingsRate > 20 ? <span className="text-emerald-400">Excellent! You are saving a healthy amount.</span> : "Try to aim for a 20% savings rate this month."}
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
          You spent <span className="text-rose-400 font-bold">{formatCurrency(insights.highestCategory[1])}</span> here this month.
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
  );
};