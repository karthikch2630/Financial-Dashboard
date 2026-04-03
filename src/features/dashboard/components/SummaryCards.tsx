import { useTransactionStore } from "../../../store/transactionStore";
import { useRoleStore } from "../../../store/roleStore";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MetricCard } from "../../../components/ui/MetricCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const SummaryCards = () => {
  const { transactions } = useTransactionStore();
  const { role } = useRoleStore();

  const income = transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`grid gap-4 md:gap-5 w-full transition-all duration-500 ease-in-out
      ${role === "admin" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}
    >
      <AnimatePresence mode="popLayout">
        
        {/* 1. Balance Card (Standard width) */}
        <MetricCard 
          key="balance"
          type="balance"
          label="Current Balance"
          amount={formatCurrency(balance)}
          subLabel="Total Available Funds"
        />

        {/* 2. Income Card (Standard width) */}
        <MetricCard 
          key="income" 
          type="income"
          label="Total Income" 
          amount={formatCurrency(income)} 
          subLabel="Cash Inflow"
        />

        {/* 3. Expense Card (Spans full width on mobile if viewer, normal on desktop) */}
        <MetricCard 
          key="expenses" 
          type="expense"
          label="Total Expense" 
          amount={formatCurrency(expenses)} 
          subLabel="Cash Outflow"
          className={role !== "admin" ? "col-span-2 md:col-span-1" : ""}
        />

        {/* 4. Admin Card (Conditional) */}
        {role === "admin" && (
          <MetricCard 
            key="admin" 
            type="admin"
            label="Admin Insights" 
            amount={transactions.length} 
            subLabel="Total Transactions"
            badge="Pro"
          />
        )}

      </AnimatePresence>
    </motion.div>
  );
};