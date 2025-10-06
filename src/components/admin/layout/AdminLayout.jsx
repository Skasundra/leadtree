import { useEffect } from "react";
import { useUIStore } from "../../../store/uiStore";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export const AdminLayout = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        const savedState = localStorage.getItem("adminSidebarOpen");
        if (savedState === null) {
          setSidebarOpen(true);
        } else {
          setSidebarOpen(JSON.parse(savedState));
        }
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
      if (e.key === "Escape" && window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    if (window.innerWidth >= 1024) {
      localStorage.setItem("adminSidebarOpen", JSON.stringify(newState));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex h-screen">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <AdminTopbar onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-auto bg-slate-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};