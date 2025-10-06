import { useState } from 'react';
import { 
  Mail, 
  Eye, 
  MousePointer, 
  Reply, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  User,
  Building,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'delivered': { 
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      icon: CheckCircle
    },
    'opened': { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: Eye
    },
    'clicked': { 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      icon: MousePointer
    },
    'replied': { 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      icon: Reply
    },
    'bounced': { 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      icon: XCircle
    },
    'pending': { 
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      icon: Clock
    }
  };

  const config = statusConfig[status] || statusConfig['pending'];
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const MetricCard = ({ title, value, change, changeType, icon: Icon, color, subtitle }) => (
  <Card className={`border-0 bg-gradient-to-br ${color}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs opacity-70 mt-1">{subtitle}</p>
          )}
          {change && (
            <div className={`flex items-center text-sm font-medium mt-2 ${
              changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {changeType === 'positive' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {change} from last week
            </div>
          )}
        </div>
        <Icon className="h-8 w-8 opacity-80" />
      </div>
    </CardContent>
  </Card>
);

const EmailActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
    <div className={`p-2 rounded-lg ${
      activity.type === 'opened' ? 'bg-blue-100 dark:bg-blue-900/30' :
      activity.type === 'clicked' ? 'bg-purple-100 dark:bg-purple-900/30' :
      activity.type === 'replied' ? 'bg-green-100 dark:bg-green-900/30' :
      'bg-slate-100 dark:bg-slate-800'
    }`}>
      {activity.type === 'opened' && <Eye className="h-4 w-4 text-blue-600" />}
      {activity.type === 'clicked' && <MousePointer className="h-4 w-4 text-purple-600" />}
      {activity.type === 'replied' && <Reply className="h-4 w-4 text-green-600" />}
      {activity.type === 'delivered' && <CheckCircle className="h-4 w-4 text-emerald-600" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {activity.leadName} {activity.action}
        </p>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {activity.timestamp}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {activity.campaign} • {activity.email}
      </p>
      {activity.details && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {activity.details}
        </p>
      )}
    </div>
  </div>
);

