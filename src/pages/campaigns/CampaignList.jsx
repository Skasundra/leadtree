import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Play, 
  Pause, 
  MoreHorizontal, 
  Calendar, 
  Users, 
  Mail, 
  Target,
  Eye,
  MousePointer,
  TrendingUp,
  Filter,
  Download,
  Edit,
  Copy,
  Trash2,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const mockCampaigns = [
  {
    id: 1,
    name: "Q1 Product Launch",
    status: "Active",
    leads: 245,
    sent: 180,
    opened: 72,
    replied: 15,
    clicked: 28,
    converted: 8,
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    openRate: 40.0,
    replyRate: 8.3,
    clickRate: 15.6,
    conversionRate: 4.4,
    type: "Email Sequence",
    template: "Product Launch Template",
    createdBy: "John Doe",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Enterprise Outreach",
    status: "Draft",
    leads: 89,
    sent: 0,
    opened: 0,
    replied: 0,
    clicked: 0,
    converted: 0,
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    openRate: 0,
    replyRate: 0,
    clickRate: 0,
    conversionRate: 0,
    type: "Cold Outreach",
    template: "Enterprise Template",
    createdBy: "Sarah Johnson",
    lastActivity: "1 day ago"
  },
  {
    id: 3,
    name: "Follow-up Sequence",
    status: "Completed",
    leads: 156,
    sent: 156,
    opened: 98,
    replied: 23,
    clicked: 45,
    converted: 12,
    startDate: "2023-12-01",
    endDate: "2024-01-01",
    openRate: 62.8,
    replyRate: 14.7,
    clickRate: 28.8,
    conversionRate: 7.7,
    type: "Follow-up",
    template: "Follow-up Template",
    createdBy: "Mike Davis",
    lastActivity: "5 days ago"
  },
  {
    id: 4,
    name: "Demo Request Campaign",
    status: "Paused",
    leads: 78,
    sent: 45,
    opened: 32,
    replied: 8,
    clicked: 15,
    converted: 5,
    startDate: "2024-01-05",
    endDate: "2024-02-05",
    openRate: 71.1,
    replyRate: 17.8,
    clickRate: 33.3,
    conversionRate: 11.1,
    type: "Demo Request",
    template: "Demo Template",
    createdBy: "Emily Chen",
    lastActivity: "3 hours ago"
  },
  {
    id: 5,
    name: "Webinar Invitation",
    status: "Scheduled",
    leads: 320,
    sent: 0,
    opened: 0,
    replied: 0,
    clicked: 0,
    converted: 0,
    startDate: "2024-01-25",
    endDate: "2024-02-25",
    openRate: 0,
    replyRate: 0,
    clickRate: 0,
    conversionRate: 0,
    type: "Event Invitation",
    template: "Webinar Template",
    createdBy: "David Wilson",
    lastActivity: "30 minutes ago"
  }
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Active': { 
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      dot: 'bg-emerald-500',
      icon: Play
    },
    'Draft': { 
      color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300',
      dot: 'bg-slate-500',
      icon: Edit
    },
    'Paused': { 
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      dot: 'bg-amber-500',
      icon: Pause
    },
    'Completed': { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      dot: 'bg-blue-500',
      icon: CheckCircle
    },
    'Scheduled': { 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      dot: 'bg-purple-500',
      icon: Clock
    }
  };

  const config = statusConfig[status] || statusConfig['Draft'];
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${config.dot}`} />
      {status}
    </span>
  );
};

const CampaignCard = ({ campaign }) => (
  <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 group">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {campaign.type}
            </span>
          </div>
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {campaign.name}
          </CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Created by {campaign.createdBy} • {campaign.lastActivity}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusBadge status={campaign.status} />
          <div className="relative">
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {campaign.leads.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Leads</div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <Mail className="h-4 w-4 text-emerald-600" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Sent</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {campaign.sent.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Emails</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Open Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {campaign.openRate.toFixed(1)}%
            </div>
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${Math.min(campaign.openRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MousePointer className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Click Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {campaign.clickRate.toFixed(1)}%
            </div>
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${Math.min(campaign.clickRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reply Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {campaign.replyRate.toFixed(1)}%
            </div>
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min(campaign.replyRate, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar for Active Campaigns */}
      {(campaign.status === 'Active' || campaign.status === 'Paused') && campaign.leads > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Campaign Progress</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {campaign.sent}/{campaign.leads} ({((campaign.sent / campaign.leads) * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                campaign.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${(campaign.sent / campaign.leads) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Campaign Duration */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{campaign.startDate}</span>
        </div>
        <span>→</span>
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{campaign.endDate}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-2">
        {campaign.status === 'Draft' && (
          <>
            <Button size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Launch
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </>
        )}
        {campaign.status === 'Active' && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </>
        )}
        {campaign.status === 'Paused' && (
          <>
            <Button size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </>
        )}
        {campaign.status === 'Completed' && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Report
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </>
        )}
        {campaign.status === 'Scheduled' && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <XCircle className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </CardContent>
  </Card>
);

export const CampaignList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const campaignStats = {
    total: mockCampaigns.length,
    active: mockCampaigns.filter(c => c.status === 'Active').length,
    draft: mockCampaigns.filter(c => c.status === 'Draft').length,
    completed: mockCampaigns.filter(c => c.status === 'Completed').length,
    avgOpenRate: mockCampaigns.reduce((acc, c) => acc + c.openRate, 0) / mockCampaigns.length,
    avgReplyRate: mockCampaigns.reduce((acc, c) => acc + c.replyRate, 0) / mockCampaigns.length
  };

  return (
    <PageWrapper
      title="Campaign Management"
      description="Create, manage, and track your email campaigns"
      actions={
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Link to="/campaigns/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Campaigns</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{campaignStats.total}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Active</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{campaignStats.active}</p>
                </div>
                <Play className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Avg. Open Rate</p>
                  <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{campaignStats.avgOpenRate.toFixed(1)}%</p>
                </div>
                <Eye className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg. Reply Rate</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{campaignStats.avgReplyRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Paused">Paused</option>
                  <option value="Completed">Completed</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'No campaigns found' : 'No campaigns yet'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search terms or filters.' 
                    : 'Get started by creating your first email campaign to reach your leads.'
                  }
                </p>
                <Link to="/campaigns/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Campaign
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
};