import { useState } from "react";
import { useFilteredTransactions } from "../hooks/useFilteredTransactions";
import { useRoleStore } from "../../../store/roleStore";
import { useTransactionStore } from "../../../store/transactionStore";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, TrendingUp, TrendingDown, Inbox } from "lucide-react";
import { format } from "date-fns";
import { type Transaction } from "../../../types/transaction";
import { EditTransactionModal } from "./EditTransactionModal";
import toast from "react-hot-toast";

interface TransactionTableProps {
  transactions?: Transaction[];
  isFullPage?: boolean;
}

export const TransactionTable = ({ transactions: propTransactions, isFullPage = false }: TransactionTableProps) => {
  const storeTransactions = useFilteredTransactions();
  const { role } = useRoleStore();
  const { deleteTransaction } = useTransactionStore();

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  let displayTransactions = propTransactions || [...storeTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (!isFullPage && !propTransactions) {
    displayTransactions = displayTransactions.slice(0, 7);
  }

  // 🔹 Empty State (Glassmorphism Applied)
  if (displayTransactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-10 rounded-[1.5rem] shadow-lg flex flex-col items-center justify-center gap-3 transition-colors duration-300"
      >
        <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-full border border-gray-200 dark:border-gray-800 transition-colors">
          <Inbox className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">No transactions found</p>
      </motion.div>
    );
  }

  return (
    <>
      {/* 🔹 Pure Glassmorphism Container */}
      <div className="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 p-4 md:p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800/60 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider transition-colors">
                <th className="pb-4 pl-2 font-semibold">Date</th>
                <th className="pb-4 px-2 font-semibold">Category</th>
                <th className="pb-4 px-2 font-semibold">Type</th>
                <th className="pb-4 px-2 font-semibold text-right">Amount</th>
                {role === "admin" && (
                  <th className="pb-4 pr-2 font-semibold text-right">Actions</th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-[13px] md:text-sm">
              <AnimatePresence mode="popLayout">
                {displayTransactions.map((t) => (
                  <motion.tr 
                    layout 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                    key={t.id} 
                    // ✅ Hover effects updated for Light & Dark mode
                    className="border-b border-gray-100 dark:border-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-900/40 transition-colors group last:border-0"
                  >
                    
                    {/* Date */}
                    <td className="py-3.5 pl-2 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap transition-colors">
                      {format(new Date(t.date), "MMM dd, yyyy")}
                    </td>
                    
                    {/* Category */}
                    <td className="py-3.5 px-2 text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">
                      {t.category}
                    </td>

                    {/* Type Badges */}
                    <td className="py-3.5 px-2">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                          t.type === "income"
                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                            : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20"
                        }`}
                      >
                        {t.type === "income" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className={`py-3.5 px-2 text-right font-bold whitespace-nowrap transition-colors ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>
                      {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions (Admin Only) */}
                    {role === "admin" && (
                      <td className="py-3.5 pr-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Edit Button */}
                          <button 
                            onClick={() => setEditingTransaction(t)}
                            className="p-1.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all"
                            title="Edit Transaction"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Delete Button */}
                          <button 
                            onClick={() => {
                              deleteTransaction(t.id);
                              toast.error("Transaction deleted.");
                            }}
                            className="p-1.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-500/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
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

      <EditTransactionModal 
        transaction={editingTransaction} 
        onClose={() => setEditingTransaction(null)} 
      />
    </>
  );
};