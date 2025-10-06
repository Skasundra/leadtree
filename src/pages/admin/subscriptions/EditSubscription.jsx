import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Crown, 
  User, 
  Mail, 
  CreditCard, 
  Calendar, 
  DollarSign,
  ArrowLeft, 
  Save,
  AlertCircle,
  CheckCircle,
  Activity,
  Settings,
  Trash2,
  RefreshCw,
  XCircle,
  Pause,
  Play,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const EditSubscription = () => {
  const navigate = useNavigate();
  const { subscriptionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  const [formData, setFormData] = useState({
    id: '',
    user: { name: '', email: '' },
    plan: 'basic',
    status: 'active',
    billingCycle: 'monthly',
    startDate: '',
    nextBilling: '',
    amount: 0,
    discount: 0,
    paymentMethod: 'credit_card',
    autoRenew: true,
    trialEnds: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Simulate loading subscription data
  useEffect(() => {
    const loadSubscriptionData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock subscription data
        setFormData({
          id: subscriptionId,
          user: { name: 'John Doe', email: 'john.doe@example.com' },
          plan: 'pro',
          status: 'active',
          billingCycle: 'monthly',
          startDate: '2023-06-15',
          nextBilling: '2024-02-15',
          amount: 49,
          discount: 10,
          paymentMethod: 'credit_card',
          autoRenew: true,
          trialEnds: '',
          notes: 'Corporate account with special pricing'
        });
      } catch (error) {
        console.error('Failed to load subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    if (subscriptionId) {
      loadSubscriptionData();
    }
  }, [subscriptionId]);

  const plans = [
    { id: 'basic', name: 'Basic', monthlyPrice: 19, yearlyPrice: 190, color: 'from-blue-500 to-blue-600' },
    { id: 'pro', name: 'Pro', monthlyPrice: 49, yearlyPrice: 490, color: 'from-purple-500 to-purple-600' },
    { id: 'premium', name: 'Premium', monthlyPrice: 99, yearlyPrice: 990, color: 'from-gold-500 to-yellow-600' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.plan) newErrors.plan = 'Plan is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.nextBilling) newErrors.nextBilling = 'Next billing date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to subscription management
      navigate('/admin/subscriptions');
    } catch (error) {
      console.error('Failed to update subscription:', error);
      setErrors({ submit: 'Failed to update subscription. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel this subscription? This action cannot be undone.')) {
      await handleStatusChange('cancelled');
    }
  };

  const selectedPlan = plans.find(p => p.id === formData.plan);
  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    const basePrice = formData.billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
    const discountAmount = (basePrice * formData.discount) / 100;
    return basePrice - discountAmount;
  };

  if (loading && !formData.id) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/subscriptions')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subscriptions
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Subscription</h1>
            <p className="text-slate-400 mt-1">Manage subscription details and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {formData.status === 'active' ? (
            <Button
              onClick={() => handleStatusChange('paused')}
              variant="ghost"
              className="text-yellow-400 hover:text-yellow-300"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          ) : formData.status === 'paused' ? (
            <Button
              onClick={() => handleStatusChange('active')}
              variant="ghost"
              className="text-green-400 hover:text-green-300"
            >
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          ) : null}
          <Button
            onClick={handleCancelSubscription}
            variant="ghost"
            className="text-red-400 hover:text-red-300"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Subscription Info Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg">
                  {selectedPlan?.name} Plan
                </h3>
                <p className="text-slate-400 text-sm">{formData.user.name}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    formData.status === 'active' ? 'bg-green-500/20 text-green-300' :
                    formData.status === 'paused' ? 'bg-yellow-500/20 text-yellow-300' :
                    formData.status === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {formData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Amount</span>
                  <span className="text-white font-medium">${calculatePrice()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Billing</span>
                  <span className="text-white capitalize">{formData.billingCycle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Next Billing</span>
                  <span className="text-white">{formData.nextBilling}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Auto Renew</span>
                  <span className={`text-sm ${formData.autoRenew ? 'text-green-400' : 'text-red-400'}`}>
                    {formData.autoRenew ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <Button
                  onClick={() => handleStatusChange('active')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-2"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Billing
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-white"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'details', label: 'Details', icon: Settings },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'history', label: 'History', icon: Activity }
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

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h3 className="text-white font-medium mb-2">User Information</h3>
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white text-sm font-semibold">
                            {formData.user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{formData.user.name}</p>
                          <p className="text-slate-400 text-sm">{formData.user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Subscription Plan
                      </label>
                      <select
                        value={formData.plan}
                        onChange={(e) => handleInputChange('plan', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                      >
                        {plans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name} - ${plan.monthlyPrice}/month
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Billing Cycle
                        </label>
                        <select
                          value={formData.billingCycle}
                          onChange={(e) => handleInputChange('billingCycle', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                        >
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="past_due">Past Due</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Start Date
                        </label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Next Billing Date
                        </label>
                        <Input
                          type="date"
                          value={formData.nextBilling}
                          onChange={(e) => handleInputChange('nextBilling', e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Discount (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={(e) => handleInputChange('discount', parseInt(e.target.value) || 0)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Add any notes about this subscription..."
                        rows={3}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white resize-none"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoRenew"
                        checked={formData.autoRenew}
                        onChange={(e) => handleInputChange('autoRenew', e.target.checked)}
                        className="mr-3"
                      />
                      <label htmlFor="autoRenew" className="text-slate-300">
                        Enable auto-renewal
                      </label>
                    </div>

                    {/* Price Summary */}
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h3 className="text-white font-medium mb-3">Price Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Base Price:</span>
                          <span className="text-white">
                            ${formData.billingCycle === 'yearly' ? selectedPlan?.yearlyPrice : selectedPlan?.monthlyPrice}
                          </span>
                        </div>
                        {formData.discount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Discount ({formData.discount}%):</span>
                            <span className="text-green-400">
                              -${((formData.billingCycle === 'yearly' ? selectedPlan?.yearlyPrice : selectedPlan?.monthlyPrice) * formData.discount / 100).toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="border-t border-slate-600 pt-2">
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Total:</span>
                            <span className="text-white font-bold text-lg">
                              ${calculatePrice()}/{formData.billingCycle === 'yearly' ? 'year' : 'month'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Payment Method
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                      >
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="invoice">Invoice</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Total Paid</p>
                            <p className="text-white text-xl font-bold">$392</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Payments Made</p>
                            <p className="text-white text-xl font-bold">8</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Failed Payments</p>
                            <p className="text-white text-xl font-bold">0</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-4">Recent Payments</h3>
                      <div className="space-y-3">
                        {[
                          { date: '2024-01-15', amount: '$49.00', status: 'success', method: 'Credit Card ****1234' },
                          { date: '2023-12-15', amount: '$49.00', status: 'success', method: 'Credit Card ****1234' },
                          { date: '2023-11-15', amount: '$49.00', status: 'success', method: 'Credit Card ****1234' },
                          { date: '2023-10-15', amount: '$49.00', status: 'success', method: 'Credit Card ****1234' }
                        ].map((payment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center">
                              <div className={`h-3 w-3 rounded-full mr-3 ${
                                payment.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                              }`} />
                              <div>
                                <p className="text-white text-sm font-medium">{payment.amount}</p>
                                <p className="text-slate-400 text-xs">{payment.method}</p>
                              </div>
                            </div>
                            <span className="text-slate-400 text-xs">{payment.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-4">Subscription Timeline</h3>
                      <div className="space-y-4">
                        {[
                          { date: '2024-01-15', action: 'Payment processed', details: '$49.00 charged successfully', type: 'payment' },
                          { date: '2024-01-10', action: 'Subscription updated', details: 'Discount applied: 10%', type: 'update' },
                          { date: '2023-12-15', action: 'Payment processed', details: '$49.00 charged successfully', type: 'payment' },
                          { date: '2023-11-20', action: 'Plan upgraded', details: 'Upgraded from Basic to Pro', type: 'upgrade' },
                          { date: '2023-06-15', action: 'Subscription created', details: 'Pro plan subscription started', type: 'created' }
                        ].map((event, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              event.type === 'payment' ? 'bg-green-500/20' :
                              event.type === 'upgrade' ? 'bg-purple-500/20' :
                              event.type === 'update' ? 'bg-blue-500/20' :
                              'bg-slate-500/20'
                            }`}>
                              {event.type === 'payment' ? (
                                <DollarSign className="h-5 w-5 text-green-400" />
                              ) : event.type === 'upgrade' ? (
                                <Crown className="h-5 w-5 text-purple-400" />
                              ) : event.type === 'update' ? (
                                <Settings className="h-5 w-5 text-blue-400" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-white font-medium">{event.action}</h4>
                                <span className="text-slate-400 text-sm">{event.date}</span>
                              </div>
                              <p className="text-slate-400 text-sm mt-1">{event.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {(activeTab === 'details' || activeTab === 'billing') && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate('/admin/subscriptions')}
                      className="text-slate-400 hover:text-white"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {errors.submit && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {errors.submit}
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};