import { 
  Users, 
  Crown, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Database,
  Mail,
  Shield,
  BarChart3,
  UserPlus,
  CreditCard,
  Globe,
  Eye,
  Settings,
  Zap,
  Target,
  Calendar,
  Bell,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Active registered users'
    },
    {
      title: 'Active Subscriptions',
      value: '8,432',
      change: '+8.2%',
      changeType: 'positive',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      description: 'Paying subscribers'
    },
    {
      title: 'Monthly Revenue',
      value: '$124,580',
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      description: 'This month\'s earnings'
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '+0.1%',
      changeType: 'positive',
      icon: Activity,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Overall uptime'
    }
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/users/add',
      count: '12 today'
    },
    {
      title: 'Manage Subscriptions',
      description: 'View and edit subscriptions',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/subscriptions',
      count: '8 pending'
    },
    {
      title: 'System Analytics',
      description: 'View detailed reports',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      href: '/admin/analytics',
      count: '99.8% uptime'
    },
    {
      title: 'Role Management',
      description: 'Manage user roles and permissions',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/roles',
      count: '5 roles'
    },
    {
      title: 'User Management',
      description: 'View and manage all users',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      href: '/admin/users',
      count: '2,420 users'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      color: 'from-red-500 to-red-600',
      href: '/admin/settings',
      count: '3 updates'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New user registration', user: 'john.doe@example.com', time: '2 minutes ago', type: 'user', icon: UserPlus },
    { id: 2, action: 'Subscription upgraded', user: 'jane.smith@example.com', time: '5 minutes ago', type: 'subscription', icon: Crown },
    { id: 3, action: 'Payment processed', user: 'mike.johnson@example.com', time: '10 minutes ago', type: 'payment', icon: CreditCard },
    { id: 4, action: 'Support ticket created', user: 'sarah.wilson@example.com', time: '15 minutes ago', type: 'support', icon: Mail },
    { id: 5, action: 'User role updated', user: 'admin@leadtree.com', time: '20 minutes ago', type: 'admin', icon: Shield },
  ];

  const systemAlerts = [
    { id: 1, message: 'Database backup completed successfully', type: 'success', time: '1 hour ago' },
    { id: 2, message: 'High memory usage on server-02', type: 'warning', time: '2 hours ago' },
    { id: 3, message: 'SSL certificate expires in 30 days', type: 'warning', time: '1 day ago' },
    { id: 4, message: 'New security patch available', type: 'info', time: '3 hours ago' },
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: '45%', status: 'good' },
    { label: 'Memory Usage', value: '72%', status: 'warning' },
    { label: 'Disk Space', value: '38%', status: 'good' },
    { label: 'Network I/O', value: '23%', status: 'good' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400 text-lg">Monitor and manage your system performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-400">Last updated</p>
            <p className="text-white font-medium">{new Date().toLocaleString()}</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 mb-3">{stat.description}</p>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </span>
                    <span className="text-slate-400 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`h-14 w-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-xl">Quick Actions</CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group p-6 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all duration-300 border border-slate-600 hover:border-slate-500 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-600/50 px-2 py-1 rounded-full">
                    {action.count}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">{action.title}</h3>
                <p className="text-slate-400 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-xl">Recent Activities</CardTitle>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-700/50 transition-colors group">
                  <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <activity.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{activity.action}</p>
                    <p className="text-slate-400 text-xs truncate">{activity.user}</p>
                  </div>
                  <div className="text-slate-400 text-xs whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="space-y-6">
          {/* System Alerts */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      alert.type === 'success' ? 'bg-green-600' : 
                      alert.type === 'warning' ? 'bg-yellow-600' : 
                      alert.type === 'info' ? 'bg-blue-600' : 'bg-red-600'
                    }`}>
                      {alert.type === 'success' ? (
                        <CheckCircle className="h-3 w-3 text-white" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium">{alert.message}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-slate-400 mr-1" />
                        <p className="text-slate-400 text-xs">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Server className="h-5 w-5 mr-2" />
                System Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        metric.status === 'good' ? 'text-green-400' : 
                        metric.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {metric.value}
                      </span>
                      <div className={`h-2 w-2 rounded-full ${
                        metric.status === 'good' ? 'bg-green-400' : 
                        metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
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