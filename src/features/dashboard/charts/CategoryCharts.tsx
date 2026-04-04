import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../../../store/transactionStore";
import { motion } from "framer-motion";

const CATEGORY_COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#fb7185", // Rose
  "#06b6d4", // Cyan
  "#a855f7", // Purple
  "#f97316", // Orange
  "#ec4899", // Pink
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      fill: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      // ✅ Updated Tooltip to match the glassmorphism theme
      <div className="bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border border-emerald-500/20 p-3 rounded-xl shadow-xl flex items-center gap-3 transition-colors">
        <div 
          className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" 
          style={{ backgroundColor: data.fill, color: data.fill }} 
        />
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">{data.name}</p>
          <p className="text-gray-900 dark:text-white font-bold text-sm">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(data.value)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const CategoryChart = () => {
  const { transactions } = useTransactionStore();

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 4, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const startLabel = startDate.toLocaleString("default", { month: "short", year: "numeric" });
  const endLabel = endDate.toLocaleString("default", { month: "short", year: "numeric" });
  const dateRangeText = `${startLabel} - ${endLabel}`;

  const expenses = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return (
      t.type === "expense" &&
      tDate >= startDate &&
      tDate <= endDate
    );
  });

  const grouped: Record<string, number> = {};

  expenses.forEach((t) => {
    grouped[t.category] = (grouped[t.category] || 0) + t.amount;
  });

  const chartData = Object.entries(grouped).map(([name, value], index) => ({
    name,
    value,
    fill: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  }));

  const sortedChartData = [...chartData].sort((a, b) => a.value - b.value);
  const totalExpenses = sortedChartData.reduce((sum, d) => sum + d.value, 0);

  const BASE_RADIUS = 35;     
  const SIZE_INCREMENT = 10;  

  if (sortedChartData.length === 0) {
    return (
      // ✅ Empty state perfectly matched to the pure glassmorphism design
      <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center p-5 sm:p-6 rounded-3xl bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/5 pointer-events-none z-0" />
        <span className="relative z-10 text-gray-500 dark:text-gray-400 font-medium">
          No expenses recorded for {dateRangeText}.
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      // ✅ 1. The Pure Glassmorphism Container applied directly to the motion.div
      className="relative w-full h-[350px] sm:h-[400px] flex flex-col p-5 sm:p-6 rounded-3xl 
      bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl 
      border border-white/60 dark:border-emerald-500/20 
      shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] 
      overflow-hidden transition-colors duration-300"
    >
      {/* ✅ 2. The Emerald Bottom Gradient Layer (Sits behind the chart) */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/5 pointer-events-none z-0" />

      {/* ✅ 3. Ensure the content sits ABOVE the gradient layer using z-10 */}
      <div className="relative z-10 flex flex-col h-full w-full">
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Top Expenses</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-emerald-500/70">
            Categorized spending ({dateRangeText})
          </p>
        </div>

        <div className="flex-1 w-full relative flex items-center justify-center min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              
              {sortedChartData.map((entry, index) => {
                const prevSum = sortedChartData.slice(0, index).reduce((sum, d) => sum + d.value, 0);
                const currentSum = prevSum + entry.value;

                const startAngle = 90 - (prevSum / totalExpenses) * 360;
                const endAngle = 90 - (currentSum / totalExpenses) * 360;

                return (
                  <Pie
                    key={`pie-${index}`}
                    data={[entry]}
                    dataKey="value"
                    innerRadius={25} 
                    outerRadius={BASE_RADIUS + index * SIZE_INCREMENT}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    cornerRadius={6} 
                    stroke="none" 
                  >
                    <Cell fill={entry.fill} className="hover:opacity-80 transition-opacity duration-300 outline-none" />
                  </Pie>
                );
              })}
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-gray-500 dark:text-emerald-500/70 font-medium uppercase">Total</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white drop-shadow-md">
              {new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(totalExpenses)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center max-h-[60px] overflow-y-auto 
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-emerald-500/30
          [&::-webkit-scrollbar-thumb]:rounded-full 
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50"
        >
          {[...sortedChartData].reverse().map((entry, index) => (
            // ✅ Updated badges to blend with the glassmorphism container
            <div key={index} className="flex items-center gap-1.5 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm px-2 py-1 rounded-md border border-white/60 dark:border-emerald-500/20 shadow-sm shrink-0 transition-colors">
              <div className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: entry.fill, color: entry.fill }} />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};