import {create} from "zustand";

export type Role = "viewer" | "admin";

type RoleState = {
  role: Role;
  setRole: (role: Role) => void;
};

export const useRoleStore = create<RoleState>((set) => ({
  role: "viewer",
  setRole: (role) => set({ role }),
}));