import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

export const PaginationControls = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 sm:pt-6 border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-300">
      
      {/* 🔹 Desktop Text (Hidden on Mobile) */}
      <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">
        Page <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> of {totalPages}
      </p>

      {/* 🔹 Controls Container (Stretches 100% width on Mobile) */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-2">
        
        {/* Prev Button */}
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
          disabled={currentPage === 1} 
          className="flex items-center gap-1 p-2 sm:p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="sm:hidden pr-2 text-sm font-semibold">Prev</span>
        </button>

        {/* 🔹 Mobile Page Indicator (Hidden on Desktop) */}
        <div className="sm:hidden text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">
          <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> / {totalPages}
        </div>

        {/* 🔹 Desktop Page Numbers (Hidden on Mobile, wraps on Tablet) */}
        <div className="hidden sm:flex items-center gap-1 mx-2 flex-wrap justify-center">
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentPage(i + 1)} 
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                currentPage === i + 1 
                  ? "bg-emerald-500 text-white shadow-md dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
          disabled={currentPage === totalPages} 
          className="flex items-center gap-1 p-2 sm:p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all active:scale-95"
        >
          <span className="sm:hidden pl-2 text-sm font-semibold">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};