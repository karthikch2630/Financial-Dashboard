import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "./components/ui/SideBar"; // Ensure lowercase 'b'
import { Header } from "./components/ui/Header";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { TransactionPage } from "./features/transactions/TransactionPage";

export default function App() {
  // ✅ 1. Lift state here so it persists across all pages
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
        
        {/* 🔹 Sidebar: Always visible on the left */}
        <SideBar isCollapsed={isSidebarCollapsed} />

        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* 🔹 Header: Always visible at the top */}
          <div className="p-4 sm:p-6 pb-2">
            <Header toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
          </div>

          {/* 🔹 Content Area: Only this part changes when the URL changes */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-6">
            <div className="max-w-[1600px] mx-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/overview" />} />
                <Route path="/overview" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                {/* <Route path="/insights" element={<InsightsPage />} /> */}
              </Routes>
            </div>
          </div>

        </main>
      </div>
    </Router>
  );
}