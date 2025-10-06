import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Mail,
  Target,
  Globe,
  Clock,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$1,245,680',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      description: 'Monthly recurring revenue'
    },
    {
      title: 'Active Users',
      value: '12,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Daily active users'
    },
    {
      title: 'Subscriptions',
      value: '8,432',
      change: '+15.3%',
      changeType: 'positive',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      description: 'Active subscriptions'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Trial to paid conversion'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      changeType: 'positive',
      icon: ArrowDownRight,
      color: 'from-orange-500 to-orange-600',
      description: 'Monthly churn rate'
    },
    {
      title: 'Support Tickets',
      value: '156',
      change: '-12%',
      changeType: 'positive',
      icon: Mail,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Open support tickets'
    }
  ];

  const realtimeStats = [
    { label: 'Online Users', value: '1,247', icon: Activity, color: 'text-green-400' },
    { label: 'Server Load', value: '67%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Response Time', value: '142ms', icon: Clock, color: 'text-blue-400' },
    { label: 'Uptime', value: '99.9%', icon: Globe, color: 'text-emerald-400' }
  ];

  const topPages = [
    { page: '/dashboard', views: '12,847', bounce: '23%', time: '4:32' },
    { page: '/campaigns', views: '8,432', bounce: '18%', time: '6:15' },
    { page: '/leads', views: '6,234', bounce: '31%', time: '3:45' },
    { page: '/ai-email', views: '4,567', bounce: '15%', time: '8:22' },
    { page: '/settings', views: '3,421', bounce: '42%', time: '2:18' }
  ];

  const recentActivity = [
    { type: 'user', action: 'New user registration', details: 'john.doe@example.com', time: '2 min ago' },
    { type: 'subscription', action: 'Subscription upgraded', details: 'Pro plan', time: '5 min ago' },
    { type: 'payment', action: 'Payment processed', details: '$49.00', time: '8 min ago' },
    { type: 'campaign', action: 'Campaign created', details: 'Q1 Marketing Campaign', time: '12 min ago' },
    { type: 'support', action: 'Support ticket resolved', details: 'Ticket #1234', time: '15 min ago' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-slate-400 mt-1">Comprehensive system analytics and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Real-time Stats */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Real-time Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {realtimeStats.map((stat, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                <stat.icon className={`h-5 w-5 ${stat.color} mr-3`} />
                <div>
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                  <p className="text-white font-semibold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-400 text-sm font-medium">{metric.title}</p>
                    {metric.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                  <p className="text-xs text-slate-500 mb-3">{metric.description}</p>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change}
                    </span>
                    <span className="text-slate-400 text-sm ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`h-14 w-14 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'revenue', label: 'Revenue', icon: DollarSign },
          { id: 'performance', label: 'Performance', icon: Activity }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Revenue Trend</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Revenue chart visualization</p>
                    <p className="text-slate-500 text-sm">Interactive chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Top Pages</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{page.page}</p>
                          <p className="text-slate-400 text-xs">{page.views} views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-300 text-sm">{page.bounce} bounce</p>
                        <p className="text-slate-400 text-xs">{page.time} avg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'user' ? 'bg-blue-500/20' :
                        activity.type === 'subscription' ? 'bg-purple-500/20' :
                        activity.type === 'payment' ? 'bg-green-500/20' :
                        activity.type === 'campaign' ? 'bg-orange-500/20' :
                        'bg-slate-500/20'
                      }`}>
                        {activity.type === 'user' ? (
                          <Users className="h-4 w-4 text-blue-400" />
                        ) : activity.type === 'subscription' ? (
                          <Crown className="h-4 w-4 text-purple-400" />
                        ) : activity.type === 'payment' ? (
                          <DollarSign className="h-4 w-4 text-green-400" />
                        ) : activity.type === 'campaign' ? (
                          <Target className="h-4 w-4 text-orange-400" />
                        ) : (
                          <Mail className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <p className="text-slate-400 text-xs truncate">{activity.details}</p>
                        <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Other tab contents would be similar structured components */}
      {activeTab !== 'overview' && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Analytics</h3>
            <p className="text-slate-400">Detailed {activeTab} analytics and insights would be displayed here</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Reports */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">User Activity Report</h3>
                  <p className="text-slate-400 text-sm">Daily active users and engagement</p>
                </div>
              </div>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 w-full justify-start p-0">
                Generate Report →
              </Button>
            </div>
            
            <div className="p-6 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Revenue Report</h3>
                  <p className="text-slate-400 text-sm">Subscription revenue and billing</p>
                </div>
              </div>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 w-full justify-start p-0">
                Generate Report →
              </Button>
            </div>
            
            <div className="p-6 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">System Performance</h3>
                  <p className="text-slate-400 text-sm">Server performance and uptime</p>
                </div>
              </div>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 w-full justify-start p-0">
                Generate Report →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};