import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

interface Props {
  stats: { income: number; expense: number; net: number };
}

export const TransactionStatsCards = ({ stats }: Props) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  const cards = [
    { label: "Filtered Income", val: stats.income, color: "text-emerald-400", icon: ArrowUpRight, bg: "bg-emerald-500/10" },
    { label: "Filtered Expense", val: stats.expense, color: "text-rose-400", icon: ArrowDownRight, bg: "bg-rose-500/10" },
    { label: "Net Flow", val: stats.net, color: stats.net >= 0 ? "text-indigo-400" : "text-rose-400", icon: Wallet, bg: "bg-indigo-500/10" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((item, i) => (
        <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-2xl flex items-center gap-4">
          <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
            <item.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{item.label}</p>
            <p className={`text-lg font-black ${item.color}`}>{formatCurrency(item.val)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};