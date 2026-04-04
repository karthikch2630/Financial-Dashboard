import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, BarChart3 } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen?: boolean; // Kept so TypeScript doesn't complain, but no longer needed
  onCloseMobile?: () => void;
}

export const SideBar = ({ isCollapsed }: SidebarProps) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/overview" },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight, path: "/transactions" },
    { id: "insights", label: "Insights", icon: BarChart3, path: "/insights" },
  ];

  return (
    <>
      {/* =========================================
          🔹 DESKTOP SIDEBAR (Hidden on Mobile)
          ========================================= */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="hidden md:flex flex-col shrink-0 select-none overflow-hidden h-screen bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 relative z-[90]"
      >
        <div className="flex items-center justify-center p-6 pt-8 mb-4 h-[90px] shrink-0">
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.img
                key="small-logo"
                src="/logo.png"
                alt="Logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <motion.img
                key="full-logo"
                src="/fulllogo.png"
                alt="Full Logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="w-full h-10 object-contain"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={`desktop-${item.id}`}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group
                  ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900/50"}
                `}
                title={isCollapsed ? item.label : ""}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-bg-desktop"
                        className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.05)] z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      />
                    )}
                    <Icon className={`w-5 h-5 shrink-0 z-10 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    <AnimatePresence mode="popLayout">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, filter: "blur(4px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(4px)" }}
                          className="font-semibold text-sm z-10 whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </motion.aside>

      {/* =========================================
          🔹 MOBILE BOTTOM NAV (Hidden on Desktop)
          ========================================= */}
      {/* =========================================
          🔹 MOBILE FLOATING NAV (Hidden on Desktop)
          ========================================= */}
      <div className="md:hidden fixed bottom-4 sm:bottom-4 left-4 right-4 z-[100] pb-[env(safe-area-inset-bottom)]">
        <nav className="flex justify-around items-center h-16 px-2 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border border-gray-200/80 dark:border-gray-800/80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={`mobile-${item.id}`}
                to={item.path}
                className="relative flex items-center justify-center w-full h-full"
              >
                {({ isActive }) => (
                  <>
                    {/* 🔹 Sliding Background Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill-mobile"
                        className="absolute inset-y-1.5 inset-x-1.5 bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200/50 dark:border-emerald-500/20 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      />
                    )}
                    
                    {/* 🔹 Icon & Text Stack */}
                    <div className={`relative z-10 flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
                      isActive ? "text-emerald-700 dark:text-emerald-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}>
                      <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "scale-110" : ""}`} />
                      
                      {/* Hide text when inactive for a cleaner look, show when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span 
                            initial={{ opacity: 0, height: 0, y: 5 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 5 }}
                            className="text-[10px] font-bold tracking-wide"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};