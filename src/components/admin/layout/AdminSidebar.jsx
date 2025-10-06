import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  CreditCard, 
  Settings, 
  BarChart3,
  Database,
  Mail,
  FileText,
  Globe,
  X,
  UserCheck,
  Crown,
  Code,
  Banknote,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Tooltip } from '../../ui/Tooltip';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Role Management', href: '/admin/roles', icon: UserCheck },
  { name: 'Subscription Management', href: '/admin/subscriptions', icon: Crown },
  { name: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
  { name: 'Database Management', href: '/admin/database', icon: Database },
  { name: 'Email Templates', href: '/admin/email-templates', icon: Mail },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
  { name: 'API Management', href: '/admin/api', icon: Code },
  { name: 'Billing & Payments', href: '/admin/billing', icon: Banknote },
  { name: 'Security & Logs', href: '/admin/security', icon: ShieldCheck },
];

export const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      <div className={cn(
        "bg-slate-900 border-r border-slate-700 transition-all duration-300 ease-in-out flex flex-col",
        isMobile ? [
          "fixed inset-y-0 left-0 z-50 shadow-xl",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        ] : [
          "relative",
          isOpen ? "w-64" : "w-16"
        ]
      )}>
        {/* Admin Logo */}
        <div className={cn(
          "flex items-center border-b border-slate-700 bg-gradient-to-r from-purple-900/50 to-pink-900/50 transition-all duration-300",
          isOpen ? "h-16 px-6 justify-between" : "h-16 px-3 justify-center"
        )}>
          <Link to="/admin/dashboard" className="flex items-center group" onClick={handleNavClick}>
            <div className="h-9 w-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {isOpen && (
              <span className="ml-3 text-xl font-bold text-white">
                Admin Panel
              </span>
            )}
          </Link>
          {isMobile && isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 py-6 space-y-1 overflow-y-auto scrollbar-hide transition-all duration-300",
          isOpen ? "px-3" : "px-2"
        )}>
          {adminNavigation.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            
            const linkContent = (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center text-sm font-medium rounded-xl transition-all duration-200 relative w-full",
                  isOpen ? "px-3 py-2.5" : "px-2 py-3 justify-center",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                onClick={handleNavClick}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0",
                  isActive ? "text-white" : "text-slate-400",
                  isOpen ? "mr-3" : ""
                )} />
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
            ) : linkContent;
          })}
        </nav>

        {/* Admin User Info */}
        <div className={cn(
          "border-t border-slate-700 bg-slate-800/50 transition-all duration-300",
          isOpen ? "p-4" : "p-2"
        )}>
          <div className={cn(
            "flex items-center rounded-xl hover:bg-slate-800 transition-colors cursor-pointer",
            isOpen ? "space-x-3 p-2" : "justify-center p-2"
          )}>
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-md">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-slate-900 rounded-full"></div>
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-purple-300 truncate">
                  System Administrator
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};