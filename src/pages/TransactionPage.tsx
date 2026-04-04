import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReceiptText, Download } from "lucide-react";

// Hooks
import { useFilteredTransactions } from "../features/transactions/hooks/useFilteredTransactions";
import { useTransactionStats } from "../features/transactions/hooks/useTransactionStats";
import { usePagination } from "../features/transactions/hooks/usePagination";
import { useExportCSV } from "../features/transactions/hooks/useExportCSV";

// Components
import { TransactionTable } from "../features/transactions/components/TransactionTable";
import { TransactionFilters } from "../features/transactions/components/TransactionFilters";
import { TransactionStatsCards } from "../features/transactions/components/TransactionStatsCards";
import { PaginationControls } from "../features/transactions/components/PaginationControls";
import { ExportModal } from "../components/ui/ExportModal";

const ITEMS_PER_PAGE = 7;

export const TransactionPage = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const filteredTransactions = useFilteredTransactions();
  const stats = useTransactionStats(filteredTransactions);
  const { exportToCSV } = useExportCSV(filteredTransactions);
  
  const { currentPage, setCurrentPage, totalPages, startIndex } = usePagination(filteredTransactions.length, ITEMS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleExportSubmit = (
    range: "all" | "current_month" | "last_3_months" | "custom", 
    customDates?: { from: Date; to: Date }
  ) => {
    const success = exportToCSV(range, customDates);
    if (success) setIsExportModalOpen(false);
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
              {/* ✅ Icon Container updated for Light/Dark Emerald Theme */}
              <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-300">
                <ReceiptText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                Transactions History
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium ml-12 transition-colors duration-300">
              Total {filteredTransactions.length} records found
            </p>
          </div>
          
          {/* ✅ Export Button adapted for Glassmorphism & Light/Dark */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-white dark:hover:text-white dark:hover:bg-gray-800 transition-all text-sm font-bold shadow-sm dark:shadow-lg"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Modular Components */}
        <TransactionStatsCards stats={stats} />

        {/* ✅ Filter Wrapper updated to Pure Glassmorphism */}
        <div className="relative z-10 py-6 px-4 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 rounded-[1.5rem] shadow-sm dark:shadow-[0_8px_30px_rgba(16,185,129,0.05)] transition-colors duration-300">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1 transition-colors duration-300">
              Filter Results
            </h3>
            <TransactionFilters />
          </div>
        </div>

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

        <PaginationControls 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      </motion.div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportSubmit}
      />
    </>
  );
};