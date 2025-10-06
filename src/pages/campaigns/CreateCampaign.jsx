import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Target, 
  Users, 
  Mail, 
  Calendar, 
  Settings, 
  Eye, 
  Send,
  Save,
  X,
  Plus,
  Trash2,
  Copy,
  Wand2,
  Clock,
  Filter,
  Upload,
  Download,
  Play,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'react-hot-toast';

const CampaignStep = ({ number, title, description, isActive, isCompleted, onClick }) => (
  <div 
    className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive 
        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800' 
        : isCompleted 
        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
        : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
    onClick={onClick}
  >
    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : isCompleted 
        ? 'bg-green-600 text-white'
        : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
    }`}>
      {isCompleted ? <CheckCircle className="h-4 w-4" /> : number}
    </div>
    <div className="flex-1">
      <h3 className={`font-medium ${
        isActive ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'
      }`}>
        {title}
      </h3>
      <p className={`text-sm ${
        isActive ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'
      }`}>
        {description}
      </p>
    </div>
  </div>
);

const EmailTemplate = ({ template, isSelected, onSelect }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
    }`}
    onClick={() => onSelect(template)}
  >
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white">{template.name}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{template.category}</p>
        </div>
        <div className={`w-4 h-4 rounded-full border-2 ${
          isSelected 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-slate-300 dark:border-slate-600'
        }`}>
          {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
        </div>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
        {template.description}
      </p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          Open Rate: {template.openRate}%
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          {template.usage} uses
        </span>
      </div>
    </CardContent>
  </Card>
);

