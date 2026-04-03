import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, FileSpreadsheet, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
// ✅ Import your custom UI components
import { CustomDatePicker } from "../../components/ui/CustomDatePicker";

type ExportRange = "all" | "current_month" | "last_3_months" | "custom";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (range: ExportRange, customDates?: { from: Date; to: Date }) => void;
}

export const ExportModal = ({ isOpen, onClose, onExport }: ExportModalProps) => {
  const [selectedRange, setSelectedRange] = useState<ExportRange>("current_month");

  // ✅ Switch to Date objects to work better with CustomDatePicker
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const options = [
    { id: "current_month", label: "Current Month", desc: "Transactions from this month only" },
    { id: "last_3_months", label: "Last 3 Months", desc: "Quarterly summary data" },
    { id: "all", label: "All Time", desc: "Full history of your transactions" },
    { id: "custom", label: "Custom Range", desc: "Select a specific start and end date" },
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[70]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white font-display">Export Data</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-900 rounded-xl text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Standard Options */}
            <div className="space-y-2.5 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Select Range</p>
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedRange(option.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${selectedRange === option.id
                      ? "bg-emerald-500/5 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                      : "bg-gray-900/20 border-gray-800/60 hover:border-gray-700"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-colors ${selectedRange === option.id ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-800 text-gray-500"}`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${selectedRange === option.id ? "text-white" : "text-gray-400"}`}>{option.label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{option.desc}</p>
                    </div>
                  </div>
                  {selectedRange === option.id && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>

            {/* ✅ Custom Date Picker Section */}
            <AnimatePresence>
              {selectedRange === "custom" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="p-4 bg-gray-950 border border-gray-800 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      {/* ✅ Updated From Date Picker */}
<div className="flex-1 space-y-2">
  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">From</label>
  <CustomDatePicker
    value={fromDate.toISOString().split('T')[0]} // Changed 'selected' to 'value'
    onChange={(dateString: string) => setFromDate(new Date(dateString))}
  />
</div>

<div className="pt-6 text-gray-700">
  <ArrowRight className="w-4 h-4" />
</div>

{/* ✅ Updated To Date Picker */}
<div className="flex-1 space-y-2">
  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">To</label>
  <CustomDatePicker
    value={toDate.toISOString().split('T')[0]} // Changed 'selected' to 'value'
    onChange={(dateString: string) => setToDate(new Date(dateString))}
  />
</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3.5 bg-gray-950 border border-gray-800 rounded-2xl text-gray-400 font-bold hover:text-white hover:bg-gray-900 transition-all text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => onExport(selectedRange, selectedRange === "custom" ? { from: fromDate, to: toDate } : undefined)}
                className="flex-[2] px-4 py-3.5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-500 shadow-[0_10px_20px_rgba(5,150,105,0.2)] transition-all text-xs uppercase tracking-widest"
              >
                Start Export
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};