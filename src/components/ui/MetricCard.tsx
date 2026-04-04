import { motion, type Variants } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Activity } from "lucide-react";

// ✅ Updated Themes: Now fully responsive to Light & Dark modes
const cardThemes = {
  balance: {
    icon: Wallet,
    iconColor: "text-gray-700 dark:text-emerald-400",
    amountColor: "text-gray-900 dark:text-white",
    subLabelColor: "text-gray-500 dark:text-emerald-500/70",
    iconBg: "bg-gray-100 dark:bg-emerald-500/10",
    iconBorder: "border-gray-200 dark:border-emerald-500/20",
  },
  income: {
    icon: TrendingUp,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    amountColor: "text-emerald-600 dark:text-emerald-400 drop-shadow-none dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]",
    subLabelColor: "text-emerald-600/80 dark:text-emerald-500/70",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconBorder: "border-emerald-200 dark:border-emerald-500/20",
  },
  expense: {
    icon: TrendingDown,
    iconColor: "text-rose-600 dark:text-rose-400",
    amountColor: "text-rose-600 dark:text-rose-400 drop-shadow-none dark:drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]",
    subLabelColor: "text-rose-600/80 dark:text-rose-500/70",
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconBorder: "border-rose-200 dark:border-rose-500/20",
  },
  admin: {
    icon: Activity,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    amountColor: "text-gray-900 dark:text-white drop-shadow-none dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]",
    subLabelColor: "text-indigo-600/80 dark:text-indigo-400/80",
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconBorder: "border-indigo-200 dark:border-indigo-500/20",
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

interface MetricCardProps {
  type: "balance" | "income" | "expense" | "admin";
  label: string;
  amount: string | number;
  subLabel?: string;
  badge?: string;
  className?: string;
}

export const MetricCard = ({ type, label, amount, subLabel, badge, className = "" }: MetricCardProps) => {
  const theme = cardThemes[type];
  const Icon = theme.icon;

  return (
    <motion.div
      layout
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      // ✅ Pure Glassmorphism Container (Matches the charts perfectly)
      className={`relative overflow-hidden bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] rounded-[1.5rem] p-4 md:p-6 flex flex-col justify-between min-h-[120px] md:min-h-[140px] transition-colors duration-300 ${className}`}
    >
      {/* ✅ Subtle Bottom Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/10 dark:via-emerald-500/0 pointer-events-none z-0" />

      {/* ✅ Glassy Wave Background - Adapted for Light & Dark mode using 'text-gray-900/5 dark:text-white/5' */}
      <svg
        viewBox="0 0 120 200"
        preserveAspectRatio="none"
        className="absolute right-0 top-0 h-full w-1/2 max-w-[120px] pointer-events-none z-0 opacity-50 md:opacity-100 text-gray-900/5 dark:text-white/5 transition-colors"
      >
        <path d="M0,0 C60,40 20,120 80,200 L120,200 L120,0 Z" fill="currentColor" />
        <path d="M30,0 C80,50 40,150 100,200 L120,200 L120,0 Z" fill="currentColor" opacity="0.5" />
        <path d="M80,50 L86,56 M86,50 L80,56" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100,90 L106,96 M106,90 L100,96" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M85,150 L91,156 M91,150 L85,156" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 flex flex-col h-full gap-3 md:gap-4">
        
        {/* 🔹 Top Row: Icon + Label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-3">
            {/* ✅ Icon Wrapper - Dynamically colored based on the theme */}
            <div className={`p-2 md:p-2.5 border-[2px] rounded-xl flex-shrink-0 shadow-sm transition-colors ${theme.iconBorder} ${theme.iconBg}`}>
              <Icon className={`w-4 h-4 md:w-5 md:h-5 stroke-[2.5] transition-colors ${theme.iconColor}`} />
            </div>
            
            {/* Label */}
            <p className="text-[10px] md:text-[11px] font-black tracking-[0.15em] text-gray-500 dark:text-emerald-500/70 uppercase leading-none mt-0.5 transition-colors">
              {label}
            </p>
          </div>

          {/* Optional Badge */}
          {badge && (
            <span className="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30 rounded-full font-bold uppercase tracking-wider transition-colors">
              {badge}
            </span>
          )}
        </div>

        {/* 🔹 Bottom Row: Amount + Sublabel */}
        <div className="flex flex-col mt-auto">
          {/* Amount */}
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-black tracking-tight truncate transition-colors ${theme.amountColor}`}>
            {amount}
          </h2>
          
          {/* Sublabel */}
          {subLabel && (
            <p className={`text-[10px] md:text-xs font-bold mt-1 truncate transition-colors ${theme.subLabelColor}`}>
              {subLabel}
            </p>
          )}
        </div>

      </div>
    </motion.div>
  );
};