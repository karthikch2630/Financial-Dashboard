import { SummaryCards } from "./SummaryCards";
import { BalanceChart } from "../../components/charts/BalanceCharts";
import { CategoryChart } from "../../components/charts/CategoryCharts";
import { DashboardOverview } from "./DashboardOverview";

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