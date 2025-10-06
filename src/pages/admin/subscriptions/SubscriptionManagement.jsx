import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Crown, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus,
  Edit,
  Eye,
  Download,
  Settings,
  CreditCard,
  Users,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const subscriptions = [
    {
      id: 1,
      user: 'John Doe',
      email: 'john.doe@example.com',
      plan: 'Premium',
      status: 'active',
      amount: '$99/month',
      startDate: '2023-06-15',
      nextBilling: '2024-02-15',
      paymentMethod: 'Credit Card ****1234'
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane.smith@example.com',
      plan: 'Pro',
      status: 'active',
      amount: '$49/month',
      startDate: '2023-08-22',
      nextBilling: '2024-02-22',
      paymentMethod: 'PayPal'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      plan: 'Basic',
      status: 'cancelled',
      amount: '$19/month',
      startDate: '2023-04-10',
      nextBilling: 'N/A',
      paymentMethod: 'Credit Card ****5678'
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      plan: 'Pro',
      status: 'past_due',
      amount: '$49/month',
      startDate: '2023-12-01',
      nextBilling: '2024-01-01',
      paymentMethod: 'Credit Card ****9012'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$19/month',
      features: ['Up to 1,000 leads', 'Basic analytics', 'Email support'],
      color: 'from-blue-500 to-blue-600',
      subscribers: 1250
    },
    {
      name: 'Pro',
      price: '$49/month',
      features: ['Up to 10,000 leads', 'Advanced analytics', 'Priority support', 'API access'],
      color: 'from-purple-500 to-purple-600',
      subscribers: 850
    },
    {
      name: 'Premium',
      price: '$99/month',
      features: ['Unlimited leads', 'Custom integrations', '24/7 support', 'White-label'],
      color: 'from-gold-500 to-yellow-600',
      subscribers: 320
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'past_due': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'trial': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pro': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Premium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || sub.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription Management</h1>
          <p className="text-slate-400 mt-1">Monitor and manage user subscriptions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Link to="/admin/subscriptions/add">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Subscription
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Subscribers</p>
                <p className="text-2xl font-bold text-white">2,420</p>
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% vs last month
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">$124,580</p>
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.3% vs last month
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Churn Rate</p>
                <p className="text-2xl font-bold text-white">2.3%</p>
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                  +0.5% vs last month
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Past Due</p>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-yellow-400 text-xs mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Requires attention
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{plan.name}</CardTitle>
                <span className="text-2xl font-bold text-white">{plan.price}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">Subscribers</p>
                  <p className="text-xl font-semibold text-white">{plan.subscribers}</p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option value="all">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Premium">Premium</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="past_due">Past Due</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Subscriptions ({filteredSubscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Plan</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Next Billing</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors group">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-medium">{subscription.user}</p>
                        <p className="text-slate-400 text-sm">{subscription.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(subscription.plan)}`}>
                        {subscription.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                        {subscription.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{subscription.amount}</td>
                    <td className="py-4 px-4 text-slate-300">{subscription.nextBilling}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link to={`/admin/subscriptions/edit/${subscription.id}`}>
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                          <XCircle className="h-4 w-4" />
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
    </div>
  );
};