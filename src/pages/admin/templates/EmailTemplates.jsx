import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye,
  Send,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Code,
  Palette,
  FileText,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const EmailTemplates = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to LeadTree!',
      category: 'onboarding',
      status: 'active',
      lastModified: '2024-01-15',
      usage: 1247,
      openRate: '68%',
      clickRate: '12%',
      description: 'Welcome new users to the platform',
      preview: 'Welcome to LeadTree! We\'re excited to have you on board...'
    },
    {
      id: 2,
      name: 'Password Reset',
      subject: 'Reset Your Password',
      category: 'security',
      status: 'active',
      lastModified: '2024-01-10',
      usage: 456,
      openRate: '89%',
      clickRate: '45%',
      description: 'Password reset instructions',
      preview: 'You requested a password reset. Click the link below...'
    },
    {
      id: 3,
      name: 'Subscription Renewal',
      subject: 'Your Subscription is Expiring Soon',
      category: 'billing',
      status: 'active',
      lastModified: '2024-01-12',
      usage: 234,
      openRate: '72%',
      clickRate: '28%',
      description: 'Remind users about subscription renewal',
      preview: 'Your subscription will expire in 7 days. Renew now to continue...'
    },
    {
      id: 4,
      name: 'Campaign Report',
      subject: 'Your Weekly Campaign Report',
      category: 'reports',
      status: 'active',
      lastModified: '2024-01-08',
      usage: 89,
      openRate: '65%',
      clickRate: '15%',
      description: 'Weekly campaign performance report',
      preview: 'Here\'s your weekly campaign performance summary...'
    },
    {
      id: 5,
      name: 'Account Verification',
      subject: 'Please Verify Your Email Address',
      category: 'onboarding',
      status: 'draft',
      lastModified: '2024-01-14',
      usage: 0,
      openRate: '0%',
      clickRate: '0%',
      description: 'Email verification for new accounts',
      preview: 'Please click the link below to verify your email address...'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'onboarding', name: 'Onboarding', count: templates.filter(t => t.category === 'onboarding').length },
    { id: 'security', name: 'Security', count: templates.filter(t => t.category === 'security').length },
    { id: 'billing', name: 'Billing', count: templates.filter(t => t.category === 'billing').length },
    { id: 'reports', name: 'Reports', count: templates.filter(t => t.category === 'reports').length },
    { id: 'marketing', name: 'Marketing', count: 0 }
  ];

  const stats = [
    { label: 'Total Templates', value: templates.length, icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Templates', value: templates.filter(t => t.status === 'active').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Draft Templates', value: templates.filter(t => t.status === 'draft').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Sent', value: templates.reduce((sum, t) => sum + t.usage, 0).toLocaleString(), icon: Send, color: 'from-purple-500 to-purple-600' }
  ];

  const recentActivity = [
    { action: 'Template created', template: 'Account Verification', user: 'Admin User', time: '2 hours ago' },
    { action: 'Template updated', template: 'Welcome Email', user: 'Admin User', time: '1 day ago' },
    { action: 'Template sent', template: 'Password Reset', user: 'System', time: '2 days ago' },
    { action: 'Template duplicated', template: 'Subscription Renewal', user: 'Admin User', time: '3 days ago' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'onboarding': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'billing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'reports': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'marketing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Email Templates</h1>
          <p className="text-slate-400 mt-1">Manage and customize email templates</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button 
            onClick={() => navigate('/admin/email-templates/add')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
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
          { id: 'templates', label: 'Templates', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
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
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-slate-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Archived</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-purple-300 transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-2">{template.subject}</p>
                        <p className="text-slate-500 text-xs line-clamp-2">{template.preview}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(template.status)}`}>
                          {template.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-slate-400 text-xs">Sent</p>
                        <p className="text-white font-semibold">{template.usage}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Open Rate</p>
                        <p className="text-green-400 font-semibold">{template.openRate}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Click Rate</p>
                        <p className="text-blue-400 font-semibold">{template.clickRate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-xs">
                        Modified: {template.lastModified}
                      </span>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => navigate(`/admin/email-templates/view/${template.id}`)}
                          className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => navigate(`/admin/email-templates/edit/${template.id}`)}
                          className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Mail className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">No Templates Found</h3>
                  <p className="text-slate-400 mb-4">No templates match your current search criteria</p>
                  <Button 
                    onClick={() => navigate('/admin/email-templates/add')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Email performance chart</p>
                    <p className="text-slate-500 text-sm">Open rates, click rates, and delivery metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates
                    .filter(t => t.status === 'active')
                    .sort((a, b) => parseFloat(b.openRate) - parseFloat(a.openRate))
                    .slice(0, 5)
                    .map((template, index) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{template.name}</p>
                          <p className="text-slate-400 text-xs">{template.usage} sent</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium text-sm">{template.openRate}</p>
                        <p className="text-slate-400 text-xs">open rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <p className="text-slate-400 text-xs truncate">{activity.template}</p>
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

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Default Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Default From Name</label>
                <Input
                  defaultValue="LeadTree"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Default From Email</label>
                <Input
                  defaultValue="noreply@leadtree.com"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Default Reply-To</label>
                <Input
                  defaultValue="support@leadtree.com"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Template Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Auto-save Drafts</p>
                  <p className="text-slate-400 text-sm">Automatically save template changes</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Version History</p>
                  <p className="text-slate-400 text-sm">Keep template version history</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Template Analytics</p>
                  <p className="text-slate-400 text-sm">Track template performance metrics</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};