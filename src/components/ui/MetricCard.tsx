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
      // ✅ Reduced padding on mobile (p-4) so the content has more room to breathe
      className={`relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-black border border-gray-800 rounded-[1.5rem] p-4 md:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[120px] md:min-h-[140px] ${className}`}
    >
      {/* Glassy Wave Background - Restricted width on mobile so it doesn't overlap text */}
      <svg
        viewBox="0 0 120 200"
        preserveAspectRatio="none"
        className="absolute right-0 top-0 h-full w-1/2 max-w-[120px] pointer-events-none z-0 opacity-50 md:opacity-100"
      >
        <path d="M0,0 C60,40 20,120 80,200 L120,200 L120,0 Z" fill="rgba(255, 255, 255, 0.03)" />
        <path d="M30,0 C80,50 40,150 100,200 L120,200 L120,0 Z" fill="rgba(255, 255, 255, 0.02)" />
        <path d="M80,50 L86,56 M86,50 L80,56" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100,90 L106,96 M106,90 L100,96" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M85,150 L91,156 M91,150 L85,156" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 flex flex-col h-full gap-3 md:gap-4">
        
        {/* 🔹 Top Row: Icon + Label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-3">
            {/* Icon Wrapper - Scales perfectly from mobile to desktop */}
            <div className="p-2 md:p-2.5 border-[2px] border-gray-700 bg-gray-800/50 rounded-xl flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Icon className={`w-4 h-4 md:w-5 md:h-5 stroke-[2.5] ${theme.iconColor}`} />
            </div>
            
            {/* Label */}
            <p className="text-[10px] md:text-[11px] font-black tracking-[0.15em] text-gray-500 uppercase leading-none mt-0.5">
              {label}
            </p>
          </div>

          {/* Optional Badge */}
          {badge && (
            <span className="text-[9px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full font-bold uppercase tracking-wider border border-indigo-500/30">
              {badge}
            </span>
          )}
        </div>

        {/* 🔹 Bottom Row: Amount + Sublabel */}
        <div className="flex flex-col mt-auto">
          {/* Amount - Uses 'truncate' so massive numbers don't break the box */}
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-black tracking-tight truncate ${theme.amountColor}`}>
            {amount}
          </h2>
          
          {/* Sublabel */}
          {subLabel && (
            <p className={`text-[10px] md:text-xs font-bold mt-1 truncate ${theme.subLabelColor}`}>
              {subLabel}
            </p>
          )}
        </div>

      </div>
    </motion.div>
  );
};