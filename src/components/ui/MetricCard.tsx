import { motion, type Variants } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Activity } from "lucide-react";

// Centralized Theme & Icon Logic
const cardThemes = {
  balance: {
    icon: Wallet,
    iconColor: "text-white",
    amountColor: "text-white",
    subLabelColor: "text-emerald-400",
  },
  income: {
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    amountColor: "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]",
    subLabelColor: "text-emerald-500",
  },
  expense: {
    icon: TrendingDown,
    iconColor: "text-rose-400",
    amountColor: "text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]",
    subLabelColor: "text-rose-500",
  },
  admin: {
    icon: Activity,
    iconColor: "text-indigo-400",
    amountColor: "text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]",
    subLabelColor: "text-indigo-400",
  }
};

// ✨ FIXED: Added explicit ': Variants' type so TypeScript knows "spring" is a specific animation type
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
      className={`relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-black border border-gray-800 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-center min-h-[140px] ${className}`}
    >
      {/* Glassy Wave & Crosses Background */}
      <svg
        viewBox="0 0 120 200"
        preserveAspectRatio="none"
        className="absolute right-0 top-0 h-full w-[120px] pointer-events-none z-0"
      >
        <path d="M0,0 C60,40 20,120 80,200 L120,200 L120,0 Z" fill="rgba(255, 255, 255, 0.03)" />
        <path d="M30,0 C80,50 40,150 100,200 L120,200 L120,0 Z" fill="rgba(255, 255, 255, 0.02)" />
        
        <path d="M80,50 L86,56 M86,50 L80,56" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100,90 L106,96 M106,90 L100,96" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M85,150 L91,156 M91,150 L85,156" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 flex flex-col justify-center h-full">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs md:text-sm font-bold tracking-[0.15em] text-gray-500 uppercase">
            {label}
          </p>
          {badge && (
            <span className="text-[10px] px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full font-bold uppercase tracking-wider border border-indigo-500/30">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          {/* Icon */}
          <div className="p-3 md:p-3.5 border-[2px] border-gray-700 bg-gray-800/50 rounded-2xl flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Icon className={`w-7 h-7 md:w-8 md:h-8 stroke-[2] ${theme.iconColor}`} />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <h2 className={`text-3xl md:text-4xl font-black tracking-tight ${theme.amountColor}`}>
              {amount}
            </h2>
            {subLabel && (
              <p className={`text-xs md:text-sm font-semibold mt-1 ${theme.subLabelColor}`}>
                {subLabel}
              </p>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};