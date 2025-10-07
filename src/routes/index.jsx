import { Navigate } from "react-router-dom";

// Auth Pages
import { Login } from "../pages/auth/Login";
import { Signup } from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";

// Admin Auth Pages
import { AdminLogin } from "../pages/admin/auth/AdminLogin";
import { AdminForgotPassword } from "../pages/admin/auth/AdminForgotPassword";

// Main Pages
import { Dashboard } from "../pages/dashboard/Dashboard";
import { LeadsList } from "../pages/leads/LeadsList";
import { AddLead } from "../pages/leads/AddLead";
import { LeadDetail } from "../pages/leads/LeadDetail";
import { CampaignList } from "../pages/campaigns/CampaignList";
import { CreateCampaign } from "../pages/campaigns/CreateCampaign";
import { AIEmailGenerator } from "../pages/emails/AIEmailGenerator";
import { EmailTracking } from "../pages/emails/EmailTracking";
import { Settings } from "../pages/settings/Settings";
import { BillingOverview } from "../pages/billing/BillingOverview";
import { Pricing } from "../pages/billing/Pricing.jsx";
import { TopUpCredits } from "../pages/billing/TopUpCredits";
import { CRMIntegration } from "../pages/crm/CRMIntegration";

// Landing & Onboarding Pages
import { LandingPage } from "../pages/landing/LandingPage";
import { OnboardingFlow } from "../pages/onboarding/OnboardingFlow";
import { OnboardingSuccess } from "../pages/onboarding/OnboardingSuccess";

// Admin Pages
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import { UserManagement } from "../pages/admin/users/UserManagement";
import { AddUser } from "../pages/admin/users/AddUser";
import { ViewUser } from "../pages/admin/users/ViewUser";
import { EditUser } from "../pages/admin/users/EditUser";
import { RoleManagement } from "../pages/admin/roles/RoleManagement";
import { CreateRole } from "../pages/admin/roles/CreateRole";
import { EditRole } from "../pages/admin/roles/EditRole";
import { SubscriptionManagement } from "../pages/admin/subscriptions/SubscriptionManagement";
import { AddSubscription } from "../pages/admin/subscriptions/AddSubscription";
import { EditSubscription } from "../pages/admin/subscriptions/EditSubscription";
import { Analytics } from "../pages/admin/analytics/Analytics";
import { SystemSettings } from "../pages/admin/settings/SystemSettings";
import { AdminProfile } from "../pages/admin/profile/AdminProfile";
import { DatabaseManagement } from "../pages/admin/database/DatabaseManagement";
import { EmailTemplates } from "../pages/admin/templates/EmailTemplates";
import { AddEmailTemplate } from "../pages/admin/templates/AddEmailTemplate";
import { EditEmailTemplate } from "../pages/admin/templates/EditEmailTemplate";
import { ViewEmailTemplate } from "../pages/admin/templates/ViewEmailTemplate";
import { ContentManagement } from "../pages/admin/content/ContentManagement";
import { AddContent } from "../pages/admin/content/AddContent";
import { EditContent } from "../pages/admin/content/EditContent";
import { ViewContent } from "../pages/admin/content/ViewContent";
import { ApiManagement } from "../pages/admin/api/ApiManagement";
import { BillingPayments } from "../pages/admin/billing/BillingPayments";
import { SecurityLogs } from "../pages/admin/security/SecurityLogs";

// Public routes (no authentication required)
export const publicRoutes = [
  {
    path: "/login",
    element: Login,
    redirectIfAuth: "/dashboard",
  },
  {
    path: "/signup",
    element: Signup,
    redirectIfAuth: "/dashboard",
  },
  {
    path: "/forgot-password",
    element: ForgotPassword,
    redirectIfAuth: "/dashboard",
  },
  {
    path: "/pricing",
    element: Pricing,
  },
  {
    path: "/landing",
    element: LandingPage,
  },
  {
    path: "/onboarding",
    element: OnboardingFlow,
  },
  {
    path: "/onboarding/success",
    element: OnboardingSuccess,
  },
  {
    path: "/",
    element: LandingPage,
  },
];

// Admin auth routes
export const adminAuthRoutes = [
  {
    path: "/admin/login",
    element: AdminLogin,
    redirectIfAuth: "/admin/dashboard",
  },
  {
    path: "/admin/forgot-password",
    element: AdminForgotPassword,
    redirectIfAuth: "/admin/dashboard",
  },
];

// Protected routes (require authentication)
export const protectedRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/leads",
    element: LeadsList,
  },
  {
    path: "/leads/add",
    element: AddLead,
  },
  {
    path: "/leads/:id",
    element: LeadDetail,
  },
  {
    path: "/campaigns",
    element: CampaignList,
  },
  {
    path: "/campaigns/create",
    element: CreateCampaign,
  },
  {
    path: "/ai-email",
    element: AIEmailGenerator,
  },
  {
    path: "/emails",
    element: EmailTracking,
  },
  {
    path: "/settings",
    element: Settings,
  },
  {
    path: "/billing",
    element: BillingOverview,
  },
  {
    path: "/billing/topup",
    element: TopUpCredits,
  },
  {
    path: "/crm",
    element: CRMIntegration,
  },
];

// Admin protected routes (require admin authentication)
export const adminProtectedRoutes = [
  {
    path: "/admin/dashboard",
    element: AdminDashboard,
  },
  {
    path: "/admin/users",
    element: UserManagement,
  },
  {
    path: "/admin/users/add",
    element: AddUser,
  },
  {
    path: "/admin/users/view/:userId",
    element: ViewUser,
  },
  {
    path: "/admin/users/edit/:userId",
    element: EditUser,
  },
  {
    path: "/admin/roles",
    element: RoleManagement,
  },
  {
    path: "/admin/roles/create",
    element: CreateRole,
  },
  {
    path: "/admin/roles/edit/:roleId",
    element: EditRole,
  },
  {
    path: "/admin/subscriptions",
    element: SubscriptionManagement,
  },
  {
    path: "/admin/subscriptions/add",
    element: AddSubscription,
  },
  {
    path: "/admin/subscriptions/edit/:subscriptionId",
    element: EditSubscription,
  },
  {
    path: "/admin/analytics",
    element: Analytics,
  },
  {
    path: "/admin/settings",
    element: SystemSettings,
  },
  {
    path: "/admin/profile",
    element: AdminProfile,
  },
  {
    path: "/admin/database",
    element: DatabaseManagement,
  },
  {
    path: "/admin/email-templates",
    element: EmailTemplates,
  },
  {
    path: "/admin/email-templates/add",
    element: AddEmailTemplate,
  },
  {
    path: "/admin/email-templates/edit/:templateId",
    element: EditEmailTemplate,
  },
  {
    path: "/admin/email-templates/view/:templateId",
    element: ViewEmailTemplate,
  },
  {
    path: "/admin/content",
    element: ContentManagement,
  },
  {
    path: "/admin/content/add",
    element: AddContent,
  },
  {
    path: "/admin/content/edit/:contentId",
    element: EditContent,
  },
  {
    path: "/admin/content/view/:contentId",
    element: ViewContent,
  },
  {
    path: "/admin/api",
    element: ApiManagement,
  },
  {
    path: "/admin/billing",
    element: BillingPayments,
  },
  {
    path: "/admin/security",
    element: SecurityLogs,
  },
  {
    path: "/admin",
    element: () => <Navigate to="/admin/dashboard" replace />,
  },
];
