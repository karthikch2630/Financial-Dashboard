import { useTransactionStore } from "../store/transactionStore";
import { useUIStore } from "../store/uiStore";

export const useFilteredTransactions = () => {
  const { transactions } = useTransactionStore();
  const { search, category, type, sortBy } = useUIStore();

  return transactions
    .filter((t) => {
      // 1. Filter by Search (checks category name)
      const matchesSearch = search === "" || t.category.toLowerCase().includes(search.toLowerCase());
      
      // 2. Filter by Category
      const matchesCategory = category === "" || t.category === category;
      
      // 3. Filter by Type (Income/Expense) - ✅ This makes the toggle buttons work!
      const matchesType = type === "" || t.type === type;

      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      // 4. Sort the filtered results
      if (sortBy === "amount") {
        return b.amount - a.amount; // Highest amount first
      } else {
        // Default: Sort by Date (Newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
};