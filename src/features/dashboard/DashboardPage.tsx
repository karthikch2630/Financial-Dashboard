import { SummaryCards } from "./SummaryCards";
import { BalanceChart } from "../../components/charts/BalanceCharts";
import { CategoryChart } from "../../components/charts/CategoryCharts";
import { TransactionTable } from "../../components/transactions/TransactionTable";
import { TransactionFilters } from "../../components/transactions/TransactionFilters";
import { useRoleStore } from "../../store/roleStore";
import { RoleSwitcher } from "../role/RoleSwitcher";
import { AddTransactionModal } from "../transactions/AddTransactionModal";

export const DashboardPage = () => {
  const { role } = useRoleStore();
  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <RoleSwitcher />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <CategoryChart />
      </div>
      {role === "admin" && <AddTransactionModal />}
      {/* Transactions Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Transactions</h2>

        <TransactionFilters />
        <TransactionTable />
      </div>

    </div>
  );
};