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

// Auth Pages
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ForgotPassword } from "./pages/auth/ForgotPassword";

// Admin Auth Pages
import { AdminLogin } from "./pages/admin/auth/AdminLogin";
import { AdminForgotPassword } from "./pages/admin/auth/AdminForgotPassword";

// Main Pages
import { Dashboard } from "./pages/dashboard/Dashboard";
import { LeadsList } from "./pages/leads/LeadsList";
import { AddLead } from "./pages/leads/AddLead";
import { LeadDetail } from "./pages/leads/LeadDetail";
import { CampaignList } from "./pages/campaigns/CampaignList";
import { CreateCampaign } from "./pages/campaigns/CreateCampaign";
import { AIEmailGenerator } from "./pages/emails/AIEmailGenerator";
import { EmailTracking } from "./pages/emails/EmailTracking";
import { Settings } from "./pages/settings/Settings";
import { BillingOverview } from "./pages/billing/BillingOverview";
import { Pricing } from "./pages/billing/Pricing.jsx";
import { TopUpCredits } from "./pages/billing/TopUpCredits";
import { CRMIntegration } from "./pages/crm/CRMIntegration";

// Landing & Onboarding Pages
import { LandingPage } from "./pages/landing/LandingPage";
import { OnboardingFlow } from "./pages/onboarding/OnboardingFlow";
import { OnboardingSuccess } from "./pages/onboarding/OnboardingSuccess";

// Admin Pages
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { AdminDashboard } from "./pages/admin/dashboard/AdminDashboard";
import { UserManagement } from "./pages/admin/users/UserManagement";
import { AddUser } from "./pages/admin/users/AddUser";
import { EditUser } from "./pages/admin/users/EditUser";
import { RoleManagement } from "./pages/admin/roles/RoleManagement";
import { CreateRole } from "./pages/admin/roles/CreateRole";
import { EditRole } from "./pages/admin/roles/EditRole";
import { SubscriptionManagement } from "./pages/admin/subscriptions/SubscriptionManagement";
import { AddSubscription } from "./pages/admin/subscriptions/AddSubscription";
import { EditSubscription } from "./pages/admin/subscriptions/EditSubscription";
import { Analytics } from "./pages/admin/analytics/Analytics";
import { SystemSettings } from "./pages/admin/settings/SystemSettings";
import { AdminProfile } from "./pages/admin/profile/AdminProfile";
import { DatabaseManagement } from "./pages/admin/database/DatabaseManagement";
import { EmailTemplates } from "./pages/admin/templates/EmailTemplates";
import { ContentManagement } from "./pages/admin/content/ContentManagement";
import { ApiManagement } from "./pages/admin/api/ApiManagement";
import { BillingPayments } from "./pages/admin/billing/BillingPayments";
import { SecurityLogs } from "./pages/admin/security/SecurityLogs";
import { TawkToChat } from "./components/TawkToChat";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl animate-pulse mx-auto mb-4 shadow-lg"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Loading...
          </p>
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
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl animate-pulse mx-auto mb-4 shadow-lg"></div>
          <p className="text-slate-400 font-medium">Loading...</p>
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
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
        }
      />
      <Route
        path="/forgot-password"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <ForgotPassword />
          )
        }
      />
      <Route path="/pricing" element={<Pricing />} />

      {/* Landing & Onboarding Routes */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />
      <Route path="/onboarding/success" element={<OnboardingSuccess />} />

      {/* Admin Auth Routes */}
      <Route
        path="/admin/login"
        element={
          isAuthenticated && isAdmin ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route
        path="/admin/forgot-password"
        element={
          isAuthenticated && isAdmin ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <AdminForgotPassword />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LeadsList />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads/add"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddLead />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LeadDetail />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaigns"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CampaignList />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaigns/create"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CreateCampaign />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-email"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AIEmailGenerator />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Settings />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <AppLayout>
              <BillingOverview />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing/topup"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TopUpCredits />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Placeholder routes for other pages */}
      <Route
        path="/emails"
        element={
          <ProtectedRoute>
            <AppLayout>
              <EmailTracking />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/crm"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CRMIntegration />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users/add"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AddUser />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users/edit/:userId"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <EditUser />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/roles"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <RoleManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/roles/create"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <CreateRole />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/roles/edit/:roleId"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <EditRole />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/subscriptions"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <SubscriptionManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/subscriptions/add"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AddSubscription />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/subscriptions/edit/:subscriptionId"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <EditSubscription />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <SystemSettings />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminProfile />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/database"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <DatabaseManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/email-templates"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <EmailTemplates />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/content"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <ContentManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      {/* Placeholder admin routes */}
      <Route
        path="/admin/database"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white">
                  Database Management
                </h1>
                <p className="text-slate-400">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/email-templates"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white">
                  Email Templates
                </h1>
                <p className="text-slate-400">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/content"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white">
                  Content Management
                </h1>
                <p className="text-slate-400">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/api"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <ApiManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/billing"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <BillingPayments />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/security"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <SecurityLogs />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      {/* Default redirects */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route path="/" element={<LandingPage />} />
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
