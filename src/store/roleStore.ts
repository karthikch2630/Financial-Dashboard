import { create } from "zustand";
import { persist } from "zustand/middleware"; 

export type Role = "viewer" | "admin";

type RoleState = {
  role: Role;
  setRole: (role: Role) => void;
};


export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: "viewer",
      setRole: (role) => set({ role }),
    }),
    {
      name: "zorvyn-role", 
    }
  )
);