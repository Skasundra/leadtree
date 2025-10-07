import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  CreditCard,
  Star,
  Shield,
  Clock,
  Mail,
  Phone,
  Lock,
  MapPin,
  Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import leadTreeLogo from '../../assets/leadtree.png';

export const OnboardingFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Payment & Confirmation', icon: CreditCard }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically process the payment and create the account
    console.log('Form submitted:', { formData, selectedPlan });
    // Navigate to success page or dashboard
    navigate('/onboarding/success', { state: { plan: selectedPlan } });
  };

  if (!selectedPlan) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-3">
              <img 
                src={leadTreeLogo} 
                alt="LeadTree" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Complete your setup</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-1">
                  {[1, 2].map((step) => (
                    <div
                      key={step}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentStep >= step ? 'bg-blue-600 w-8' : 'bg-slate-300 dark:bg-slate-600 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Step {currentStep} of 2
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4 bg-white dark:bg-slate-800 px-8 py-5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                        currentStep >= step.id 
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-400'
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="h-6 w-6" />
                        ) : (
                          <step.icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className={`mt-2 text-sm font-medium transition-colors ${
                        currentStep >= step.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 mx-4 rounded-full transition-all duration-300 ${
                        currentStep > step.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200 dark:bg-slate-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white dark:bg-slate-800">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      currentStep === 1 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-purple-500 to-purple-600'
                    } shadow-md`}>
                      {currentStep === 1 ? (
                        <User className="h-6 w-6 text-white" />
                      ) : (
                        <CreditCard className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                        {currentStep === 1 && 'Tell us about yourself'}
                        {currentStep === 2 && 'Payment details'}
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        {currentStep === 1 && 'We need some basic information to set up your account'}
                        {currentStep === 2 && 'Secure payment to activate your subscription'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            First Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              placeholder="John"
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Last Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              placeholder="Doe"
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@company.com"
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Phone Number (Optional)
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="pl-10 h-11"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Secure Payment</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                              Your payment information is encrypted and secure. Start with a 14-day free trial.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Card Number *
                          </Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                              id="cardNumber"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Expiry Date *
                            </Label>
                            <Input
                              id="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              placeholder="MM/YY"
                              className="h-11"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              CVV *
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                              <Input
                                id="cvv"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                placeholder="123"
                                className="pl-10 h-11"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingAddress" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Billing Address *
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                              id="billingAddress"
                              value={formData.billingAddress}
                              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                              placeholder="123 Main St"
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              City *
                            </Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="h-11"
                              placeholder="New York"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              ZIP Code *
                            </Label>
                            <Input
                              id="zipCode"
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange('zipCode', e.target.value)}
                              placeholder="10001"
                              className="h-11"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Country *
                            </Label>
                            <select
                              id="country"
                              value={formData.country}
                              onChange={(e) => handleInputChange('country', e.target.value)}
                              className="w-full h-11 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Select country</option>
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="UK">United Kingdom</option>
                              <option value="AU">Australia</option>
                              <option value="DE">Germany</option>
                              <option value="FR">France</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      size="lg"
                      className="px-8"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Previous
                    </Button>
                    
                    {currentStep < 2 ? (
                      <Button 
                        onClick={handleNext}
                        size="lg"
                        className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSubmit} 
                        size="lg"
                        className="px-8 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                      >
                        Complete Setup
                        <Check className="ml-2 h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 shadow-lg border-0 bg-white dark:bg-slate-800 overflow-hidden">
                {selectedPlan.popular && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center">
                    <div className="flex items-center justify-center text-white font-semibold text-sm">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      Most Popular Choice
                    </div>
                  </div>
                )}
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedPlan.name} Plan
                  </CardTitle>
                  <CardDescription>Your selected subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white">
                      ${selectedPlan.price}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 mt-1">
                      per {selectedPlan.billing}
                    </div>
                    <div className="inline-flex items-center mt-3 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold">
                      <Check className="h-4 w-4 mr-1" />
                      14-day free trial
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white">What's included:</h4>
                    <div className="space-y-3">
                      {selectedPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                              <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                            </div>
                          </div>
                          <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-start text-sm">
                      <Clock className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Trial Period</div>
                        <div className="text-slate-600 dark:text-slate-400">
                          Ends {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <Shield className="h-5 w-5 mr-2 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Money-Back Guarantee</div>
                        <div className="text-slate-600 dark:text-slate-400">
                          Cancel anytime, no questions asked
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};