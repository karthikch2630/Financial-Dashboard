import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../../store/transactionStore";
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
      <div className="bg-gray-950 border border-gray-800 p-3 rounded-xl shadow-2xl flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full shadow-sm" 
          style={{ backgroundColor: data.fill }} 
        />
        <div>
          <p className="text-gray-300 text-xs font-medium uppercase tracking-wider">{data.name}</p>
          <p className="text-white font-bold text-sm">
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

  // ✅ Calculate the "Last 5 Months" boundary
  const now = new Date();
  
  // Start Date: 1st day of the month, 4 months ago (Current month + 4 previous = 5 months total)
  const startDate = new Date(now.getFullYear(), now.getMonth() - 4, 1);
  
  // End Date: Last day of the current month
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Format a clean label like "Dec 2025 - Apr 2026"
  const startLabel = startDate.toLocaleString("default", { month: "short", year: "numeric" });
  const endLabel = endDate.toLocaleString("default", { month: "short", year: "numeric" });
  const dateRangeText = `${startLabel} - ${endLabel}`;

  // ✅ Filter by "expense" AND within the 5-month window
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
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 shadow-lg h-[350px] flex items-center justify-center text-gray-500">
        No expenses recorded for {dateRangeText}.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#0a0a0a] p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-lg h-[350px] sm:h-[400px] flex flex-col"
    >
      <div className="mb-2">
        <h2 className="text-lg font-bold text-white tracking-tight">Top Expenses</h2>
        {/* ✅ Updated subtitle to show the 5-month range */}
        <p className="text-xs sm:text-sm text-gray-500">
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
          <span className="text-[10px] text-gray-500 font-medium uppercase">Total</span>
          <span className="text-base sm:text-lg font-bold text-white">
            {new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(totalExpenses)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center max-h-[60px] overflow-y-auto 
        [&::-webkit-scrollbar]:w-1.5 
        [&::-webkit-scrollbar-track]:bg-transparent 
        [&::-webkit-scrollbar-thumb]:bg-gray-800 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-600"
      >
        {[...sortedChartData].reverse().map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/10 shrink-0">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span className="text-[10px] sm:text-xs font-medium text-gray-300 whitespace-nowrap">{entry.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};