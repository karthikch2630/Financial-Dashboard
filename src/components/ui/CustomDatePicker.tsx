import { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, isAfter, endOfDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export const CustomDatePicker = ({ value, onChange }: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const popupRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDateClick = (day: Date) => {
    onChange(format(day, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* 🔹 The Input Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full bg-gray-950 border text-white text-xs font-bold rounded-xl pl-10 pr-4 py-2.5 flex items-center cursor-pointer transition-all ${isOpen ? "border-indigo-500 ring-1 ring-indigo-500/20" : "border-white/10 hover:border-white/20"}`}
      >
        <CalendarIcon className={`absolute left-3 w-4 h-4 transition-colors ${isOpen ? 'text-indigo-400' : 'text-gray-500'}`} />
        <span className="truncate">
          {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select Date"}
        </span>
      </div>

      {/* 🔹 The Calendar Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 z-[100] p-4 bg-[#111] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] w-[260px] select-none"
          >
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="p-1 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-[13px] font-bold text-white tracking-tight">
                {format(currentMonth, "MMMM yyyy")}
              </div>
              <button onClick={nextMonth} className="p-1 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-[10px] font-black text-gray-600 text-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isTodayDate = isToday(day);
                
                // ✅ Logic to disable future dates
                const isFutureDate = isAfter(day, endOfDay(new Date()));

                return (
                  <button
                    key={idx}
                    type="button"
                    // ✅ Prevent click if date is in the future
                    onClick={() => !isFutureDate && handleDateClick(day)}
                    disabled={isFutureDate}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg text-[11px] transition-all
                      ${!isCurrentMonth || isFutureDate ? "text-gray-800 pointer-events-none" : "text-gray-300 hover:bg-white/10"}
                      ${isTodayDate && !isSelected ? "text-indigo-400 font-bold underline decoration-2 underline-offset-2" : ""}
                      ${isSelected ? "bg-indigo-600 font-bold !text-white shadow-lg" : ""}
                    `}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};