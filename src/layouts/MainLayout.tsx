import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const location = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white overflow-hidden relative transition-colors duration-300">
      
      <SideBar isCollapsed={isDesktopCollapsed} />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="p-4 sm:p-6 pb-2">
          <Header toggleSidebar={handleToggleSidebar} />
        </div>

        {/* ✅ Added max-md:pb-24 so content isn't hidden behind the bottom nav */}
        <div 
          id="main-scroll-container" 
          className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-6 max-md:pb-24"
        >
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
};