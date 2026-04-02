import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../../store/transactionStore";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

export const CategoryChart = () => {
  const { transactions } = useTransactionStore();

  const expenses = transactions.filter((t) => t.type === "expense");

  const grouped: Record<string, number> = {};

  expenses.forEach((t) => {
    grouped[t.category] = (grouped[t.category] || 0) + t.amount;
  });

  const data = Object.entries(grouped).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Spending Breakdown</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};