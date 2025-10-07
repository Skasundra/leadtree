import {
  Users,
  Target,
  Mail,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Eye,
  MousePointer,
  Activity,
  Zap,
  BarChart3,
  PieChart,
  DollarSign,
  Percent,
  Filter,
  Download,
  RefreshCw,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext.jsx";
import { LimitExceededModal } from "../../components/ui/LimitExceededModal";
import { useUsageLimit } from "../../hooks/useUsageLimit";
import { TawkToChat } from "../../components/TawkToChat.jsx";

const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color = "primary",
  trend,
  subtitle,
}) => (
  <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 dark:to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    <CardContent className="p-6 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </p>
            <div
              className={`p-2 rounded-lg bg-gradient-to-br ${
                color === "primary"
                  ? "from-blue-500 to-blue-600"
                  : color === "secondary"
                  ? "from-purple-500 to-purple-600"
                  : color === "success"
                  ? "from-emerald-500 to-emerald-600"
                  : color === "warning"
                  ? "from-amber-500 to-amber-600"
                  : "from-slate-500 to-slate-600"
              } shadow-md group-hover:shadow-lg transition-shadow`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              {subtitle}
            </p>
          )}
          <div className="flex items-center justify-between">
            {change && (
              <div
                className={`flex items-center text-sm font-medium ${
                  changeType === "positive"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {change}
              </div>
            )}
            {trend && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {trend}
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const QuickAction = ({
  title,
  description,
  icon: Icon,
  onClick,
  color = "primary",
  href,
}) => {
  const content = (
    <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              color === "primary"
                ? "from-blue-500 to-blue-600"
                : color === "secondary"
                ? "from-purple-500 to-purple-600"
                : color === "success"
                ? "from-emerald-500 to-emerald-600"
                : "from-slate-500 to-slate-600"
            } shadow-md group-hover:shadow-lg transition-shadow`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link to={href} className="block">
      {content}
    </Link>
  ) : (
    <div onClick={onClick}>{content}</div>
  );
};

export const Dashboard = () => {
  const { user } = useAuth();
  const { usage, isLimitExceeded, getUsagePercentage } = useUsageLimit();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState("emails");

  // Check for exceeded limits on mount and show modal
  useEffect(() => {
    // Check which limit is exceeded
    if (isLimitExceeded("emails")) {
      setLimitType("emails");
      setShowLimitModal(true);
    } else if (isLimitExceeded("leads")) {
      setLimitType("leads");
      setShowLimitModal(true);
    } else if (isLimitExceeded("ai")) {
      setLimitType("ai");
      setShowLimitModal(true);
    }
  }, [isLimitExceeded]);

  const kpis = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      color: "primary",
      trend: "↗ Growing",
      subtitle: "Active prospects",
    },
    {
      title: "Conversion Rate",
      value: "18.3%",
      change: "+2.4%",
      changeType: "positive",
      icon: Percent,
      color: "success",
      trend: "📈 Excellent",
      subtitle: "Lead to customer",
    },
    {
      title: "Revenue Generated",
      value: "$127.5K",
      change: "+8.7%",
      changeType: "positive",
      icon: DollarSign,
      color: "warning",
      trend: "💰 Strong",
      subtitle: "This month",
    },
    {
      title: "Active Campaigns",
      value: "23",
      change: "+3",
      changeType: "positive",
      icon: Target,
      color: "secondary",
      trend: "🎯 On track",
      subtitle: "Running campaigns",
    },
    {
      title: "Email Open Rate",
      value: "24.8%",
      change: "-2.1%",
      changeType: "negative",
      icon: Eye,
      color: "primary",
      trend: "📊 Needs attention",
      subtitle: "Last 30 days",
    },
    {
      title: "Click Through Rate",
      value: "4.2%",
      change: "+0.8%",
      changeType: "positive",
      icon: MousePointer,
      color: "success",
      trend: "✨ Improving",
      subtitle: "Email engagement",
    },
  ];

  const quickActions = [
    {
      title: "Add New Lead",
      description: "Manually add or import leads",
      icon: Plus,
      color: "primary",
      href: "/leads/add",
    },
    {
      title: "Create Campaign",
      description: "Start a new email campaign",
      icon: Target,
      color: "secondary",
      href: "/campaigns",
    },
    {
      title: "AI Email Generator",
      description: "Generate personalized emails",
      icon: Zap,
      color: "success",
      href: "/ai-email",
    },
  ];

  const recentActivities = [
    {
      action: "Campaign 'Q1 Product Launch' sent to 150 leads",
      time: "2 hours ago",
      type: "campaign",
      icon: Target,
      color: "blue",
    },
    {
      action: "25 new leads imported from LinkedIn",
      time: "4 hours ago",
      type: "leads",
      icon: Users,
      color: "green",
    },
    {
      action: "Email template 'Follow-up Sequence' created",
      time: "6 hours ago",
      type: "email",
      icon: Mail,
      color: "purple",
    },
    {
      action: "Campaign 'Demo Requests' completed with 18% open rate",
      time: "1 day ago",
      type: "campaign",
      icon: BarChart3,
      color: "amber",
    },
    {
      action: "Weekly performance report generated",
      time: "2 days ago",
      type: "report",
      icon: PieChart,
      color: "slate",
    },
  ];

  const upcomingTasks = [
    {
      task: "Follow up with hot leads from last week",
      due: "Today",
      priority: "high",
    },
    {
      task: "Review Q1 campaign performance",
      due: "Tomorrow",
      priority: "medium",
    },
    {
      task: "Update email templates for Q2",
      due: "This week",
      priority: "low",
    },
  ];

  return (
    <>
      <TawkToChat />

      <LimitExceededModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        limitType={limitType}
      />

      <PageWrapper
        title={`Welcome back, ${user?.name?.split(" ")[0] || "User"}! 👋`}
        description="Here's your lead generation overview for today."
        actions={
          <div className="flex space-x-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        }
      >
        <div className="space-y-8">
          {/* Limit Warning Banner */}
          {(isLimitExceeded("emails") ||
            isLimitExceeded("leads") ||
            isLimitExceeded("ai")) && (
            <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-100">
                        Usage Limit Reached
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        You've reached your plan limit. Upgrade or add credits
                        to continue.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowLimitModal(true)}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    View Options
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center text-xl">
                        <Activity className="h-5 w-5 mr-2 text-blue-600" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Latest updates from your campaigns and leads
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-700/30 hover:shadow-md transition-all duration-200"
                      >
                        <div
                          className={`p-2 rounded-lg bg-${activity.color}-100 dark:bg-${activity.color}-900/30`}
                        >
                          <activity.icon
                            className={`h-4 w-4 text-${activity.color}-600 dark:text-${activity.color}-400`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {activity.action}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Campaign Performance
                  </CardTitle>
                  <CardDescription>
                    Email engagement metrics over the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        Interactive Chart Coming Soon
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                        Will show open rates, click rates, and conversions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="h-5 w-5 mr-2 text-amber-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Get started with common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <QuickAction key={index} {...action} />
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                    Upcoming Tasks
                  </CardTitle>
                  <CardDescription>
                    Don't forget these important items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingTasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div
                          className={`h-2 w-2 rounded-full mt-2 ${
                            task.priority === "high"
                              ? "bg-red-500"
                              : task.priority === "medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {task.task}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Due: {task.due}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
