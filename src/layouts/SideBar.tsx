import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  BarChart3, 
  X 
} from "lucide-react"; // ✅ Imported X for mobile close button

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;         // ✅ Added mobile state
  onCloseMobile: () => void;     // ✅ Added mobile close function
}

export const SideBar = ({ isCollapsed, isMobileOpen, onCloseMobile }: SidebarProps) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/overview" },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight, path: "/transactions" },
    { id: "insights", label: "Insights", icon: BarChart3, path: "/insights" },
  ];

  return (
    <>
      {/* 🔹 Mobile Backdrop - Clicking the dark area closes the menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 🔹 Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`
          fixed inset-y-0 left-0 z-[90] h-screen bg-[#0a0a0a] border-r border-gray-800 
          flex flex-col shrink-0 select-none overflow-hidden
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          max-md:!w-[260px] /* ✅ Forces full width on mobile regardless of animation */
          ${isMobileOpen ? "translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]" : "-translate-x-full"}
        `}
      >
        {/* 🔹 Logo & Mobile Close Section */}
        <div className="flex items-center justify-between p-6 pt-8 mb-4 h-[90px] shrink-0">
          
          <div className="flex justify-center w-full md:w-auto">
            <AnimatePresence mode="wait">
              {isCollapsed ? (
                <motion.img
                  key="small-logo"
                  src="/logo.png"
                  alt="Logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-10 h-10 object-contain hidden md:block" // Hide small logo on mobile
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

          {/* ✅ Mobile Close Button */}
          <button 
            onClick={onCloseMobile} 
            className="md:hidden p-2 text-gray-500 hover:text-white bg-gray-900 rounded-xl active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🔹 Main Navigation */}
        <div className="flex-1 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onCloseMobile} // ✅ Closes sidebar on mobile when a link is clicked
                className={({ isActive }) => `
                  relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group
                  ${isActive ? "text-emerald-400" : "text-gray-500 hover:text-gray-200 hover:bg-gray-900/50"}
                `}
                title={isCollapsed ? item.label : ""}
              >
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
                      {/* ✅ Text label is always visible on mobile, visible on desktop only if not collapsed */}
                      {(!isCollapsed || isMobileOpen) && (
                        <motion.span
                          initial={{ opacity: 0, filter: "blur(4px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(4px)" }}
                          className="font-semibold text-sm z-10 whitespace-nowrap md:block"
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
    </>
  );
};