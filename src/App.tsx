import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SideBar } from "./layouts/SideBar"; 
import { Header } from "./layouts/Header";
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionPage } from "./pages/TransactionPage";
import { InsightPage } from "./pages/InsightPage";

// 🔹 1. Page Wrapper Component for consistent entry/exit animations
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }} // Fades up and out when leaving
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// 🔹 2. Internal Routes Component (Allows us to use 'useLocation')
const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    // We target the specific scrolling div via its ID
    const scrollContainer = document.getElementById("main-scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    /* mode="wait" ensures the old page fully exits before the new one enters */
    <AnimatePresence mode="wait">
      {/* Providing 'location' and 'key' tells Framer Motion when the route actually changes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/overview" />} />
        
        <Route path="/overview" element={
          <PageWrapper><DashboardPage /></PageWrapper>
        } />
        
        <Route path="/transactions" element={
          <PageWrapper><TransactionPage /></PageWrapper>
        } />
        
        <Route path="/insights" element={
          <PageWrapper><InsightPage /></PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
};

// 🔹 3. The Main App Container
export default function App() {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsDesktopCollapsed(!isDesktopCollapsed);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative">
        
        <SideBar 
          isCollapsed={isDesktopCollapsed} 
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          <div className="p-4 sm:p-6 pb-2">
            <Header toggleSidebar={handleToggleSidebar} />
          </div>

          {/* ✅ CRITICAL: Added id="main-scroll-container" so the hook can find and scroll it */}
          <div 
            id="main-scroll-container" 
            className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-6"
          >
            <div className="max-w-[1600px] mx-auto">
              <AnimatedRoutes />
            </div>
          </div>

        </main>
      </div>
    </Router>
  );
}