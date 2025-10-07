import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Users, 
  BarChart3,
  Calendar,
  Star,
  Gift
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import leadTreeLogo from '../../assets/leadtree.png';

export const OnboardingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  useEffect(() => {
    // Redirect if no plan data
    if (!plan) {
      navigate('/');
    }
  }, [plan, navigate]);

  const nextSteps = [
    {
      icon: Mail,
      title: "Import Your Contacts",
      description: "Upload your existing contact list or connect your CRM",
      action: "Import Contacts",
      href: "/leads/import"
    },
    {
      icon: Users,
      title: "Create Your First Campaign",
      description: "Set up an email campaign to start reaching your audience",
      action: "Create Campaign",
      href: "/campaigns/create"
    },
    {
      icon: BarChart3,
      title: "Explore Analytics",
      description: "Learn how to track and measure your campaign performance",
      action: "View Analytics",
      href: "/analytics"
    }
  ];

  const features = [
    "AI-powered email generation",
    "Advanced lead management",
    "Real-time analytics dashboard",
    "Campaign automation tools",
    "CRM integrations",
    "Priority customer support"
  ];

  if (!plan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img 
                src={leadTreeLogo} 
                alt="LeadTree" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to LeadTree! 🎉
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
              Your account has been successfully created and your {plan.name} plan is now active.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full">
              <Gift className="h-5 w-5 mr-2" />
              Your 14-day free trial has started!
            </div>
          </div>

          {/* Plan Summary */}
          <Card className="mb-8 border-2 border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                {plan.popular && <Star className="h-5 w-5 text-yellow-500 mr-2" />}
                {plan.name} Plan Activated
              </CardTitle>
              <CardDescription>
                You now have access to all {plan.name} features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Your Plan Includes:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${plan.price}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mb-2">
                    per {plan.billing}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Free until {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Get Started in 3 Easy Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(step.href)}
                    >
                      {step.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trial Information */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Your Free Trial Details
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  You have 14 days to explore all features risk-free. We'll send you reminders before your trial ends.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-white">Trial Ends</div>
                    <div className="text-slate-600 dark:text-slate-400">
                      {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-white">No Commitment</div>
                    <div className="text-slate-600 dark:text-slate-400">Cancel anytime</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-white">Full Access</div>
                    <div className="text-slate-600 dark:text-slate-400">All {plan.name} features</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="px-8"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/campaigns/create')}
                className="px-8"
              >
                Create First Campaign
              </Button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Need help getting started? Check out our{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                quick start guide
              </a>{' '}
              or{' '}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};