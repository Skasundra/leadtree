import { Check, Star } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const PricingCard = ({ plan, isPopular = false }) => (
  <Card className={`relative ${isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
    {isPopular && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Star className="h-4 w-4 mr-1" />
          Most Popular
        </span>
      </div>
    )}
    <CardHeader className="text-center pb-4">
      <CardTitle className="text-2xl">{plan.name}</CardTitle>
      <CardDescription>{plan.description}</CardDescription>
      <div className="mt-4">
        <span className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
          ${plan.price}
        </span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark">
          /{plan.billing}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-sm text-text-primary-light dark:text-text-primary-dark">
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Button 
        className="w-full" 
        variant={isPopular ? 'default' : 'outline'}
      >
        {plan.cta}
      </Button>
    </CardContent>
  </Card>
);

export const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started",
      price: 19,
      billing: "month",
      cta: "Start Free Trial",
      features: [
        "1,000 emails per month",
        "Up to 500 leads",
        "Basic email templates",
        "Email tracking",
        "Standard support"
      ]
    },
    {
      name: "Pro",
      description: "Best for growing teams and businesses",
      price: 49,
      billing: "month",
      cta: "Start Free Trial",
      features: [
        "5,000 emails per month",
        "Unlimited leads",
        "AI email generation",
        "Advanced analytics",
        "Campaign automation",
        "CRM integrations",
        "Priority support"
      ]
    },
    {
      name: "Growth",
      description: "For large teams and enterprises",
      price: 99,
      billing: "month",
      cta: "Contact Sales",
      features: [
        "15,000 emails per month",
        "Unlimited leads",
        "Advanced AI features",
        "Custom integrations",
        "White-label options",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom reporting"
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "What happens if I exceed my email limit?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional email credits."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all new subscriptions. No questions asked."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required to get started."
    }
  ];

  return (
    <PageWrapper
      title="Choose Your Plan"
      description="Select the perfect plan for your email outreach needs"
    >
      <div className="space-y-12">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index} 
              plan={plan} 
              isPopular={index === 1} 
            />
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
            <CardDescription className="text-center">
              Compare features across all plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Starter</th>
                    <th className="text-center py-3 px-4">Pro</th>
                    <th className="text-center py-3 px-4">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly Emails", starter: "1,000", pro: "5,000", growth: "15,000" },
                    { feature: "Leads", starter: "500", pro: "Unlimited", growth: "Unlimited" },
                    { feature: "AI Email Generation", starter: "❌", pro: "✅", growth: "✅" },
                    { feature: "Advanced Analytics", starter: "❌", pro: "✅", growth: "✅" },
                    { feature: "CRM Integrations", starter: "❌", pro: "✅", growth: "✅" },
                    { feature: "White-label", starter: "❌", pro: "❌", growth: "✅" },
                    { feature: "Support", starter: "Email", pro: "Priority", growth: "24/7 Phone" }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-border-light dark:border-border-dark">
                      <td className="py-3 px-4 font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-center">{row.starter}</td>
                      <td className="py-3 px-4 text-center">{row.pro}</td>
                      <td className="py-3 px-4 text-center">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h4 className="font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};