import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  stats: { income: number; expense: number; net: number };
}

export const TransactionStatsCards = ({ stats }: Props) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.abs(val));

  // ✅ Updated configuration to support Light/Dark Mode perfectly
  const cards = [
    { 
      label: "Filtered Income", 
      val: stats.income, 
      textColor: "text-emerald-600 dark:text-emerald-400", 
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      borderColor: "border-emerald-200 dark:border-emerald-500/20",
      icon: ArrowUpRight,
      prefix: "+ "
    },
    { 
      label: "Filtered Expense", 
      val: stats.expense, 
      textColor: "text-rose-600 dark:text-rose-400", 
      iconColor: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      borderColor: "border-rose-200 dark:border-rose-500/20",
      icon: ArrowDownRight,
      prefix: "- "
    },
    { 
      label: "Net Flow", 
      val: stats.net, 
      textColor: stats.net >= 0 ? "text-indigo-600 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400", 
      iconColor: stats.net >= 0 ? "text-indigo-600 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400",
      bg: stats.net >= 0 ? "bg-indigo-50 dark:bg-indigo-500/10" : "bg-rose-50 dark:bg-rose-500/10",
      borderColor: stats.net >= 0 ? "border-indigo-200 dark:border-indigo-500/20" : "border-rose-200 dark:border-rose-500/20",
      icon: Wallet,
      prefix: stats.net >= 0 ? "+ " : "- "
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((item, i) => (
        <motion.div 
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
          // ✅ Pure Glassmorphism Container
          className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-4 md:p-5 rounded-2xl flex items-center gap-4 shadow-sm dark:shadow-[0_4px_20px_rgba(16,185,129,0.05)] transition-colors duration-300"
        >
          {/* ✅ Icon Container */}
          <div className={`p-2.5 rounded-xl border ${item.bg} ${item.borderColor} transition-colors duration-300`}>
            <item.icon className={`w-5 h-5 ${item.iconColor}`} />
          </div>
          
          {/* ✅ Text Container */}
          <div className="flex flex-col">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 transition-colors duration-300">
              {item.label}
            </p>
            <p className={`text-lg md:text-xl font-black truncate transition-colors duration-300 ${item.textColor}`}>
              {item.prefix}{formatCurrency(item.val)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};