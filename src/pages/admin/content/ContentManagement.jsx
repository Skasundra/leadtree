import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Upload,
  Download,
  Image,
  Video,
  File,
  Folder,
  Calendar,
  User,
  Tag,
  Globe,
  Lock,
  Unlock,
  Star,
  MoreHorizontal,
  Grid,
  List,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const content = [
    {
      id: 1,
      title: 'Getting Started Guide',
      type: 'article',
      status: 'published',
      author: 'Admin User',
      category: 'documentation',
      tags: ['guide', 'onboarding'],
      views: 1247,
      lastModified: '2024-01-15',
      size: '2.4 KB',
      featured: true,
      description: 'Complete guide for new users to get started with the platform'
    },
    {
      id: 2,
      title: 'Product Demo Video',
      type: 'video',
      status: 'published',
      author: 'Marketing Team',
      category: 'marketing',
      tags: ['demo', 'product'],
      views: 3456,
      lastModified: '2024-01-12',
      size: '45.2 MB',
      featured: false,
      description: 'Product demonstration video for potential customers'
    },
    {
      id: 3,
      title: 'API Documentation',
      type: 'document',
      status: 'draft',
      author: 'Dev Team',
      category: 'technical',
      tags: ['api', 'documentation'],
      views: 567,
      lastModified: '2024-01-14',
      size: '8.7 KB',
      featured: false,
      description: 'Comprehensive API documentation for developers'
    },
    {
      id: 4,
      title: 'Company Logo',
      type: 'image',
      status: 'published',
      author: 'Design Team',
      category: 'assets',
      tags: ['logo', 'branding'],
      views: 2345,
      lastModified: '2024-01-10',
      size: '156 KB',
      featured: false,
      description: 'Official company logo in various formats'
    },
    {
      id: 5,
      title: 'Privacy Policy',
      type: 'page',
      status: 'published',
      author: 'Legal Team',
      category: 'legal',
      tags: ['privacy', 'policy'],
      views: 890,
      lastModified: '2024-01-08',
      size: '5.2 KB',
      featured: false,
      description: 'Privacy policy and data protection information'
    },
    {
      id: 6,
      title: 'Feature Announcement',
      type: 'article',
      status: 'scheduled',
      author: 'Product Team',
      category: 'announcements',
      tags: ['features', 'updates'],
      views: 0,
      lastModified: '2024-01-16',
      size: '3.1 KB',
      featured: true,
      description: 'Announcement for upcoming product features'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Content', count: content.length },
    { id: 'documentation', name: 'Documentation', count: content.filter(c => c.category === 'documentation').length },
    { id: 'marketing', name: 'Marketing', count: content.filter(c => c.category === 'marketing').length },
    { id: 'technical', name: 'Technical', count: content.filter(c => c.category === 'technical').length },
    { id: 'assets', name: 'Assets', count: content.filter(c => c.category === 'assets').length },
    { id: 'legal', name: 'Legal', count: content.filter(c => c.category === 'legal').length },
    { id: 'announcements', name: 'Announcements', count: content.filter(c => c.category === 'announcements').length }
  ];

  const stats = [
    { label: 'Total Content', value: content.length, icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Published', value: content.filter(c => c.status === 'published').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Draft', value: content.filter(c => c.status === 'draft').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Views', value: content.reduce((sum, c) => sum + c.views, 0).toLocaleString(), icon: Eye, color: 'from-purple-500 to-purple-600' }
  ];

  const recentActivity = [
    { action: 'Content published', item: 'Getting Started Guide', user: 'Admin User', time: '2 hours ago' },
    { action: 'Content updated', item: 'API Documentation', user: 'Dev Team', time: '1 day ago' },
    { action: 'Content created', item: 'Feature Announcement', user: 'Product Team', time: '2 days ago' },
    { action: 'Content archived', item: 'Old Tutorial', user: 'Admin User', time: '3 days ago' }
  ];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      case 'document': return File;
      case 'page': return Globe;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'image': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'document': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'page': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Management</h1>
          <p className="text-slate-400 mt-1">Manage and organize your content library</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            New Content
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
          { id: 'content', label: 'Content', icon: FileText },
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
      {activeTab === 'content' && (
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
                      className="w-full flex items-center justify-between p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
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

          {/* Content List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="all">All Types</option>
                      <option value="article">Articles</option>
                      <option value="video">Videos</option>
                      <option value="image">Images</option>
                      <option value="document">Documents</option>
                      <option value="page">Pages</option>
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="archived">Archived</option>
                    </select>
                    <div className="flex border border-slate-600 rounded-md">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContent.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);
                  return (
                    <Card key={item.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                              <TypeIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-slate-400 text-sm">{item.author}</p>
                            </div>
                          </div>
                          {item.featured && (
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          )}
                        </div>

                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          {item.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>{item.views} views</span>
                            <span>{item.size}</span>
                            <span>{item.lastModified}</span>
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Title</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Author</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Views</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Modified</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContent.map((item) => {
                          const TypeIcon = getTypeIcon(item.type);
                          return (
                            <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors group">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <TypeIcon className="h-4 w-4 text-purple-400 mr-2" />
                                  <div>
                                    <span className="text-white font-medium">{item.title}</span>
                                    {item.featured && (
                                      <Star className="h-3 w-3 text-yellow-400 fill-current ml-2 inline" />
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(item.type)}`}>
                                  {item.type}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-slate-300">{item.author}</td>
                              <td className="py-4 px-4 text-slate-300">{item.views}</td>
                              <td className="py-4 px-4 text-slate-300">{item.lastModified}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredContent.length === 0 && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">No Content Found</h3>
                  <p className="text-slate-400 mb-4">No content matches your current search criteria</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Content
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
                <CardTitle className="text-white">Content Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Content analytics chart</p>
                    <p className="text-slate-500 text-sm">Views, engagement, and performance metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((item, index) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <TypeIcon className="h-4 w-4 text-purple-400 mr-2" />
                            <div>
                              <p className="text-white font-medium text-sm">{item.title}</p>
                              <p className="text-slate-400 text-xs">{item.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium text-sm">{item.views}</p>
                            <p className="text-slate-400 text-xs">views</p>
                          </div>
                        </div>
                      );
                    })}
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
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <p className="text-slate-400 text-xs truncate">{activity.item}</p>
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
              <CardTitle className="text-white">Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Auto-save Drafts</p>
                  <p className="text-slate-400 text-sm">Automatically save content changes</p>
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
                  <p className="text-slate-400 text-sm">Keep content version history</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Content Analytics</p>
                  <p className="text-slate-400 text-sm">Track content performance</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Upload Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Max File Size (MB)</label>
                <Input
                  type="number"
                  defaultValue="10"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Allowed File Types</label>
                <Input
                  defaultValue="jpg,png,gif,pdf,doc,docx,mp4"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Storage Path</label>
                <Input
                  defaultValue="/uploads/content/"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};