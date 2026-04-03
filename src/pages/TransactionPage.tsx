import { useMemo, useState } from "react";
import { useFilteredTransactions } from "../features/transactions/hooks/useFilteredTransactions";
import { TransactionTable } from "../features/transactions/components/TransactionTable";
import { TransactionFilters } from "../features/transactions/components/TransactionFilters";
import { ExportModal } from "../components/ui/ExportModal";
import { motion, AnimatePresence } from "framer-motion";
import { startOfMonth, subMonths, endOfDay, startOfDay, format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Wallet, ReceiptText, Download, ChevronLeft, ChevronRight } from "lucide-react";

export const TransactionPage = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const filteredTransactions = useFilteredTransactions();

  // 🔹 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // ✅ 1. NEW: Reset logic without useEffect
  // We keep track of the previous length to know when filters changed
  const [prevLength, setPrevLength] = useState(filteredTransactions.length);

  if (filteredTransactions.length !== prevLength) {
    setPrevLength(filteredTransactions.length);
    setCurrentPage(1);
  }

  // ✅ 2. Pagination Logic (Calculated based on the adjusted currentPage)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Safety check: ensure currentPage never exceeds totalPages after filtering
  const activePage = Math.min(currentPage, totalPages || 1);

  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // ... rest of your code
  // ✅ Dynamic Statistics for filtered data
  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, net: income - expense };
  }, [filteredTransactions]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);



  const handleExport = (range: "all" | "current_month" | "last_3_months" | "custom", customDates?: { from: Date; to: Date }) => {
    const today = new Date();

    // 1. Filter the transactions based on the selected date range
    const dataToExport = filteredTransactions.filter((t) => {
      const tDate = new Date(t.date);

      if (range === "current_month") {
        return tDate >= startOfMonth(today) && tDate <= endOfDay(today);
      }
      else if (range === "last_3_months") {
        // Last 3 months means from the start of the month 2 months ago up to today
        return tDate >= startOfMonth(subMonths(today, 2)) && tDate <= endOfDay(today);
      }
      else if (range === "custom" && customDates) {
        return tDate >= startOfDay(customDates.from) && tDate <= endOfDay(customDates.to);
      }

      return true; // For "all"
    });

    // 2. Prevent empty exports
    if (dataToExport.length === 0) {
      alert("No transactions found for the selected range.");
      return;
    }

    // 3. Generate CSV Content
    const headers = ["Date", "Category", "Type", "Amount"];
    const csvRows = dataToExport.map((t) =>
      `"${format(new Date(t.date), "yyyy-MM-dd")}","${t.category}","${t.type}","${t.amount}"`
    );

    // Combine headers and rows with newlines
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // 4. Trigger the Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FinanceOS_Export_${range}_${format(today, "yyyyMMdd")}.csv`);
    document.body.appendChild(link);

    link.click(); // Programmatically click the link to download

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false); // Close Modal on success
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto space-y-8 pb-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <ReceiptText className="w-5 h-5 text-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Transactions History</h1>
            </div>
            <p className="text-gray-400 text-sm font-medium ml-12">Total {filteredTransactions.length} records found</p>
          </div>
          <button
            onClick={() => setIsExportModalOpen(true)} // ✅ Opens the modal
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:text-white transition-all text-sm font-bold shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filtered Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Filtered Income", val: stats.income, color: "text-emerald-400", icon: ArrowUpRight, bg: "bg-emerald-500/10" },
            { label: "Filtered Expense", val: stats.expense, color: "text-rose-400", icon: ArrowDownRight, bg: "bg-rose-500/10" },
            { label: "Net Flow", val: stats.net, color: stats.net >= 0 ? "text-indigo-400" : "text-rose-400", icon: Wallet, bg: "bg-indigo-500/10" }
          ].map((item, i) => (
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

        {/* 🔹 Static Filter Bar (Moves with the page) */}
        <div className="relative z-10 py-6 px-4 bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-sm">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
              Filter Results
            </h3>
            <TransactionFilters />
          </div>
        </div>

        {/* Table Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TransactionTable transactions={paginatedTransactions} isFullPage={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-gray-800/60">
            <p className="text-sm text-gray-500 font-medium">Page <span className="text-white">{currentPage}</span> of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-400 disabled:opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? "bg-emerald-500 text-white" : "text-gray-500 hover:bg-gray-800"}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-400 disabled:opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <button
        onClick={() => setIsExportModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:text-white transition-all text-sm font-bold shadow-lg"
      >
        <Download className="w-4 h-4" /> Export CSV
      </button>

      {/* Modal placed at the bottom of the component */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </>
  );
};