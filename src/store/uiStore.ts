import { create } from "zustand";

type UIState = {
  search: string;
  category: string;
  sortBy: "date" | "amount";
  type: "" | "income" | "expense"; // ✅ include ALL case

  setSearch: (s: string) => void;
  setCategory: (c: string) => void;
  setSortBy: (s: "date" | "amount") => void;
  setType: (t: "" | "income" | "expense") => void;
};

export const useUIStore = create<UIState>((set) => ({
  search: "",
  category: "",
  sortBy: "date",
  type: "", // ✅ default = ALL

  setSearch: (s) => set({ search: s }),
  setCategory: (c) => set({ category: c }),
  setSortBy: (s) => set({ sortBy: s }),
  setType: (t) => set({ type: t }),
}));