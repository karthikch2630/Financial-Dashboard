import { useEffect } from "react"; // ✅ Imported useEffect
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/themeStore"; // ✅ Imported Theme Store

// Layouts
import { MainLayout } from "./layouts/MainLayout";
import { PageWrapper } from "./layouts/PageWrapper";

// Pages
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionPage } from "./pages/TransactionPage";
import { InsightPage } from "./pages/InsightPage";

// The animated routing logic
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/overview" />} />

        <Route path="/overview" element={<PageWrapper><DashboardPage /></PageWrapper>} />
        <Route path="/transactions" element={<PageWrapper><TransactionPage /></PageWrapper>} />
        <Route path="/insights" element={<PageWrapper><InsightPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const { theme } = useThemeStore(); // ✅ Listen to the global theme

  // ✅ Best Practice: Sync HTML document theme at the absolute root of the app
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      {/* ✅ Dynamic Toaster: Now changes colors perfectly based on Light/Dark mode! */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
            color: theme === 'dark' ? '#fff' : '#111827',
            border: theme === 'dark' ? '1px solid #1f2937' : '1px solid #e5e7eb',
            borderRadius: '1rem',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: theme === 'dark' ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: theme === 'dark' ? '#0a0a0a' : '#ffffff' } },
          error: { iconTheme: { primary: '#f43f5e', secondary: theme === 'dark' ? '#0a0a0a' : '#ffffff' } },
        }}
      />

      {/* The entire UI shell wraps around our routes */}
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>

    </Router>
  );
}