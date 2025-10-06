import { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Lock,
  Activity,
  Globe,
  Clock,
  User,
  MapPin,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  TrendingUp,
  Users,
  Key,
  Bell,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const SecurityLogs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const securityStats = [
    { 
      label: 'Security Score', 
      value: '94%', 
      change: '+2.1%', 
      changeType: 'positive', 
      icon: Shield, 
      color: 'from-green-500 to-green-600',
      description: 'Overall security health'
    },
    { 
      label: 'Threats Blocked', 
      value: '1,247', 
      change: '+15.3%', 
      changeType: 'positive', 
      icon: AlertTriangle, 
      color: 'from-red-500 to-red-600',
      description: 'Last 24 hours'
    },
    { 
      label: 'Active Sessions', 
      value: '3,892', 
      change: '+8.7%', 
      changeType: 'positive', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      description: 'Currently online'
    },
    { 
      label: 'Failed Logins', 
      value: '156', 
      change: '-12.4%', 
      changeType: 'positive', 
      icon: XCircle, 
      color: 'from-orange-500 to-orange-600',
      description: 'Last 24 hours'
    }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'login_failure',
      severity: 'medium',
      title: 'Multiple Failed Login Attempts',
      description: 'User attempted to login 5 times with incorrect credentials',
      user: 'john.doe@example.com',
      ip: '192.168.1.100',
      location: 'New York, US',
      device: 'Chrome on Windows',
      timestamp: '2024-01-15 14:30:25',
      status: 'blocked',
      actions: ['Block IP', 'Notify User', 'Reset Password']
    },
    {
      id: 2,
      type: 'suspicious_activity',
      severity: 'high',
      title: 'Unusual API Access Pattern',
      description: 'API key accessed from new geographic location',
      user: 'api_user_12345',
      ip: '203.0.113.45',
      location: 'Unknown',
      device: 'API Client',
      timestamp: '2024-01-15 14:25:12',
      status: 'investigating',
      actions: ['Revoke Key', 'Contact Owner', 'Monitor']
    },
    {
      id: 3,
      type: 'data_access',
      severity: 'low',
      title: 'Bulk Data Export',
      description: 'Large dataset exported by admin user',
      user: 'admin@example.com',
      ip: '10.0.0.50',
      location: 'San Francisco, US',
      device: 'Firefox on macOS',
      timestamp: '2024-01-15 14:20:08',
      status: 'approved',
      actions: ['Log Activity', 'Notify Compliance']
    },
    {
      id: 4,
      type: 'permission_change',
      severity: 'medium',
      title: 'Role Permissions Modified',
      description: 'Admin role permissions were updated',
      user: 'super_admin@example.com',
      ip: '192.168.1.200',
      location: 'London, UK',
      device: 'Safari on macOS',
      timestamp: '2024-01-15 14:15:33',
      status: 'completed',
      actions: ['Audit Trail', 'Notify Team']
    }
  ];

  const threatCategories = [
    { category: 'Brute Force', count: 45, percentage: 35, color: 'bg-red-500', trend: '+12%' },
    { category: 'Malware', count: 23, percentage: 18, color: 'bg-orange-500', trend: '-5%' },
    { category: 'Phishing', count: 31, percentage: 24, color: 'bg-yellow-500', trend: '+8%' },
    { category: 'DDoS', count: 12, percentage: 9, color: 'bg-purple-500', trend: '-15%' },
    { category: 'Data Breach', count: 8, percentage: 6, color: 'bg-pink-500', trend: '+3%' },
    { category: 'Other', count: 10, percentage: 8, color: 'bg-blue-500', trend: '0%' }
  ];

  const recentAlerts = [
    { id: 1, type: 'critical', message: 'Suspicious login from new device', time: '2 min ago', resolved: false },
    { id: 2, type: 'warning', message: 'API rate limit exceeded', time: '5 min ago', resolved: true },
    { id: 3, type: 'info', message: 'Security scan completed', time: '15 min ago', resolved: true },
    { id: 4, type: 'critical', message: 'Failed authentication attempts', time: '23 min ago', resolved: false },
    { id: 5, type: 'warning', message: 'Unusual data access pattern', time: '1 hour ago', resolved: true }
  ];

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ip.includes(searchTerm);
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'mitigated': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'login_failure': return Lock;
      case 'suspicious_activity': return AlertTriangle;
      case 'data_access': return Eye;
      case 'permission_change': return Key;
      case 'system_alert': return Shield;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Security & Logs</h1>
          <p className="text-slate-400 mt-1">Monitor security events and system logs</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Bell className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change} {stat.description}
                  </p>
                </div>
                <div className={`h-10 w-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1">
        {[
          { id: 'overview', label: 'Security Overview', icon: Shield },
          { id: 'events', label: 'Security Events', icon: AlertTriangle },
          { id: 'threats', label: 'Threat Analysis', icon: BarChart3 },
          { id: 'alerts', label: 'Active Alerts', icon: Bell },
          { id: 'settings', label: 'Security Settings', icon: Settings }
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
      <div className="space-y-6">
        {/* Security Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Security Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Security metrics visualization</p>
                      <p className="text-slate-500 text-sm">Threat detection and response trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Threat Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threatCategories.map((threat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${threat.color}`} />
                          <span className="text-slate-300">{threat.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">{threat.count}</span>
                          <span className={`text-sm ${threat.trend.startsWith('+') ? 'text-red-400' : threat.trend.startsWith('-') ? 'text-green-400' : 'text-slate-400'}`}>
                            {threat.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Firewall Status</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 font-medium">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Intrusion Detection</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 font-medium">Monitoring</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">DDoS Protection</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 font-medium">Enabled</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">SSL/TLS</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 font-medium">Secured</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Security Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search security events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={selectedSeverity}
                      onChange={(e) => setSelectedSeverity(e.target.value)}
                      className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="all">All Severities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Events List */}
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const EventIcon = getEventIcon(event.type);
                return (
                  <Card key={event.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          <EventIcon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white font-medium">{event.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(event.severity)}`}>
                                  {event.severity}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                                  {event.status}
                                </span>
                              </div>
                              <p className="text-slate-400 mb-3">{event.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>{event.timestamp}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <User className="h-4 w-4 text-blue-400" />
                                <span className="text-slate-400 text-sm">User</span>
                              </div>
                              <span className="text-white font-medium">{event.user}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Globe className="h-4 w-4 text-green-400" />
                                <span className="text-slate-400 text-sm">IP Address</span>
                              </div>
                              <span className="text-white font-medium">{event.ip}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="h-4 w-4 text-purple-400" />
                                <span className="text-slate-400 text-sm">Location</span>
                              </div>
                              <span className="text-white font-medium">{event.location}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Activity className="h-4 w-4 text-orange-400" />
                                <span className="text-slate-400 text-sm">Device</span>
                              </div>
                              <span className="text-white font-medium">{event.device}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-sm">Available Actions:</span>
                              <div className="flex gap-2">
                                {event.actions.map((action, index) => (
                                  <Button key={index} size="sm" variant="ghost" className="text-slate-400 hover:text-white text-xs">
                                    {action}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Threat Analysis Tab */}
        {activeTab === 'threats' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Threat Analysis Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Threat analysis visualization</p>
                  <p className="text-slate-500 text-sm">Advanced threat intelligence and patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Alerts Tab */}
        {activeTab === 'alerts' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Active Security Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${alert.resolved ? 'bg-green-400' : 'bg-red-400'} ${!alert.resolved ? 'animate-pulse' : ''}`} />
                      <div>
                        <p className={`font-medium ${getAlertTypeColor(alert.type)}`}>{alert.message}</p>
                        <p className="text-slate-500 text-sm">{alert.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${alert.resolved ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {alert.resolved ? 'Resolved' : 'Active'}
                      </span>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Alert Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Failed Login Alerts</p>
                        <p className="text-slate-400 text-sm">Alert on multiple failed login attempts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Suspicious Activity</p>
                        <p className="text-slate-400 text-sm">Alert on unusual user behavior</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Data Access Monitoring</p>
                        <p className="text-slate-400 text-sm">Monitor large data exports</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Security Policies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Session Timeout (minutes)</label>
                      <Input
                        placeholder="30"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Max Failed Attempts</label>
                      <Input
                        placeholder="5"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};