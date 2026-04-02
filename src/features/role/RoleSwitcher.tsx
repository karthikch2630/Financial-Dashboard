import { useRoleStore, type Role } from "../../store/roleStore";

export const RoleSwitcher = () => {
  const { role, setRole } = useRoleStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Role:</span>

      <select
        value={role}
        onChange={handleChange}
        className="border p-2 rounded-lg"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};