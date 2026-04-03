import { useState } from "react"; // ✅ Added useState
import { useFilteredTransactions } from "../hooks/useFilteredTransactions";
import { useRoleStore } from "../../../store/roleStore";
import { useTransactionStore } from "../../../store/transactionStore";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, TrendingUp, TrendingDown, Inbox } from "lucide-react";
import { format } from "date-fns";
import { type Transaction } from "../../../types/transaction";
import { EditTransactionModal } from "./EditTransactionModal";

interface TransactionTableProps {
  transactions?: Transaction[];
  isFullPage?: boolean;
}

export const TransactionTable = ({ transactions: propTransactions, isFullPage = false }: TransactionTableProps) => {
  const storeTransactions = useFilteredTransactions();
  const { role } = useRoleStore();
  const { deleteTransaction } = useTransactionStore();

  // ✅ Add state to track which transaction is currently being edited
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  let displayTransactions = propTransactions || [...storeTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (!isFullPage && !propTransactions) {
    displayTransactions = displayTransactions.slice(0, 7);
  }

  if (displayTransactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-gray-800 p-10 rounded-3xl shadow-lg flex flex-col items-center justify-center gap-3"
      >
        <div className="p-4 bg-gray-900/50 rounded-full border border-gray-800">
          <Inbox className="w-8 h-8 text-gray-500" />
        </div>
        <p className="text-gray-400 font-medium">No transactions found</p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="bg-black border border-gray-800 p-4 md:p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800/60 text-gray-500 text-xs uppercase tracking-wider">
                <th className="pb-4 pl-2 font-semibold">Date</th>
                <th className="pb-4 px-2 font-semibold">Category</th>
                <th className="pb-4 px-2 font-semibold">Type</th>
                <th className="pb-4 px-2 font-semibold text-right">Amount</th>
                {role === "admin" && (
                  <th className="pb-4 pr-2 font-semibold text-right">Actions</th>
                )}
              </tr>
            </thead>

            <tbody className="text-[13px] md:text-sm">
              <AnimatePresence mode="popLayout">
                {displayTransactions.map((t) => (
                  <motion.tr 
                    layout 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                    key={t.id} 
                    className="border-b border-gray-800/40 hover:bg-gray-900/40 transition-colors group"
                  >
                    <td className="py-3.5 pl-2 text-gray-300 font-medium whitespace-nowrap">
                      {format(new Date(t.date), "MMM dd, yyyy")}
                    </td>
                    
                    <td className="py-3.5 px-2 text-gray-400 whitespace-nowrap">
                      {t.category}
                    </td>

                    <td className="py-3.5 px-2">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold border ${
                          t.type === "income"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {t.type === "income" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </td>

                    <td className={`py-3.5 px-2 text-right font-bold whitespace-nowrap ${t.type === "income" ? "text-emerald-400" : "text-white"}`}>
                      {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>

                    {role === "admin" && (
                      <td className="py-3.5 pr-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* ✅ Opens Modal with the specific transaction data */}
                          <button 
                            onClick={() => setEditingTransaction(t)}
                            className="p-1.5 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-500 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          
                          <button 
                            onClick={() => deleteTransaction(t.id)}
                            className="p-1.5 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-500 hover:text-rose-400 hover:border-rose-500/50 transition-all"
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

      {/* ✅ Add the Modal component */}
      <EditTransactionModal 
        transaction={editingTransaction} 
        onClose={() => setEditingTransaction(null)} 
      />
    </>
  );
};