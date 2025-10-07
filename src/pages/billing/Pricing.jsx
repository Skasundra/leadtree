import { useState } from 'react';
import { Check, Star, Zap, Shield, TrendingUp, Users, Mail, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const PricingCard = ({ plan, isPopular = false, billingCycle }) => {
  const price = billingCycle === 'annual' ? plan.annualPrice : plan.price;
  const savings = billingCycle === 'annual' ? Math.round(((plan.price * 12 - plan.annualPrice * 12) / (plan.price * 12)) * 100) : 0;

  return (
    <Card className={`relative transition-all duration-300 hover:shadow-2xl ${
      isPopular 
        ? 'border-2 border-blue-500 shadow-xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
        : 'hover:scale-105'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-lg">
            <Star className="h-4 w-4 mr-1 fill-current" />
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pb-8 pt-8">
        <div className={`mx-auto mb-4 h-16 w-16 rounded-2xl flex items-center justify-center ${
          isPopular 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
            : 'bg-gradient-to-br from-slate-500 to-slate-600'
        }`}>
          {plan.icon}
        </div>
        <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
        <CardDescription className="text-base">{plan.description}</CardDescription>
        
        <div className="mt-6">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${price}
            </span>
            <span className="text-slate-600 dark:text-slate-400 ml-2">
              /{billingCycle === 'annual' ? 'year' : 'month'}
            </span>
          </div>
          {billingCycle === 'annual' && savings > 0 && (
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Save {savings}%
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Button 
          className={`w-full mb-6 ${
            isPopular 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg' 
              : ''
          }`}
          variant={isPopular ? 'default' : 'outline'}
          size="lg"
        >
          {plan.cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Everything in {plan.name}:
          </div>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600 dark:text-green-400 stroke-[3]" />
                  </div>
                </div>
                <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started",
      price: 19,
      annualPrice: 15,
      icon: <Zap className="h-8 w-8 text-white" />,
      cta: "Start Free Trial",
      features: [
        "1,000 emails per month",
        "Up to 500 leads",
        "Basic email templates",
        "Email tracking & analytics",
        "Standard support (48h response)",
        "Mobile app access",
        "Basic integrations"
      ]
    },
    {
      name: "Professional",
      description: "Best for growing teams and businesses",
      price: 49,
      annualPrice: 39,
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      cta: "Start Free Trial",
      features: [
        "5,000 emails per month",
        "Unlimited leads",
        "AI email generation",
        "Advanced analytics & reporting",
        "Campaign automation",
        "CRM integrations (Salesforce, HubSpot)",
        "Priority support (24h response)",
        "A/B testing",
        "Custom email templates",
        "Team collaboration tools"
      ]
    },
    {
      name: "Enterprise",
      description: "For large teams and enterprises",
      price: 99,
      annualPrice: 79,
      icon: <Users className="h-8 w-8 text-white" />,
      cta: "Contact Sales",
      features: [
        "15,000 emails per month",
        "Unlimited leads & contacts",
        "Advanced AI features",
        "Custom integrations & API access",
        "White-label options",
        "Dedicated account manager",
        "24/7 phone & chat support",
        "Custom reporting & dashboards",
        "Advanced security & compliance",
        "Onboarding & training",
        "SLA guarantee"
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
      <div className="space-y-16">
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-green-600" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index} 
              plan={plan} 
              isPopular={index === 1}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">
                        Feature
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-900 dark:text-white">
                        Starter
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/20">
                        Professional
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-900 dark:text-white">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      { feature: "Monthly Emails", starter: "1,000", pro: "5,000", growth: "15,000" },
                      { feature: "Lead Storage", starter: "500", pro: "Unlimited", growth: "Unlimited" },
                      { feature: "AI Email Generation", starter: "❌", pro: "✅", growth: "✅" },
                      { feature: "Advanced Analytics", starter: "Basic", pro: "✅", growth: "✅" },
                      { feature: "Campaign Automation", starter: "❌", pro: "✅", growth: "✅" },
                      { feature: "CRM Integrations", starter: "❌", pro: "✅", growth: "✅" },
                      { feature: "A/B Testing", starter: "❌", pro: "✅", growth: "✅" },
                      { feature: "White-label", starter: "❌", pro: "❌", growth: "✅" },
                      { feature: "API Access", starter: "❌", pro: "Limited", growth: "Full" },
                      { feature: "Support", starter: "Email (48h)", pro: "Priority (24h)", growth: "24/7 Phone" },
                      { feature: "Account Manager", starter: "❌", pro: "❌", growth: "✅" }
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">
                          {row.feature}
                        </td>
                        <td className="py-4 px-6 text-center text-slate-700 dark:text-slate-300">
                          {row.starter}
                        </td>
                        <td className="py-4 px-6 text-center text-slate-700 dark:text-slate-300 bg-blue-50/50 dark:bg-blue-900/10">
                          {row.pro}
                        </td>
                        <td className="py-4 px-6 text-center text-slate-700 dark:text-slate-300">
                          {row.growth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative z-10">
                <Mail className="h-16 w-16 text-white mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to get started?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses using our platform to grow their email outreach
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};