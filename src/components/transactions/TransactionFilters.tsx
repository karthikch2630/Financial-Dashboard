import { useState, useRef, useEffect } from "react";
import { useUIStore } from "../../store/uiStore";
import {
  Search, ArrowUpDown, Check, SlidersHorizontal,
  X, CalendarDays, CircleDollarSign, TrendingUp, TrendingDown, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ 1. Split categories exactly based on your mock data
const INCOME_CATEGORIES = [
  "Bonus", "Dividends", "Freelance", "Other", "Refund", "Salary"
];

const EXPENSE_CATEGORIES = [
  "Food", "Groceries", "Healthcare", "Rent", "Transport", "Utilities"
];

const SORT_OPTIONS = [
  { label: "Date", value: "date", icon: CalendarDays },
  { label: "Amount", value: "amount", icon: CircleDollarSign }
] as const;

const TYPE_OPTIONS = [
  { label: "All", value: "", icon: Layers },
  { label: "Income", value: "income", icon: TrendingUp },
  { label: "Expense", value: "expense", icon: TrendingDown }
] as const;

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.02 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export const TransactionFilters = () => {
  const { search, category, type, setSearch, setCategory, setType } = useUIStore();
  const { sortBy, setSortBy } = useUIStore();

  const [openDropdown, setOpenDropdown] = useState<"filters" | "sort" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: "filters" | "sort") => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const activeFilterCount = (category !== "" ? 1 : 0) + (type !== "" ? 1 : 0);

  // ✅ 2. Determine which categories to show based on the selected Type
  const displayCategories = type === "income" 
    ? INCOME_CATEGORIES 
    : type === "expense" 
      ? EXPENSE_CATEGORIES 
      : [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].sort(); // Combine and sort alphabetically for 'All'

  return (
    <div className="flex items-center gap-2 w-full" ref={containerRef}>

      {/* 🔹 1. Smart Search Bar */}
      <div className="relative group flex-1 z-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black border border-gray-800 text-white font-medium rounded-2xl pl-10 md:pl-12 pr-10 py-2.5 md:py-3.5 focus:outline-none focus:border-emerald-500 focus:bg-gray-900/50 transition-all placeholder:text-gray-600 shadow-inner text-sm md:text-base"
        />
        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 2. Unified Filters Panel */}
      <div className="relative z-20">
        <button
          onClick={() => toggleDropdown("filters")}
          className={`relative flex items-center gap-2 px-3 md:px-5 py-2.5 md:py-3.5 rounded-2xl border transition-all text-sm font-medium shadow-inner ${openDropdown === "filters" || activeFilterCount > 0
              ? "bg-gray-900 border-gray-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.05)]"
              : "bg-black border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-900/50"
            }`}
        >
          <SlidersHorizontal className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${openDropdown === "filters" ? "text-emerald-400" : ""}`} />
          <span className="hidden sm:inline tracking-wide">Filters</span>

          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)] border border-black"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {openDropdown === "filters" && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-[290px] sm:w-[340px] bg-black/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-[100] flex flex-col"
            >
              {/* ✨ Segmented Control for Type */}
              <div className="p-4 border-b border-gray-800/60 bg-gray-900/40">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Transaction Type</h3>
                
                <div className="flex p-1 bg-black rounded-xl border border-gray-800 relative shadow-inner">
                  {TYPE_OPTIONS.map((opt) => {
                    const isActive = type === opt.value;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setType(opt.value as "" | "income" | "expense");
                          setCategory(""); // ✅ Clear category if they switch tabs so it doesn't get stuck on invalid combos
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all z-10 ${isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                          }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive && opt.value === 'income' ? 'text-emerald-400' : isActive && opt.value === 'expense' ? 'text-rose-400' : ''}`} />
                        {opt.label}
                      </button>
                    );
                  })}

                  <div
                    className="absolute top-1 bottom-1 w-[calc(33.33%-2px)] rounded-lg bg-gray-800 border border-gray-700 shadow-md transition-all duration-300 ease-out"
                    style={{
                      left: type === "" ? "4px" : type === "income" ? "calc(33.33% + 2px)" : "calc(66.66% - 1px)"
                    }}
                  />
                </div>
              </div>

              {/* ✨ Staggered Category List */}
              <div className="p-2 py-3">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-3">Category</h3>
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="max-h-56 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full pr-1"
                >
                  <motion.li
                    variants={itemVariants}
                    onClick={() => {
                      setCategory("");
                      setOpenDropdown(null);
                    }}
                    className={`px-3 py-2.5 mx-1 mb-1 text-sm font-medium rounded-xl cursor-pointer transition-colors flex items-center justify-between group ${category === "" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 border border-transparent"
                      }`}
                  >
                    All Categories
                    {category === "" && <Check className="w-4 h-4 text-emerald-400" />}
                  </motion.li>

                  {/* ✅ 3. Map over the dynamic 'displayCategories' array */}
                  {displayCategories.map((cat) => (
                    <motion.li
                      variants={itemVariants}
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setOpenDropdown(null);
                      }}
                      className={`px-3 py-2.5 mx-1 mb-1 text-sm font-medium rounded-xl cursor-pointer transition-all flex items-center justify-between ${category === cat ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 border border-transparent"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${category === cat ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                        {cat}
                      </div>
                      {category === cat && <Check className="w-4 h-4 text-emerald-400" />}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 3. Sort Button & Dropdown */}
      <div className="relative z-20">
        <button
          onClick={() => toggleDropdown("sort")}
          className={`flex items-center justify-center p-2.5 md:p-3.5 rounded-2xl border transition-all shadow-inner ${openDropdown === "sort"
              ? "bg-gray-900 border-gray-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.05)]"
              : "bg-black border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-900/50"
            }`}
        >
          <ArrowUpDown className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${openDropdown === "sort" ? "text-emerald-400" : ""}`} />
        </button>

        <AnimatePresence>
          {openDropdown === "sort" && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-[180px] bg-black/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-[100]"
            >
              <ul className="flex flex-col p-1.5">
                {SORT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <li
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setOpenDropdown(null); }}
                      className={`px-3 py-3 text-sm font-medium rounded-xl cursor-pointer transition-colors flex items-center justify-between ${sortBy === opt.value ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/20" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 border border-transparent"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${sortBy === opt.value ? 'text-emerald-400' : 'text-gray-500'}`} />
                        {opt.label}
                      </div>
                      {sortBy === opt.value && <Check className="w-4 h-4 text-emerald-400" />}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};