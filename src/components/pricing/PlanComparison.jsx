import { Check, X, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

export const PlanComparison = ({ plans, onSelectPlan, selectedPlan }) => {
  const allFeatures = [
    { name: 'Monthly Emails', key: 'emails' },
    { name: 'Lead Storage', key: 'leads' },
    { name: 'Email Templates', key: 'templates' },
    { name: 'Email Tracking', key: 'tracking' },
    { name: 'AI Email Generation', key: 'aiGeneration' },
    { name: 'Advanced Analytics', key: 'analytics' },
    { name: 'Campaign Automation', key: 'automation' },
    { name: 'CRM Integrations', key: 'crmIntegrations' },
    { name: 'A/B Testing', key: 'abTesting' },
    { name: 'White-label Options', key: 'whiteLabel' },
    { name: 'API Access', key: 'apiAccess' },
    { name: 'Custom Integrations', key: 'customIntegrations' },
    { name: 'Dedicated Support', key: 'dedicatedSupport' },
    { name: 'Phone Support', key: 'phoneSupport' }
  ];

  const planFeatures = {
    starter: {
      emails: '1,000',
      leads: '500',
      templates: true,
      tracking: true,
      aiGeneration: false,
      analytics: false,
      automation: false,
      crmIntegrations: false,
      abTesting: false,
      whiteLabel: false,
      apiAccess: false,
      customIntegrations: false,
      dedicatedSupport: false,
      phoneSupport: false
    },
    pro: {
      emails: '5,000',
      leads: 'Unlimited',
      templates: true,
      tracking: true,
      aiGeneration: true,
      analytics: true,
      automation: true,
      crmIntegrations: true,
      abTesting: true,
      whiteLabel: false,
      apiAccess: false,
      customIntegrations: false,
      dedicatedSupport: true,
      phoneSupport: false
    },
    growth: {
      emails: '15,000',
      leads: 'Unlimited',
      templates: true,
      tracking: true,
      aiGeneration: true,
      analytics: true,
      automation: true,
      crmIntegrations: true,
      abTesting: true,
      whiteLabel: true,
      apiAccess: true,
      customIntegrations: true,
      dedicatedSupport: true,
      phoneSupport: true
    }
  };

  const renderFeatureValue = (plan, feature) => {
    const value = planFeatures[plan.id]?.[feature.key];
    
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-slate-400 mx-auto" />
      );
    }
    
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="space-y-8">
      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative transition-all hover:shadow-lg ${
              plan.popular 
                ? 'border-2 border-blue-500 shadow-lg scale-105' 
                : selectedPlan?.id === plan.id
                ? 'border-2 border-green-500'
                : 'border border-slate-200 dark:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2">
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${plan.price}
                  </span>
                </div>
                <span className="text-slate-600 dark:text-slate-400">
                  per {plan.billing}
                </span>
              </div>
            </CardHeader>
            
            <CardContent>
              <Button
                className="w-full mb-4"
                variant={plan.popular ? 'default' : selectedPlan?.id === plan.id ? 'default' : 'outline'}
                onClick={() => onSelectPlan(plan)}
              >
                {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
              
              <ul className="space-y-2 text-sm">
                {plan.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-slate-500 dark:text-slate-400 text-xs">
                    +{plan.features.length - 5} more features
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Detailed Feature Comparison</CardTitle>
          <CardDescription className="text-center">
            Compare all features across our plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center py-3 px-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {plan.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        ${plan.price}/{plan.billing}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, index) => (
                  <tr 
                    key={feature.key}
                    className={`border-b border-slate-100 dark:border-slate-800 ${
                      index % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-800/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {feature.name}
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="py-3 px-4 text-center">
                        {renderFeatureValue(plan, feature)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated."
              },
              {
                question: "What happens during the free trial?",
                answer: "You get full access to all features of your selected plan for 14 days. No credit card required to start."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid subscriptions. Cancel anytime during this period for a full refund."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees or hidden charges. You only pay the monthly or annual subscription fee for your chosen plan."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-slate-900 dark:text-white">
                  {faq.question}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};