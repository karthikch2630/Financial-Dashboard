import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../../../store/transactionStore";
import { useThemeStore } from "../../../store/themeStore";
import { motion } from "framer-motion";

interface ChartDataPoint {
  key: string;
  month: string;
  income: number;
  expense: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border border-emerald-500/20 p-4 rounded-xl shadow-xl transition-colors">
        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" 
                style={{ backgroundColor: entry.color, color: entry.color }} 
              />
              <p className="text-sm font-bold" style={{ color: entry.color }}>
                {entry.name}: {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(entry.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const compactCurrency = (value: number) => {
  if (value >= 1000000) return `₹${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
};

export const BalanceChart = () => {
  const { transactions } = useTransactionStore();
  const { theme } = useThemeStore();

  const chartData = [...transactions]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) 
    .reduce((acc: ChartDataPoint[], t) => {
      const date = new Date(t.date);
      const monthYearKey = `${date.getFullYear()}-${date.getMonth()}`; 
      const displayMonth = date.toLocaleDateString("en-IN", { month: "short" }); 
      
      let monthEntry = acc.find((item) => item.key === monthYearKey);
      
      if (!monthEntry) {
        monthEntry = { key: monthYearKey, month: displayMonth, income: 0, expense: 0 };
        acc.push(monthEntry);
      }
      
      if (t.type === "income") monthEntry.income += t.amount;
      else monthEntry.expense += t.amount;
      
      return acc;
    }, [])
    .slice(-11); 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // ✅ 1. The Pure Glassmorphism Container
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
        <div className="mb-4 sm:mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Cash Flow</h2>
            <p className="text-sm text-gray-500 dark:text-emerald-500/70 hidden sm:block">Income vs Expenses trend</p>
          </div>
          <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs font-medium">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Income
            </div>
            <div className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400">
              <div className="w-2 h-2 rounded-full bg-rose-400 dark:bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
              Expenses
            </div>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 15 }}>
              <defs>
                <filter id="glow-balance" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <CartesianGrid 
                vertical={false} 
                stroke={theme === "dark" ? "rgba(16, 185, 129, 0.1)" : "#e5e7eb"} 
                strokeDasharray="3 3" 
              />
              
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: theme === "dark" ? "rgba(16, 185, 129, 0.6)" : "#9ca3af", fontSize: 10 }}
                tickMargin={10}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={40}
              />
              
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: theme === "dark" ? "rgba(16, 185, 129, 0.6)" : "#9ca3af", fontSize: 12 }}
                tickFormatter={compactCurrency} 
                width={60} 
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: theme === 'dark' ? 'rgba(16, 185, 129, 0.3)' : '#e5e7eb', strokeWidth: 1 }} 
              />

              <Line
                name="Income"
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#10b981", stroke: theme === "dark" ? "#0a0a0a" : "#fff", strokeWidth: 2 }}
                filter="url(#glow-balance)"
              />

              <Line
                name="Expenses"
                type="monotone"
                dataKey="expense"
                stroke="#fb7185"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#fb7185", stroke: theme === "dark" ? "#0a0a0a" : "#fff", strokeWidth: 2 }}
                filter="url(#glow-balance)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};