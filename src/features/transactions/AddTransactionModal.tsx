import { useState } from "react";
import { useTransactionStore } from "../../store/transactionStore";
import { transactionSchema } from "../../schemas/transaction.schema";

export const AddTransactionModal = () => {
  const { addTransaction } = useTransactionStore();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = transactionSchema.safeParse({
      ...form,
      category: form.category.trim(),
      amount: Number(form.amount),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    addTransaction({
      id: crypto.randomUUID(), // ✅ better ID
      ...parsed.data,
    });

    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow space-y-3"
    >
      <h2 className="font-semibold">Add Transaction</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full"
      />

      <input
        name="category"
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
      >
        Add Transaction
      </button>
    </form>
  );
};