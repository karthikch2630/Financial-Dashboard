import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Receipt } from "lucide-react";
import { useTransactionStore } from "../../../store/transactionStore";
import { type Transaction } from "../../../types/transaction";
import { CustomDatePicker } from "../../../components/ui/CustomDatePicker";
import toast from "react-hot-toast";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

// 🔹 1. The Wrapper: Handles Animations and Null Checks
export const EditTransactionModal = ({ transaction, onClose }: EditTransactionModalProps) => {
  return (
    <AnimatePresence>
      {transaction && (
        <EditModalContent transaction={transaction} onClose={onClose} />
      )}
    </AnimatePresence>
  );
};

// 🔹 2. The Inner Content: Handles State and Form Logic
interface EditModalContentProps {
  transaction: Transaction; // Guaranteed to be a valid transaction here
  onClose: () => void;
}

const EditModalContent = ({ transaction, onClose }: EditModalContentProps) => {
  const { editTransaction } = useTransactionStore();

  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [type, setType] = useState<"income" | "expense">(transaction.type);
  const [date, setDate] = useState(() => {
    const tDate = new Date(transaction.date);
    return tDate.toISOString().split("T")[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    editTransaction(transaction.id, {
      amount: parseFloat(amount),
      category,
      type,
      date,
    });
    toast.success("Transaction edited successfully!");
    onClose(); 
  };

  return (
    <>
      {/* Backdrop (Adapts to Light/Dark) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-gray-900/30 dark:bg-black/70 backdrop-blur-md z-[150] transition-colors duration-300"
      />

      {/* Pure Glassmorphism Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md 
        bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/50 dark:border-gray-800 
        rounded-[2.5rem] p-6 sm:p-8 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-[160] overflow-visible transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* ✅ Changed from Blue to Emerald to match the theme */}
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 transition-colors">
              <Receipt className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-none transition-colors">Edit Record</h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Segmented Type Selection */}
          <div className="flex p-1.5 bg-gray-100/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-800 transition-colors shadow-inner">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
                type === "income" 
                  ? "bg-white dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-emerald-500/20 shadow-sm dark:shadow-none" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
                type === "expense" 
                  ? "bg-white dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-gray-200 dark:border-rose-500/20 shadow-sm dark:shadow-none" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent"
              }`}
            >
              Expense
            </button>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 tracking-widest ml-1 transition-colors">Amount</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors">₹</span>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl pl-8 pr-4 py-3 text-gray-900 dark:text-white font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all shadow-sm dark:shadow-inner"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 tracking-widest ml-1 transition-colors">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all shadow-sm dark:shadow-inner"
              placeholder="e.g. Food, Rent, Salary..."
            />
          </div>

          {/* Date */}
          <div className="space-y-1.5 pb-2 relative z-10">
            <label className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-400 tracking-widest ml-1 transition-colors">Date</label>
            <CustomDatePicker
              value={date}
              onChange={(val) => setDate(val)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-600 dark:text-gray-400 font-bold hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-sm"
            >
              Cancel
            </button>
            {/* ✅ Changed from Blue to Emerald */}
            <button 
              type="submit" 
              className="flex-[2] py-3.5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-500 shadow-[0_4px_15px_rgba(16,185,129,0.3)] dark:shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all text-sm uppercase tracking-widest"
            >
              Save Changes
            </button>
          </div>

        </form>
      </motion.div>
    </>
  );
};