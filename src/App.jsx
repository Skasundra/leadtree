import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useUIStore } from "./store/uiStore";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { TawkToChat } from "./components/TawkToChat";

// Import route configurations
import {
  publicRoutes,
  adminAuthRoutes,
  protectedRoutes,
  adminProtectedRoutes,
} from "./routes";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src="/src/assets/leadtree-v2.png"
              alt="Loading"
              className="h-24 w-24 object-contain"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src="/src/assets/leadtree-v2.png"
              alt="Loading"
              className="h-24 w-24 object-contain"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AppLayout = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, keep sidebar open by default (only if not explicitly closed)
        const savedState = localStorage.getItem("sidebarOpen");
        if (savedState === null) {
          setSidebarOpen(true);
        } else {
          setSidebarOpen(JSON.parse(savedState));
        }
      } else {
        // On mobile, close sidebar by default
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
      // Escape to close sidebar on mobile
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
    // Save state to localStorage for desktop
    if (window.innerWidth >= 1024) {
      localStorage.setItem("sidebarOpen", JSON.stringify(newState));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Topbar onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => {
        const Component = route.element;
        const shouldRedirect = route.redirectIfAuth && isAuthenticated;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              shouldRedirect ? (
                <Navigate to={route.redirectIfAuth} replace />
              ) : (
                <Component />
              )
            }
          />
        );
      })}

      {/* Admin Auth Routes */}
      {adminAuthRoutes.map((route) => {
        const Component = route.element;
        const shouldRedirect =
          route.redirectIfAuth && isAuthenticated && isAdmin;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              shouldRedirect ? (
                <Navigate to={route.redirectIfAuth} replace />
              ) : (
                <Component />
              )
            }
          />
        );
      })}

      {/* Protected Routes */}
      {protectedRoutes.map((route) => {
        const Component = route.element;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Component />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        );
      })}

      {/* Admin Protected Routes */}
      {adminProtectedRoutes.map((route) => {
        const Component = route.element;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Component />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
        );
      })}
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <TawkToChat />
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
                style: {
                  borderRadius: "12px",
                  background: "var(--toast-bg)",
                  color: "var(--toast-color)",
                  border: "1px solid var(--toast-border)",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                },
                success: {
                  iconTheme: {
                    primary: "#22C55E",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
