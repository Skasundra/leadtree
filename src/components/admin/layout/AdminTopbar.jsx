import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Bell,
  Search,
  LogOut,
  User,
  Settings,
  Shield,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const AdminTopbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search functionality here
      console.log("Searching for:", searchQuery);
      // For now, we'll just clear the search
      setSearchQuery("");
    }
  };

  const notifications = [
    {
      id: 1,
      message: "New user registration pending approval",
      time: "5 min ago",
      type: "info",
    },
    {
      id: 2,
      message: "System backup completed successfully",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      message: "High CPU usage detected on server",
      time: "2 hours ago",
      type: "warning",
    },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <span className="text-slate-300 font-medium">
              Admin Control Panel
            </span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, settings, logs..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 backdrop-blur-sm">
                <div className="p-4 border-b border-slate-600">
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border-b border-slate-700 hover:bg-slate-700"
                    >
                      <p className="text-sm text-slate-300">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfile(!showProfile)}
              className="text-slate-300 hover:text-white hover:bg-slate-800 flex items-center space-x-2"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm">
                {user?.name || "Admin"}
              </span>
            </Button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 backdrop-blur-sm">
                <div className="p-3 border-b border-slate-700">
                  <p className="text-sm font-semibold text-white">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-slate-400">System Administrator</p>
                </div>
                <div className="py-2">
                  <Link
                    to="/admin/profile"
                    onClick={() => setShowProfile(false)}
                    className="w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center space-x-2 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowProfile(false)}
                    className="w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center space-x-2 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-2 border-slate-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
