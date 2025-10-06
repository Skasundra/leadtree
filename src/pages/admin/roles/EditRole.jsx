import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft, 
  Save,
  AlertCircle,
  CheckCircle,
  Crown,
  Users,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  Activity,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const EditRole = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [showAllPermissions, setShowAllPermissions] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    key: '',
    description: '',
    color: 'from-blue-500 to-blue-600',
    permissions: [],
    isActive: true,
    isSystem: false,
    userCount: 0,
    createdAt: '',
    lastModified: ''
  });

  const [errors, setErrors] = useState({});

  // Simulate loading role data
  useEffect(() => {
    const loadRoleData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock role data
        setFormData({
          id: roleId,
          name: 'Marketing Manager',
          key: 'marketing_manager',
          description: 'Marketing focused role with campaign and analytics access',
          color: 'from-orange-500 to-orange-600',
          permissions: [
            'campaign_management',
            'email_management',
            'analytics_access',
            'lead_management'
          ],
          isActive: true,
          isSystem: false,
          userCount: 12,
          createdAt: '2023-05-15',
          lastModified: '2023-12-01'
        });
      } catch (error) {
        console.error('Failed to load role:', error);
      } finally {
        setLoading(false);
      }
    };

    if (roleId) {
      loadRoleData();
    }
  }, [roleId]);

  const allPermissions = [
    { 
      key: 'user_management', 
      name: 'User Management', 
      description: 'Create, edit, and delete users',
      category: 'Administration',
      risk: 'high'
    },
    { 
      key: 'role_management', 
      name: 'Role Management', 
      description: 'Manage user roles and permissions',
      category: 'Administration',
      risk: 'high'
    },
    { 
      key: 'subscription_management', 
      name: 'Subscription Management', 
      description: 'Manage user subscriptions',
      category: 'Billing',
      risk: 'medium'
    },
    { 
      key: 'system_settings', 
      name: 'System Settings', 
      description: 'Configure system-wide settings',
      category: 'Administration',
      risk: 'high'
    },
    { 
      key: 'analytics_access', 
      name: 'Analytics Access', 
      description: 'View detailed analytics and reports',
      category: 'Analytics',
      risk: 'low'
    },
    { 
      key: 'billing_management', 
      name: 'Billing Management', 
      description: 'Manage billing and payments',
      category: 'Billing',
      risk: 'high'
    },
    { 
      key: 'security_management', 
      name: 'Security Management', 
      description: 'Manage security settings and logs',
      category: 'Security',
      risk: 'high'
    },
    { 
      key: 'api_management', 
      name: 'API Management', 
      description: 'Manage API keys and integrations',
      category: 'Integration',
      risk: 'medium'
    },
    { 
      key: 'lead_management', 
      name: 'Lead Management', 
      description: 'Create and manage leads',
      category: 'Sales',
      risk: 'low'
    },
    { 
      key: 'campaign_management', 
      name: 'Campaign Management', 
      description: 'Create and manage campaigns',
      category: 'Marketing',
      risk: 'low'
    },
    { 
      key: 'email_management', 
      name: 'Email Management', 
      description: 'Send and track emails',
      category: 'Marketing',
      risk: 'low'
    },
    { 
      key: 'analytics_view', 
      name: 'Analytics View', 
      description: 'View basic analytics',
      category: 'Analytics',
      risk: 'low'
    },
    { 
      key: 'campaign_view', 
      name: 'Campaign View', 
      description: 'View campaigns',
      category: 'Marketing',
      risk: 'low'
    },
    { 
      key: 'email_view', 
      name: 'Email View', 
      description: 'View email history',
      category: 'Marketing',
      risk: 'low'
    },
    { 
      key: 'profile_management', 
      name: 'Profile Management', 
      description: 'Manage own profile',
      category: 'Personal',
      risk: 'low'
    }
  ];

  const colorOptions = [
    { value: 'from-blue-500 to-blue-600', name: 'Blue', preview: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { value: 'from-purple-500 to-purple-600', name: 'Purple', preview: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { value: 'from-green-500 to-green-600', name: 'Green', preview: 'bg-gradient-to-r from-green-500 to-green-600' },
    { value: 'from-orange-500 to-orange-600', name: 'Orange', preview: 'bg-gradient-to-r from-orange-500 to-orange-600' },
    { value: 'from-red-500 to-red-600', name: 'Red', preview: 'bg-gradient-to-r from-red-500 to-red-600' },
    { value: 'from-pink-500 to-pink-600', name: 'Pink', preview: 'bg-gradient-to-r from-pink-500 to-pink-600' },
    { value: 'from-indigo-500 to-indigo-600', name: 'Indigo', preview: 'bg-gradient-to-r from-indigo-500 to-indigo-600' },
    { value: 'from-teal-500 to-teal-600', name: 'Teal', preview: 'bg-gradient-to-r from-teal-500 to-teal-600' }
  ];

  const permissionCategories = [...new Set(allPermissions.map(p => p.category))];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionToggle = (permissionKey) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionKey)
        ? prev.permissions.filter(p => p !== permissionKey)
        : [...prev.permissions, permissionKey]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Role name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.permissions.length === 0) newErrors.permissions = 'At least one permission is required';
    
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
      
      // Navigate back to role management
      navigate('/admin/roles');
    } catch (error) {
      console.error('Failed to update role:', error);
      setErrors({ submit: 'Failed to update role. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone and will affect all users with this role.')) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/admin/roles');
      } catch (error) {
        console.error('Failed to delete role:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getRiskLevel = () => {
    const highRiskPerms = formData.permissions.filter(p => 
      allPermissions.find(ap => ap.key === p)?.risk === 'high'
    ).length;
    const mediumRiskPerms = formData.permissions.filter(p => 
      allPermissions.find(ap => ap.key === p)?.risk === 'medium'
    ).length;
    
    if (highRiskPerms > 0) return 'High';
    if (mediumRiskPerms > 0) return 'Medium';
    return 'Low';
  };

  if (loading && !formData.id) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading role data...</p>
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
            onClick={() => navigate('/admin/roles')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roles
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Role</h1>
            <p className="text-slate-400 mt-1">Modify role permissions and settings</p>
          </div>
        </div>
        {!formData.isSystem && (
          <Button
            onClick={handleDeleteRole}
            variant="ghost"
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Role
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Info Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className={`h-20 w-20 bg-gradient-to-r ${formData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {formData.key === 'super_admin' ? (
                  <Crown className="h-10 w-10 text-white" />
                ) : (
                  <Shield className="h-10 w-10 text-white" />
                )}
              </div>
              <h3 className="text-white font-semibold text-lg">
                {formData.name}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{formData.key}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    formData.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white">
                    {formData.isSystem ? 'System' : 'Custom'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Users</span>
                  <span className="text-white">{formData.userCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Permissions</span>
                  <span className="text-white">{formData.permissions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Risk Level</span>
                  <span className={`text-sm font-medium ${
                    getRiskLevel() === 'High' ? 'text-red-400' :
                    getRiskLevel() === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {getRiskLevel()}
                  </span>
                </div>
              </div>

              {formData.isSystem && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center text-yellow-300 text-xs">
                    <Lock className="h-4 w-4 mr-2" />
                    System Role - Limited editing
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'details', label: 'Details', icon: Settings },
              { id: 'permissions', label: 'Permissions', icon: Shield },
              { id: 'users', label: 'Users', icon: Users },
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
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Role Name *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter role name"
                          className={`bg-slate-700 border-slate-600 text-white ${errors.name ? 'border-red-500' : ''}`}
                          disabled={formData.isSystem}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Role Key
                        </label>
                        <Input
                          value={formData.key}
                          className="bg-slate-700 border-slate-600 text-slate-400"
                          disabled
                        />
                        <p className="text-slate-500 text-xs mt-1">Cannot be changed after creation</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe what this role is for..."
                        rows={3}
                        className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white resize-none ${errors.description ? 'border-red-500' : ''}`}
                        disabled={formData.isSystem}
                      />
                      {errors.description && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {!formData.isSystem && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Role Color
                        </label>
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                          {colorOptions.map((color) => (
                            <label
                              key={color.value}
                              className={`relative cursor-pointer group ${
                                formData.color === color.value ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-800' : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name="color"
                                value={color.value}
                                checked={formData.color === color.value}
                                onChange={(e) => handleInputChange('color', e.target.value)}
                                className="sr-only"
                              />
                              <div className={`h-12 w-12 ${color.preview} rounded-lg group-hover:scale-110 transition-transform`} />
                              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">
                                {color.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-3"
                        disabled={formData.isSystem}
                      />
                      <label htmlFor="isActive" className="text-slate-300">
                        Role is active
                      </label>
                    </div>

                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Role Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Created:</span>
                          <span className="text-white ml-2">{formData.createdAt}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Last Modified:</span>
                          <span className="text-white ml-2">{formData.lastModified}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Permissions Tab */}
                {activeTab === 'permissions' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Manage Permissions</h3>
                        <p className="text-slate-400 text-sm">Control what this role can access and do</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowAllPermissions(!showAllPermissions)}
                        className="text-slate-400 hover:text-white"
                      >
                        {showAllPermissions ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                        {showAllPermissions ? 'Hide Details' : 'Show Details'}
                      </Button>
                    </div>

                    {formData.isSystem && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-yellow-300 text-sm flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          System role permissions cannot be modified.
                        </p>
                      </div>
                    )}

                    {errors.permissions && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {errors.permissions}
                        </p>
                      </div>
                    )}

                    <div className="space-y-6">
                      {permissionCategories.map((category) => {
                        const categoryPermissions = allPermissions.filter(p => p.category === category);
                        
                        return (
                          <div key={category} className="border border-slate-700 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-4 flex items-center">
                              <div className="h-2 w-2 bg-purple-400 rounded-full mr-2" />
                              {category}
                              <span className="ml-2 text-xs text-slate-400">
                                ({categoryPermissions.filter(p => formData.permissions.includes(p.key)).length}/{categoryPermissions.length})
                              </span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {categoryPermissions.map((permission) => {
                                const isSelected = formData.permissions.includes(permission.key);
                                
                                return (
                                  <label
                                    key={permission.key}
                                    className={`p-4 rounded-lg border transition-all ${
                                      formData.isSystem ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                                    } ${
                                      isSelected
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                                    }`}
                                  >
                                    <div className="flex items-start">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handlePermissionToggle(permission.key)}
                                        className="mt-1 mr-3"
                                        disabled={formData.isSystem}
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-white font-medium text-sm">{permission.name}</span>
                                          <span className={`px-2 py-1 rounded-full text-xs ${
                                            permission.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                                            permission.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                            'bg-green-500/20 text-green-300'
                                          }`}>
                                            {permission.risk}
                                          </span>
                                        </div>
                                        {showAllPermissions && (
                                          <p className="text-slate-400 text-xs">{permission.description}</p>
                                        )}
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Permissions Summary */}
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Permissions Summary</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">
                          Total: <span className="text-white font-medium">{formData.permissions.length}</span>
                        </span>
                        <span className="text-slate-400">
                          Risk Level: <span className={`font-medium ${
                            getRiskLevel() === 'High' ? 'text-red-400' :
                            getRiskLevel() === 'Medium' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>{getRiskLevel()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Users with this Role</h3>
                        <p className="text-slate-400 text-sm">{formData.userCount} users currently have this role</p>
                      </div>
                      <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: 'Sarah Johnson', email: 'sarah.johnson@example.com', status: 'active', joinDate: '2023-08-15' },
                        { name: 'Mike Chen', email: 'mike.chen@example.com', status: 'active', joinDate: '2023-09-22' },
                        { name: 'Emily Davis', email: 'emily.davis@example.com', status: 'inactive', joinDate: '2023-07-10' },
                        { name: 'Alex Rodriguez', email: 'alex.rodriguez@example.com', status: 'active', joinDate: '2023-10-05' }
                      ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-semibold">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.name}</p>
                              <p className="text-slate-400 text-sm">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {user.status}
                            </span>
                            <span className="text-slate-400 text-sm">{user.joinDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-4">Role Activity History</h3>
                      <div className="space-y-4">
                        {[
                          { date: '2023-12-01', action: 'Permissions updated', details: 'Added analytics_access permission', user: 'Admin User' },
                          { date: '2023-11-15', action: 'User assigned', details: 'Sarah Johnson assigned to role', user: 'Admin User' },
                          { date: '2023-10-20', action: 'Role modified', details: 'Description updated', user: 'Admin User' },
                          { date: '2023-09-05', action: 'User removed', details: 'John Smith removed from role', user: 'Admin User' },
                          { date: '2023-05-15', action: 'Role created', details: 'Marketing Manager role created', user: 'System' }
                        ].map((event, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg">
                            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Activity className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-white font-medium">{event.action}</h4>
                                <span className="text-slate-400 text-sm">{event.date}</span>
                              </div>
                              <p className="text-slate-400 text-sm mt-1">{event.details}</p>
                              <p className="text-slate-500 text-xs mt-1">by {event.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {(activeTab === 'details' || activeTab === 'permissions') && !formData.isSystem && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate('/admin/roles')}
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