export const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [campaignData, setCampaignData] = useState({
    // Basic Info
    name: '',
    description: '',
    type: 'email_sequence',
    
    // Audience
    leadSource: 'all',
    leadFilters: {
      status: [],
      tags: [],
      company: '',
      minScore: 0
    },
    selectedLeads: [],
    
    // Email Content
    template: null,
    subject: '',
    content: '',
    personalization: {
      useFirstName: true,
      useCompanyName: true,
      usePosition: true
    },
    
    // Schedule
    scheduleType: 'immediate',
    startDate: '',
    startTime: '',
    timezone: 'UTC',
    followUpSequence: [],
    
    // Settings
    trackOpens: true,
    trackClicks: true,
    replyTracking: true,
    unsubscribeLink: true
  });

  const steps = [
    { 
      number: 1, 
      title: 'Campaign Details', 
      description: 'Basic information and campaign type',
      isCompleted: currentStep > 1,
      isActive: currentStep === 1
    },
    { 
      number: 2, 
      title: 'Select Audience', 
      description: 'Choose leads and define targeting',
      isCompleted: currentStep > 2,
      isActive: currentStep === 2
    },
    { 
      number: 3, 
      title: 'Email Content', 
      description: 'Create or select email template',
      isCompleted: currentStep > 3,
      isActive: currentStep === 3
    },
    { 
      number: 4, 
      title: 'Schedule & Settings', 
      description: 'Configure timing and tracking',
      isCompleted: currentStep > 4,
      isActive: currentStep === 4
    },
    { 
      number: 5, 
      title: 'Review & Launch', 
      description: 'Final review before launching',
      isCompleted: false,
      isActive: currentStep === 5
    }
  ];

  const emailTemplates = [
    {
      id: 1,
      name: 'Cold Outreach Pro',
      category: 'Cold Email',
      description: 'Professional cold outreach template with high conversion rates',
      openRate: 42,
      usage: 1250,
      content: `Hi {{firstName}},

I hope this email finds you well. I came across {{companyName}} and was impressed by your innovative approach in the {{industry}} space.

As {{position}}, I imagine you're always looking for ways to drive growth and efficiency. We've helped similar companies achieve:

• 40% increase in lead generation
• 25% reduction in customer acquisition costs
• 60% improvement in conversion rates

Would you be open to a brief 15-minute conversation this week to explore how we could help {{companyName}} achieve similar results?

Best regards,
[Your Name]`
    },
    {
      id: 2,
      name: 'Product Demo Request',
      category: 'Demo',
      description: 'Perfect for requesting product demonstrations',
      openRate: 38,
      usage: 890,
      content: `Hello {{firstName}},

I noticed that {{companyName}} is focused on {{industry}} solutions, and I believe our platform could be a great fit for your team.

We've helped companies like yours:
- Streamline their workflow by 50%
- Reduce manual tasks significantly
- Improve team collaboration

Would you be interested in a quick 20-minute demo to see how this could work for {{companyName}}?

I have availability this week - what works best for you?

Best,
[Your Name]`
    },
    {
      id: 3,
      name: 'Follow-up Sequence',
      category: 'Follow-up',
      description: 'Gentle follow-up for previous conversations',
      openRate: 35,
      usage: 2100,
      content: `Hi {{firstName}},

I wanted to follow up on my previous email about helping {{companyName}} with [specific solution].

I understand you're busy, but I believe this could make a significant impact on your [specific area].

If now isn't the right time, I'd be happy to reconnect in a few months. Just let me know what works best.

Thanks for your time,
[Your Name]`
    }
  ];

  const mockLeads = [
    { id: 1, name: 'John Smith', company: 'Tech Corp', email: 'john@techcorp.com', score: 85, status: 'New' },
    { id: 2, name: 'Sarah Johnson', company: 'StartupIO', email: 'sarah@startup.io', score: 72, status: 'Contacted' },
    { id: 3, name: 'Mike Davis', company: 'Enterprise Solutions', email: 'mike@enterprise.com', score: 91, status: 'Qualified' }
  ];

  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate campaign creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Campaign created successfully!');
      navigate('/campaigns');
    } catch (error) {
      toast.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Campaign Information
                </CardTitle>
                <CardDescription>
                  Set up the basic details for your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Campaign Name *
                  </label>
                  <Input
                    value={campaignData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Q1 Product Launch Campaign"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Description
                  </label>
                  <textarea
                    value={campaignData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of your campaign goals..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Campaign Type
                  </label>
                  <select
                    value={campaignData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email_sequence">Email Sequence</option>
                    <option value="cold_outreach">Cold Outreach</option>
                    <option value="follow_up">Follow-up Campaign</option>
                    <option value="product_demo">Product Demo</option>
                    <option value="event_invitation">Event Invitation</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Select Your Audience
                </CardTitle>
                <CardDescription>
                  Choose which leads to include in this campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                    Lead Source
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'all', label: 'All Leads', count: 2847 },
                      { value: 'filtered', label: 'Filtered Leads', count: 156 },
                      { value: 'manual', label: 'Manual Selection', count: 0 }
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          campaignData.leadSource === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                        onClick={() => handleInputChange('leadSource', option.value)}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {option.count.toLocaleString()}
                          </div>
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {option.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {campaignData.leadSource === 'filtered' && (
                  <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <h4 className="font-medium text-slate-900 dark:text-white">Lead Filters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                          Lead Status
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">All Status</option>
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                          Minimum Score
                        </label>
                        <Input
                          type="number"
                          placeholder="0-100"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {campaignData.leadSource === 'manual' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 dark:text-white">Selected Leads</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Leads
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {mockLeads.slice(0, 3).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">{lead.name}</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">{lead.company} • {lead.email}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Score: {lead.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-emerald-600" />
                  Email Content
                </CardTitle>
                <CardDescription>
                  Choose a template or create your own email content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-900 dark:text-white">Email Templates</h4>
                    <Button variant="outline" size="sm">
                      <Wand2 className="h-4 w-4 mr-2" />
                      AI Generate
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {emailTemplates.map((template) => (
                      <EmailTemplate
                        key={template.id}
                        template={template}
                        isSelected={campaignData.template?.id === template.id}
                        onSelect={(template) => handleInputChange('template', template)}
                      />
                    ))}
                  </div>
                </div>

                {campaignData.template && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        Email Subject
                      </label>
                      <Input
                        value={campaignData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Enter email subject line..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        Email Content
                      </label>
                      <textarea
                        value={campaignData.content || campaignData.template.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        rows={12}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Personalization Variables</h5>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <code className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">{'{{firstName}}'}</code>
                        <code className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">{'{{companyName}}'}</code>
                        <code className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">{'{{position}}'}</code>
                        <code className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">{'{{industry}}'}</code>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                  Schedule & Settings
                </CardTitle>
                <CardDescription>
                  Configure when to send and tracking options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                    Send Schedule
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: 'immediate', label: 'Send Immediately', desc: 'Start sending right after launch' },
                      { value: 'scheduled', label: 'Schedule for Later', desc: 'Choose specific date and time' }
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          campaignData.scheduleType === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                        onClick={() => handleInputChange('scheduleType', option.value)}
                      >
                        <div className="font-medium text-slate-900 dark:text-white">{option.label}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{option.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {campaignData.scheduleType === 'scheduled' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={campaignData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        Start Time
                      </label>
                      <Input
                        type="time"
                        value={campaignData.startTime}
                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-4">Tracking Options</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'trackOpens', label: 'Track Email Opens', desc: 'Monitor when recipients open your emails' },
                      { key: 'trackClicks', label: 'Track Link Clicks', desc: 'Track clicks on links within your emails' },
                      { key: 'replyTracking', label: 'Reply Tracking', desc: 'Monitor replies and engagement' },
                      { key: 'unsubscribeLink', label: 'Include Unsubscribe Link', desc: 'Required for compliance' }
                    ].map((option) => (
                      <div key={option.key} className="flex items-center justify-between py-2">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{option.label}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">{option.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={campaignData[option.key]}
                            onChange={(e) => handleInputChange(option.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-green-600" />
                  Campaign Review
                </CardTitle>
                <CardDescription>
                  Review all settings before launching your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">Campaign Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Name:</span>
                          <span className="text-slate-900 dark:text-white">{campaignData.name || 'Untitled Campaign'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Type:</span>
                          <span className="text-slate-900 dark:text-white capitalize">{campaignData.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">Audience</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Source:</span>
                          <span className="text-slate-900 dark:text-white capitalize">{campaignData.leadSource.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Estimated Reach:</span>
                          <span className="text-slate-900 dark:text-white">
                            {campaignData.leadSource === 'all' ? '2,847' : 
                             campaignData.leadSource === 'filtered' ? '156' : '3'} leads
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">Email Content</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Template:</span>
                          <span className="text-slate-900 dark:text-white">{campaignData.template?.name || 'Custom'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Subject:</span>
                          <span className="text-slate-900 dark:text-white">{campaignData.subject || 'Not set'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">Schedule</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Send Time:</span>
                          <span className="text-slate-900 dark:text-white">
                            {campaignData.scheduleType === 'immediate' ? 'Immediately' : 
                             `${campaignData.startDate} at ${campaignData.startTime}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 dark:text-green-100">Ready to Launch</h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Your campaign is configured and ready to be launched. You can always pause or modify it after launch.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageWrapper
      title="Create New Campaign"
      description="Set up a new email campaign to reach your leads"
      actions={
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate('/campaigns')}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Steps Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Campaign Setup</CardTitle>
              <CardDescription>
                Follow these steps to create your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {steps.map((step) => (
                <CampaignStep
                  key={step.number}
                  {...step}
                  onClick={() => setCurrentStep(step.number)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-3">
              {currentStep < 5 ? (
                <Button onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Launching...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Launch Campaign
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};