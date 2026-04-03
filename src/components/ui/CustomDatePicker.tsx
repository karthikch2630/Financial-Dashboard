import { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
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

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Calendar Logic
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
    <div className="relative group" ref={popupRef}>
      {/* 🔹 The Input Trigger */}
      <CalendarIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10 pointer-events-none ${isOpen ? 'text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-400'}`} />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-900/50 border text-white font-medium rounded-2xl pl-12 pr-4 py-3.5 
        flex items-center justify-between cursor-pointer transition-all shadow-inner
        ${isOpen ? "border-indigo-500 bg-gray-900" : "border-gray-800 hover:border-gray-700"}`}
      >
        <span>{selectedDate ? format(selectedDate, "PPP") : "Select a date"}</span>
      </div>

      {/* 🔹 The Calendar Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full mb-3 left-0 z-50 p-5 bg-[#0a0a0a] border border-gray-800 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] w-[320px]"
          >
            {/* Header: Month / Year / Arrows */}
            <div className="flex justify-between items-center mb-6 px-1">
              <button onClick={prevMonth} className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800">
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2 text-white font-semibold text-lg tracking-wide">
                <span>{format(currentMonth, "MMMM")}</span>
                <span className="text-gray-400">{format(currentMonth, "yyyy")}</span>
              </div>

              <button onClick={nextMonth} className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
              {days.map((day, idx) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    className={`
                      w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm transition-all duration-200
                      ${!isCurrentMonth ? "text-gray-700 hover:text-gray-400" : "text-gray-200 hover:bg-gray-800"}
                      ${isTodayDate && !isSelected ? "text-indigo-400 font-bold" : ""}
                      ${isSelected ? "bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.4)]" : ""}
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