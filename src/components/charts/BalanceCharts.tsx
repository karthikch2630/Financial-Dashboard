import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../../store/transactionStore";
import { motion } from "framer-motion";

// ✅ Updated Interface to include an internal key
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
      <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl shadow-2xl">
        <p className="text-gray-400 text-xs font-medium mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }} 
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

// 🔹 Formatter to keep the Y-Axis compact (e.g., 55000 -> 55k)
const compactCurrency = (value: number) => {
  if (value >= 1000000) return `₹${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
};

export const BalanceChart = () => {
  const { transactions } = useTransactionStore();

  // 🔹 Data Processing: Sort chronologically, group by Year-Month, limit to last 11
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
      // ✅ Removed the extreme h-[400px] and let it fill its grid area cleanly
      className="bg-[#0a0a0a] p-5 sm:p-6 rounded-2xl border border-gray-800 shadow-lg w-full h-[350px] sm:h-[400px] flex flex-col"
    >
      <div className="mb-4 sm:mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Cash Flow</h2>
          <p className="text-sm text-gray-500 hidden sm:block">Income vs Expenses trend</p>
        </div>
        <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            Income
          </div>
          <div className="flex items-center gap-1.5 text-rose-400">
            <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185]" />
            Expenses
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {/* ✅ 1. Added bottom: 15 margin to prevent clipping the tilted text */}
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 15 }}>
            <defs>
              <filter id="glow-balance" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <CartesianGrid vertical={false} stroke="#1f2937" strokeDasharray="3 3" />
            
            {/* 🌟 THE FIX IS HERE 🌟 */}
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6b7280", fontSize: 10 }} // Made font slightly smaller for mobile
              tickMargin={10}
              interval={0}        // ✅ Forces ALL months to be visible
              angle={-45}         // ✅ Tilts the text by 45 degrees
              textAnchor="end"    // ✅ Ensures the tilted text aligns nicely with the tick mark
              height={40}         // ✅ Explicitly gives the X-axis vertical space so the text doesn't get cut off
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={compactCurrency} 
              width={60} 
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#374151', strokeWidth: 1 }} />

            <Line
              name="Income"
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
              filter="url(#glow-balance)"
            />

            <Line
              name="Expenses"
              type="monotone"
              dataKey="expense"
              stroke="#fb7185"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#fb7185", stroke: "#fff", strokeWidth: 2 }}
              filter="url(#glow-balance)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};