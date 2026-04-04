import { RecentTransactions } from "../../transactions/components/RecentTransactions"; 
import { CashFlowGauge } from "../charts/CashFlowGauge"; 
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const DashboardOverview = () => {
  return (
    <div className="w-full space-y-4">
      
      {/* Grid Layout: 2 columns on large screens, stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 🔹 Left Side: Latest Transactions */}
        <motion.div 
          // ✅ Animates in from the Top Right!
          initial={{ opacity: 0, x: 30, y: -30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-2 flex flex-col"
        >
          
          {/* Header matching your Light/Dark design system */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              Latest Transactions
            </h2>
            <Link 
              to="/transactions" 
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1 group"
            >
              See All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Render your compact table here */}
          <RecentTransactions />
        </motion.div>

        {/* 🔹 Right Side: The Standout Data Viz */}
        <motion.div 
          // ✅ Animates in from the Top Right with a slight delay for a staggered effect
          initial={{ opacity: 0, x: 40, y: -40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-1 flex flex-col mt-2 lg:mt-0"
        >
          <CashFlowGauge />
        </motion.div>

      </div>
    </div>
  );
};