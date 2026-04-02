import { useUIStore } from "../../store/uiStore";

export const TransactionFilters = () => {
  const { search, category, setSearch, setCategory } = useUIStore();
  const { sortBy, setSortBy } = useUIStore();
  return (

    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search categories.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-lg w-full"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded-lg">

        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>

      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
        className="border p-2 rounded-lg"
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
    </div>
  )
};