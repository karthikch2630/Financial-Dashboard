import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";

export const TransactionTable = () => {
  const transactions = useFilteredTransactions();

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-gray-500 text-center">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow overflow-x-auto">
      <table className="w-full text-left">
        
        <thead>
          <tr className="border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Type</th>
            <th className="p-2 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              
              <td className="p-2">{t.date}</td>
              <td className="p-2">{t.category}</td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    t.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.type}
                </span>
              </td>

              <td className="p-2 text-right font-medium">
                ₹ {t.amount}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};