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

  // ✅ Initialize state directly from the prop! No useEffect needed.
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

    // Call the store function
    editTransaction(transaction.id, {
      amount: parseFloat(amount),
      category,
      type,
      date,
    });
    toast.success("Trasaction edited succesfully!");
    onClose(); // Close modal after saving
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md 
        bg-[#0a0a0a] border border-gray-800 rounded-[2.5rem] p-6 sm:p-8 
        shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-[90] overflow-visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Receipt className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-none">Edit Record</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Type Selection */}
          <div className="flex p-1 bg-gray-900 border border-gray-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
                type === "income" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
                type === "expense" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Expense
            </button>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-8 pr-4 py-3 text-white font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="e.g. Food, Rent, Salary..."
            />
          </div>

          {/* Date */}
          <div className="space-y-1.5 pb-2">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Date</label>
            <CustomDatePicker
              value={date}
              onChange={(val) => setDate(val)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 bg-gray-900 border border-gray-800 rounded-2xl text-gray-400 font-bold hover:text-white transition-all text-sm">
              Cancel
            </button>
            <button type="submit" className="flex-[2] py-3.5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 shadow-[0_10px_20px_rgba(59,130,246,0.2)] transition-all text-sm uppercase tracking-widest">
              Save Changes
            </button>
          </div>

        </form>
      </motion.div>
    </>
  );
};