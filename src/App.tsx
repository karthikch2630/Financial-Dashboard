import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "./components/ui/SideBar"; 
import { Header } from "./components/ui/Header";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { TransactionPage } from "./features/transactions/TransactionPage";
import { InsightsPage } from "./pages/InsightPage";

export default function App() {
  // ✅ State for Desktop Sidebar (Expanded/Collapsed)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  
  // ✅ State for Mobile Slide-in Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔹 Smart Toggle: Checks screen width to trigger the correct animation
  const handleToggleSidebar = () => {
    if (window.innerWidth >= 768) {
      // On Desktop: Collapse/Expand
      setIsDesktopCollapsed(!isDesktopCollapsed);
    } else {
      // On Mobile: Slide In
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative">
        
        {/* 🔹 Sidebar */}
        <SideBar 
          isCollapsed={isDesktopCollapsed} 
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* 🔹 Header using the Smart Toggle */}
          <div className="p-4 sm:p-6 pb-2">
            <Header toggleSidebar={handleToggleSidebar} />
          </div>

          {/* 🔹 Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-6">
            <div className="max-w-[1600px] mx-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/overview" />} />
                <Route path="/overview" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/insights" element={<InsightsPage />} />
              </Routes>
            </div>
          </div>

        </main>
      </div>
    </Router>
  );
}