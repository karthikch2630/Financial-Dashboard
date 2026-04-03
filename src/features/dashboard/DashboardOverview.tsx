import { RecentTrasactions } from "../../components/transactions/RecentTransactions"; // Adjust import path
import { CashFlowGauge } from "../../components/transactions/CashFlowGauge.tsx"; // Adjust import path
import { ArrowRight } from "lucide-react";


export const DashboardOverview = () => {
  return (
    <div className="w-full space-y-4">
      
      {/* Grid Layout: 2 columns on large screens, stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 🔹 Left Side: Latest Transactions (Takes up 2/3 of space on desktop) */}
        <div className="lg:col-span-2 flex flex-col">
          
          {/* Header matching your reference image */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Latest Transactions</h2>
            <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 group">
              See All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Render your compact table here */}
          <RecentTrasactions />
        </div>

        {/* 🔹 Right Side: The Standout Data Viz (Takes up 1/3 of space on desktop) */}
        <div className="lg:col-span-1 flex flex-col mt-2 lg:mt-0">
          <CashFlowGauge />
        </div>

      </div>
    </div>
  );
};