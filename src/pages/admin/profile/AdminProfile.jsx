import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Save,
  Eye,
  EyeOff,
  Camera,
  Bell,
  Settings,
  Activity,
  Key,
  Smartphone,
  Globe,
  Calendar,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@leadtree.com',
    phone: '+1 (555) 123-4567',
    title: 'System Administrator',
    department: 'IT Operations',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    bio: 'Experienced system administrator with 10+ years in enterprise software management.',
    avatar: '',
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    
    // Preferences
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    theme: 'dark',
    language: 'en'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profileData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (profileData.newPassword && profileData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (profileData.newPassword !== profileData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (profileData.newPassword && !profileData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (activeTab === 'profile' && !validateProfile()) return;
    if (activeTab === 'security' && !validatePassword()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving profile:', profileData);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const recentActivity = [
    { action: 'Logged in', time: '2 hours ago', ip: '192.168.1.100', device: 'Chrome on macOS' },
    { action: 'Updated system settings', time: '1 day ago', ip: '192.168.1.100', device: 'Chrome on macOS' },
    { action: 'Created new user', time: '2 days ago', ip: '192.168.1.100', device: 'Chrome on macOS' },
    { action: 'Password changed', time: '1 week ago', ip: '192.168.1.100', device: 'Chrome on macOS' },
    { action: 'Logged in', time: '1 week ago', ip: '10.0.0.50', device: 'Safari on iPhone' }
  ];

  const sessions = [
    { id: 1, device: 'Chrome on macOS', location: 'San Francisco, CA', ip: '192.168.1.100', lastActive: '2 hours ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'San Francisco, CA', ip: '10.0.0.50', lastActive: '1 day ago', current: false },
    { id: 3, device: 'Firefox on Windows', location: 'New York, NY', ip: '203.0.113.1', lastActive: '3 days ago', current: false }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
          <p className="text-slate-400 mt-1">Manage your account settings and preferences</p>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="h-24 w-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-800 hover:bg-slate-600 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              
              <h3 className="text-white font-semibold text-lg">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-slate-400 text-sm mb-2">{profileData.title}</p>
              <p className="text-slate-500 text-xs mb-4">{profileData.email}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Department</span>
                  <span className="text-white">{profileData.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white">{profileData.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Timezone</span>
                  <span className="text-white">PST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">2FA Status</span>
                  <span className={`text-sm ${profileData.twoFactorEnabled ? 'text-green-400' : 'text-red-400'}`}>
                    {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
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
              { id: 'preferences', label: 'Preferences', icon: Settings },
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
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
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
                      <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
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
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                      <Input
                        value={profileData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                      <Input
                        value={profileData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="pl-10 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                      <select
                        value={profileData.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                      >
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-300 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Leave password fields empty to keep your current password unchanged.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="password"
                          value={profileData.currentPassword}
                          onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                          className={`pl-10 bg-slate-700 border-slate-600 text-white ${errors.currentPassword ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.currentPassword && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>
                    <div></div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={profileData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
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
                      <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                      <Input
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 text-purple-400 mr-3" />
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${profileData.twoFactorEnabled ? 'text-green-400' : 'text-slate-400'}`}>
                          {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                          {profileData.twoFactorEnabled ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div>
                    <h3 className="text-white font-medium mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                              <Globe className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium flex items-center">
                                {session.device}
                                {session.current && (
                                  <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                                    Current
                                  </span>
                                )}
                              </p>
                              <p className="text-slate-400 text-sm">{session.location} • {session.ip}</p>
                              <p className="text-slate-500 text-xs">Last active: {session.lastActive}</p>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Email Notifications</p>
                          <p className="text-slate-400 text-sm">Receive notifications via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.emailNotifications}
                          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Push Notifications</p>
                          <p className="text-slate-400 text-sm">Receive push notifications in browser</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.pushNotifications}
                          onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Weekly Reports</p>
                          <p className="text-slate-400 text-sm">Receive weekly system reports</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.weeklyReports}
                          onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Security Alerts</p>
                          <p className="text-slate-400 text-sm">Receive security-related notifications</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.securityAlerts}
                          onChange={(e) => handleInputChange('securityAlerts', e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">Interface Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Theme</label>
                        <select
                          value={profileData.theme}
                          onChange={(e) => handleInputChange('theme', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                        <select
                          value={profileData.language}
                          onChange={(e) => handleInputChange('language', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg">
                          <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Activity className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">{activity.action}</h4>
                              <span className="text-slate-400 text-sm">{activity.time}</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-1">{activity.device}</p>
                            <p className="text-slate-500 text-xs mt-1">IP: {activity.ip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};