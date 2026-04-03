import { SummaryCards } from "../features/dashboard/components/SummaryCards";
import { BalanceChart } from "../features/dashboard/charts/BalanceCharts";
import { CategoryChart } from "../features/dashboard/charts/CategoryCharts";
import { DashboardOverview } from "../features/dashboard/components/DashboardOverview";

export const DashboardPage = () => {
  return (
    // ✅ Remove the Sidebar and Header from here. Just return the content.
    <div className="space-y-6 md:space-y-8">
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <CategoryChart />
      </div>
      
      <DashboardOverview />
    </div>
  );
};