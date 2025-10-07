import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  Settings,
  ChevronDown,
  X,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useUIStore } from "../../store/uiStore";
import { cn } from "../../utils/cn";

export const Topbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { sidebarOpen } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSidebarToggle = () => {
    console.log("Sidebar toggle clicked, current state:", sidebarOpen);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] sticky top-0 z-50 transition-all duration-300">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSidebarToggle}
            className={cn(
              "hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-full transition-all duration-300 relative",
              sidebarOpen ? "bg-slate-100/50 dark:bg-slate-800/50" : ""
            )}
            title={
              sidebarOpen ? "Close sidebar (Ctrl+B)" : "Open sidebar (Ctrl+B)"
            }
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300" />
            )}
            {/* Small indicator dot */}
            <div
              className={cn(
                "absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full transition-all duration-300",
                sidebarOpen ? "bg-green-500" : "bg-slate-400"
              )}
            />
          </Button>

          {/* Page title */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="h-6 w-px bg-slate-200/50 dark:bg-slate-700/50"></div>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Dashboard
            </span>
          </div>

          {/* Search bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder="Search leads, campaigns, emails..."
              className="pl-10 pr-16 w-64 sm:w-80 lg:w-96 bg-slate-50/70 dark:bg-slate-900/70 border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-950 transition-all duration-300 ease-in-out"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-full transition-all duration-300"
            title="Search"
          >
            <Search className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </Button>

          {/* Quick actions */}
          {/* <div className="hidden lg:flex items-center space-x-2 mr-3">
            <Link to="/leads/add">
              <Button
                variant="default"
                size="sm"
                className="text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Plus className="h-3 w-3 mr-1" />
                New Lead
              </Button>
            </Link>
          </div> */}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-full transition-all duration-300 group"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <div className="relative flex items-center justify-center">
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
              ) : (
                <Sun className="h-5 w-5 text-amber-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              )}
            </div>
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-full transition-all duration-300"
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse border border-white dark:border-slate-950"></span>
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Notifications
                  </h3>
                </div>
                <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                  No new notifications
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <div className="flex items-center space-x-3 pl-4 ml-4 border-l border-slate-200/50 dark:border-slate-800/50">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {user?.role?.replace("_", " ")}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-full transition-all duration-300"
              >
                <div className="relative">
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-800/50">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 h-3 w-3 bg-green-400 border-2 border-white dark:border-slate-950 rounded-full"></div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform duration-300",
                    showUserMenu ? "rotate-180" : ""
                  )}
                />
              </Button>
            </div>
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-60 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {user?.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                </div>
                <div className="p-2 space-y-1">
                  <Link to="/settings">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-slate-900 dark:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-lg"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start text-left text-red-600 hover:bg-red-50/80 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

      {/* Mobile search modal */}
      <Modal
        isOpen={showMobileSearch}
        onClose={() => setShowMobileSearch(false)}
        title="Search"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Search leads, campaigns, emails..."
            className="pl-10 w-full"
            autoFocus
          />
        </div>
        <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Start typing to search across your leads, campaigns, and emails...
        </div>
      </Modal>
    </header>
  );
};
