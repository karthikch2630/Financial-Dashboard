import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../../store/transactionStore";

export const BalanceChart = () => {
  const { transactions } = useTransactionStore();

  // sort by date
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  

  const data = sorted.reduce((acc, t) => {
  const prevBalance = acc.length ? acc[acc.length - 1].balance : 0;

  const newBalance =
    t.type === "income"
      ? prevBalance + t.amount
      : prevBalance - t.amount;

  acc.push({
    date: t.date,
    balance: newBalance,
  });

  return acc;
}, [] as { date: string; balance: number }[]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Balance Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};