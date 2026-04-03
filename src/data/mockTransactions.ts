import { type Transaction } from "../types/transaction";

export const mockTransactions: Transaction[] = [
  // ==========================================
  // 📉 MAY 2025 - Normal Month
  // ==========================================
  { id: "201", date: "2025-05-01", amount: 55000, category: "Salary", type: "income" },
  { id: "202", date: "2025-05-04", amount: 15000, category: "Rent", type: "expense" },
  { id: "203", date: "2025-05-10", amount: 4000, category: "Groceries", type: "expense" },
  { id: "204", date: "2025-05-15", amount: 1500, category: "Utilities", type: "expense" },
  { id: "205", date: "2025-05-22", amount: 1000, category: "Transport", type: "expense" },
  { id: "206", date: "2025-05-28", amount: 2000, category: "Food", type: "expense" },

  // ==========================================
  // 🚨 JUNE 2025 - EXPENSES CROSS INCOME
  // ==========================================
  { id: "207", date: "2025-06-01", amount: 55000, category: "Salary", type: "income" },
  { id: "208", date: "2025-06-03", amount: 15000, category: "Rent", type: "expense" },
  { id: "209", date: "2025-06-12", amount: 45000, category: "Healthcare", type: "expense" }, // Medical Emergency
  { id: "210", date: "2025-06-18", amount: 3000, category: "Groceries", type: "expense" },
  { id: "211", date: "2025-06-25", amount: 1200, category: "Utilities", type: "expense" },

  // ==========================================
  // 📈 JULY 2025 - Recovery Month
  // ==========================================
  { id: "212", date: "2025-07-01", amount: 55000, category: "Salary", type: "income" },
  { id: "213", date: "2025-07-05", amount: 15000, category: "Rent", type: "expense" },
  { id: "214", date: "2025-07-10", amount: 5000, category: "Freelance", type: "income" },
  { id: "215", date: "2025-07-16", amount: 3500, category: "Groceries", type: "expense" },
  { id: "216", date: "2025-07-21", amount: 5000, category: "Transport", type: "expense" }, 
  { id: "217", date: "2025-07-28", amount: 1800, category: "Utilities", type: "expense" },

  // ==========================================
  // 📉 AUGUST 2025 - High Income Month
  // ==========================================
  { id: "218", date: "2025-08-01", amount: 55000, category: "Salary", type: "income" },
  { id: "219", date: "2025-08-03", amount: 15000, category: "Rent", type: "expense" },
  { id: "220", date: "2025-08-09", amount: 8000, category: "Other", type: "income" },
  { id: "221", date: "2025-08-14", amount: 4200, category: "Groceries", type: "expense" },
  { id: "222", date: "2025-08-20", amount: 1500, category: "Transport", type: "expense" },
  { id: "223", date: "2025-08-26", amount: 3000, category: "Food", type: "expense" },

  // ==========================================
  // 🚨 SEPTEMBER 2025 - EXPENSES CROSS INCOME
  // ==========================================
  { id: "224", date: "2025-09-01", amount: 55000, category: "Salary", type: "income" },
  { id: "225", date: "2025-09-04", amount: 15000, category: "Rent", type: "expense" },
  { id: "226", date: "2025-09-11", amount: 40000, category: "Healthcare", type: "expense" }, // Medical Emergency
  { id: "227", date: "2025-09-19", amount: 3000, category: "Groceries", type: "expense" },
  { id: "228", date: "2025-09-27", amount: 1400, category: "Utilities", type: "expense" },

  // ==========================================
  // 📉 OCTOBER 2025
  // ==========================================
  { id: "229", date: "2025-10-01", amount: 55000, category: "Salary", type: "income" },
  { id: "230", date: "2025-10-03", amount: 15000, category: "Rent", type: "expense" },
  { id: "231", date: "2025-10-15", amount: 12000, category: "Healthcare", type: "expense" }, 
  { id: "232", date: "2025-10-20", amount: 4500, category: "Groceries", type: "expense" },
  { id: "233", date: "2025-10-28", amount: 1200, category: "Transport", type: "expense" },

  // ==========================================
  // 📉 NOVEMBER 2025
  // ==========================================
  { id: "101", date: "2025-11-01", amount: 55000, category: "Salary", type: "income" },
  { id: "102", date: "2025-11-03", amount: 15000, category: "Rent", type: "expense" },
  { id: "103", date: "2025-11-05", amount: 3500, category: "Groceries", type: "expense" },
  { id: "104", date: "2025-11-12", amount: 1200, category: "Utilities", type: "expense" },
  { id: "105", date: "2025-11-18", amount: 2500, category: "Food", type: "expense" },
  { id: "106", date: "2025-11-25", amount: 8000, category: "Freelance", type: "income" },

  // ==========================================
  // 📉 DECEMBER 2025
  // ==========================================
  { id: "107", date: "2025-12-01", amount: 55000, category: "Salary", type: "income" },
  { id: "108", date: "2025-12-02", amount: 15000, category: "Rent", type: "expense" },
  { id: "109", date: "2025-12-08", amount: 18000, category: "Healthcare", type: "expense" }, 
  { id: "110", date: "2025-12-15", amount: 1800, category: "Transport", type: "expense" },
  { id: "111", date: "2025-12-20", amount: 15000, category: "Bonus", type: "income" }, 
  { id: "112", date: "2025-12-24", amount: 4000, category: "Food", type: "expense" },

  // ==========================================
  // 📉 JANUARY 2026
  // ==========================================
  { id: "113", date: "2026-01-01", amount: 55000, category: "Salary", type: "income" },
  { id: "114", date: "2026-01-03", amount: 15000, category: "Rent", type: "expense" },
  { id: "115", date: "2026-01-07", amount: 5000, category: "Healthcare", type: "expense" },
  { id: "116", date: "2026-01-14", amount: 1500, category: "Utilities", type: "expense" },
  { id: "117", date: "2026-01-22", amount: 2200, category: "Transport", type: "expense" },
  { id: "118", date: "2026-01-28", amount: 900, category: "Food", type: "expense" }, 

  // ==========================================
  // 📉 FEBRUARY 2026
  // ==========================================
  { id: "119", date: "2026-02-01", amount: 55000, category: "Salary", type: "income" },
  { id: "120", date: "2026-02-04", amount: 15000, category: "Rent", type: "expense" },
  { id: "121", date: "2026-02-10", amount: 2800, category: "Groceries", type: "expense" },
  { id: "122", date: "2026-02-14", amount: 4500, category: "Food", type: "expense" },
  { id: "123", date: "2026-02-19", amount: 12000, category: "Freelance", type: "income" },
  { id: "124", date: "2026-02-25", amount: 1100, category: "Transport", type: "expense" },

  // ==========================================
  // 🚨 MARCH 2026 - EXPENSES CROSS INCOME
  // ==========================================
  { id: "125", date: "2026-03-01", amount: 55000, category: "Salary", type: "income" },
  { id: "126", date: "2026-03-03", amount: 15000, category: "Rent", type: "expense" },
  { id: "127", date: "2026-03-09", amount: 3100, category: "Groceries", type: "expense" },
  { id: "128", date: "2026-03-12", amount: 1500, category: "Refund", type: "income" }, 
  { id: "234", date: "2026-03-15", amount: 38000, category: "Healthcare", type: "expense" }, 
  { id: "129", date: "2026-03-18", amount: 2000, category: "Utilities", type: "expense" },
  { id: "130", date: "2026-03-24", amount: 3500, category: "Transport", type: "expense" },

  // ==========================================
  // 📉 APRIL 2026 (Current Month)
  // ==========================================
  { id: "1", date: "2026-04-01", amount: 50000, category: "Salary", type: "income" },
  { id: "2", date: "2026-04-02", amount: 1200, category: "Food", type: "expense" },
  { id: "3", date: "2026-04-03", amount: 800, category: "Transport", type: "expense" },
  { id: "131", date: "2026-04-05", amount: 15000, category: "Rent", type: "expense" },
  { id: "132", date: "2026-04-08", amount: 2500, category: "Dividends", type: "income" },
  { id: "133", date: "2026-04-10", amount: 4000, category: "Healthcare", type: "expense" },
];