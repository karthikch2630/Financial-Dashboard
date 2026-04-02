import { useTransactionStore } from "../../store/transactionStore";

export const SummaryCards = () => {
  const { transactions} = useTransactionStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">

      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Total Balance</p>
        <h2 className="text-2xl font-bold">{formatCurrency(balance)}</h2>
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Income</p>
        <h2 className="text-2xl font-bold text-green-600">
          {formatCurrency(income)}
        </h2>
      </div>

     <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Expenses</p>
        <h2 className="text-2xl font-bold text-red-600">
           {formatCurrency(expenses)}
        </h2>
      </div>
    </div>
  )

}