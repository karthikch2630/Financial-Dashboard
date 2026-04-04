import { useState, useRef, useEffect } from "react";
import { useTransactionStore } from "../../../store/transactionStore";
import { transactionSchema } from "../../../schemas/transaction.schema";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee, Tag, AlertCircle, TrendingUp, TrendingDown, X, ChevronDown } from "lucide-react";
import { CustomDatePicker } from "../../../components/ui/CustomDatePicker";
import toast from "react-hot-toast";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPENSE_CATEGORIES = ["Rent", "Groceries", "Food & Dining", "Transport", "Utilities", "Shopping", "Healthcare", "Entertainment", "Subscriptions", "Travel", "Investments", "Debt Repayment", "Other"];
const INCOME_CATEGORIES = ["Salary", "Freelance", "Bonus", "Dividends", "Sold Items", "Refund", "Other"];

export const AddTransactionModal = ({ isOpen, onClose }: AddTransactionModalProps) => {
  const { addTransaction } = useTransactionStore();

  const [form, setForm] = useState({
    amount: "",
    category: EXPENSE_CATEGORIES[0],
    type: "expense",
    date: new Date().toISOString().split("T")[0], 
  });

  const [error, setError] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    if (isCategoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCategoryOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeToggle = (type: "income" | "expense") => {
    setForm((prev) => ({ 
      ...prev, 
      type,
      category: type === "expense" ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0] 
    }));
    setError(""); 
    setIsCategoryOpen(false); 
  };

  const handleCategorySelect = (cat: string) => {
    setForm(prev => ({ ...prev, category: cat }));
    setIsCategoryOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = transactionSchema.safeParse({
      ...form,
      category: form.category.trim(),
      amount: Number(form.amount),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      ...parsed.data,
    });

    setForm({ 
      amount: "", 
      category: EXPENSE_CATEGORIES[0], 
      type: "expense", 
      date: new Date().toISOString().split("T")[0] 
    });
    setError("");
    toast.success("Transaction added successfully!");
    onClose(); 
  };

  const activeCategories = form.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} 
          // ✅ Background dimming adapts to light/dark
          className="fixed inset-0 z-[150] bg-gray-900/30 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-4 transition-colors duration-300"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()} 
            // ✅ Pure Glassmorphism Modal Container
            className="relative bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-gray-800 shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full max-w-md transition-colors duration-300"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 p-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-8 text-center mt-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Add Transaction</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">Record a new income or expense</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* ✨ Segmented Control: Income / Expense Toggle */}
              <div className="flex p-1.5 bg-gray-100/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-800 relative transition-colors shadow-inner">
                <button
                  type="button"
                  onClick={() => handleTypeToggle("expense")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all z-10 ${
                    form.type === "expense" ? "text-rose-600 dark:text-rose-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <TrendingDown className="w-4 h-4" /> Expense
                </button>
                
                <button
                  type="button"
                  onClick={() => handleTypeToggle("income")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all z-10 ${
                    form.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" /> Income
                </button>

                <motion.div
                  className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl shadow-sm dark:shadow-none ${
                    form.type === "expense" 
                      ? "bg-white dark:bg-rose-500/10 border border-gray-200 dark:border-rose-500/20" 
                      : "bg-white dark:bg-emerald-500/10 border border-gray-200 dark:border-emerald-500/20"
                  }`}
                  animate={{ left: form.type === "expense" ? "6px" : "calc(50%)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </div>

              {/* Error Box */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 p-4 rounded-2xl border border-rose-200 dark:border-rose-500/20 text-sm overflow-hidden transition-colors"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Amount Input */}
              <div className="relative group">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-lg font-medium rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm dark:shadow-inner"
                />
              </div>

              {/* Fully Custom Category Dropdown */}
              <div className="relative group" ref={dropdownRef}>
                <div 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`w-full bg-white/50 dark:bg-gray-900/50 border text-gray-900 dark:text-white rounded-2xl pl-12 pr-4 py-3.5 flex items-center justify-between cursor-pointer transition-all shadow-sm dark:shadow-inner font-medium ${
                    isCategoryOpen ? "border-emerald-500 dark:border-emerald-500 bg-white dark:bg-gray-900" : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <Tag className={`absolute left-4 w-5 h-5 transition-colors ${isCategoryOpen ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  <span className="truncate pr-4">{form.category}</span>
                  <motion.div animate={{ rotate: isCategoryOpen ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 w-full mt-2 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden transition-colors"
                    >
                      <ul className="max-h-56 overflow-y-auto custom-scrollbar 
                        [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent 
                        [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full"
                      >
                        {activeCategories.map((cat) => (
                          <li 
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800/50 last:border-none flex items-center gap-3"
                          >
                            <div className={`w-2 h-2 rounded-full shadow-sm ${form.type === 'expense' ? 'bg-rose-500 dark:shadow-rose-500/50' : 'bg-emerald-500 dark:shadow-emerald-500/50'}`} />
                            {cat}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ✨ Integrated Custom Date Picker */}
              <div className="relative z-10">
                <CustomDatePicker 
                  value={form.date} 
                  onChange={(newDate) => setForm((prev) => ({ ...prev, date: newDate }))} 
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 mt-4 ${
                  form.type === "expense" 
                    ? "bg-rose-600 hover:bg-rose-500 shadow-[0_4px_15px_rgba(225,29,72,0.3)] dark:shadow-[0_0_20px_rgba(225,29,72,0.3)]" 
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-[0_4px_15px_rgba(16,185,129,0.3)] dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                }`}
              >
                {form.type === "expense" ? "Record Expense" : "Record Income"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};