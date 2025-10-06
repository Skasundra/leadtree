import { useState } from 'react';
import { 
  Database, 
  Server, 
  HardDrive, 
  Activity, 
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  FileText,
  Zap,
  Shield,
  Users,
  Table
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const DatabaseManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dbStats = [
    { label: 'Database Size', value: '2.4 GB', change: '+12%', icon: HardDrive, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Tables', value: '47', change: '+2', icon: Table, color: 'from-green-500 to-green-600' },
    { label: 'Active Connections', value: '23', change: '+5', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Query Performance', value: '98.5%', change: '+1.2%', icon: Zap, color: 'from-orange-500 to-orange-600' }
  ];

  const systemHealth = [
    { metric: 'CPU Usage', value: '45%', status: 'good', color: 'text-green-400' },
    { metric: 'Memory Usage', value: '67%', status: 'warning', color: 'text-yellow-400' },
    { metric: 'Disk I/O', value: '23%', status: 'good', color: 'text-green-400' },
    { metric: 'Network I/O', value: '12%', status: 'good', color: 'text-green-400' },
    { metric: 'Connection Pool', value: '78%', status: 'warning', color: 'text-yellow-400' },
    { metric: 'Query Cache Hit', value: '94%', status: 'good', color: 'text-green-400' }
  ];

  const recentBackups = [
    { id: 1, name: 'Full Backup', size: '2.4 GB', date: '2024-01-15 02:00', status: 'completed', type: 'full' },
    { id: 2, name: 'Incremental Backup', size: '156 MB', date: '2024-01-14 02:00', status: 'completed', type: 'incremental' },
    { id: 3, name: 'Full Backup', size: '2.3 GB', date: '2024-01-13 02:00', status: 'completed', type: 'full' },
    { id: 4, name: 'Incremental Backup', size: '89 MB', date: '2024-01-12 02:00', status: 'failed', type: 'incremental' },
    { id: 5, name: 'Full Backup', size: '2.2 GB', date: '2024-01-11 02:00', status: 'completed', type: 'full' }
  ];

  const tables = [
    { name: 'users', rows: '12,847', size: '456 MB', lastUpdated: '2 min ago', status: 'active' },
    { name: 'subscriptions', rows: '8,432', size: '234 MB', lastUpdated: '5 min ago', status: 'active' },
    { name: 'campaigns', rows: '15,623', size: '678 MB', lastUpdated: '1 hour ago', status: 'active' },
    { name: 'leads', rows: '45,234', size: '1.2 GB', lastUpdated: '3 min ago', status: 'active' },
    { name: 'emails', rows: '89,567', size: '890 MB', lastUpdated: '10 min ago', status: 'active' },
    { name: 'analytics', rows: '234,567', size: '2.1 GB', lastUpdated: '1 min ago', status: 'active' }
  ];

  const queries = [
    { id: 1, query: 'SELECT * FROM users WHERE created_at > ?', duration: '0.045s', rows: 1247, status: 'completed' },
    { id: 2, query: 'UPDATE subscriptions SET status = ? WHERE id = ?', duration: '0.012s', rows: 1, status: 'completed' },
    { id: 3, query: 'SELECT COUNT(*) FROM campaigns WHERE active = 1', duration: '0.089s', rows: 1, status: 'completed' },
    { id: 4, query: 'INSERT INTO leads (name, email, source) VALUES (?, ?, ?)', duration: '0.023s', rows: 1, status: 'completed' },
    { id: 5, query: 'DELETE FROM temp_data WHERE created_at < ?', duration: '2.345s', rows: 5678, status: 'slow' }
  ];

  const handleBackup = async (type) => {
    setLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`${type} backup initiated`);
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Database Management</h1>
          <p className="text-slate-400 mt-1">Monitor and manage database operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button 
            onClick={() => handleBackup('full')}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Backing up...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Backup Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dbStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-xs mt-1">{stat.change} vs last week</p>
                </div>
                <div className={`h-12 w-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemHealth.map((health, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                <div className={`h-3 w-3 rounded-full mr-3 ${
                  health.status === 'good' ? 'bg-green-400' :
                  health.status === 'warning' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                <div>
                  <p className="text-slate-400 text-xs">{health.metric}</p>
                  <p className={`text-sm font-medium ${health.color}`}>{health.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'tables', label: 'Tables', icon: Table },
          { id: 'backups', label: 'Backups', icon: Download },
          { id: 'queries', label: 'Queries', icon: Search },
          { id: 'maintenance', label: 'Maintenance', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Database Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Performance chart visualization</p>
                    <p className="text-slate-500 text-sm">Real-time database metrics would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Connection Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Active Connections</span>
                    <span className="text-white font-medium">23/100</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{width: '23%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Idle Connections</span>
                    <span className="text-white font-medium">77/100</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '77%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Query Cache Hit Rate</span>
                    <span className="text-green-400 font-medium">94.2%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '94.2%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tables Tab */}
        {activeTab === 'tables' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Database Tables</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search tables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white w-64"
                  />
                </div>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Table Name</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Rows</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Size</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Last Updated</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTables.map((table, index) => (
                      <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors group">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Table className="h-4 w-4 text-purple-400 mr-2" />
                            <span className="text-white font-medium">{table.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{table.rows}</td>
                        <td className="py-4 px-4 text-slate-300">{table.size}</td>
                        <td className="py-4 px-4 text-slate-300">{table.lastUpdated}</td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                            {table.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
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

        {/* Backups Tab */}
        {activeTab === 'backups' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Backup Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleBackup('full')}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-20 flex-col"
                  >
                    <Download className="h-6 w-6 mb-2" />
                    Full Backup
                  </Button>
                  <Button 
                    onClick={() => handleBackup('incremental')}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-20 flex-col"
                  >
                    <Download className="h-6 w-6 mb-2" />
                    Incremental Backup
                  </Button>
                  <Button 
                    variant="ghost"
                    className="border border-slate-600 hover:bg-slate-700 h-20 flex-col"
                  >
                    <Upload className="h-6 w-6 mb-2" />
                    Restore Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Backups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBackups.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors group">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 ${
                          backup.type === 'full' ? 'bg-blue-500/20' : 'bg-green-500/20'
                        }`}>
                          <Download className={`h-5 w-5 ${
                            backup.type === 'full' ? 'text-blue-400' : 'text-green-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{backup.name}</p>
                          <p className="text-slate-400 text-sm">{backup.size} • {backup.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          backup.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          backup.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {backup.status}
                        </span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Queries Tab */}
        {activeTab === 'queries' && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queries.map((query) => (
                  <div key={query.id} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-purple-300 text-sm bg-slate-800/50 px-2 py-1 rounded flex-1 mr-4">
                        {query.query}
                      </code>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        query.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        query.status === 'slow' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {query.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>Duration: {query.duration}</span>
                      <span>Rows: {query.rows}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Maintenance Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Optimize Tables</p>
                      <p className="text-slate-400 text-sm">Defragment and optimize database tables</p>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Rebuild Indexes</p>
                      <p className="text-slate-400 text-sm">Rebuild database indexes for better performance</p>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Clean Logs</p>
                      <p className="text-slate-400 text-sm">Remove old log entries to free up space</p>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Update Statistics</p>
                      <p className="text-slate-400 text-sm">Update table statistics for query optimization</p>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Scheduled Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-medium">Daily Backup</p>
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-slate-400 text-sm">Next run: Today at 2:00 AM</p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-medium">Weekly Optimization</p>
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-slate-400 text-sm">Next run: Sunday at 3:00 AM</p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-medium">Monthly Cleanup</p>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">Paused</span>
                    </div>
                    <p className="text-slate-400 text-sm">Next run: 1st of next month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};