import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const CreateRole = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showAllPermissions, setShowAllPermissions] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    color: 'from-blue-500 to-blue-600',
    permissions: [],
    isActive: true
  });

  const [errors, setErrors] = useState({});

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

    // Auto-generate key from name
    if (field === 'name') {
      const key = value.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      setFormData(prev => ({ ...prev, key }));
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

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.name.trim()) newErrors.name = 'Role name is required';
      if (!formData.key.trim()) newErrors.key = 'Role key is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }
    
    if (stepNumber === 2) {
      if (formData.permissions.length === 0) newErrors.permissions = 'At least one permission is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(1) || !validateStep(2)) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to role management
      navigate('/admin/roles');
    } catch (error) {
      console.error('Failed to create role:', error);
      setErrors({ submit: 'Failed to create role. Please try again.' });
    } finally {
      setLoading(false);
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-white">Create New Role</h1>
          <p className="text-slate-400 mt-1">Define a new role with specific permissions</p>
        </div>
      </div>

      <div>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step >= stepNumber 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'border-slate-600 text-slate-400'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-24 h-0.5 mx-4 transition-all ${
                    step > stepNumber ? 'bg-purple-600' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className={`text-sm ${step >= 1 ? 'text-purple-400' : 'text-slate-400'}`}>
              Basic Information
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-purple-400' : 'text-slate-400'}`}>
              Permissions
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-purple-400' : 'text-slate-400'}`}>
              Review & Create
            </span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Select Permissions'}
              {step === 3 && 'Review & Create'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
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
                        Role Key *
                      </label>
                      <Input
                        value={formData.key}
                        onChange={(e) => handleInputChange('key', e.target.value)}
                        placeholder="role_key"
                        className={`bg-slate-700 border-slate-600 text-white ${errors.key ? 'border-red-500' : ''}`}
                      />
                      {errors.key && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.key}
                        </p>
                      )}
                      <p className="text-slate-500 text-xs mt-1">Used internally, auto-generated from name</p>
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
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

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

                  {/* Preview */}
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="text-white font-medium mb-3">Preview</h3>
                    <div className="flex items-center">
                      <div className={`h-12 w-12 bg-gradient-to-r ${formData.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{formData.name || 'Role Name'}</h4>
                        <p className="text-slate-400 text-sm">{formData.description || 'Role description'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Permissions */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Select Permissions</h3>
                      <p className="text-slate-400 text-sm">Choose what this role can access and do</p>
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
                                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
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
                    <h3 className="text-white font-medium mb-2">Selected Permissions Summary</h3>
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

              {/* Step 3: Review & Create */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-700/50 rounded-lg">
                    <h3 className="text-white font-medium mb-4">Role Summary</h3>
                    
                    <div className="flex items-center mb-6">
                      <div className={`h-16 w-16 bg-gradient-to-r ${formData.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white text-xl font-semibold">{formData.name}</h4>
                        <p className="text-slate-400">{formData.description}</p>
                        <p className="text-slate-500 text-sm mt-1">Key: {formData.key}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-purple-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Permissions</p>
                            <p className="text-white text-xl font-bold">{formData.permissions.length}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Risk Level</p>
                            <p className={`text-xl font-bold ${
                              getRiskLevel() === 'High' ? 'text-red-400' :
                              getRiskLevel() === 'Medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>{getRiskLevel()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-blue-400 mr-2" />
                          <div>
                            <p className="text-slate-400 text-sm">Initial Users</p>
                            <p className="text-white text-xl font-bold">0</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Permissions by Category</h4>
                      <div className="space-y-3">
                        {permissionCategories.map((category) => {
                          const categoryPermissions = allPermissions.filter(p => p.category === category);
                          const selectedInCategory = categoryPermissions.filter(p => formData.permissions.includes(p.key));
                          
                          if (selectedInCategory.length === 0) return null;

                          return (
                            <div key={category} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                              <span className="text-slate-300">{category}</span>
                              <span className="text-white font-medium">
                                {selectedInCategory.length}/{categoryPermissions.length} permissions
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="mr-3"
                    />
                    <label htmlFor="isActive" className="text-slate-300">
                      Activate role immediately after creation
                    </label>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                <div className="flex gap-2">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/admin/roles')}
                    className="text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="flex gap-2">
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Next Step
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Role...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Role
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

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
  );
};