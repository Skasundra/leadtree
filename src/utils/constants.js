// App constants

export const APP_NAME = 'LeadTree';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 10000;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Date Formats
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Lead Management
export const LEAD_SOURCES = [
  { value: 'website', label: 'Website' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral' },
  { value: 'cold_email', label: 'Cold Email' },
  { value: 'event', label: 'Event' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'partner', label: 'Partner' },
];

export const LEAD_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
  { value: 'proposal', label: 'Proposal', color: 'bg-purple-100 text-purple-800' },
  { value: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
  { value: 'closed_won', label: 'Closed Won', color: 'bg-green-100 text-green-800' },
  { value: 'closed_lost', label: 'Closed Lost', color: 'bg-red-100 text-red-800' },
];

// Campaign Management
export const CAMPAIGN_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'paused', label: 'Paused', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' },
];

export const CAMPAIGN_OBJECTIVES = [
  { value: 'lead_gen', label: 'Lead Generation' },
  { value: 'nurture', label: 'Nurture' },
  { value: 're_engagement', label: 'Re-engagement' },
];

// Email Templates
export const EMAIL_CATEGORIES = [
  { value: 'cold_outreach', label: 'Cold Outreach' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'nurture', label: 'Nurture' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'proposal', label: 'Proposal' },
];

export const EMAIL_TONES = [
  { value: 'casual', label: 'Casual' },
  { value: 'professional', label: 'Professional' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'friendly', label: 'Friendly' },
];

export const EMAIL_LENGTHS = [
  { value: 'short', label: 'Short (50-100 words)' },
  { value: 'medium', label: 'Medium (100-200 words)' },
  { value: 'long', label: 'Long (200+ words)' },
];

export const CTA_TYPES = [
  { value: 'meeting', label: 'Schedule Meeting' },
  { value: 'demo', label: 'Request Demo' },
  { value: 'download', label: 'Download Resource' },
  { value: 'reply', label: 'Reply to Email' },
  { value: 'call', label: 'Schedule Call' },
];

// User Roles & Permissions
export const USER_ROLES = [
  { value: 'super_admin', label: 'Super Admin', level: 4 },
  { value: 'admin', label: 'Admin', level: 3 },
  { value: 'team_member', label: 'Team Member', level: 2 },
  { value: 'client', label: 'Client', level: 1 },
];

// Billing & Subscription
export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    features: [
      '500 leads',
      '1,000 emails/month',
      '5 campaigns',
      'Email templates',
      'Basic analytics'
    ],
    limits: {
      leads: 500,
      emails: 1000,
      campaigns: 5,
      aiCredits: 0
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    popular: true,
    features: [
      '2,000 leads',
      '10,000 emails/month',
      'Unlimited campaigns',
      'AI email generator (50 credits/month)',
      'Advanced analytics',
      'CRM integrations'
    ],
    limits: {
      leads: 2000,
      emails: 10000,
      campaigns: -1, // unlimited
      aiCredits: 50
    }
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 199,
    features: [
      '10,000 leads',
      '50,000 emails/month',
      'Unlimited campaigns',
      'AI email generator (500 credits/month)',
      'White-label option',
      'Dedicated support',
      'API access'
    ],
    limits: {
      leads: 10000,
      emails: 50000,
      campaigns: -1, // unlimited
      aiCredits: 500
    }
  }
];

// File Upload
export const ALLOWED_FILE_TYPES = {
  CSV: ['.csv'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  DOCUMENTS: ['.pdf', '.doc', '.docx'],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Chart Colors
export const CHART_COLORS = {
  primary: '#4F46E5',
  secondary: '#14B8A6',
  success: '#22C55E',
  warning: '#F97316',
  error: '#EF4444',
  info: '#0EA5E9',
  gray: '#6B7280',
};

// Responsive Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
};

// Toast Configuration
export const TOAST_CONFIG = {
  duration: 5000,
  position: 'top-right',
  style: {
    borderRadius: '8px',
    background: '#333',
    color: '#fff',
  },
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Activity Types
export const ACTIVITY_TYPES = [
  { value: 'lead_created', label: 'Lead Created', icon: 'UserPlus', color: 'text-blue-600' },
  { value: 'lead_updated', label: 'Lead Updated', icon: 'Edit', color: 'text-yellow-600' },
  { value: 'email_sent', label: 'Email Sent', icon: 'Mail', color: 'text-green-600' },
  { value: 'email_opened', label: 'Email Opened', icon: 'MailOpen', color: 'text-blue-600' },
  { value: 'email_clicked', label: 'Email Clicked', icon: 'MousePointer', color: 'text-purple-600' },
  { value: 'email_replied', label: 'Email Replied', icon: 'Reply', color: 'text-green-600' },
  { value: 'campaign_started', label: 'Campaign Started', icon: 'Play', color: 'text-green-600' },
  { value: 'campaign_paused', label: 'Campaign Paused', icon: 'Pause', color: 'text-yellow-600' },
  { value: 'note_added', label: 'Note Added', icon: 'FileText', color: 'text-gray-600' },
];