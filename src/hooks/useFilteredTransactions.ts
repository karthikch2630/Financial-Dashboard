import { useTransactionStore } from "../store/transactionStore";
import { useUIStore } from "../store/uiStore";

export const useFilteredTransactions = () => {
  const { transactions } = useTransactionStore();
  const { search, category, sortBy } = useUIStore();

  let filtered = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category ? t.category === category : true;

    return matchesSearch && matchesCategory;
  });

  // ✅ Sorting logic
  filtered = filtered.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (sortBy === "amount") {
      return b.amount - a.amount;
    }

    return 0;
  });

  return filtered;
};