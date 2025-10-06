import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Settings,
  Lock,
  Unlock,
  Search,
  Crown,
  AlertTriangle,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      key: 'super_admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: [
        'user_management',
        'role_management',
        'subscription_management',
        'system_settings',
        'analytics_access',
        'billing_management',
        'security_management',
        'api_management'
      ],
      color: 'from-red-500 to-red-600',
      isSystem: true,
      createdAt: '2023-01-01',
      lastModified: '2023-01-01'
    },
    {
      id: 2,
      name: 'Admin',
      key: 'admin',
      description: 'Administrative access with most permissions',
      userCount: 8,
      permissions: [
        'user_management',
        'subscription_management',
        'analytics_access',
        'billing_management'
      ],
      color: 'from-purple-500 to-purple-600',
      isSystem: true,
      createdAt: '2023-01-01',
      lastModified: '2023-06-15'
    },
    {
      id: 3,
      name: 'Team Member',
      key: 'team_member',
      description: 'Team collaboration and lead management',
      userCount: 24,
      permissions: [
        'lead_management',
        'campaign_management',
        'email_management',
        'analytics_view'
      ],
      color: 'from-blue-500 to-blue-600',
      isSystem: true,
      createdAt: '2023-01-01',
      lastModified: '2023-08-20'
    },
    {
      id: 4,
      name: 'Client',
      key: 'client',
      description: 'Limited access for client users',
      userCount: 156,
      permissions: [
        'campaign_view',
        'email_view',
        'profile_management'
      ],
      color: 'from-green-500 to-green-600',
      isSystem: true,
      createdAt: '2023-01-01',
      lastModified: '2023-09-10'
    },
    {
      id: 5,
      name: 'Marketing Manager',
      key: 'marketing_manager',
      description: 'Marketing focused role with campaign and analytics access',
      userCount: 12,
      permissions: [
        'campaign_management',
        'email_management',
        'analytics_access',
        'lead_management'
      ],
      color: 'from-orange-500 to-orange-600',
      isSystem: false,
      createdAt: '2023-05-15',
      lastModified: '2023-12-01'
    }
  ];

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

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Roles', value: roles.length, color: 'from-blue-500 to-blue-600' },
    { label: 'System Roles', value: roles.filter(r => r.isSystem).length, color: 'from-purple-500 to-purple-600' },
    { label: 'Custom Roles', value: roles.filter(r => !r.isSystem).length, color: 'from-green-500 to-green-600' },
    { label: 'Total Users', value: roles.reduce((sum, role) => sum + role.userCount, 0), color: 'from-orange-500 to-orange-600' }
  ];

  const permissionCategories = [...new Set(allPermissions.map(p => p.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Role Management</h1>
          <p className="text-slate-400 mt-1">Manage user roles and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Copy className="h-4 w-4 mr-2" />
            Clone Role
          </Button>
          <Link to="/admin/roles/create">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Roles ({filteredRoles.length})
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all group ${
                      selectedRole?.id === role.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-700 bg-slate-700/50 hover:border-slate-600 hover:bg-slate-700/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                          {role.key === 'super_admin' ? (
                            <Crown className="h-5 w-5 text-white" />
                          ) : (
                            <Shield className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">{role.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="h-3 w-3 text-slate-500" />
                            <p className="text-slate-400 text-xs">{role.userCount} users</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {role.isSystem && (
                          <Lock className="h-4 w-4 text-slate-500" />
                        )}
                        <span className="text-xs text-slate-500">{role.permissions.length} perms</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Details */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-12 w-12 bg-gradient-to-r ${selectedRole.color} rounded-lg flex items-center justify-center mr-4`}>
                    {selectedRole.key === 'super_admin' ? (
                      <Crown className="h-6 w-6 text-white" />
                    ) : (
                      <Shield className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white">{selectedRole.name}</CardTitle>
                      {selectedRole.isSystem && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">System Role</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{selectedRole.description}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      Created: {selectedRole.createdAt} • Modified: {selectedRole.lastModified}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                  {!selectedRole.isSystem && (
                    <>
                      <Link to={`/admin/roles/edit/${selectedRole.id}`}>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Role Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-400 mr-2" />
                        <div>
                          <p className="text-slate-400 text-sm">Users</p>
                          <p className="text-white text-xl font-bold">{selectedRole.userCount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-purple-400 mr-2" />
                        <div>
                          <p className="text-slate-400 text-sm">Permissions</p>
                          <p className="text-white text-xl font-bold">{selectedRole.permissions.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                        <div>
                          <p className="text-slate-400 text-sm">Risk Level</p>
                          <p className="text-white text-xl font-bold">
                            {selectedRole.permissions.some(p => allPermissions.find(ap => ap.key === p)?.risk === 'high') ? 'High' :
                             selectedRole.permissions.some(p => allPermissions.find(ap => ap.key === p)?.risk === 'medium') ? 'Medium' : 'Low'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Permissions by Category */}
                  <div>
                    <h3 className="text-white font-medium mb-4">Permissions by Category</h3>
                    <div className="space-y-4">
                      {permissionCategories.map((category) => {
                        const categoryPermissions = allPermissions.filter(p => p.category === category);
                        const hasAnyPermission = categoryPermissions.some(p => selectedRole.permissions.includes(p.key));
                        
                        if (!hasAnyPermission) return null;

                        return (
                          <div key={category} className="border border-slate-700 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                              <div className="h-2 w-2 bg-purple-400 rounded-full mr-2" />
                              {category}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {categoryPermissions.map((permission) => {
                                const hasPermission = selectedRole.permissions.includes(permission.key);
                                if (!hasPermission) return null;
                                
                                return (
                                  <div
                                    key={permission.key}
                                    className="p-3 rounded-lg border border-green-500/30 bg-green-500/10"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start">
                                        <Unlock className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                                        <div>
                                          <p className="text-white text-sm font-medium">{permission.name}</p>
                                          <p className="text-slate-400 text-xs mt-1">{permission.description}</p>
                                        </div>
                                      </div>
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        permission.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                                        permission.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                        'bg-green-500/20 text-green-300'
                                      }`}>
                                        {permission.risk}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">Select a Role</h3>
                <p className="text-slate-400">Choose a role from the list to view its details and permissions</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};