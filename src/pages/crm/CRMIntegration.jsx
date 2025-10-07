import { 
  Link2, 
  CheckCircle, 
  XCircle, 
  Settings, 
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Zap,
  Database,
  Users,
  ArrowRight,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';

const CRMCard = ({ crm, onConnect, onDisconnect, onConfigure }) => {
  const isConnected = crm.connected;
  
  return (
    <Card className={`transition-all duration-200 ${
      isConnected 
        ? 'border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' 
        : 'hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${crm.bgColor}`}>
              <crm.icon className={`h-8 w-8 ${crm.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                {crm.name}
                {isConnected && (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 ml-2" />
                )}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {crm.description}
              </p>
            </div>
          </div>
        </div>

        {isConnected && (
          <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Status:</span>
              <span className="font-medium text-green-600 dark:text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-slate-600 dark:text-slate-400">Last Sync:</span>
              <span className="font-medium text-slate-900 dark:text-white">{crm.lastSync}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-slate-600 dark:text-slate-400">Records Synced:</span>
              <span className="font-medium text-slate-900 dark:text-white">{crm.recordsSynced}</span>
            </div>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Features:</h4>
          <ul className="space-y-1">
            {crm.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-2">
          {isConnected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onConfigure(crm)}
                className="flex-1"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDisconnect(crm)}
                className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              onClick={() => onConnect(crm)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Connect {crm.name}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ConnectModal = ({ isOpen, onClose, crm, onSubmit }) => {
  const [formData, setFormData] = useState({
    apiKey: '',
    apiSecret: '',
    domain: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(crm, formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Connect to ${crm?.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium mb-1">How to get your API credentials:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
                <li>Log in to your {crm?.name} account</li>
                <li>Go to Settings → API & Integrations</li>
                <li>Generate a new API key</li>
                <li>Copy and paste the credentials below</li>
              </ol>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="apiKey">API Key *</Label>
          <Input
            id="apiKey"
            type="text"
            placeholder="Enter your API key"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="apiSecret">API Secret *</Label>
          <Input
            id="apiSecret"
            type="password"
            placeholder="Enter your API secret"
            value={formData.apiSecret}
            onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
            required
          />
        </div>

        {crm?.requiresDomain && (
          <div>
            <Label htmlFor="domain">Domain/Instance URL *</Label>
            <Input
              id="domain"
              type="text"
              placeholder="e.g., yourcompany.salesforce.com"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              required
            />
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
            Connect
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const ConfigureModal = ({ isOpen, onClose, crm, onSave }) => {
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncInterval: '15',
    syncLeads: true,
    syncContacts: true,
    syncDeals: false,
  });

  const handleSave = () => {
    onSave(crm, syncSettings);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Configure ${crm?.name}`}>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Sync Settings</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Sync</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Automatically sync data at regular intervals
                </p>
              </div>
              <input
                type="checkbox"
                checked={syncSettings.autoSync}
                onChange={(e) => setSyncSettings({ ...syncSettings, autoSync: e.target.checked })}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            {syncSettings.autoSync && (
              <div>
                <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                <select
                  id="syncInterval"
                  value={syncSettings.syncInterval}
                  onChange={(e) => setSyncSettings({ ...syncSettings, syncInterval: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                </select>
              </div>
            )}

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h5 className="font-medium text-slate-900 dark:text-white mb-3">Data to Sync</h5>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Leads</Label>
                  <input
                    type="checkbox"
                    checked={syncSettings.syncLeads}
                    onChange={(e) => setSyncSettings({ ...syncSettings, syncLeads: e.target.checked })}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Contacts</Label>
                  <input
                    type="checkbox"
                    checked={syncSettings.syncContacts}
                    onChange={(e) => setSyncSettings({ ...syncSettings, syncContacts: e.target.checked })}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Deals/Opportunities</Label>
                  <input
                    type="checkbox"
                    checked={syncSettings.syncDeals}
                    onChange={(e) => setSyncSettings({ ...syncSettings, syncDeals: e.target.checked })}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const CRMIntegration = () => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [selectedCRM, setSelectedCRM] = useState(null);
  const [crmList, setCrmList] = useState([
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'World\'s #1 CRM platform',
      icon: Database,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      connected: true,
      lastSync: '5 minutes ago',
      recordsSynced: '1,247',
      requiresDomain: true,
      features: [
        'Two-way sync',
        'Real-time updates',
        'Custom field mapping',
        'Automated workflows'
      ]
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Inbound marketing & sales platform',
      icon: Zap,
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      connected: false,
      requiresDomain: false,
      features: [
        'Contact sync',
        'Deal tracking',
        'Email integration',
        'Activity logging'
      ]
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      description: 'Sales-focused CRM',
      icon: Users,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      connected: false,
      requiresDomain: false,
      features: [
        'Pipeline management',
        'Lead tracking',
        'Activity sync',
        'Custom fields'
      ]
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      description: 'Complete CRM solution',
      icon: Database,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
      connected: false,
      requiresDomain: true,
      features: [
        'Multi-channel sync',
        'Workflow automation',
        'Analytics integration',
        'Mobile sync'
      ]
    },
    {
      id: 'microsoft',
      name: 'Microsoft Dynamics',
      description: 'Enterprise CRM solution',
      icon: Database,
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      connected: false,
      requiresDomain: true,
      features: [
        'Enterprise integration',
        'Advanced security',
        'Custom entities',
        'Power BI integration'
      ]
    },
    {
      id: 'freshsales',
      name: 'Freshsales',
      description: 'AI-powered CRM',
      icon: Zap,
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      connected: false,
      requiresDomain: false,
      features: [
        'AI-powered insights',
        'Lead scoring',
        'Email tracking',
        'Phone integration'
      ]
    }
  ]);

  const handleConnect = (crm) => {
    setSelectedCRM(crm);
    setShowConnectModal(true);
  };

  const handleDisconnect = (crm) => {
    if (confirm(`Are you sure you want to disconnect ${crm.name}?`)) {
      setCrmList(crmList.map(c => 
        c.id === crm.id ? { ...c, connected: false, lastSync: null, recordsSynced: null } : c
      ));
    }
  };

  const handleConfigure = (crm) => {
    setSelectedCRM(crm);
    setShowConfigureModal(true);
  };

  const handleSubmitConnection = (crm, formData) => {
    // Simulate API call
    setCrmList(crmList.map(c => 
      c.id === crm.id 
        ? { ...c, connected: true, lastSync: 'Just now', recordsSynced: '0' } 
        : c
    ));
    setShowConnectModal(false);
    alert(`Successfully connected to ${crm.name}!`);
  };

  const handleSaveConfiguration = (crm, settings) => {
    // Simulate saving settings
    setShowConfigureModal(false);
    alert(`Settings saved for ${crm.name}!`);
  };

  const connectedCount = crmList.filter(c => c.connected).length;

  return (
    <>
      <ConnectModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        crm={selectedCRM}
        onSubmit={handleSubmitConnection}
      />

      <ConfigureModal
        isOpen={showConfigureModal}
        onClose={() => setShowConfigureModal(false)}
        crm={selectedCRM}
        onSave={handleSaveConfiguration}
      />

      <PageWrapper
        title="CRM Integrations"
        description="Connect your favorite CRM platforms to sync leads and contacts"
        actions={
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Documentation
          </Button>
        }
      >
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Connected CRMs
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {connectedCount}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Link2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Synced
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      1,247
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                    <RefreshCw className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Last Sync
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      5m ago
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Why Connect Your CRM?
                  </h3>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Automatically sync leads and contacts between platforms</li>
                    <li>• Keep your data up-to-date across all systems</li>
                    <li>• Reduce manual data entry and errors</li>
                    <li>• Track campaign performance in your CRM</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CRM List */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Available Integrations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crmList.map((crm) => (
                <CRMCard
                  key={crm.id}
                  crm={crm}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  onConfigure={handleConfigure}
                />
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Common questions about CRM integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                    How do I get API credentials?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Each CRM has its own process. Generally, you'll find API settings in your CRM's admin panel under Settings → Integrations or API.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                    Is my data secure?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Yes! All connections use secure OAuth 2.0 or API key authentication. Your credentials are encrypted and never shared.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                    Can I sync multiple CRMs?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Yes! You can connect multiple CRM platforms simultaneously. Data will be synced to all connected systems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    </>
  );
};
