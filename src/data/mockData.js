// Mock data for development - comprehensive dataset

// Lead Sources
export const LEAD_SOURCES = [
  'website', 'linkedin', 'referral', 'cold_email', 'event', 'social_media', 'advertisement', 'partner'
];

// Lead Statuses
export const LEAD_STATUSES = [
  'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
];

// Campaign Statuses
export const CAMPAIGN_STATUSES = [
  'draft', 'active', 'paused', 'completed'
];

// Generate 100 sample leads
export const mockLeads = Array.from({ length: 100 }, (_, i) => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Patricia', 'Charles', 'Linda', 'Thomas', 'Barbara', 'Christopher', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  const companies = ['Acme Corp', 'TechStart Inc', 'Innovate LLC', 'Global Solutions', 'Digital Dynamics', 'Future Systems', 'Smart Analytics', 'Cloud Ventures', 'Data Insights', 'AI Innovations', 'Cyber Security Pro', 'Mobile First', 'Web Solutions', 'Enterprise Tech', 'Startup Hub'];
  const roles = ['CEO', 'CTO', 'VP Sales', 'Marketing Director', 'Product Manager', 'Sales Manager', 'Business Development', 'Operations Manager', 'Founder', 'Head of Growth'];
  
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const company = companies[i % companies.length];
  const role = roles[i % roles.length];
  
  return {
    id: i + 1,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    company,
    website: `https://${company.toLowerCase().replace(/\s+/g, '')}.com`,
    role,
    linkedinUrl: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
    tags: ['prospect', i % 3 === 0 ? 'hot' : i % 2 === 0 ? 'warm' : 'cold'].filter(Boolean),
    source: LEAD_SOURCES[i % LEAD_SOURCES.length],
    status: LEAD_STATUSES[i % LEAD_STATUSES.length],
    notes: `Initial contact made via ${LEAD_SOURCES[i % LEAD_SOURCES.length]}. Interested in our solutions.`,
    customFields: {
      industry: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'][i % 5],
      companySize: ['1-10', '11-50', '51-200', '201-1000', '1000+'][i % 5],
      budget: ['< $10k', '$10k-$50k', '$50k-$100k', '$100k+'][i % 4]
    },
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
});

// Generate 20 sample campaigns
export const mockCampaigns = Array.from({ length: 20 }, (_, i) => {
  const campaignNames = [
    'Q1 Outreach Campaign', 'Product Launch Follow-up', 'Holiday Promotion', 'Webinar Invitation',
    'Free Trial Offer', 'Customer Success Stories', 'Industry Report Share', 'Partnership Outreach',
    'Renewal Campaign', 'Upsell Initiative', 'Event Invitation', 'Survey Request',
    'Newsletter Signup', 'Demo Booking', 'Case Study Share', 'Testimonial Request',
    'Referral Program', 'Feedback Collection', 'Re-engagement Campaign', 'Win-back Campaign'
  ];
  
  const objectives = ['Lead Gen', 'Nurture', 'Re-engagement'];
  const leadsCount = Math.floor(Math.random() * 200) + 50;
  const emailsSent = Math.floor(leadsCount * (0.7 + Math.random() * 0.3));
  const openRate = Math.round((15 + Math.random() * 25) * 10) / 10;
  const clickRate = Math.round((openRate * (0.1 + Math.random() * 0.2)) * 10) / 10;
  const replyRate = Math.round((clickRate * (0.3 + Math.random() * 0.4)) * 10) / 10;
  
  return {
    id: i + 1,
    name: campaignNames[i],
    objective: objectives[i % objectives.length],
    status: CAMPAIGN_STATUSES[i % CAMPAIGN_STATUSES.length],
    leadsCount,
    emailsSent,
    totalEmails: leadsCount * (2 + Math.floor(Math.random() * 3)), // Multiple emails per lead
    openRate,
    clickRate,
    replyRate,
    bounceRate: Math.round((2 + Math.random() * 5) * 10) / 10,
    unsubscribeRate: Math.round((0.5 + Math.random() * 2) * 10) / 10,
    startDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    description: `Automated email sequence targeting ${objectives[i % objectives.length].toLowerCase()} prospects in our database.`,
    emailSequence: [
      {
        step: 1,
        subject: 'Introduction to [Company Name]',
        delay: 0,
        sent: emailsSent,
        opened: Math.floor(emailsSent * (openRate / 100)),
        clicked: Math.floor(emailsSent * (clickRate / 100)),
        replied: Math.floor(emailsSent * (replyRate / 100))
      },
      {
        step: 2,
        subject: 'Following up on our solution',
        delay: 3,
        sent: Math.floor(emailsSent * 0.8),
        opened: Math.floor(emailsSent * 0.8 * (openRate / 100)),
        clicked: Math.floor(emailsSent * 0.8 * (clickRate / 100)),
        replied: Math.floor(emailsSent * 0.8 * (replyRate / 100))
      }
    ]
  };
});

