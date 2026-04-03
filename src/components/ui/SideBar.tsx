import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom"; // ✅ Import NavLink
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  BarChart3, 
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
}

export const SideBar = ({ isCollapsed }: SidebarProps) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/overview" },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight, path: "/transactions" },
    { id: "insights", label: "Insights", icon: BarChart3, path: "/insights" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? "80px" : "260px" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="relative hidden md:flex flex-col bg-[#0a0a0a] border-r border-gray-800 h-screen shrink-0 select-none overflow-hidden"
    >
      {/* 🔹 Logo Section */}
      <div className="flex items-center justify-center p-6 pt-8 mb-4 h-[90px] shrink-0">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.img
              key="small-logo"
              src="/logo.png" // ✅ Show small icon when collapsed
              alt="Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <motion.img
              key="full-logo"
              src="/fulllogo.png" // ✅ Show full logo when expanded
              alt="Full Logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="w-full h-10 object-contain"
            />
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Main Navigation using NavLink */}
      <div className="flex-1 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              // ✅ isActive is provided by NavLink automatically
              className={({ isActive }) => `
                relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group
                ${isActive ? "text-emerald-400" : "text-gray-500 hover:text-gray-200 hover:bg-gray-900/50"}
              `}
              title={isCollapsed ? item.label : ""}
            >
              {/* This scope allows us to access isActive for the inner animation too */}
              {({ isActive }) => (
                <>
                  {/* Active Background Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
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
  );
};