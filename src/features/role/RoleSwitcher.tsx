import { useRoleStore } from "../../store/roleStore";
import toast from "react-hot-toast";

export const RoleSwitcher = () => {
  const { role, setRole } = useRoleStore();

  const handleRoleChange = (newRole: "admin" | "viewer") => {
    // Prevent triggering state updates and toasts if they click the active role
    if (role === newRole) return; 

    setRole(newRole);
    
    // Trigger the premium toast notification
    toast.success(`Switched to ${newRole === "admin" ? "Admin" : "Viewer"} mode`, {
      icon: newRole === "admin" ? "🛡️" : "👀",
    });
  };

  return (
    <div className="flex items-center bg-gray-900 p-1 rounded-full shadow-inner border border-gray-800">
      
      {/* Viewer */}
      <button
        onClick={() => handleRoleChange("viewer")}
        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
          role === "viewer"
            ? "bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }`}
      >
        Viewer
      </button>

      {/* Admin */}
      <button
        onClick={() => handleRoleChange("admin")}
        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
          role === "admin"
            ? "bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }`}
      >
        Admin
      </button>
    </div>
  );
};