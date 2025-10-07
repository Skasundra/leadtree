import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  ArrowLeft,
  Edit,
  Trash2,
  Crown,
  Clock,
  Activity,
  CreditCard,
  MapPin,
  Globe,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const ViewUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  // Mock user data - replace with API call
  const user = {
    id: userId,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    department: "Engineering",
    role: "admin",
    status: "active",
    subscription: "Pro",
    avatar: null,
    joinDate: "2023-06-15",
    lastLogin: "2024-01-15 10:30 AM",
    loginCount: 245,
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    emailVerified: true,
    twoFactorEnabled: true,
    lastPasswordChange: "2023-12-01",
    accountLocked: false,
  };

  const activityLog = [
    {
      id: 1,
      action: "Logged in",
      timestamp: "2024-01-15 10:30 AM",
      ip: "192.168.1.1",
      device: "Chrome on Windows",
    },
    {
      id: 2,
      action: "Updated profile",
      timestamp: "2024-01-14 3:45 PM",
      ip: "192.168.1.1",
      device: "Chrome on Windows",
    },
    {
      id: 3,
      action: "Changed password",
      timestamp: "2023-12-01 9:15 AM",
      ip: "192.168.1.1",
      device: "Chrome on Windows",
    },
  ];

  const getRoleInfo = (role) => {
    switch (role) {
      case "super_admin":
        return {
          label: "Super Admin",
          color: "from-red-500 to-red-600",
          icon: Crown,
          badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
      case "admin":
        return {
          label: "Admin",
          color: "from-purple-500 to-purple-600",
          icon: Shield,
          badge:
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
      case "team_member":
        return {
          label: "Team Member",
          color: "from-blue-500 to-blue-600",
          icon: User,
          badge:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      case "client":
        return {
          label: "Client",
          color: "from-green-500 to-green-600",
          icon: User,
          badge:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
      default:
        return {
          label: "Unknown",
          color: "from-gray-500 to-gray-600",
          icon: User,
          badge:
            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const roleInfo = getRoleInfo(user.role);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/users")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">User Details</h1>
            <p className="text-slate-400 mt-1">
              View and manage user information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/admin/users/edit/${userId}`)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
          <Button
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </span>
                  </div>
                  {user.role === "super_admin" && (
                    <div className="absolute -top-1 -right-1 h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {user.role === "admin" && (
                    <div className="absolute -top-1 -right-1 h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-slate-400 mb-4">{user.email}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${roleInfo.badge}`}
                  >
                    {roleInfo.label}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="w-full pt-4 border-t border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Member Since</span>
                    <span className="text-white font-medium">
                      {user.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Logins</span>
                    <span className="text-white font-medium">
                      {user.loginCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Last Login</span>
                    <span className="text-white font-medium">
                      {user.lastLogin}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.emailVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-slate-300 text-sm">
                    Email Verified
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    user.emailVerified ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.emailVerified ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.twoFactorEnabled ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-slate-300 text-sm">2FA Enabled</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    user.twoFactorEnabled ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.twoFactorEnabled ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.accountLocked ? (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span className="text-slate-300 text-sm">
                    Account Status
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    user.accountLocked ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {user.accountLocked ? "Locked" : "Active"}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Last Password Change</span>
                  <span className="text-white">
                    {user.lastPasswordChange}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address
                    </label>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Number
                    </label>
                    <p className="text-white font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </label>
                    <p className="text-white font-medium">{user.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Company
                    </label>
                    <p className="text-white font-medium">{user.company}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Department
                    </label>
                    <p className="text-white font-medium">{user.department}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Timezone
                    </label>
                    <p className="text-white font-medium">{user.timezone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Role
                    </label>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-8 w-8 bg-gradient-to-r ${roleInfo.color} rounded-lg flex items-center justify-center`}
                      >
                        <RoleIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-medium">
                        {roleInfo.label}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Join Date
                    </label>
                    <p className="text-white font-medium">{user.joinDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Subscription Plan
                    </label>
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-purple-400" />
                      <span className="text-white font-medium">
                        {user.subscription}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Last Login
                    </label>
                    <p className="text-white font-medium">{user.lastLogin}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {activity.action}
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        {activity.timestamp}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span>IP: {activity.ip}</span>
                        <span>•</span>
                        <span>{activity.device}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