export const EmailTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const mockEmails = [
    {
      id: 1,
      subject: 'Partnership Opportunity with Tech Corp',
      recipient: 'john.smith@techcorp.com',
      recipientName: 'John Smith',
      company: 'Tech Corp',
      campaign: 'Q1 Product Launch',
      status: 'replied',
      sentAt: '2024-01-15 09:30',
      openedAt: '2024-01-15 10:15',
      clickedAt: '2024-01-15 10:18',
      repliedAt: '2024-01-15 14:22',
      opens: 3,
      clicks: 2,
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      subject: 'Follow-up: Demo Request',
      recipient: 'sarah.j@startup.io',
      recipientName: 'Sarah Johnson',
      company: 'StartupIO',
      campaign: 'Demo Requests',
      status: 'clicked',
      sentAt: '2024-01-15 11:00',
      openedAt: '2024-01-15 11:45',
      clickedAt: '2024-01-15 11:47',
      opens: 2,
      clicks: 1,
      location: 'New York, NY'
    },
    {
      id: 3,
      subject: 'Exclusive Invitation: Product Webinar',
      recipient: 'mike@enterprise.com',
      recipientName: 'Mike Davis',
      company: 'Enterprise Solutions',
      campaign: 'Webinar Series',
      status: 'opened',
      sentAt: '2024-01-15 14:20',
      openedAt: '2024-01-15 15:10',
      opens: 1,
      clicks: 0,
      location: 'Austin, TX'
    },
    {
      id: 4,
      subject: 'Your Free Trial is Ready',
      recipient: 'emily.chen@innovate.com',
      recipientName: 'Emily Chen',
      company: 'Innovate Labs',
      campaign: 'Trial Activation',
      status: 'delivered',
      sentAt: '2024-01-15 16:45',
      opens: 0,
      clicks: 0,
      location: 'Seattle, WA'
    },
    {
      id: 5,
      subject: 'Important Update About Your Account',
      recipient: 'invalid@domain.com',
      recipientName: 'Invalid User',
      company: 'Unknown',
      campaign: 'Account Updates',
      status: 'bounced',
      sentAt: '2024-01-15 17:30',
      opens: 0,
      clicks: 0,
      bounceReason: 'Invalid email address'
    }
  ];

  const recentActivity = [
    {
      type: 'replied',
      leadName: 'John Smith',
      action: 'replied to your email',
      campaign: 'Q1 Product Launch',
      email: 'Partnership Opportunity',
      timestamp: '2 minutes ago',
      details: 'Interested in scheduling a call next week'
    },
    {
      type: 'clicked',
      leadName: 'Sarah Johnson',
      action: 'clicked "Schedule Demo"',
      campaign: 'Demo Requests',
      email: 'Follow-up: Demo Request',
      timestamp: '15 minutes ago',
      details: 'Clicked demo scheduling link'
    },
    {
      type: 'opened',
      leadName: 'Mike Davis',
      action: 'opened your email',
      campaign: 'Webinar Series',
      email: 'Exclusive Invitation',
      timestamp: '1 hour ago',
      details: 'First time opening this email'
    },
    {
      type: 'delivered',
      leadName: 'Emily Chen',
      action: 'email delivered',
      campaign: 'Trial Activation',
      email: 'Your Free Trial is Ready',
      timestamp: '2 hours ago'
    }
  ];

  const metrics = [
    {
      title: 'Total Emails Sent',
      value: '12,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: Mail,
      color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-600 dark:text-blue-400',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Open Rate',
      value: '24.8%',
      change: '-2.1%',
      changeType: 'negative',
      icon: Eye,
      color: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 text-emerald-600 dark:text-emerald-400',
      subtitle: 'Industry avg: 21.3%'
    },
    {
      title: 'Click Rate',
      value: '4.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: MousePointer,
      color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-600 dark:text-purple-400',
      subtitle: 'Industry avg: 2.6%'
    },
    {
      title: 'Reply Rate',
      value: '8.7%',
      change: '+1.2%',
      changeType: 'positive',
      icon: Reply,
      color: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 text-amber-600 dark:text-amber-400',
      subtitle: 'Excellent performance'
    }
  ];

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
    const matchesCampaign = campaignFilter === 'all' || email.campaign === campaignFilter;
    
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  return (
    <PageWrapper
      title="Email Tracking"
      description="Monitor email performance and engagement metrics"
      actions={
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Search emails..."
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
                      <option value="delivered">Delivered</option>
                      <option value="opened">Opened</option>
                      <option value="clicked">Clicked</option>
                      <option value="replied">Replied</option>
                      <option value="bounced">Bounced</option>
                    </select>

                    <select
                      value={campaignFilter}
                      onChange={(e) => setCampaignFilter(e.target.value)}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Campaigns</option>
                      <option value="Q1 Product Launch">Q1 Product Launch</option>
                      <option value="Demo Requests">Demo Requests</option>
                      <option value="Webinar Series">Webinar Series</option>
                      <option value="Trial Activation">Trial Activation</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="1d">Last 24 hours</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Table */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Email Activity ({filteredEmails.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmails.map((email) => (
                        <TableRow key={email.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                {email.recipientName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-medium text-slate-900 dark:text-white">
                                  {email.recipientName}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                  {email.company}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <div className="font-medium text-slate-900 dark:text-white truncate">
                                {email.subject}
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                {email.recipient}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {email.campaign}
                            </span>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={email.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3 text-blue-600" />
                                <span>{email.opens}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MousePointer className="h-3 w-3 text-purple-600" />
                                <span>{email.clicks}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {email.sentAt}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2 text-amber-600" />
                  Live Activity
                </CardTitle>
                <CardDescription>
                  Real-time email engagement updates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <EmailActivityItem key={index} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Performance Trends
                </CardTitle>
                <CardDescription>
                  Email engagement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Interactive Chart
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Coming Soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Emails */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Best performing emails this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { subject: 'Partnership Opportunity', openRate: 68, campaign: 'Q1 Launch' },
                  { subject: 'Demo Request Follow-up', openRate: 54, campaign: 'Demo Series' },
                  { subject: 'Webinar Invitation', openRate: 42, campaign: 'Events' }
                ].map((email, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-white text-sm truncate">
                        {email.subject}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {email.campaign}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {email.openRate}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};