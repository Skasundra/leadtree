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
  BarChart3,
  X,
  Trash2,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    monthlyPrice: '',
    yearlyPrice: '',
    features: [{ title: '', value: '' }],
    color: 'from-blue-500 to-blue-600',
    isActive: true
  });

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

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic',
      description: 'Perfect for individuals getting started',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        { title: 'Leads Limit', value: '1000' },
        { title: 'Analytics', value: 'basic' },
        { title: 'Support', value: 'email' },
        { title: 'Campaigns', value: '5' }
      ],
      color: 'from-blue-500 to-blue-600',
      subscribers: 1250,
      isActive: true
    },
    {
      id: 2,
      name: 'Pro',
      description: 'Best for growing teams',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        { title: 'Leads Limit', value: '10000' },
        { title: 'Analytics', value: 'advanced' },
        { title: 'Support', value: 'priority' },
        { title: 'Campaigns', value: 'unlimited' },
        { title: 'API Access', value: 'true' }
      ],
      color: 'from-purple-500 to-purple-600',
      subscribers: 850,
      isActive: true
    },
    {
      id: 3,
      name: 'Premium',
      description: 'For large organizations',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { title: 'Leads Limit', value: 'unlimited' },
        { title: 'Analytics', value: 'advanced' },
        { title: 'Support', value: '24/7' },
        { title: 'Campaigns', value: 'unlimited' },
        { title: 'Custom Integrations', value: 'true' },
        { title: 'White Label', value: 'true' }
      ],
      color: 'from-gold-500 to-yellow-600',
      subscribers: 320,
      isActive: true
    }
  ]);

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

  const colorOptions = [
    { value: 'from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'from-pink-500 to-pink-600', label: 'Pink' },
    { value: 'from-green-500 to-green-600', label: 'Green' },
    { value: 'from-red-500 to-red-600', label: 'Red' },
    { value: 'from-yellow-500 to-yellow-600', label: 'Yellow' },
    { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
    { value: 'from-teal-500 to-teal-600', label: 'Teal' }
  ];

  const handleCreatePlan = () => {
    setEditingPlan(null);
    setNewPlan({
      name: '',
      description: '',
      monthlyPrice: '',
      yearlyPrice: '',
      features: [{ title: '', value: '' }],
      color: 'from-blue-500 to-blue-600',
      isActive: true
    });
    setShowCreatePlanModal(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      features: [...plan.features],
      color: plan.color,
      isActive: plan.isActive
    });
    setShowCreatePlanModal(true);
  };

  const handleSavePlan = () => {
    if (!newPlan.name || !newPlan.monthlyPrice || !newPlan.yearlyPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const filteredFeatures = newPlan.features.filter(f => f.title.trim() !== '' && f.value.trim() !== '');
    if (filteredFeatures.length === 0) {
      alert('Please add at least one feature with both title and value');
      return;
    }

    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(p => 
        p.id === editingPlan.id 
          ? { ...p, ...newPlan, features: filteredFeatures }
          : p
      ));
    } else {
      // Create new plan
      const newId = Math.max(...plans.map(p => p.id), 0) + 1;
      setPlans([...plans, {
        id: newId,
        ...newPlan,
        features: filteredFeatures,
        subscribers: 0
      }]);
    }

    setShowCreatePlanModal(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(p => p.id !== planId));
    }
  };

  const handleAddFeature = () => {
    setNewPlan({ ...newPlan, features: [...newPlan.features, { title: '', value: '' }] });
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index][field] = value;
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

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
          <Button 
            onClick={handleCreatePlan}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
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
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Subscription Plans</h2>
          <Button 
            onClick={handleCreatePlan}
            size="sm"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Plan
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="bg-slate-800 border-slate-700 relative group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${plan.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditPlan(plan)}
                      className="text-slate-400 hover:text-white h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mt-1">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">${plan.monthlyPrice}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <div className="text-slate-500 text-xs">
                    or ${plan.yearlyPrice}/year
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm mb-2">Subscribers</p>
                    <p className="text-xl font-semibold text-white">{plan.subscribers}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm mb-3">Features:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-slate-300 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium text-white">{feature.title}:</span>
                            <span className="ml-1">{feature.value}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
              {plans.map(plan => (
                <option key={plan.id} value={plan.name}>{plan.name}</option>
              ))}
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

      {/* Create/Edit Plan Modal */}
      {showCreatePlanModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-slate-800 border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-slate-800 z-10 border-b border-slate-700">
              <CardTitle className="text-white flex items-center">
                <Crown className="h-5 w-5 mr-2" />
                {editingPlan ? 'Edit Plan' : 'Create New Plan'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreatePlanModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Plan Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Plan Name *
                  </label>
                  <Input
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    placeholder="e.g., Enterprise, Starter, etc."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description *
                  </label>
                  <Input
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    placeholder="Brief description of the plan"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Monthly Price ($) *
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newPlan.monthlyPrice}
                      onChange={(e) => setNewPlan({ ...newPlan, monthlyPrice: e.target.value })}
                      placeholder="19.99"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Yearly Price ($) *
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newPlan.yearlyPrice}
                      onChange={(e) => setNewPlan({ ...newPlan, yearlyPrice: e.target.value })}
                      placeholder="199.99"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                {/* Color Theme */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setNewPlan({ ...newPlan, color: color.value })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          newPlan.color === color.value
                            ? 'border-white'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className={`h-8 w-full bg-gradient-to-r ${color.value} rounded`} />
                        <p className="text-slate-300 text-xs mt-2 text-center">{color.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Features *
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddFeature}
                      className="bg-slate-700 hover:bg-slate-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {newPlan.features.map((feature, index) => (
                      <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-2" />
                          <div className="flex-1 space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-400 mb-1">
                                Feature Title *
                              </label>
                              <Input
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                placeholder="e.g., Leads Limit, Analytics, Support"
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-400 mb-1">
                                Feature Value *
                              </label>
                              <Input
                                value={feature.value}
                                onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                                placeholder="e.g., 1000, unlimited, true, advanced"
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                Use numeric values (1000), text (unlimited, basic, advanced), or boolean (true/false)
                              </p>
                            </div>
                          </div>
                          {newPlan.features.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-red-400 hover:text-red-300 h-8 w-8 p-0 mt-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newPlan.isActive}
                    onChange={(e) => setNewPlan({ ...newPlan, isActive: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <label htmlFor="isActive" className="text-slate-300">
                    Make this plan active and available for users
                  </label>
                </div>

                {/* Preview */}
                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <p className="text-slate-400 text-sm mb-3">Preview:</p>
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-3 w-3 rounded-full ${newPlan.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                      <h3 className="text-white font-semibold">{newPlan.name || 'Plan Name'}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{newPlan.description || 'Plan description'}</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">
                        ${newPlan.monthlyPrice || '0'}
                      </span>
                      <span className="text-slate-400 text-sm">/month</span>
                    </div>
                    <p className="text-slate-500 text-xs mb-3">
                      or ${newPlan.yearlyPrice || '0'}/year
                    </p>
                    {newPlan.features.filter(f => f.title.trim() && f.value.trim()).length > 0 && (
                      <ul className="space-y-2">
                        {newPlan.features.filter(f => f.title.trim() && f.value.trim()).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-slate-300 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium text-white">{feature.title}:</span>
                              <span className="ml-1">{feature.value}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowCreatePlanModal(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSavePlan}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};