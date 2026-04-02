import {create} from "zustand";
type UIState = {
  search: string;
  category: string;

  setSearch: (s: string) => void;
  setCategory: (c: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  search: "",
  category: "",

  setSearch: (s) => set({ search: s }),
  setCategory: (c) => set({ category: c}),
}));