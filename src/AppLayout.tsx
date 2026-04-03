// import { useState } from "react";
// import { Header } from "./components/ui/Header";
// import { SideBar } from "./components/ui/SideBar";

// export const AppLayout = ({ children }: { children: React.ReactNode }) => {
//   // Shared state: controls if sidebar is expanded (260px) or collapsed to icons (80px)
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
//       {/* Sidebar receives the state */}
//       <SideBar isCollapsed={isSidebarCollapsed} />

//       <main className="flex-1 flex flex-col h-full overflow-hidden relative">
//         <div className="p-4 sm:p-6 pb-2">
//           {/* Header receives the toggle function */}
//           <Header toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
//         </div>
        
//         <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-6">
//           {children} {/* Your dashboard page goes here */}
//         </div>
//       </main>
//     </div>
//   );
// };