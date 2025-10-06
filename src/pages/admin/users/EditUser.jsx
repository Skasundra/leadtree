import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  ArrowLeft, 
  Save,
  Eye,
  EyeOff,
  Phone,
  Building,
  AlertCircle,
  CheckCircle,
  Crown,
  Calendar,
  Activity,
  Settings,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    role: 'client',
    status: 'active',
    lastLogin: '',
    joinDate: '',
    loginCount: 0
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Simulate loading user data
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        setFormData({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          company: 'Acme Corp',
          department: 'Marketing',
          role: 'team_member',
          status: 'active',
          lastLogin: '2024-01-15 10:30 AM',
          joinDate: '2023-06-15',
          loginCount: 245
        });
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const roles = [
    { 
      value: 'super_admin', 
      label: 'Super Admin', 
      description: 'Full system access with all permissions',
      color: 'from-red-500 to-red-600',
      icon: Crown
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      description: 'Administrative access with most permissions',
      color: 'from-purple-500 to-purple-600',
      icon: Shield
    },
    { 
      value: 'team_member', 
      label: 'Team Member', 
      description: 'Team collaboration and lead management',
      color: 'from-blue-500 to-blue-600',
      icon: User
    },
    { 
      value: 'client', 
      label: 'Client', 
      description: 'Limited access for client users',
      color: 'from-green-500 to-green-600',
      icon: User
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (passwordData.newPassword && passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab === 'profile' && !validateProfile()) return;
    if (activeTab === 'security' && !validatePassword()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to user management
      navigate('/admin/users');
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrors({ submit: 'Failed to update user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/admin/users');
      } catch (error) {
        console.error('Failed to delete user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !formData.firstName) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading user data...</p>
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
            onClick={() => navigate('/admin/users')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit User</h1>
            <p className="text-slate-400 mt-1">Update user information and settings</p>
          </div>
        </div>
        <Button
          onClick={handleDeleteUser}
          variant="ghost"
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete User
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Info Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="h-20 w-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{formData.email}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    formData.status === 'active' ? 'bg-green-500/20 text-green-300' :
                    formData.status === 'inactive' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {formData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Role</span>
                  <span className="text-white capitalize">{formData.role.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Joined</span>
                  <span className="text-white">{formData.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Logins</span>
                  <span className="text-white">{formData.loginCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'activity', label: 'Activity', icon: Activity }
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
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          First Name *
                        </label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                          className={`bg-slate-700 border-slate-600 text-white ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Last Name *
                        </label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                          className={`bg-slate-700 border-slate-600 text-white ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter email address"
                          className={`pl-10 bg-slate-700 border-slate-600 text-white ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter phone number"
                            className="pl-10 bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Company
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Enter company name"
                            className="pl-10 bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Department
                      </label>
                      <Input
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        placeholder="Enter department"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Role
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                        >
                          {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
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
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-300 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Leave password fields empty to keep the current password unchanged.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            placeholder="Enter new password"
                            className={`pl-10 pr-10 bg-slate-700 border-slate-600 text-white ${errors.newPassword ? 'border-red-500' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.newPassword && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.newPassword}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm New Password
                        </label>
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                          placeholder="Confirm new password"
                          className={`bg-slate-700 border-slate-600 text-white ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Force Password Change</p>
                          <p className="text-slate-400 text-sm">Require user to change password on next login</p>
                        </div>
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-slate-400 text-sm">Enable 2FA for enhanced security</p>
                        </div>
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Last Login</p>
                            <p className="text-white font-medium">{formData.lastLogin}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                          <Activity className="h-5 w-5 text-green-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Total Logins</p>
                            <p className="text-white font-medium">{formData.loginCount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-purple-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Member Since</p>
                            <p className="text-white font-medium">{formData.joinDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {[
                          { action: 'Logged in', time: '2 hours ago', ip: '192.168.1.1' },
                          { action: 'Updated profile', time: '1 day ago', ip: '192.168.1.1' },
                          { action: 'Password changed', time: '3 days ago', ip: '192.168.1.1' },
                          { action: 'Logged in', time: '5 days ago', ip: '192.168.1.2' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div>
                              <p className="text-white text-sm">{activity.action}</p>
                              <p className="text-slate-400 text-xs">IP: {activity.ip}</p>
                            </div>
                            <span className="text-slate-400 text-xs">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {(activeTab === 'profile' || activeTab === 'security') && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate('/admin/users')}
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