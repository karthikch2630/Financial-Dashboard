import { useFilteredTransactions } from "../hooks/useFilteredTransactions";
import { useRoleStore } from "../../../store/roleStore";
import { useTransactionStore } from "../../../store/transactionStore";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, TrendingUp, TrendingDown, Inbox } from "lucide-react";
import { format } from "date-fns";

export const RecentTrasactions = () => {
  const allTransactions = useFilteredTransactions();
  const { role } = useRoleStore();
  const { deleteTransaction } = useTransactionStore();

  const recentTransactions = [...allTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  // Compact Empty State
  if (recentTransactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-gray-800 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2"
      >
        <div className="p-3 bg-gray-900/50 rounded-full border border-gray-800">
          <Inbox className="w-6 h-6 text-gray-500" />
        </div>
        <p className="text-gray-400 text-sm font-medium">No transactions found</p>
      </motion.div>
    );
  }

  return (
    // Reduced container padding (p-4 md:p-5) and sharper corners (rounded-2xl)
    <div className="bg-black border border-gray-800 p-4 md:p-5 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          
          {/* 🔹 Table Header - Tighter bottom padding (pb-2.5) */}
          <thead>
            <tr className="border-b border-gray-800/60 text-gray-500 text-xs uppercase tracking-wide">
              <th className="pb-2.5 pl-2 font-semibold">Date</th>
              <th className="pb-2.5 px-2 font-semibold">Category</th>
              <th className="pb-2.5 px-2 font-semibold">Type</th>
              <th className="pb-2.5 px-2 font-semibold text-right">Amount</th>
              {role === "admin" && (
                <th className="pb-2.5 pr-2 font-semibold text-right">Actions</th>
              )}
            </tr>
          </thead>

          {/* 🔹 Table Body - Smaller text base (text-[13px] / text-sm) */}
          <tbody className="text-[13px] md:text-sm">
            <AnimatePresence mode="popLayout">
              {recentTransactions.map((t) => (
                <motion.tr 
                  layout 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -5, transition: { duration: 0.15 } }}
                  key={t.id} 
                  className="border-b border-gray-800/40 hover:bg-gray-900/40 transition-colors last:border-0"
                >
                  
                  {/* Date - Tighter vertical padding (py-2.5) */}
                  <td className="py-2.5 pl-2 text-gray-300 font-medium whitespace-nowrap">
                    {format(new Date(t.date), "MMM dd, yyyy")}
                  </td>
                  
                  {/* Category */}
                  <td className="py-2.5 px-2 text-gray-400 whitespace-nowrap">
                    {t.category}
                  </td>

                  {/* Type Badges - Slimmer padding (px-2 py-0.5) and text-[11px] */}
                  <td className="py-2.5 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] md:text-xs font-semibold tracking-wide border ${
                        t.type === "income"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {t.type === "income" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className={`py-2.5 px-2 text-right font-bold whitespace-nowrap ${t.type === "income" ? "text-emerald-400" : "text-white"}`}>
                    {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* ✅ Actions (Admin Only) */}
                  {role === "admin" && (
                    <td className="py-2.5 pr-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Edit Button - Smaller hit area (p-1.5) and smaller icon (w-3.5 h-3.5) */}
                        <button 
                          onClick={() => console.log("Edit:", t.id)}
                          className="p-1.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-500 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                          title="Edit Transaction"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-500 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all"
                          title="Delete Transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        
                      </div>
                    </td>
                  )}

                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};