import { useState } from 'react';
import { 
  Save, 
  Settings, 
  Mail, 
  Shield, 
  Database,
  Globe,
  Bell,
  Palette,
  Server,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Zap,
  Clock,
  Users,
  Key,
  FileText,
  Image
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'LeadTree',
    siteDescription: 'Advanced Lead Management Platform',
    siteUrl: 'https://leadtree.com',
    adminEmail: 'admin@leadtree.com',
    supportEmail: 'support@leadtree.com',
    companyName: 'LeadTree Inc.',
    timezone: 'UTC',
    language: 'en',
    
    // Security Settings
    maxUsers: '10000',
    sessionTimeout: '30',
    passwordMinLength: '8',
    enableTwoFactor: true,
    enableRegistration: true,
    requireEmailVerification: true,
    maxLoginAttempts: '5',
    lockoutDuration: '15',
    
    // System Configuration
    enableNotifications: true,
    maintenanceMode: false,
    backupFrequency: 'daily',
    logLevel: 'info',
    maxFileSize: '10',
    enableCaching: true,
    cacheTimeout: '3600',
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@leadtree.com',
    fromName: 'LeadTree',
    
    // API Settings
    apiKey: 'lt_sk_1234567890abcdef',
    rateLimitPerMinute: '100',
    enableApiLogging: true,
    
    // Appearance
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    logoUrl: '',
    faviconUrl: '',
    customCSS: ''
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving settings:', settings);
      // Show success message
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const systemStatus = [
    { label: 'System Status', value: 'Online', status: 'success', icon: CheckCircle },
    { label: 'Database', value: 'Connected', status: 'success', icon: Database },
    { label: 'Email Service', value: 'Active', status: 'success', icon: Mail },
    { label: 'Storage', value: '78% Used', status: 'warning', icon: Server },
    { label: 'Cache', value: 'Enabled', status: 'success', icon: Zap },
    { label: 'Backup', value: 'Last: 2h ago', status: 'success', icon: Shield }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-slate-400 mt-1">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* System Status */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Server className="h-5 w-5 mr-2" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemStatus.map((status, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                <status.icon className={`h-5 w-5 mr-3 ${
                  status.status === 'success' ? 'text-green-400' :
                  status.status === 'warning' ? 'text-yellow-400' :
                  'text-red-400'
                }`} />
                <div>
                  <p className="text-slate-400 text-xs">{status.label}</p>
                  <p className="text-white text-sm font-medium">{status.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Settings },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'email', label: 'Email', icon: Mail },
          { id: 'api', label: 'API', icon: Key },
          { id: 'system', label: 'System', icon: Server },
          { id: 'appearance', label: 'Appearance', icon: Palette }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
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
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Site Name</label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Site URL</label>
                  <Input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Admin Email</label>
                  <Input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Support Email</label>
                  <Input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <Input
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white resize-none"
                />
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Maximum Users</label>
                  <Input
                    type="number"
                    value={settings.maxUsers}
                    onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Session Timeout (minutes)</label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password Min Length</label>
                  <Input
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Max Login Attempts</label>
                  <Input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Enable User Registration</p>
                    <p className="text-slate-400 text-sm">Allow new users to register accounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableRegistration}
                    onChange={(e) => handleInputChange('enableRegistration', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-slate-400 text-sm">Require 2FA for admin accounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableTwoFactor}
                    onChange={(e) => handleInputChange('enableTwoFactor', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Email Verification</p>
                    <p className="text-slate-400 text-sm">Require email verification for new accounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Host</label>
                  <Input
                    value={settings.smtpHost}
                    onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Port</label>
                  <Input
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Username</label>
                  <Input
                    value={settings.smtpUsername}
                    onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Password</label>
                  <Input
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">From Email</label>
                  <Input
                    type="email"
                    value={settings.fromEmail}
                    onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">From Name</label>
                  <Input
                    value={settings.fromName}
                    onChange={(e) => handleInputChange('fromName', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Test Email Configuration
                </Button>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                  <div className="relative">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.apiKey}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Rate Limit (per minute)</label>
                  <Input
                    type="number"
                    value={settings.rateLimitPerMinute}
                    onChange={(e) => handleInputChange('rateLimitPerMinute', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Enable API Logging</p>
                  <p className="text-slate-400 text-sm">Log all API requests and responses</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableApiLogging}
                  onChange={(e) => handleInputChange('enableApiLogging', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate API Key
                </Button>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Backup Frequency</label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Log Level</label>
                  <select
                    value={settings.logLevel}
                    onChange={(e) => handleInputChange('logLevel', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Max File Size (MB)</label>
                  <Input
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cache Timeout (seconds)</label>
                  <Input
                    type="number"
                    value={settings.cacheTimeout}
                    onChange={(e) => handleInputChange('cacheTimeout', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Maintenance Mode</p>
                    <p className="text-slate-400 text-sm">Put the system in maintenance mode</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Enable Caching</p>
                    <p className="text-slate-400 text-sm">Enable system-wide caching for better performance</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableCaching}
                    onChange={(e) => handleInputChange('enableCaching', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="h-10 w-20 rounded border border-slate-600 bg-slate-700"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="h-10 w-20 rounded border border-slate-600 bg-slate-700"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Logo URL</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="url"
                      value={settings.logoUrl}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="https://example.com/logo.png"
                    />
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Favicon URL</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="url"
                      value={settings.faviconUrl}
                      onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="https://example.com/favicon.ico"
                    />
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Custom CSS</label>
                <textarea
                  value={settings.customCSS}
                  onChange={(e) => handleInputChange('customCSS', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white resize-none font-mono text-sm"
                  placeholder="/* Add your custom CSS here */"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="ghost" className="text-slate-400 hover:text-white border border-slate-600 hover:bg-slate-700">
              <Database className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button variant="ghost" className="text-slate-400 hover:text-white border border-slate-600 hover:bg-slate-700">
              <Mail className="h-4 w-4 mr-2" />
              Test Email
            </Button>
            <Button variant="ghost" className="text-slate-400 hover:text-white border border-slate-600 hover:bg-slate-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button variant="ghost" className="text-slate-400 hover:text-white border border-slate-600 hover:bg-slate-700">
              <Bell className="h-4 w-4 mr-2" />
              Test Notification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};