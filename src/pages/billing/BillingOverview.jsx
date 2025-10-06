import { CreditCard, Download, Calendar, TrendingUp } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { RoleGuard } from '../../components/auth/RoleGuard';

const UsageCard = ({ title, current, limit, unit, color = "primary" }) => {
  const percentage = (current / limit) * 100;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-text-primary-light dark:text-text-primary-dark">
            {title}
          </h3>
          <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {current.toLocaleString()} / {limit.toLocaleString()} {unit}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
          <div 
            className={`bg-${color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
          {percentage.toFixed(1)}% used this month
        </p>
      </CardContent>
    </Card>
  );
};

export const BillingOverview = () => {
  const currentPlan = {
    name: "Pro Plan",
    price: 49,
    billing: "monthly",
    features: [
      "5,000 emails per month",
      "Unlimited leads",
      "AI email generation",
      "Advanced analytics",
      "Priority support"
    ]
  };

  const usage = [
    { title: "Emails Sent", current: 3247, limit: 5000, unit: "emails", color: "primary" },
    { title: "AI Generations", current: 156, limit: 500, unit: "generations", color: "secondary" },
    { title: "Active Campaigns", current: 8, limit: 25, unit: "campaigns", color: "accent-info" }
  ];

  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: 49, status: "Paid" },
    { id: "INV-002", date: "2023-12-01", amount: 49, status: "Paid" },
    { id: "INV-003", date: "2023-11-01", amount: 49, status: "Paid" }
  ];

  return (
    <RoleGuard allowedRoles={['super_admin', 'admin']}>
      <PageWrapper
        title="Billing & Usage"
        description="Manage your subscription and monitor usage"
        actions={
          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Update Payment Method
          </Button>
        }
      >
        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your active subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    {currentPlan.name}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    ${currentPlan.price}/{currentPlan.billing}
                  </p>
                  <div className="mt-4 space-y-1">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 space-y-2">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline" className="w-full lg:w-auto">
                    View All Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
              Usage This Month
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {usage.map((item, index) => (
                <UsageCard key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    Your recent invoices and payments
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                          {invoice.id}
                        </p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {invoice.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-text-primary-light dark:text-text-primary-dark">
                        ${invoice.amount}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {invoice.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-border-light dark:border-border-dark rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      •••• •••• •••• 4242
                    </p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Expires 12/25
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    </RoleGuard>
  );
};