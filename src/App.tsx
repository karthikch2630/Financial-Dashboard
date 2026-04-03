import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

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
  return (
    <Router>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#0a0a0a',
            color: '#fff',
            border: '1px solid #1f2937',
            borderRadius: '1rem',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#0a0a0a' } },
          error: { iconTheme: { primary: '#f43f5e', secondary: '#0a0a0a' } },
        }}
      />

      {/* The entire UI shell wraps around our routes */}
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>

    </Router>
  );
}