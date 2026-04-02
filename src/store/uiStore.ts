import { create } from "zustand";

type UIState = {
  search: string;
  category: string;
  sortBy: "date" | "amount";

  setSearch: (s: string) => void;
  setCategory: (c: string) => void;
  setSortBy: (s: "date" | "amount") => void;
};

export const useUIStore = create<UIState>((set) => ({
  search: "",
  category: "",
  sortBy: "date", 

  setSearch: (s) => set({ search: s }),
  setCategory: (c) => set({ category: c }),
  setSortBy: (s) => set({ sortBy: s }), 
}));