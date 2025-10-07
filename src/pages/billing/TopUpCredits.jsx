import { CreditCard, Zap, Mail, Users, Check } from 'lucide-react';
import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const TopUpCard = ({ title, amount, price, icon: Icon, color, features, onSelect, selected }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 ${
      selected 
        ? 'border-2 border-blue-500 shadow-lg scale-105' 
        : 'border hover:border-blue-300 hover:shadow-md'
    }`}
    onClick={onSelect}
  >
    <CardContent className="p-6">
      <div className="text-center">
        <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mb-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {amount}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {title}
        </p>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          ${price}
        </div>
        <ul className="space-y-2 mb-6 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
        {selected && (
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
            ✓ Selected
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export const TopUpCredits = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const topUpPackages = [
    {
      id: 'email-1000',
      title: 'Email Credits',
      amount: '1,000 Emails',
      price: 15,
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      features: [
        'One-time purchase',
        'Never expires',
        'Use anytime',
        'Instant activation'
      ]
    },
    {
      id: 'email-5000',
      title: 'Email Credits',
      amount: '5,000 Emails',
      price: 60,
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      features: [
        'One-time purchase',
        'Never expires',
        'Best value',
        'Instant activation',
        'Save $15'
      ]
    },
    {
      id: 'ai-100',
      title: 'AI Generations',
      amount: '100 AI Credits',
      price: 25,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      features: [
        'One-time purchase',
        'Never expires',
        'AI email generation',
        'Instant activation'
      ]
    },
    {
      id: 'leads-1000',
      title: 'Lead Storage',
      amount: '1,000 Leads',
      price: 20,
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
      features: [
        'One-time purchase',
        'Permanent storage',
        'Unlimited access',
        'Instant activation'
      ]
    }
  ];

  const handlePurchase = () => {
    if (!selectedPackage) {
      alert('Please select a package');
      return;
    }
    // In real app, this would process payment
    alert(`Processing purchase for ${selectedPackage.title}...`);
    // Navigate to billing after purchase
    setTimeout(() => {
      navigate('/billing');
    }, 1500);
  };

  return (
    <PageWrapper
      title="Top-Up Credits"
      description="Purchase additional credits without changing your plan"
    >
      <div className="space-y-8">
        {/* Info Banner */}
        <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  One-Time Top-Up Credits
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Purchase additional credits that never expire. These credits are added to your account and can be used anytime, even after your monthly limit resets.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Credits never expire</li>
                  <li>• Use alongside your monthly plan</li>
                  <li>• Instant activation</li>
                  <li>• No subscription required</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top-Up Packages */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Select a Top-Up Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topUpPackages.map((pkg) => (
              <TopUpCard
                key={pkg.id}
                {...pkg}
                selected={selectedPackage?.id === pkg.id}
                onSelect={() => setSelectedPackage(pkg)}
              />
            ))}
          </div>
        </div>

        {/* Purchase Summary */}
        {selectedPackage && (
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Purchase Summary</CardTitle>
              <CardDescription>Review your selection before purchasing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedPackage.amount}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedPackage.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${selectedPackage.price}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      One-time payment
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPackage(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Purchase Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Do top-up credits expire?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No, all top-up credits are permanent and never expire. Use them whenever you need them.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Can I use top-up credits with my monthly plan?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes! Top-up credits work alongside your monthly plan. Your monthly credits are used first, then top-up credits kick in.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  What happens if I upgrade my plan?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your top-up credits remain in your account and can still be used with any plan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};
