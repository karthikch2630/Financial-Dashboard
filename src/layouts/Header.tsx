import { useState, useEffect } from "react";
import { RoleSwitcher } from "../features/role/RoleSwitcher";
import { useRoleStore } from "../store/roleStore";
import { useThemeStore } from "../store/themeStore"; // ✅ 1. Import your Zustand theme store
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { AddTransactionModal } from "../features/transactions/components/AddTransactionModal";
import { Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { role } = useRoleStore();
  const { theme, toggleTheme } = useThemeStore(); // ✅ 2. Use Zustand instead of local useState
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Make sure the theme actually applies to the HTML document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const springTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 24,
    mass: 0.8
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-4 sm:px-6 h-[76px] 
        bg-white dark:bg-black text-gray-900 dark:text-white shadow-lg rounded-2xl 
        border border-gray-200 dark:border-gray-800 shrink-0 transition-colors duration-300"
      >
        
        {/* 🔹 Left - Menu Toggle & Logo */}
        <div className="flex items-center gap-3 md:gap-5">
          <button 
            onClick={toggleSidebar}
            className="hidden md:block p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src="/logo.png" alt="App Logo" className="w-10 h-10 object-contain" />
          </motion.div>
        </div>

        {/* 🔹 Center */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:block text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          Track your income & expenses easily
        </motion.p>

        {/* 🔹 Right */}
        <motion.div layout className="flex items-center gap-3 sm:gap-4 h-full">
          
          <AnimatePresence mode="popLayout">
            {role === "admin" && (
              <motion.button
                key="add-btn"
                layout
                onClick={() => setIsModalOpen(true)}
                initial={{ opacity: 0, scale: 0.7, x: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.7, x: 15, filter: "blur(4px)" }}
                transition={springTransition}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 text-sm font-semibold rounded-xl 
                bg-emerald-600 text-white border border-emerald-400/50
                shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] 
                transition-all whitespace-nowrap"
              >
                <span className="text-lg leading-none mb-[2px]">+</span>
                <span className="hidden sm:inline">Add Transaction</span>
              </motion.button>
            )}
          </AnimatePresence>

          <motion.div layout transition={springTransition}>
            <RoleSwitcher />
          </motion.div>

          {/* Theme Toggle */}
          <motion.button 
            layout 
            transition={springTransition}
            onClick={toggleTheme} // ✅ 3. Call the Zustand toggle function directly
            className="p-2 sm:p-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-500/10 transition-all"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

        </motion.div>
      </motion.header>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};