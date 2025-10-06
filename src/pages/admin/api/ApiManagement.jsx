import { useState } from 'react';
import { 
  Key, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye,
  EyeOff,
  RefreshCw,
  Activity,
  BarChart3,
  Shield,
  Globe,
  Search,
  Filter,
  Download,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const ApiManagement = () => {
  const [activeTab, setActiveTab] = useState('keys');
  const [searchTerm, setSearchTerm] = useState('');
  const [showKey, setShowKey] = useState({});

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'lt_pk_1234567890abcdef1234567890abcdef',
      status: 'active',
      permissions: ['read', 'write', 'delete'],
      lastUsed: '2024-01-15 10:30 AM',
      requests: 15420,
      rateLimit: '1000/hour',
      createdBy: 'Admin User',
      createdAt: '2023-06-15',
      environment: 'production'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'lt_sk_abcdef1234567890abcdef1234567890',
      status: 'active',
      permissions: ['read', 'write'],
      lastUsed: '2024-01-14 3:45 PM',
      requests: 8934,
      rateLimit: '500/hour',
      createdBy: 'Dev Team',
      createdAt: '2023-08-22',
      environment: 'development'
    },
    {
      id: 3,
      name: 'Testing API Key',
      key: 'lt_tk_fedcba0987654321fedcba0987654321',
      status: 'inactive',
      permissions: ['read'],
      lastUsed: '2024-01-10 9:15 AM',
      requests: 2156,
      rateLimit: '100/hour',
      createdBy: 'QA Team',
      createdAt: '2023-11-10',
      environment: 'testing'
    }
  ];

  const endpoints = [
    {
      id: 1,
      method: 'GET',
      path: '/api/v1/users',
      description: 'Retrieve all users',
      requests: 12450,
      avgResponse: '145ms',
      errorRate: '0.2%',
      status: 'active'
    },
    {
      id: 2,
      method: 'POST',
      path: '/api/v1/users',
      description: 'Create a new user',
      requests: 3420,
      avgResponse: '234ms',
      errorRate: '1.1%',
      status: 'active'
    },
    {
      id: 3,
      method: 'GET',
      path: '/api/v1/campaigns',
      description: 'Retrieve campaigns',
      requests: 8930,
      avgResponse: '189ms',
      errorRate: '0.5%',
      status: 'active'
    }
  ];

  const recentRequests = [
    { id: 1, endpoint: 'GET /api/v1/users', status: 200, response: '142ms', time: '2 min ago', ip: '192.168.1.100' },
    { id: 2, endpoint: 'POST /api/v1/campaigns', status: 201, response: '234ms', time: '3 min ago', ip: '10.0.0.50' },
    { id: 3, endpoint: 'GET /api/v1/leads', status: 200, response: '89ms', time: '5 min ago', ip: '192.168.1.100' },
    { id: 4, endpoint: 'PUT /api/v1/users/123', status: 400, response: '45ms', time: '8 min ago', ip: '203.0.113.1' }
  ];

  const stats = [
    { label: 'Total API Keys', value: apiKeys.length, icon: Key, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Keys', value: apiKeys.filter(k => k.status === 'active').length, icon: Shield, color: 'from-green-500 to-green-600' },
    { label: 'Total Requests', value: '127.5K', icon: Activity, color: 'from-purple-500 to-purple-600' },
    { label: 'Avg Response Time', value: '156ms', icon: Globe, color: 'from-orange-500 to-orange-600' }
  ];

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.environment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleKeyVisibility = (keyId) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'deprecated': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getResponseStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    if (status >= 500) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">API Management</h1>
          <p className="text-slate-400 mt-1">Manage API keys and monitor usage</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
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
          { id: 'keys', label: 'API Keys', icon: Key },
          { id: 'endpoints', label: 'Endpoints', icon: Globe },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'logs', label: 'Request Logs', icon: Activity },
          { id: 'settings', label: 'Settings', icon: Settings }
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
        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search API keys..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                      <option>All Environments</option>
                      <option>Production</option>
                      <option>Development</option>
                      <option>Testing</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Keys List */}
            <div className="space-y-4">
              {filteredKeys.map((apiKey) => (
                <Card key={apiKey.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 bg-gradient-to-r ${
                          apiKey.environment === 'production' ? 'from-red-500 to-red-600' :
                          apiKey.environment === 'development' ? 'from-blue-500 to-blue-600' :
                          'from-yellow-500 to-yellow-600'
                        } rounded-lg flex items-center justify-center`}>
                          <Key className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{apiKey.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(apiKey.status)}`}>
                              {apiKey.status}
                            </span>
                            <span className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded-full">
                              {apiKey.environment}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm text-purple-300 font-mono">
                          {showKey[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 24) + '••••••••••••••••'}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="text-slate-400 hover:text-white h-8 w-8 p-0"
                        >
                          {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="text-slate-400 hover:text-white h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Permissions</p>
                        <p className="text-white font-medium">{apiKey.permissions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Rate Limit</p>
                        <p className="text-white font-medium">{apiKey.rateLimit}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Last Used</p>
                        <p className="text-white font-medium">{apiKey.lastUsed}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Total Requests</p>
                        <p className="text-white font-medium">{apiKey.requests.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Method</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Endpoint</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Requests</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Avg Response</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Error Rate</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((endpoint) => (
                      <tr key={endpoint.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors group">
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <code className="text-purple-300 font-mono text-sm">{endpoint.path}</code>
                            <p className="text-slate-400 text-xs mt-1">{endpoint.description}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{endpoint.requests.toLocaleString()}</td>
                        <td className="py-4 px-4 text-slate-300">{endpoint.avgResponse}</td>
                        <td className="py-4 px-4">
                          <span className={`${parseFloat(endpoint.errorRate) > 2 ? 'text-red-400' : parseFloat(endpoint.errorRate) > 1 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {endpoint.errorRate}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(endpoint.status)}`}>
                            {endpoint.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Request Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Request volume chart</p>
                    <p className="text-slate-500 text-sm">API usage over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Response time metrics</p>
                    <p className="text-slate-500 text-sm">Performance analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Request Logs Tab */}
        {activeTab === 'logs' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent API Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Endpoint</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Response Time</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">IP Address</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request) => (
                      <tr key={request.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-4">
                          <code className="text-purple-300 font-mono text-sm">{request.endpoint}</code>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`font-mono text-sm ${getResponseStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{request.response}</td>
                        <td className="py-4 px-4 text-slate-300">{request.ip}</td>
                        <td className="py-4 px-4 text-slate-400">{request.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">API Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Rate Limiting</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Default Rate Limit</label>
                      <Input
                        placeholder="1000 requests/hour"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Burst Limit</label>
                      <Input
                        placeholder="100 requests/minute"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Require HTTPS</p>
                        <p className="text-slate-400 text-sm">Force all API requests to use HTTPS</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">IP Whitelisting</p>
                        <p className="text-slate-400 text-sm">Restrict API access to specific IP addresses</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4" />
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