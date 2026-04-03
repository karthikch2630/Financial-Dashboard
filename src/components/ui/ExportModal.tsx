import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, FileSpreadsheet, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CustomDatePicker } from "./CustomDatePicker";

type ExportRange = "all" | "current_month" | "last_3_months" | "custom";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (range: ExportRange, customDates?: { from: Date; to: Date }) => void;
}

export const ExportModal = ({ isOpen, onClose, onExport }: ExportModalProps) => {
  const [selectedRange, setSelectedRange] = useState<ExportRange>("current_month");
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const options = [
    { id: "current_month", label: "Current Month", desc: "This month only" },
    { id: "last_3_months", label: "Last 3 Months", desc: "Quarterly summary" },
    { id: "all", label: "All Time", desc: "Full history" },
    { id: "custom", label: "Custom Range", desc: "Select dates" },
  ] as const;

 return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            /* ✅ CRITICAL FIX: Changed overflow-hidden to overflow-visible */
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[440px] 
            bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-5 sm:p-8 
            shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[70] overflow-visible" 
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-2xl">
                  <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-none">Export</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">FinanceOS Engine</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedRange(option.id)}
                  className={`flex flex-col gap-2 p-3.5 rounded-[1.5rem] border transition-all text-left relative ${
                    selectedRange === option.id 
                      ? "bg-indigo-500/10 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]" 
                      : "bg-white/[0.03] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Calendar className={`w-4 h-4 ${selectedRange === option.id ? "text-indigo-400" : "text-gray-600"}`} />
                    {selectedRange === option.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className={`font-bold text-xs ${selectedRange === option.id ? "text-white" : "text-gray-400"}`}>{option.label}</p>
                </button>
              ))}
            </div>

            {/* Custom Range Selection */}
            <AnimatePresence>
              {selectedRange === "custom" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  /* ✅ Ensure this container doesn't clip the calendar */
                  className="overflow-visible mb-6" 
                >
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="w-full space-y-1.5">
                        <label className="text-[9px] uppercase font-black text-gray-500 tracking-tighter ml-1">Start Date</label>
                        <CustomDatePicker
                          value={fromDate.toISOString().split('T')[0]}
                          onChange={(val) => setFromDate(new Date(val))}
                        />
                      </div>
                      
                      <div className="hidden sm:block pt-5 text-gray-700">
                         <ArrowRight className="w-4 h-4" />
                      </div>

                      <div className="w-full space-y-1.5">
                        <label className="text-[9px] uppercase font-black text-gray-500 tracking-tighter ml-1">End Date</label>
                        <CustomDatePicker
                          value={toDate.toISOString().split('T')[0]}
                          onChange={(val) => setToDate(new Date(val))}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="flex-1 py-4 text-gray-500 font-bold hover:text-white transition-all text-xs">
                Dismiss
              </button>
              <button 
                onClick={() => onExport(selectedRange, selectedRange === "custom" ? { from: fromDate, to: toDate } : undefined)}
                className="flex-[2.5] py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-500 transition-all text-[11px] uppercase tracking-widest shadow-lg"
              >
                Generate Export
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};