// Generate 15 sample users with different roles
export const mockUsers = Array.from({ length: 15 }, (_, i) => {
  const names = ['Admin User', 'John Manager', 'Sarah Team Lead', 'Mike Developer', 'Lisa Analyst', 'David Sales', 'Emma Marketing', 'Tom Support', 'Anna Designer', 'Chris Product', 'Rachel Operations', 'Kevin Finance', 'Sophie HR', 'Mark Legal', 'Julia Customer Success'];
  const roles = ['super_admin', 'admin', 'admin', 'team_member', 'team_member', 'team_member', 'team_member', 'team_member', 'team_member', 'team_member', 'team_member', 'client', 'client', 'client', 'client'];
  
  return {
    id: i + 1,
    name: names[i],
    email: `${names[i].toLowerCase().replace(/\s+/g, '.')}@company.com`,
    role: roles[i],
    status: i === 14 ? 'inactive' : 'active',
    avatar: null,
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    company: 'Acme Corporation',
    department: ['Engineering', 'Sales', 'Marketing', 'Support', 'Operations'][i % 5]
  };
});

// Dashboard analytics data
export const mockAnalytics = {
  // KPI Cards
  kpis: {
    totalLeads: 1247,
    activeCampaigns: 8,
    emailsSent: 15420,
    avgReplyRate: 9.8
  },
  
  // Trends (last 30 days)
  trends: {
    totalLeads: 12.5, // percentage change
    activeCampaigns: -2.1,
    emailsSent: 18.7,
    avgReplyRate: 3.2
  },
  
  // Lead generation trend (last 30 days)
  leadTrend: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(20 + Math.random() * 40)
  })),
  
  // Campaign performance (top 6 campaigns)
  campaignPerformance: mockCampaigns.slice(0, 6).map(campaign => ({
    name: campaign.name,
    opens: Math.floor(campaign.emailsSent * (campaign.openRate / 100)),
    clicks: Math.floor(campaign.emailsSent * (campaign.clickRate / 100)),
    replies: Math.floor(campaign.emailsSent * (campaign.replyRate / 100))
  })),
  
  // Email stats for pie chart
  emailStats: {
    opened: 4250,
    clicked: 890,
    replied: 320,
    bounced: 180,
    pending: 1200
  },
  
  // Recent activity
  recentActivity: [
    { id: 1, type: 'lead_created', message: 'New lead John Doe added', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: 2, type: 'campaign_started', message: 'Campaign "Q1 Outreach" started', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    { id: 3, type: 'email_replied', message: 'Reply received from Jane Smith', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
    { id: 4, type: 'lead_qualified', message: 'Lead Bob Johnson marked as qualified', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
    { id: 5, type: 'campaign_paused', message: 'Campaign "Holiday Promotion" paused', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() }
  ]
};

// Email templates
export const mockEmailTemplates = [
  {
    id: 1,
    name: 'Cold Outreach - Introduction',
    category: 'cold_outreach',
    subject: 'Quick question about {{company}}',
    body: `Hi {{firstName}},

I noticed {{company}} is doing great work in {{industry}}. I'm reaching out because we help companies like yours {{value_proposition}}.

Would you be open to a brief 15-minute call to discuss how we might be able to help {{company}} {{specific_benefit}}?

Best regards,
{{senderName}}`,
    variables: ['firstName', 'company', 'industry', 'value_proposition', 'specific_benefit', 'senderName'],
    createdAt: new Date().toISOString(),
    usageCount: 45
  },
  {
    id: 2,
    name: 'Follow-up - No Response',
    category: 'follow_up',
    subject: 'Following up on my previous email',
    body: `Hi {{firstName}},

I wanted to follow up on my email from last week about {{topic}}.

I understand you're probably busy, but I thought this might be relevant given {{company}}'s focus on {{industry}}.

Would a quick 10-minute call work better for you?

Thanks,
{{senderName}}`,
    variables: ['firstName', 'topic', 'company', 'industry', 'senderName'],
    createdAt: new Date().toISOString(),
    usageCount: 32
  }
];

// Billing data
export const mockBillingData = {
  currentPlan: {
    name: 'Pro',
    price: 79,
    billing: 'monthly',
    nextBillingDate: '2024-02-15',
    features: [
      '2,000 leads',
      '10,000 emails/month',
      'Unlimited campaigns',
      'AI email generator (50 credits/month)',
      'Advanced analytics',
      'CRM integrations'
    ]
  },
  
  usage: {
    leads: { used: 234, limit: 2000 },
    emails: { used: 1450, limit: 10000 },
    aiCredits: { used: 12, limit: 50 }
  },
  
  paymentMethod: {
    type: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025
  },
  
  billingHistory: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    invoiceNumber: `INV-${String(i + 1).padStart(4, '0')}`,
    date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 79,
    status: i === 0 ? 'pending' : 'paid',
    downloadUrl: '#'
  }))
};

// System analytics (admin only)
export const mockSystemAnalytics = {
  userGrowth: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0].slice(0, 7),
    users: Math.floor(100 + i * 50 + Math.random() * 100)
  })),
  
  campaignCreationTrend: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    campaigns: Math.floor(Math.random() * 10)
  })),
  
  emailVolumeByDay: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    volume: Math.floor(1000 + Math.random() * 2000)
  })),
  
  revenue: {
    mrr: 15750,
    arr: 189000,
    churnRate: 2.3,
    newSubscriptions: 12
  }
};