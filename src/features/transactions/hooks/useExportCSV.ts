import { startOfMonth, subMonths, endOfDay, startOfDay, format } from "date-fns";
import { type Transaction } from "../../../types/transaction";
import toast from "react-hot-toast";

export const useExportCSV = (filteredTransactions: Transaction[]) => {
  const exportToCSV = (range: "all" | "current_month" | "last_3_months" | "custom", customDates?: { from: Date; to: Date }) => {
    const today = new Date();

    const dataToExport = filteredTransactions.filter((t) => {
      const tDate = new Date(t.date);
      if (range === "current_month") return tDate >= startOfMonth(today) && tDate <= endOfDay(today);
      if (range === "last_3_months") return tDate >= startOfMonth(subMonths(today, 2)) && tDate <= endOfDay(today);
      if (range === "custom" && customDates) return tDate >= startOfDay(customDates.from) && tDate <= endOfDay(customDates.to);
      return true;
    });

    if (dataToExport.length === 0) {
      alert("No transactions found for the selected range.");
      return false; // Failed export
    }

    const headers = ["Date", "Category", "Type", "Amount"];
    const csvRows = dataToExport.map((t) =>
      `"${format(new Date(t.date), "yyyy-MM-dd")}","${t.category}","${t.type}","${t.amount}"`
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FinanceOS_Export_${range}_${format(today, "yyyyMMdd")}.csv`);
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("CSV Exported Successfully!", {
      icon: '📊', 
    });
    
    return true; 
  };

  return { exportToCSV };
};