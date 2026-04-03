import { useRoleStore } from "../../store/roleStore";

export const RoleSwitcher = () => {
  const { role, setRole } = useRoleStore();

  return (
    <div className="flex items-center bg-gray-900 p-1 rounded-full shadow-inner">
      
      {/* Viewer */}
      <button
        onClick={() => setRole("viewer")}
        className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
          role === "viewer"
            ? "bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-black shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Viewer
      </button>

      {/* Admin */}
      <button
        onClick={() => setRole("admin")}
        className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
          role === "admin"
            ? "bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-black shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Admin
      </button>
    </div>
  );
};