import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Mail,
  Target,
  Bot,
  Settings,
  CreditCard,
  Shield,
  X,
  Crown,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useAuth } from "../../context/AuthContext.jsx";
import { Tooltip } from "../ui/Tooltip";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin", "team_member", "client"],
  },
  {
    name: "Leads",
    href: "/leads",
    icon: Users,
    roles: ["super_admin", "admin", "team_member"],
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Target,
    roles: ["super_admin", "admin", "team_member", "client"],
  },
  {
    name: "AI Email Generator",
    href: "/ai-email",
    icon: Bot,
    roles: ["super_admin", "admin", "team_member", "client"],
  },
  {
    name: "Email Tracking",
    href: "/emails",
    icon: Mail,
    roles: ["super_admin", "admin", "team_member"],
  },
  {
    name: "CRM Integration",
    href: "/crm",
    icon: Settings,
    roles: ["super_admin", "admin"],
  },
  {
    name: "Billing",
    href: "/billing",
    icon: CreditCard,
    roles: ["super_admin", "admin"],
  },
  { name: "Admin Panel", href: "/admin", icon: Shield, roles: ["super_admin"] },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["super_admin", "admin", "team_member", "client"],
  },
];

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role)
  );

  // Track screen size to determine mobile vs desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check initial screen size
    checkScreenSize();

    // Listen for window resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Function to handle navigation click - only close on mobile
  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out flex flex-col",
          // Mobile: fixed positioning with slide animation
          isMobile
            ? [
                "fixed inset-y-0 left-0 z-50 shadow-xl dark:shadow-2xl",
                isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
              ]
            : [
                // Desktop: always visible, width changes based on state
                "relative",
                isOpen ? "w-64" : "w-16",
              ]
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 transition-all duration-300",
            isOpen ? "h-16 px-6 justify-between" : "h-16 px-3 justify-center"
          )}
        >
          <Link
            to="/dashboard"
            className="flex items-center group"
            onClick={handleNavClick}
          >
            <div className="h-9 w-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            {isOpen && (
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                LeadTree
              </span>
            )}
          </Link>
          {isMobile && isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 py-6 space-y-1 overflow-y-auto scrollbar-hide transition-all duration-300",
            isOpen ? "px-3" : "px-2"
          )}
        >
          {filteredNavigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");

            const linkContent = (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center text-sm font-medium rounded-xl transition-all duration-200 relative w-full",
                  isOpen ? "px-3 py-2.5" : "px-2 py-3 justify-center",
                  isActive
                    ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg shadow-primary/25"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
                onClick={handleNavClick}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0",
                    isActive
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400",
                    isOpen ? "mr-3" : ""
                  )}
                />
                {isOpen && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 bg-white rounded-full animate-pulse" />
                    )}
                  </>
                )}
                {!isOpen && isActive && (
                  <div className="absolute right-1 top-1 h-2 w-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );

            return !isOpen ? (
              <Tooltip key={item.name} content={item.name} side="right">
                {linkContent}
              </Tooltip>
            ) : (
              linkContent
            );
          })}
        </nav>

        {/* Plan Details Card */}
        {isOpen && (
          <div className="px-3 pb-4">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 dark:from-primary/20 dark:via-secondary/20 dark:to-primary/10 rounded-xl p-4 border border-primary/20 dark:border-primary/30 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.subscription?.plan || "Free Plan"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    Leads Used
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {user?.subscription?.leadsUsed || 0} /{" "}
                    {user?.subscription?.leadsLimit || 100}
                  </span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        ((user?.subscription?.leadsUsed || 0) /
                          (user?.subscription?.leadsLimit || 100)) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-primary">
                    {Math.max(
                      (user?.subscription?.leadsLimit || 100) -
                        (user?.subscription?.leadsUsed || 0),
                      0
                    )}
                  </span>{" "}
                  leads remaining
                </div>
              </div>

              <Link
                to="/billing"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={handleNavClick}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                Upgrade Plan
              </Link>
            </div>
          </div>
        )}

        {/* User info */}
        <div
          className={cn(
            "border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 transition-all duration-300",
            isOpen ? "p-4" : "p-2"
          )}
        >
          <div
            className={cn(
              "flex items-center rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer",
              isOpen ? "space-x-3 p-2" : "justify-center p-2"
            )}
          >
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize truncate">
                  {user?.role?.replace("_", " ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
